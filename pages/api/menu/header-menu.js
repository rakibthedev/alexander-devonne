export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or replace '*' with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers

    // Handle pre-flight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Respond to pre-flight request
    }

    try {
        // Fetch data from WordPress API for header-menu
        const response = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/header-menu?orderby=date&order=asc`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if the response is OK (status 200)
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch menu data" });
        }

        // Parse the JSON response
        const data = await response.json();

        // Map the data to return only the necessary fields
        const menuData = data.map((item) => {
            // Assuming `acf` contains the menu data
            return {
                menu: item.acf,
            };
        });

        // Return the mapped menu data as JSON
        res.status(200).json(menuData);

    } catch (error) {
        console.error('Error fetching menu data:', error); // Log the error for debugging
        res.status(500).json({ error: "Internal Server Error. Unable to fetch menu data." });
    }
}
