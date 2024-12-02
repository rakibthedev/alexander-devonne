import SingleProduct from "@/app/components/products/SingleProduct";
import { unstable_noStore as noStore } from 'next/cache';

const Page = async ({ params }) => {
  // noStore();

  const responsData = {
    success: false,
    product: null,
    error: null,
  };

  const appDomain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;
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
      <SingleProduct product={responsData.product} />
    </div>
  );
};

export default Page;
