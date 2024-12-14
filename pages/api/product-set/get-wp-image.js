export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle pre-flight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const postBody = req.body; // Body is already parsed
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/media/${postBody.mediaId}`);

        const data = await response.json();

        if (response.ok) {
            res.status(200).json({
                status: true,
                data: data,
            });
        } else {
            res.status(500).json({
                status: false,
                data: data,
            });
        }
    } catch (error) {
        console.error('Error fetching media:', error); // Log error for debugging
        res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
}
