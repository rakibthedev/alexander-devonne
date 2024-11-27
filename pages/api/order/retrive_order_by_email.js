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

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Use the search query parameter to filter orders by email
    const response = await WooCommerce.get("orders", {
      search: email,
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve orders", error: error.response?.data || error.message });
  }
}
