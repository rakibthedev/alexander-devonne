"use client"; // Mark this as a client component
import React, { useRef, useState, useEffect } from 'react';
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css'; // Basic Swiper styles
import { useRouter } from 'next/navigation';

const ProductGalleryDesktop = ({ products }) => {
  const swiperRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const router = useRouter();

  // Function to update the scroll position
  const updateScrollPosition = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      setScrollPosition(swiperInstance.realIndex); // Get current slide index
      setMaxScroll(swiperInstance.slides.length - 1); // Get the total number of slides
    }
  };

  
  useEffect(() => {
    if (swiperRef.current) {
      // Get the height of the current .product__gallery
      const galleryHeight = swiperRef.current.clientHeight;

      // Apply the height to all .product__wrapper elements within this gallery
      const productWrappers = swiperRef.current.querySelectorAll('.product__wrapper');
      productWrappers.forEach((wrapper) => {
        wrapper.style.height = `${galleryHeight}px`;
      });
    }
  }, [swiperRef]);

  // Update on window resize
  useEffect(() => {
    updateScrollPosition();
    window.addEventListener('resize', updateScrollPosition);
    return () => window.removeEventListener('resize', updateScrollPosition);
  }, []);


// Function to calculate the scroll distance based on 100vw
const scrollByViewportWidth = (direction) => {
  if (swiperRef.current) {
    const swiperInstance = swiperRef.current.swiper;
    const viewportWidth = window.innerWidth;
    const currentIndex = swiperInstance.realIndex;

    // Calculate number of slides to scroll based on viewport width
    const slidesPerView = Math.floor(viewportWidth / swiperInstance.slides[0].offsetWidth);

    if (direction === 'right') {
      swiperInstance.slideTo(Math.min(currentIndex + slidesPerView, maxScroll));
    } else if (direction === 'left') {
      swiperInstance.slideTo(Math.max(currentIndex - slidesPerView, 0));
    }
  }
};

// Arrow button scrolling functionality
const scrollToRight = () => scrollByViewportWidth('right');
const scrollToLeft = () => scrollByViewportWidth('left');



  return (
    <section className="pl-3 lg:pl-5 mb-16 lg:mb-36 relative">
      {maxScroll > 0 && ( // Only render buttons if there's overflow
        <div className="absolute right-14 top-[-32px] z-10">
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={scrollToLeft} disabled={scrollPosition === 0}>
              <BsChevronLeft className={`text-[20px] ${scrollPosition === 0 ? 'text-black/40' : 'text-black'} outline-none border-none`} />
            </button>
            <button onClick={scrollToRight} disabled={scrollPosition >= maxScroll || swiperRef.current.swiper.isEnd}>
              <BsChevronRight className={`text-[20px] ${scrollPosition >= maxScroll || swiperRef.current.swiper.isEnd ? 'text-black/40' : 'text-black'} outline-none border-none`} />
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
        freeMode={true} // Enable free mode for dynamic sliding
        touchEventsTarget="container"
        className="product__gallery"
        breakpoints={{
          1500: {
            slidesPerView: 6,
          },
          1200:{
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 3,
          },
          480: {
            slidesPerView: 2.5,
          },
          340: {
            slidesPerView: 2.3,
          },
        }}
        onSlideChange={updateScrollPosition} // Update scroll position on slide change
        style={{ height: '100%' }} // Ensures the swiper container has full height
      >
        {products.map((item, index) => (
          <SwiperSlide key={index} className="product__wrapper">
              <div className="flex flex-col h-full" onClick={()=>router.push('/#')}>
                <article className="flex flex-col justify-between h-full">
                  <div className="h-full min-h-[370px] flex flex-col items-center justify-center">
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
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default ProductGalleryDesktop;