import ProductGridItems from '@/app/components/ProductGridItems';
import CategoryProductNotFound from '@/app/components/products/CategoryProductNotFound';
import { unstable_noStore as noStore } from 'next/cache';

const Page = async ({ params, searchParams }) => {
  noStore();
  const { orderby, order } = searchParams; // Query params
  const appDomain = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS;
  
  // Initialize the response data
  let responsData = {
    success: false,
    products: [],
    error: null,
  };

  try {
    // Fetch category ID based on the category slug
    const res_id = await fetch(`${appDomain}/api/product/get-category-id?category_slug=${params.productCategory}`);
    const res_data = await res_id.json();
    const category_id = res_data[0]?.id;

    if (!category_id) {
      responsData.error = 'Category ID not found';
      return <CategoryProductNotFound productCategory={params.productCategory} />;
    }

    // Determine the API endpoint based on query parameters
    let response = '';
    let data = '';
    if (orderby && order) {
      response = await fetch(`${appDomain}/api/product/sorted-products?category=${category_id}&orderby=${orderby}&order=${order}`);
      data = await response.json();
    } else {
      response = await fetch(`${appDomain}/api/product/category-products?category=${category_id}`);
      data = await response.json();
    }

    if (data.success) {
      responsData.success = true;
      responsData.products = data.products;
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
