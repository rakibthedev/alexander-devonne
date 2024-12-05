export default async function handler(req, res) {
    // Extract the 'category' slug, 'orderby', and 'order' query parameters from the request
    const { category, orderby = 'date', order = 'desc' } = req.query;

    // Check if 'category' is provided
    if (!category) {
        return res.status(400).json({ error: 'Category slug is required' });
    }

    try {
        // Construct the URL for the custom WordPress REST API endpoint
        const apiUrl = `${process.env.WORDPRESS_SITE_URL}/wp-json/custom/v1/category-products?category=${category}&orderby=${orderby}&order=${order}`;

        // Fetch data from the WordPress API
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            // If the category or products are not found, return an error
            const errorMessage = await response.text();
            return res.status(response.status).json({ error: errorMessage });
        }

        // Parse the JSON response from the WordPress API
        const data = await response.json();

        // Return the data in the Next.js API response
        return res.status(200).json({
            success: true,
            total_found: data.data.length,
            data: data
        });

    } catch (error) {
        // Catch and handle any errors that occur during the fetch
        console.error('Error fetching data from WordPress API:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
