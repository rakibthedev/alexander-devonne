import WooCommerceRestApi from "woocommerce-rest-ts-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3",
  queryStringAuth: false,
});

export default async function handler(req, res) {

    if(req.method === "POST"){

        const orderData = req.body;

        try{
            const wooOrderData = {
                payment_method: orderData.payment_method,
                payment_method_title: orderData.payment_method_title,
                set_paid: orderData.set_paid,
                billing: {
                  first_name: orderData.billing.first_name,
                  last_name: orderData.billing.last_name,
                  address_1: orderData.billing.address_1,
                  address_2: orderData.billing.address_2,
                  city: orderData.billing.city,
                  state: orderData.billing.state,
                  postcode: orderData.billing.postcode,
                  country: orderData.billing.country,
                  email: orderData.email,
                  phone: orderData.billing.phone
                },
                shipping: {
                  first_name: orderData.shipping.first_name,
                  last_name: orderData.shipping.last_name,
                  address_1: orderData.shipping.address_1,
                  address_2: orderData.shipping.address_2,
                  city: orderData.shipping.city,
                  state: orderData.shipping.state,
                  postcode: orderData.shipping.postcode,
                  country: orderData.shipping.country
                },
                line_items: orderData.line_items,                
                shipping_lines: orderData.shipping_lines
            };

            const response = await WooCommerce.post("orders", wooOrderData);
            // Respond with WooCommerce API response
            res.status(200).json(response.data);

        } catch (error) {
            console.error("WooCommerce API error:", error);
            res.status(500).json({ error: error.response?.data || "An error occurred while placing the order" });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}