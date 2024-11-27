import Link from "next/link";

export default function ProductCard ({products, handleSearch}) {
    return (
    <div className="product__grid grid grid-cols-2 lg:grid-cols-5 w-full">
        {products.map((item, index) => (
          <div className='product__wrapper bg-white'  key={index}>
            <Link href={`/shopping/${item.slug}`} onClick={handleSearch}>
              <div className='flex-shrink-0'>
                <article>
                  <div className='h-auto lg:h-auto select-none w-full min-h-[192px] flex flex-col justify-center items-center'>
                    <img className='h-auto w-full' src={item.images[0].src} height={339} width={254} alt={item.name} />
                  </div>
                  <section className='flex flex-col pb-4'>
                    <p className='m-[13px] mb-0 text-[12px] capitalize leading-5'>{item.name}</p>
                    <div>
                      <span className='m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5'>{`$${Intl.NumberFormat('en-US').format(item.price, 0)}`}</span>
                    </div>
                  </section>
                </article>
              </div>
            </Link>
          </div>
        ))}
      </div>
    )
}