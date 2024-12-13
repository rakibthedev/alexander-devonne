import WooCommerceRestApi from "woocommerce-rest-ts-api";

// Initialize WooCommerce REST API client
const api = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: false,
});

export default async function handler(req, res) {
  const { category_slug } = req.query;

  if (!category_slug) {
    return res.status(400).json({ error: "Category slug is required" });
  }

  try {
    const { data } = await api.get("products/categories", {
      slug: category_slug, // Pass the slug to the query 
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
