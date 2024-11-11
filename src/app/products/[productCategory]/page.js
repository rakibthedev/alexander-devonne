import ProductGridItems from '@/app/components/ProductGridItems';
import React from 'react';

const Page = async ({params}) => {
  const responsData = {
    success: false,
    products: [],
    error: null,
  };
const appDomain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS
  try {
    const response = await fetch(`${appDomain}/api/products`); 
    const data = await response.json();

    if (data.success) {
      responsData.success = true;
      responsData.products = data.products;
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
      {responsData.products && <ProductGridItems products={responsData.products} productCategory={params.productCategory}/>}
    </div>
  );
};

export default Page;
