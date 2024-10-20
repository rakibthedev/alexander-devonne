// app/ProductGallery.js (or pages/ProductGallery.js)
"use client"; // Mark this as a client component
import React, { useRef, useState, useEffect } from 'react';
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';

const ProductGallery = ({ products }) => {
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
    <section className='pl-2 lg:pl-5 mb-36 relative'>
      {maxScroll > 0 && ( // Only render buttons if there's overflow
        <div className="absolute right-14 top-[-32px] z-10">        
          <div className="flex items-center gap-3">
            <button onClick={scrollToLeft} disabled={scrollPosition === 0}>
              <BsChevronLeft className={`text-[20px] ${scrollPosition === 0 ? 'text-black/40' : 'text-black'} outline-none border-none`} />
            </button>
            <button onClick={scrollToRight} disabled={scrollPosition >= maxScroll}>
              <BsChevronRight className={`text-[20px] ${scrollPosition >= maxScroll ? 'text-black/40' : 'text-black'} outline-none border-none`} />
            </button>
          </div>
        </div>
      )}
      <div className="product__gallery flex overflow-x-hidden" ref={galleryRef}>
        {products.map((item, index) => (
          <div className='product__wrapper'  key={index}>
            <Link href="#">
              <div className='flex-shrink-0'>
                <article>
                  <div className='h-[339px] w-[254px] flex flex-col justify-center items-center'>
                    <Image className='h-auto w-full' src={item.image} height={339} width={254} alt={item.name} />
                  </div>
                  <section className='flex flex-col pb-7'>
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

export default ProductGallery;
