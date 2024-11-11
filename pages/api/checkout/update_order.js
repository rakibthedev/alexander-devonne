import WooCommerceRestApi from "woocommerce-rest-ts-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: false,
});

export default async function handler(req, res) {

    if(req.method === "POST"){

        const orderResult = req.body;

        try {
          const response = await WooCommerce.put(
            `orders/${orderResult.orderId}`,
            {
              status: 'completed', // Change order status to 'completed'
            }
          );          
          res.status(200).json(response.data);
        } catch (error) {
          res.status(500).json(error);
        }

    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}