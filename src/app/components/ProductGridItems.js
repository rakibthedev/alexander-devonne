"use client"
import Image from 'next/image';
import Link from 'next/link';
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

function slugToWords(slug) {
  return decodeURIComponent(slug)
    .replace(/_/g, '-')
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

const ProductGridItems = ({ products, productCategory }) => {
  const [currentImages, setCurrentImages] = useState({}); // State to manage current images for each product
  const swiperRefs = useRef({}); // To store Swiper instances

  const handleHover = (id, images) => {
    setCurrentImages(prev => ({
      ...prev,
      [id]: images[1]?.src || images[0]?.src, // Show second image on hover or first image if second doesn't exist
    }));
  };

  const handleMouseLeave = (id, images) => {
    setCurrentImages(prev => ({
      ...prev,
      [id]: images[0]?.src, // Reset to the first image
    }));

    if (swiperRefs.current[id]) {
      // Disable loop temporarily to reset to the first slide
      swiperRefs.current[id].loopDestroy();
      swiperRefs.current[id].slideTo(0, 0, false); // Directly jump to the first slide
      // Re-enable loop after resetting
      swiperRefs.current[id].loopCreate();
    }
  };

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
          <span className='text-xs'>{`[${products.length}]`}</span>
        </div>
      </div>
      <div className="product__grid grid grid-cols-2 lg:grid-cols-4">
        {products
          .filter(item => item.status === 'publish')
          .map((item) => {
            const currentImage = currentImages[item.id] || item.images[0]?.src; // Get the current image for the product

            return (
              <div
                className='product__wrapper relative' // Add the group class to manage hover
                key={item.id}
                onMouseEnter={() => handleHover(item.id, item.images)} // Set the hover image
                onMouseLeave={() => handleMouseLeave(item.id, item.images)} // Reset the image
              >
                <Link href={`/shopping/${item.slug}`}>
                  <article>
                    <div className='w-full min-h-[339px] flex flex-col justify-center items-center group'>
                      <Swiper
                        modules={[Navigation]}
                        navigation={{
                          nextEl: `.custom-next-${item.id}`,
                          prevEl: `.custom-prev-${item.id}`,
                        }}
                        loop={true} // Keep the loop enabled here
                        spaceBetween={10}
                        slidesPerView={1}
                        className="w-full h-full"
                        onSwiper={(swiper) => {
                          swiperRefs.current[item.id] = swiper; // Store swiper instance for each product
                        }}
                      >
                        <SwiperSlide>
                          <Image
                            className='h-auto w-full'
                            src={currentImage} // Use the current image from state
                            height={339}
                            width={254}
                            alt={item.name}
                          />
                        </SwiperSlide>
                        {item.images.slice(2).map((image, idx) => (
                          <SwiperSlide key={idx}>
                            <Image
                              className='h-auto w-full'
                              src={image.src}
                              height={339}
                              width={254}
                              alt={item.name}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* Custom Navigation Arrows */}
                      <div className={`custom-prev-${item.id} absolute opacity-0 group-hover:opacity-100 top-1/2 left-4 transform -translate-y-1/2 z-10`}>
                        <GoChevronLeft className='text-[28px] text-black' />
                      </div>
                      <div className={`custom-next-${item.id} absolute opacity-0 group-hover:opacity-100 top-1/2 right-4 transform -translate-y-1/2 z-10`}>
                        <GoChevronRight className='text-[28px] text-black' />
                      </div>
                    </div>
                    <section className='flex flex-col pb-7'>
                      <p className='m-[13px] mb-0 text-[12px] capitalize leading-5'>{item.name}</p>
                      <div>
                        <span className='m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5'>{`$${item.price}`}</span>
                      </div>
                    </section>
                  </article>
                </Link>
                <div className="absolute top-0 right-0 p-3 z-30">
                  <button className='outline-none group'>
                    <IoMdHeartEmpty className='text-[#949494] text-[20px] group-hover:hidden'/>
                    <IoIosHeart className='text-[#949494] text-[20px] hidden group-hover:block'/>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default ProductGridItems;
