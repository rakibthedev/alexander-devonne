import ProductGridItems from '@/app/components/ProductGridItems';
import CategoryProductNotFound from '@/app/components/products/CategoryProductNotFound';
import React from 'react';
import { unstable_noStore as noStore } from 'next/cache';
import ScrollToTop from '@/app/components/ScrollToTop';

const Page = async ({params, searchParams}) => {
  // noStore();
  const { orderby, order } = searchParams; // Query params
  const responsData = {
    success: false,
    products: [],
    error: null,
  };

  const appDomain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;

  try {
    
    const res_id = await fetch(`${appDomain}/api/product/get-category-id?category_slug=${params.productCategory}`, {
      next: {
        revalidate: 300,
      }
    }); 
    const res_data = await res_id.json();
    const category_id = await res_data[0].id;
    
    let response = '';
    
    if(Object.keys(searchParams).length > 0 && orderby && order){
      response = await fetch(`${appDomain}/api/product/sorted-products?category=${category_id}&orderby=${orderby}&order=${order}`, {
        next: {
          revalidate: 300,
        }
      }); 
    }else{
      response = await fetch(`${appDomain}/api/product/category-products?category=${category_id}`, {
        next: {
          revalidate: 300,
        }
      }); 
    }

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
    return (
      <div>
        <CategoryProductNotFound productCategory={params.productCategory} />
      </div>
    )
  }
  
  return (
    <div>
      <ScrollToTop />
      {responsData.products && <ProductGridItems products={responsData.products} productCategory={params.productCategory}/>}
    </div>
  );
};

export default Page;
