"use client"; // Mark this as a client component
import React, { useRef, useState, useEffect } from 'react';
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css'; // Basic Swiper styles

const ProductGallery = ({ products }) => {
  const swiperRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  // Function to update the scroll position
  const updateScrollPosition = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      setScrollPosition(swiperInstance.realIndex); // Get current slide index
      setMaxScroll(swiperInstance.slides.length - 1); // Get the total number of slides
    }
  };

  // Update on window resize
  useEffect(() => {
    updateScrollPosition();
    window.addEventListener('resize', updateScrollPosition);
    return () => window.removeEventListener('resize', updateScrollPosition);
  }, []);

  // Arrow button scrolling functionality
  const scrollToRight = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slideTo(Math.min(scrollPosition + 1, maxScroll)); // Move one slide forward
    }
  };

  const scrollToLeft = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.slideTo(Math.max(scrollPosition - 1, 0)); // Move one slide backward
    }
  };

  return (
    <section className="pl-3 lg:pl-5 mb-16 lg:mb-36 relative">
      {maxScroll > 0 && ( // Only render buttons if there's overflow
        <div className="absolute right-14 top-[-32px] z-10">
          <div className="lg:flex items-center gap-3 hidden">
            <button onClick={scrollToLeft} disabled={scrollPosition === 0}>
              <BsChevronLeft className={`text-[20px] ${scrollPosition === 0 ? 'text-black/40' : 'text-black'} outline-none border-none`} />
            </button>
            <button onClick={scrollToRight} disabled={scrollPosition >= maxScroll}>
              <BsChevronRight className={`text-[20px] ${scrollPosition >= maxScroll ? 'text-black/40' : 'text-black'} outline-none border-none`} />
            </button>
          </div>
        </div>
      )}

      {/* Swiper Gallery */}
      <Swiper
        ref={swiperRef}
        spaceBetween={0} // No space between slides
        slidesPerView={"auto"} // Auto-width for each slide based on content
        grabCursor={true} // Enable the grab cursor on drag
        loop={false} // Disable infinite loop
        centeredSlides={false} // Disable centering of slides
        className="product__gallery"
        breakpoints={{
          1024: {
            slidesPerView: 5,
            spaceBetween: 0, // No space between slides
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0, // No space between slides
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 0, // No space between slides
          },
        }}
        onSlideChange={updateScrollPosition} // Update scroll position on slide change
      >
        {products.map((item, index) => (
          <SwiperSlide key={index} className="product__wrapper">
            <Link href="#">
              <div className="flex-shrink-0 flex flex-col h-full">
                <article className="flex flex-col justify-between h-full">
                  <div className="h-auto lg:h-[339px] w-[202px] lg:w-[254px] flex flex-col justify-center items-center">
                    <Image className="h-auto w-full" src={item.image} height={339} width={254} alt={item.name} />
                  </div>
                  <section className="flex flex-col pb-7">
                    <p className="m-[13px] mb-0 text-[12px] capitalize leading-5">{item.name}</p>
                    <div>
                      <span className="m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5">{item.price}</span>
                    </div>
                  </section>
                </article>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductGallery;
