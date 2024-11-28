import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';
import ProductGalleryServer from '../ProductGalleryServer';
import ProductSetImage from './ProductSetImage';
import ProductSetImageMobile from './ProductSetImageMobile';

export default async function ProductSet() {

  let data = [];

  try {
    // Ensure an absolute URL for server-side fetching
    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/product-set/product-set`);

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
            {item.acf.just_gallery == "no" && 
            <section className="px-3 lg:px-5 mb-12 lg:mb-28">
              <div>
                <Link href={item.acf.category_url}>
                 
                 <ProductSetImage imageId={item.featured_media}/>
                 <ProductSetImageMobile imageId={item.acf.feature_image_mobile}/>

                  {/* <img
                    className="w-full h-auto"
                    src={item.feature_image}
                    width={700}
                    height={540}
                    alt={item.acf.gallery_title}
                  /> */}
                </Link>
                <div className="flex pt-[14px]">
                  <Link className="text-2xl" href={item.acf.category_url}>
                    <span className="font-bookish" dangerouslySetInnerHTML={{__html: `<div>${item.title.rendered}</div>`}} />
                  </Link>
                </div>
                <Link
                  className="product__set__link text-xs uppercase mt-[13px] ml-[2px] pb-[2px] border-b border-black"
                  href={item.acf.category_url}
                >
                  {item.acf.link_1_text}
                </Link>
              </div>
            </section>
            }

          <section className="px-3 lg:px-5 mb-3">
            <div className="flex items-end gap-5">
              <span className="text-[14px] font-me font-ibmPlexMedium uppercase" 
              dangerouslySetInnerHTML={{__html: `<div>${item.acf.gallery_title}</div>`}}
              />
              {item.acf.just_gallery == "no" && <div className="flex items-center gap-2">
                <Link className="underline text-xs whitespace-nowrap" href={item.acf.category_url}>
                  {item.acf.link_2_text}
                </Link>
                <Link className="text-[12px]" href={item.acf.category_url}>
                  <FiArrowRight />
                </Link>
              </div> }
            </div>
          </section>
          <ProductGalleryServer apiUrl={`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/product/category-products?category=${item.acf.product_category}`}/>
        </div>
      ))}
    </div>
  );
}
