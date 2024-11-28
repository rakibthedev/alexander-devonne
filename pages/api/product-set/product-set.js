export default async function handler(req, res) {
  try {
    // Helper function to fetch with error handling
    const fetchWithErrorHandling = async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.error(`Error fetching ${url}: ${response.status} ${response.statusText}`);
          return null;
        }
        return await response.json();
      } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return null;
      }
    };

    // Fetch product-set data
    const response = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/product-set`);

    // Check if product-set API call was successful
    if (!response.ok) {
      console.error("Error fetching product-set data:", response.status, response.statusText);
      return res.status(response.status).json({ error: "Failed to fetch product sets" });
    }

    const data = await response.json();

    // // Process each product-set item
    // const productSetData = await Promise.all(
    //   data.map(async (item) => {
    //     // Fetch featured media image
    //     const imgData = item.featured_media
    //       ? await fetchWithErrorHandling(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/media/${item.featured_media}`)
    //       : null;

    //     // Fetch mobile featured media image
    //     const imgData2 = item.acf?.feature_image_mobile
    //       ? await fetchWithErrorHandling(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/media/${item.acf.feature_image_mobile}`)
    //       : null;

    //     // Return processed item
    //     return {
    //       feature_image: imgData?.guid?.rendered || null,
    //       feature_image_mobile: imgData2?.guid?.rendered || null,
    //       title: item.title?.rendered || null,
    //       product_category: item.acf?.product_category || null,
    //       category_url: item.acf?.category_url || null,
    //       gallery_title: item.acf?.gallery_title || null,
    //       link_1_text: item.acf?.link_1_text || null,
    //       link_2_text: item.acf?.link_2_text || null,
    //       just_gallery: item.acf?.just_gallery || null,
    //     };
    //   })
    // );

    // Return processed data
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching product set data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
