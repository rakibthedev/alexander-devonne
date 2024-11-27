export default async function handler(req, res) {
    try{
        const response = await fetch(`${process.env.WORDPRESS_SITE_URL}/wp-json/wp/v2/header-menu?orderby=date&order=asc`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        const menuData = await data.map((item)=>{
            return {
                menu: item.acf,
            }
        });
        res.status(200).json(menuData);

    }catch (error){
        res.status(500).json(error);
    }
    
}