// pages/api/product-set.js
export default async function handler(req, res) {
    try {
      // Fetch data from WordPress API for product sets
      const response = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/product-set`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      // Check if the fetch was successful
      if (!response.ok) {
        return res.status(response.status).json({ error: "Failed to fetch product sets" });
      }
  
      // Parse the response
      const data = await response.json();
  
      // Return the processed data
      res.status(200).json(data);
  
    } catch (error) {
      console.error('Error fetching product set data:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  