
export default async function handler(req, res) {
  try {
    const { search } = req.query;
    
    // Call the custom WooCommerce API endpoint we created
    const woocommerceApiUrl = `${process.env.WORDPRESS_SITE_URL}/wp-json/custom/v1/search?search=${search}`;
    
    const response = await fetch(woocommerceApiUrl);
    
    if (!response.ok) {
      throw new Error("Failed to fetch data from WooCommerce");
    }

    const data = await response.json();

    // Send the response from WooCommerce to the frontend
    res.status(200).json({
      success: true,
      total_found: data.length,
      data,
    });

  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
