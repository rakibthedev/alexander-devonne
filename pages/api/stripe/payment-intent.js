import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { paymentMethodId, cartItems } = req.body;
      if(cartItems.length > 0){
        // Calculate the total cart amount in cents (USD)
        const totalAmountInCents = cartItems.reduce((total, item) => {
          return total + Math.round(item.price * 100) * item.quantity;
        }, 0);
  
        // Prepare metadata for Stripe (Optional: Store cart details in Stripe)
        const metadata = cartItems.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        }));
  
        // Create PaymentIntent with total amount and metadata
        const paymentIntent = await stripe.paymentIntents.create({
          amount: totalAmountInCents, // Total amount in cents
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
          return res.status(200).json({ 
            success: true,
            message: "Payment succeded",
            data: paymentIntent
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


