import WooCommerceRestApi from "woocommerce-rest-ts-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: false,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, order_number } = req.query;

  if (!email || !order_number) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Both email and order number are required"
      });
  }

  try {
    // Retrieve all orders filtered by email
    const response = await WooCommerce.get("orders", {
      search: email,  // Use customer email to filter orders
    });

    const orders = response.data;

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for the provided email"
      });
    }

    // Find the order that matches the provided order_number
    const order = orders.find((order) => order.number.toString() === order_number.toString());

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "No matching order found for the given email and order number"
      });
    }

    // Return the found order
    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve order",
      error: error.response?.data || error.message,
    });
  }
}
