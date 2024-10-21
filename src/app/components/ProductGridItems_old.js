import Image from 'next/image';
import Link from 'next/link';
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";

// Utility function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

function slugToWords(slug) {
  return decodeURIComponent(slug)
      .replace(/_/g, '-')
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' ');
}

function createSlug(str) {
  return str
      .toLowerCase()                     // Convert to lowercase
      .trim()                            // Trim whitespace from both ends
      .replace(/[\s]+/g, '-')            // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '')          // Remove all non-word characters (except hyphens)
      .replace(/\-\-+/g, '-')            // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, '');          // Remove leading and trailing hyphens
}

const ProductGridItems = ({ products, productCategory }) => {
  const shuffledProducts = shuffleArray([...products]); // Shuffle products

  return (
    <section className='px-2 lg:px-5 mb-36 relative'>
      <h1 className='capitalize font-bookish text-2xl pb-10 pt-5'>{slugToWords(productCategory)}</h1>
      <div className='flex justify-between mb-8'> 
        <div className='flex items-center gap-[6px]'>
          <div className="flex items-center px-4 py-1 hover:bg-[#897f7b] cursor-pointer bg-[#e1e1e180] rounded">
            <span className='text-xs uppercase'>Filter</span>
          </div>
          <div className="flex items-center gap-[5px] px-4 py-1 cursor-pointer bg-[#e1e1e180] rounded group">
            <span className='text-xs uppercase'>Sort By:</span>
            <button className='text-xs uppercase hover:underline'>Recommended</button>
            <span className='text-xs group-hover:hidden'>
              <IoChevronDownSharp />
            </span>
            <span className='text-xs hidden group-hover:block'>
              <IoChevronUpSharp />
            </span>
          </div>
        </div>
        <div className='flex items-center justify-end'>
          <span className='text-xs'>{`[${shuffledProducts.length}]`}</span>
        </div>
      </div>
      <div className="product__grid grid grid-cols-2 lg:grid-cols-4">
        {shuffledProducts.map((item) => (
          <div className='product__wrapper' key={item.id}>
            <Link href={`${process.env.DOMAIN_ADDRESS}/shopping/${createSlug(item.title)}`}>
              <div>
                <article>
                  <div className='w-full min-h-[339px] flex flex-col justify-center items-center'>
                    <Image
                      className='h-auto'
                      src={item.thumbnail}
                      height={339}
                      width={254}
                      alt={item.title}
                    />
                  </div>
                  <section className='flex flex-col pb-7'>
                    <p className='m-[13px] mb-0 text-[12px] capitalize leading-5'>{item.title}</p>
                    <div>
                      <span className='m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5'>{`$${item.price.toFixed(2)}`}</span>
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
