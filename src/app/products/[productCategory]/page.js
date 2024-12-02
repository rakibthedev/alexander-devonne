import ProductGridItems from '@/app/components/ProductGridItems';
import CategoryProductNotFound from '@/app/components/products/CategoryProductNotFound';
import { unstable_noStore as noStore } from 'next/cache';

const Page = async ({ params, searchParams }) => {
  noStore();
  const { orderby='date', order='desc' } = searchParams; // Query params
  const appDomain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;
  
  // Initialize the response data
  let responsData = {
    success: false,
    products: [],
    error: null,
  };

  try {
    
      const response = await fetch(`${appDomain}/api/product/get-products-by-cat?category=${params.productCategory}&orderby=${orderby}&order=${order}`);
      const data = await response.json();

    if (data.success) {
      responsData.success = true;
      responsData.products = data.data.data;
    } else {
      responsData.error = data.error;
    }
  } catch (error) {
    responsData.error = error.message;
  }

  // If there's an error, render the "not found" component
  if (responsData.error) {
    return <CategoryProductNotFound productCategory={params.productCategory} />;
  }

  // Otherwise, render the products grid
  return (
    <div>
      {responsData.products.length > 0 && (
        <ProductGridItems products={responsData.products} productCategory={params.productCategory} />
      )}
    </div>
  );
};

export default Page;
