import WooCommerceRestApi from "woocommerce-rest-ts-api";

// Initialize WooCommerce REST API client
const api = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
});

export default async function handler(req, res) {
  try {
    const { search } = req.query;

    // First, search by product title and description (default search)
    const productData = await api.get('products', { search });

    // Search categories for the given term
    const categoryData = await api.get('products/categories', { search });

    // Collect all the matching category IDs
    const categoryIds = categoryData.data.map(category => category.id);

    // Fetch products for the found categories
    const filteredProducts = await api.get('products', {
      category: categoryIds.join(','),  // Filter by category IDs
    });

    // Combine products from title/description search with category-filtered products
    // Remove duplicates using product IDs
    const allProducts = [
      ...productData.data,
      ...filteredProducts.data.filter(product => 
        !productData.data.some(existingProduct => existingProduct.id === product.id)
      )
    ];

    // Return combined results: products and categories
    res.status(200).json({
      success: true,
      total_found: allProducts.length,
      data: allProducts,
      categories: categoryData.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
