"use client";
import Image from 'next/image';
import Link from 'next/link';
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import VariationColor from './VariationColor';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { WishContext } from '@/app/context/wishContext';
import { useContext } from 'react';

export default function WishList() {
  return (
    <div>
        <div className={`product__grid grid grid-cols-2 lg:grid-cols-4 ${Object.values(showArrows).some((value) => value) ? 'items-start' : 'items-stretch'}`}>
        {products
          .filter((item) => item.status === "publish")
          .map((item) => {
            const currentImage = currentImages[item.id] || item.images[0]?.src; // Get the current image for the product

            return (
              <div
                className="product__wrapper relative" // Add the group class to manage hover
                key={item.id}
                onMouseEnter={() => handleMouseEnter(item.id, item.images)} // Set the hover image with 400ms delay
                onMouseLeave={() => handleMouseLeave(item.id, item.images)} // Reset the image immediately
              >
                <Link href={`/shopping/${item.slug}`}>
                  <article>
                    <div className="w-full min-h-[435px] flex flex-col justify-center items-center group">
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
                            className="h-auto w-full"
                            src={currentImage} // Use the current image from state
                            height={339}
                            width={254}
                            alt={item.name}
                          />
                        </SwiperSlide>
                        {item.images.slice(2).map((image, idx) => (
                          <SwiperSlide key={idx}>
                            <Image
                              className="h-auto w-full"
                              src={image.src}
                              height={339}
                              width={254}
                              alt={item.name}
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>

                      {/* Custom Navigation Arrows */}
                      {showArrows[item.id] && (
                        <>
                          <div
                            className={`custom-prev-${item.id} absolute top-1/2 left-4 transform -translate-y-1/2 z-10`}
                            onClick={(e) => handleArrowClick(e, item.id, "prev")}
                          >
                            <GoChevronLeft className="text-[28px] text-black" />
                          </div>
                          <div
                            className={`custom-next-${item.id} absolute top-1/2 right-4 transform -translate-y-1/2 z-10`}
                            onClick={(e) => handleArrowClick(e, item.id, "next")}
                          >
                            <GoChevronRight className="text-[28px] text-black" />
                          </div>
                        </>
                      )}
                    </div>

                    <section className={`flex flex-col pb-7 ${showArrows[item.id] ? 'border-[#e8e8e8] border-t border-l' : ''}`}>
                      <p className="m-[13px] mb-0 text-[12px] capitalize leading-5">{item.name}</p>
                      <div>
                        <span className="m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5">{`$${item.price}`}</span>
                      </div>
                      {/* Conditionally render .card__bottom */}
                      <div
                        className={`card__bottom ${showArrows[item.id] ? 'block' : 'hidden'} mt-3`}
                      >
                        <div className="px-3 mt-3">
                          {
                            item.attributes
                              .filter(item => item.slug === 'color')
                              .flatMap(item => item.options)
                              .map((option, index) => (
                                <button key={index} className='color__variation__btn'  onClick={handleColorVariationClick} >
                                  <VariationColor variationColor={option} />
                                </button>
                              ))
                          }
                        </div>
                        <div className="mt-3 px-3">
                          <button onClick={handleQuickAddClick} className="block w-full bg-[#cecece80] text-xs uppercase p-1 rounded text-center hover:bg-[#939393] hover:text-white">
                            Quick Shop
                          </button>
                        </div>
                      </div>
                    </section>
                  </article>
                </Link>

                <div className="absolute top-0 right-0 p-3 z-30">
                  <button className="outline-none group">
                    <IoMdHeartEmpty className="text-[#949494] text-[20px] group-hover:hidden" />
                    <IoIosHeart className="text-[#949494] text-[20px] hidden group-hover:block" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
}
