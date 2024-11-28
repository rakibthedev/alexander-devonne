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
      {data.map((item, index) => (
        <div key={index}>
            {item.just_gallery == "no" && 
            <section className="px-3 lg:px-5 mb-12 lg:mb-28">
              <div>
                <Link href={item.category_url}>
                  <div 
                  className="hidden md:block lg:min-h-[650px] md:min-h-[650px] w-full"
                  style={{
                    backgroundImage: `url(${item.feature_image})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center top',
                    backgroundSize: 'auto 100%',
                  }}
                  >
                  </div>
                  <div 
                  className="block min-h-[450px] md:hidden w-full"
                  style={{
                    backgroundImage: `url(${item.feature_image_mobile})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left top',
                    backgroundSize: 'cover',
                  }}
                  >
                  </div>


                  {/* <img
                    className="w-full h-auto"
                    src={item.feature_image}
                    width={700}
                    height={540}
                    alt={item.title}
                  /> */}
                </Link>
                <div className="flex pt-[14px]">
                  <Link className="text-2xl" href={item.category_url}>
                    <span className="font-bookish" dangerouslySetInnerHTML={{__html: `<div>${item.title}</div>`}} />
                  </Link>
                </div>
                <Link
                  className="product__set__link text-xs uppercase mt-[13px] ml-[2px] pb-[2px] border-b border-black"
                  href={item.category_url}
                >
                  {item.link_1_text}
                </Link>
              </div>
            </section>
            }

          <section className="px-3 lg:px-5 mb-3">
            <div className="flex items-end gap-5">
              <span className="text-[14px] font-me font-ibmPlexMedium uppercase" 
              dangerouslySetInnerHTML={{__html: `<div>${item.gallery_title}</div>`}}
              />
              {item.just_gallery == "no" && <div className="flex items-center gap-2">
                <Link className="underline text-xs whitespace-nowrap" href={item.category_url}>
                  {item.link_2_text}
                </Link>
                <Link className="text-[12px]" href={item.category_url}>
                  <FiArrowRight />
                </Link>
              </div> }
            </div>
          </section>
          <ProductGalleryServer apiUrl={`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/product/category-products?category=${item.product_category}`}/>
        </div>
      ))}
    </div>
  );
}
