import WooCommerceRestApi from "woocommerce-rest-ts-api";

// Initialize WooCommerce REST API client
const api = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
});

export default async function handler(req, res) {

    try{ 
       const {search} = req.query;

        const data = await api.get('products', {
            search: search,
        })

        res.status(200).json({
            success: true,
            data: data.data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    } 
}