import ProductGridItems from '@/app/components/ProductGridItems_old';
import React from 'react';

const Page = async ({params}) => {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();
  return (
    <div>
      <ProductGridItems products={data.products} productCategory={params.productCategory}/>
    </div>
  );
};

export default Page;
