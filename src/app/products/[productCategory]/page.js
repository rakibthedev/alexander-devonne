import ProductGridItems from '@/app/components/ProductGridItems';
import CategoryProductNotFound from '@/app/components/products/CategoryProductNotFound';
import { unstable_noStore as noStore } from 'next/cache';

const Page = async ({ params, searchParams }) => {
  noStore();
  const { orderby='date', order='desc' } = searchParams; // Query params
  const appDomain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL;
  
  // Initialize the response data
  let responsData = {
    success: false,
    products: [],
    error: null,
  };

  try {
    
      const response = await fetch(`${wpUrl}/wp-json/custom/v1/category-products?category=${params.productCategory}&orderby=${orderby}&order=${order}`);
      const data = await response.json();

    if (response.ok) {
      responsData.success = true;
      responsData.products = data.data;
      responsData.category = data.category_name;
    } else {
      responsData.error = data;
    }
  } catch (error) {
    responsData.error = error.message;
  }

  // If there's an error, render the "not found" component
  if (responsData.error) {
    return <CategoryProductNotFound productCategory={params.productCategory} />
  }

  // Otherwise, render the products grid
  return (
    <div>
      {responsData.products.length > 0 && (
        <ProductGridItems products={responsData.products} productCategory={responsData.category} />
      )}
    </div>
  );
};

export default Page;
