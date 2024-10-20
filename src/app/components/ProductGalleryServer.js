// app/ProductGalleryServer.js
import ProductGallery from './ProductGallery'; // Import the client component

export async function getServerSideProps(context) {
  const apiUrl = context.query.apiUrl; // Use a dynamic API URL
  const res = await fetch(apiUrl);
  const data = await res.json();

  const products = data.products.length > 8 
  ? data.products.slice(0, 8).map(item => ({
      name: item.title,
      price: `$${item.price.toFixed(2)}`,
      image: item.thumbnail,
    }))
  : data.products.map(item => ({
      name: item.title,
      price: `$${item.price.toFixed(2)}`,
      image: item.thumbnail,
    }));

  return {
    props: {
      products,
    },
  };
}

// Export a component that uses getServerSideProps
const ProductGalleryServer = async ({ apiUrl }) => {
  const props = await getServerSideProps({ query: { apiUrl } });
  return <ProductGallery products={props.props.products} />;
};

export default ProductGalleryServer;
