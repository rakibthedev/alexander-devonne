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
  const responsData = {
    success: false,
    products: [],
    error: null,
  };

  const { category, orderby, order } = req.query; // Get the category from the query parameters

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  try {
    // Fetch products by category (slug or ID)
    const { data } = await api.get("products", {
      category: category,  // Pass category slug or ID as a query parameter
      orderby: orderby,
      order: order,
      per_page: 100,  // Adjust per_page as needed (max is 100 per request)
    });

    // Check if products were found
    if (data.length > 0) {
      responsData.success = true;
      responsData.products = data; // Return the list of products
    } else {
      responsData.error = "No products found in this category";
    }

    res.status(200).json(responsData);
  } catch (error) {
    responsData.error = error.message;
    res.status(500).json(responsData);
  }
}
