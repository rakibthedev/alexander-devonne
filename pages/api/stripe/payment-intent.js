import Stripe from 'stripe';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { paymentMethodId, cartItems, formData } = req.body;
      
      // Shipping Rate (from formData)
      const shippingRate = parseFloat(formData.shipping_lines[0].total);

      if (cartItems.length > 0) {
        // Calculate the total cart amount in cents (USD)
        const totalAmountInCents = cartItems.reduce((total, item) => {
          return total + Math.round(item.price * 100) * item.quantity;
        }, 0);

        // Add shipping cost once to the total amount in cents
        const finalAmountInCents = totalAmountInCents + Math.round(shippingRate * 100);
        
        // Optional: Prepare metadata for Stripe (pass cart details)
        const metadata = cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          color: formatItemColor(item.color), // Color formatting if needed
          size: item.size,
          image: item.image,
        }));
  
        // Create the PaymentIntent with the calculated total amount and metadata
        const paymentIntent = await stripe.paymentIntents.create({
          amount: finalAmountInCents, // Total amount in cents (USD)
          currency: 'usd',            // Currency (can be dynamic if needed)
          payment_method: paymentMethodId, // Payment method ID from frontend
          confirmation_method: 'automatic',  // Automatic confirmation
          confirm: true,              // Confirm immediately
          return_url: `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/thank-you`, // Return URL
          metadata: {
            items: JSON.stringify(metadata), // Pass cart items metadata
          },
        });

        // Check if payment was successful
        if (paymentIntent.status === 'succeeded') {
          // Handle order creation, like calling WooCommerce API to create the order
          const orderId = await createOrder(formData, paymentIntent);    
          return res.status(200).json({
            success: true,
            paymentDetails: paymentIntent,
            orderId: orderId,
          });
        } else {
          return res.status(400).json({ success: false, message: 'Payment failed' });        
        }
      } else {
        return res.status(500).json({ success: false, message: "Cart is empty. Unable to process payment." });
      }

    } catch (error) {
      console.error('Payment processing failed:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    // Handle unsupported HTTP methods (only POST is allowed here)
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}

// Helper function for formatting item color (can be customized)
function formatItemColor(input) {
  return input
    .toUpperCase()
    .replace(/[_\s,]+/g, ' - ')
    .replace(/[^A-Z0-9 -]/g, '')
    .trim();
}
