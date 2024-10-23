import SingleProduct from "@/app/components/products/SingleProduct";
import { CartContext, CartProvider } from "@/context/cartContext";

const Page = async ({ params }) => {
  const responsData = {
    success: false,
    product: null,
    error: null,
  };

  const appDomain = process.env.DOMAIN_ADDRESS;
  const slug = params.product_url; // Extract the slug from params

  try {
    const response = await fetch(`${appDomain}/api/singleProduct?slug=${slug}`); 
    const data = await response.json();

    if (data.success) {
      responsData.success = true;
      responsData.product = data.product;
    } else {
      responsData.error = data.error;
    }
  } catch (error) {
    responsData.error = error.message;
  }

  if (responsData.error) {
    return <div>Error: {responsData.error}</div>;
  }

  return (
    <div>
        <CartProvider>
          <SingleProduct product={responsData.product} />
        </CartProvider>

    </div>
  );
};

export default Page;
