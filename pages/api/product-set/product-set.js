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
  
      // Fetch image data for each item in productSet
      // const productSetData = await Promise.all(
      //   data.map(async (item) => {
      //     const resImage = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/media/${item.featured_media}`);
      //     const imgData = await resImage.json();
      //     const resImage2 = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/media/${item.acf.feature_image_mobile}`);
      //     const imgData2 = await resImage2.json();
  
      //     return {
      //       feature_image: imgData?.guid?.rendered,
      //       feature_image_mobile: imgData2?.guid?.rendered,
      //       title: item.title.rendered,
      //       product_category: item.acf.product_category,
      //       category_url: item.acf.category_url,
      //       gallery_title: item.acf.gallery_title,
      //       link_1_text: item.acf.link_1_text,
      //       link_2_text: item.acf.link_2_text,
      //       just_gallery: item.acf.just_gallery,
      //     };
      //   })
      // );
  
      // Return the processed data
      res.status(200).json(data);
  
    } catch (error) {
      console.error('Error fetching product set data:', error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  