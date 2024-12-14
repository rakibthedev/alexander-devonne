#!/usr/bin/env node

import fs from 'fs';
import axios from 'axios';
import path from 'path';

// Utility function to fetch API data
async function fetchApiData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching API data:', error);
    return null;
  }
}

// Utility function to save data to a file
function saveDataToFile(data) {
  // Define the target file path
  const dirPath = path.join(process.cwd(), 'src', 'app', 'constants');
  const filePath = path.join(dirPath, 'productSetData.js');

  // Ensure the directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write the data as a JavaScript module
  const fileContent = `export const productSetData = ${JSON.stringify(data, null, 2)};`;

  fs.writeFileSync(filePath, fileContent);
  console.log(`Data saved to ${filePath}`);
}

export default async function handler(req, res) {
  const apiUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/product-set`; // Replace with your API URL
  const data = await fetchApiData(apiUrl);

  if (data) {    

    let formattedData = [];

    for (const item of data) {
      const featureImageDesktop = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/media/${item.featured_media}`).then(res => res.json());
      const featureImageMobile = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/media/${item.acf.feature_image_mobile}`).then(res => res.json());
    
      formattedData.push({
        title: item.title.rendered,
        category_url: item.acf.category_url,
        link_1_text: item.acf.link_1_text,
        gallery_title: item.acf.gallery_title,
        just_gallery: item.acf.just_gallery,
        link_2_text: item.acf.link_2_text,
        feature_image_desktop: featureImageDesktop.guid.rendered,
        feature_image_mobile: featureImageMobile.guid.rendered,
        product_category: item.acf.product_category,
      });
    }
    

    saveDataToFile(formattedData); // Save the fetched data to a file
    res.status(200).json({ message: 'Data fetched and saved successfully.' });
  } else {
    res.status(500).json({ error: 'Failed to fetch data from the API.' });
  }
}
