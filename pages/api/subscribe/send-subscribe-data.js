

export default async function handler(req, res) {

    const subscribeData = req.body;
    console.log(subscribeData)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/cf7/v1/submit-form`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(subscribeData),
        });

        const result = await response.json();
        if (response.ok) {
          res.status(200).json({
            "success": true,
            "message": "Subscribe form data sent successfully!",
            })
        } else {
            res.status(500).json({
                "success": false,
                "message": result.message,
             })
        }
      } catch (error) {
        res.status(500).json({
            "success": false,
            "message": `Error submitting form: ${error}`,
         })

      }    
      
}