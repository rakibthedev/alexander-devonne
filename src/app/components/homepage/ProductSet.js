import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProductGalleryServer from '../ProductGalleryServer';

export default async function ProductSet() {

  let data = [];

  try {
    // Ensure an absolute URL for server-side fetching
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/product-set/product-set`, {
      next: { revalidate: 60 }, // Add caching/revalidation if needed
    });

    // Check if response is successful
    if (!response.ok) {
      console.error('Failed to fetch product-set:', response.status, response.statusText);
      return <div>Failed to load product sets.</div>;
    }

    // Parse JSON response
    data = await response.json();
  } catch (error) {
    console.error('Error fetching product-set:', error.message);
    return <div>Something went wrong. Please try again later.</div>;
  }

  return (
    <div>
     
    </div>
  );
}
