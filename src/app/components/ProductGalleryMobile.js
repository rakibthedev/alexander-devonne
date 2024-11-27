// app/ProductGallery.js (or pages/ProductGallery.js)
"use client"; // Mark this as a client component
import React, { useRef, useState, useEffect } from 'react';
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';

const ProductGalleryMobile = ({ products }) => {
  const galleryRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const updateScrollPosition = () => {
    if (galleryRef.current) {
      setScrollPosition(galleryRef.current.scrollLeft);
      setMaxScroll(galleryRef.current.scrollWidth - galleryRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateScrollPosition();
    window.addEventListener('resize', updateScrollPosition);
    return () => window.removeEventListener('resize', updateScrollPosition);
  }, []);

  const scrollToRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: galleryRef.current.clientWidth,
        behavior: 'smooth',
      });
      setScrollPosition((prev) => Math.min(prev + galleryRef.current.clientWidth, maxScroll));
    }
  };

  const scrollToLeft = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: -galleryRef.current.clientWidth,
        behavior: 'smooth',
      });
      setScrollPosition((prev) => Math.max(prev - galleryRef.current.clientWidth, 0));
    }
  };

  return (
    <section className='pl-3 lg:pl-5 mb-16 lg:mb-36 relative'>
      {maxScroll > 0 && ( // Only render buttons if there's overflow
        <div className="absolute right-2 lg:right-14 top-[-32px] z-10">        
          <div className="hidden lg:flex items-center gap-3">
            <button onClick={scrollToLeft} disabled={scrollPosition === 0}>
              <BsChevronLeft className={`lg:text-[20px] text-[16px] ${scrollPosition === 0 ? 'text-black/40' : 'text-black'} outline-none border-none`} />
            </button>
            <button onClick={scrollToRight} disabled={scrollPosition >= maxScroll}>
              <BsChevronRight className={`lg:text-[20px] text-[16px] ${scrollPosition >= maxScroll ? 'text-black/40' : 'text-black'} outline-none border-none`} />
            </button>
          </div>
        </div>
      )}
      <div className="product__gallery flex overflow-x-auto w-full" ref={galleryRef}>
        {products.map((item, index) => (
          <div className='product__wrapper'  key={index}>
            <Link href={`/shopping/${item.slug}`}>
              <div className='flex-shrink-0'>
                <article>
                  <div className='h-auto lg:h-[339px] w-[144px] min-h-[192px] md:w-[254px] lg:w-[254px] flex flex-col justify-center items-center'>
                    <Image className='h-auto w-full' src={item.image} height={339} width={254} alt={item.name} />
                  </div>
                  <section className='flex flex-col pb-4'>
                    <p className='m-[13px] mb-0 text-[12px] capitalize leading-5'>{item.name}</p>
                    <div>
                      <span className='m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5'>{item.price}</span>
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

export default ProductGalleryMobile;
