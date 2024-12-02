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

  const { category } = req.query; // Get the category from the query parameters

  if (!category) {
    return res.status(400).json({ error: "Category is required" });
  }

  try {
    // Fetch products by category (slug or ID)
    const products = await fetchProductsByCategory(category);

    if (products.length > 0) {
      responsData.success = true;
      responsData.products = products; // Return the list of products
    } else {
      responsData.error = `No products found in category: ${category}`;
    }

    res.status(200).json(responsData);
  } catch (error) {
    responsData.error = error.message;
    res.status(500).json(responsData);
  }
}

// Function to fetch all products by category (including pagination)
const fetchProductsByCategory = async (category) => {
  const products = [];
  let page = 1;
  let totalPages = 1;

  // Keep fetching until all pages are retrieved
  while (page <= totalPages) {
    const { data, headers } = await api.get("products", {
      category: category,
      orderby: 'date',
      order: 'desc',
      per_page: 100,
      page: page,  // Pagination
    });

    // Push the products from the current page into the products array
    products.push(...data);

    // Get the total number of pages from the response headers
    totalPages = parseInt(headers['x-wp-totalpages'], 10);
    page++;
  }

  return products;
};
