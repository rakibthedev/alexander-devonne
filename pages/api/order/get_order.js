import WooCommerceRestApi from "woocommerce-rest-ts-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: false,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { order_id } = req.query;

    if (!order_id) {
      return res.status(400).json({ message: "Order ID is required" });
    }

    try {
      // Fetch the order details using WooCommerce API
      const response = await WooCommerce.get(`orders/${order_id}`);

      // If the API returns a successful response, send it back to the client
      if (response.status === 200) {
        return res.status(200).json(response.data); // Assuming the data is in response.data
      } else {
        return res.status(response.status).json({ message: response.statusText });
      }

    } catch (error) {
      // Log the error for debugging
      console.error("Error fetching order:", error);

      // Send back a 500 error response
      return res.status(500).json({
        message: "An error occurred while fetching the order.",
        error: error.message || error.toString(),
      });
    }
  } else {
    // If the request method is not GET, respond with Method Not Allowed
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
