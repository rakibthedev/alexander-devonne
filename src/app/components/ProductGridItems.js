import Image from 'next/image';
import Link from 'next/link';

function slugToWords(slug) {
  return decodeURIComponent(slug)
      .replace(/_/g, '-')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' ');
}


const ProductGridItems = ({ products, productCategory }) => {
  return (
    <section className='px-2 lg:px-5 mb-36 relative'>
      <h2 className='capitalize'>{slugToWords(productCategory)}</h2>
      <div className="product__grid grid grid-cols-2 lg:grid-cols-4">
        
        {products
          .filter(item => item.status === 'publish')
          .map((item, index) => (
            <div className='product__wrapper' key={item.id}>
              <Link href={`${process.env.DOMAIN_ADDRESS}/shopping/${item.slug}`}>
                <div>
                  <article>
                    <div className='w-full min-h-[339px] flex flex-col justify-center items-center'>
                      <Image
                        className='h-auto'
                        src={item.images[0].src}
                        height={339}
                        width={254}
                        alt={item.name}
                      />
                    </div>
                    <section className='flex flex-col pb-7'>
                      <p className='m-[13px] mb-0 text-[12px] capitalize leading-5'>{item.name}</p>
                      <div>
                        <span className='m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5'>{`$${item.price}`}</span>
                      </div>
                    </section>
                  </article>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};

export default ProductGridItems;
