// app/ProductGalleryServer.js
import ProductGallery from './ProductGallery'; // Import the client component


// Export a component that uses getServerSideProps
const ProductGalleryServer = async ({ apiUrl }) => {
  const res = await fetch(apiUrl,{
    next: {
      revalidate: 300
    }
  });
  const data = await res.json();

  const products = data.products.length > 8 
  ? data.products.slice(0, 8).map(item => ({
      name: item.name,
      price: `$${Intl.NumberFormat('en-US').format(item.price)}`,
      image: item.images[0].src,
      slug: item.slug,
    }))
  : data.products.map(item => ({
    name: item.name,
    price: `$${Intl.NumberFormat('en-US').format(item.price)}`,
    image: item.images[0].src,
    slug: item.slug,
    }));
  return <ProductGallery products={products} />;
};

export default ProductGalleryServer;