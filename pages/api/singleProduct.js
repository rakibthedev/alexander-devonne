import WooCommerceRestApi from "woocommerce-rest-ts-api";

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
    product: null,
  };

  const { slug } = req.query; // Get the slug from the query parameters

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  try {
    // Fetch the product by slug
    const { data } = await api.get(`products`, {
      slug, // Pass the slug as a query parameter
      per_page: 1, // We only need one product
    });

    // Check if the product was found
    if (data.length > 0) {
      responsData.success = true;
      responsData.product = data[0]; // Get the first product
    } else {
      responsData.error = "Product not found";
    }

    res.status(200).json(responsData);
  } catch (error) {
    responsData.error = error.message;
    res.status(500).json(responsData);
  }
}
