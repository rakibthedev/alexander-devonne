import Stripe from 'stripe';
import WooCommerceRestApi from "woocommerce-rest-ts-api";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: false,
});

function formatItemColor(input) {
  return input
      .toUpperCase()
      .replace(/[_\s,]+/g, ' - ')
      .replace(/[^A-Z0-9 -]/g, '')
      .trim();
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { paymentMethodId, cartItems, formData } = req.body;
      
      // Shipping Rate
      const shippingRate = parseFloat(formData.shipping_lines[0].total);

      if(cartItems.length > 0){
        // Calculate the total cart amount in cents (USD)
        const totalAmountInCents = cartItems.reduce((total, item) => {
          return total + Math.round(item.price * 100) * item.quantity;
        }, 0);

        // Add shipping cost once to the total amount in cents
        const finalAmountInCents = totalAmountInCents +  Math.round(shippingRate * 100);
        
        // Prepare metadata for Stripe (Optional: Store cart details in Stripe)
        const metadata = cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          color: formatItemColor(item.color),
          size: item.size,
          image: item.image,
        }));
  
        // Create PaymentIntent with total amount and metadata
        const paymentIntent = await stripe.paymentIntents.create({
          amount: finalAmountInCents, // Total amount in cents
          currency: 'usd', // Currency in USD, adjust if needed
          payment_method: paymentMethodId, // Payment method ID from frontend
          confirmation_method: 'automatic',
          confirm: true,
          return_url: `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/thank-you`, // Provide the return URL
          metadata: {
            items: JSON.stringify(metadata), // Pass product info as metadata
          },
        });
  
        // Check if payment was successful
        if (paymentIntent.status === 'succeeded') {    
          // const orderId = await createOrder(formData, paymentIntent);    
          return res.status(200).json({
            success: true,
            paymentDetails: paymentIntent,
            // orderId: orderId,
          });
        } else {
          return res.status(400).json({ success: false, message: 'Payment failed' });        
        }
      }else{
        return res.status(500).json({ success: false, message: "Bag has no item. So we can't proccess." });
      }

    } catch (error) {
      console.error('Payment processing failed:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Method Not Allowed for anything other than POST
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

const createOrder = async (orderData, paymentData) => {
    try{
      const wooOrderData = {
          payment_method: orderData.payment_method,
          payment_method_title: orderData.payment_method_title,
          set_paid: orderData.set_paid,
          billing: {
            first_name: orderData.billing.first_name,
            last_name: orderData.billing.last_name,
            address_1: orderData.billing.address_1,
            address_2: orderData.billing.address_2,
            city: orderData.billing.city,
            state: orderData.billing.state,
            postcode: orderData.billing.postcode,
            country: orderData.billing.country,
            email: orderData.email,
            phone: orderData.billing.phone
          },
          shipping: {
            first_name: orderData.shipping.first_name,
            last_name: orderData.shipping.last_name,
            address_1: orderData.shipping.address_1,
            address_2: orderData.shipping.address_2,
            city: orderData.shipping.city,
            state: orderData.shipping.state,
            postcode: orderData.shipping.postcode,
            country: orderData.shipping.country
          },
          line_items: orderData.line_items,                
          shipping_lines: orderData.shipping_lines
      };

      const response = await WooCommerce.post("orders", wooOrderData);
      // Call WC update order function after order creation success
      // updateOrder(orderId, paymentData)
      await updateOrder(response.data.id, paymentData);

      // Respond with WooCommerce API response    
      console.log({
        success: true,
        message: "Order has been created successfully",
        data: {
          order_id: response.data.id,
        }
      })  

      return response.data.id;

  } catch (error) {
    console.log({
      success: false,
      error: error,
    })
  }
}

const updateOrder = async (orderId, paymentData) => {
  try {
    const response = await WooCommerce.put(
      `orders/${orderId}`,
      {
        status: 'completed', // Change order status to 'completed'
        payment_method: "stripe",
        payment_method_title: "Stripe Card",
        transaction_id: paymentData.id,
      }
   );    
     
      console.log({
        success: true,
        message: "Order has been updated successfully",
        data: {
          order_id: orderId,
        }
      })  
      
  } catch (error) {
    console.log({
      success: false,
      error: error,
    })
  }
}


