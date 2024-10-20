const WooCommerceRestApi = require("woocommerce-rest-ts-api").default;

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
  };

  try {
    let page = 1;
    let allProducts = [];
    let hasMoreProducts = true;

    while (hasMoreProducts) {
      const { data } = await api.get('products', {
        per_page: 100, // You can adjust this limit (max is usually 100)
        page: page,
      });

      allProducts = [...allProducts, ...data];

      // Check if there are more products
      if (data.length < 100) {
        hasMoreProducts = false; // No more products to fetch
      } else {
        page++; // Increment the page number to fetch the next set
      }
    }

    responsData.success = true;
    responsData.products = allProducts;
    res.status(200).json(responsData);
  } catch (error) {
    responsData.error = error.message;
    res.status(500).json(responsData);
  }
}
