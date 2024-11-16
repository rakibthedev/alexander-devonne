"use client"
import { useState, useEffect } from 'react';
import ProductGalleryMobile from '../components/ProductGalleryMobile';
import ProductGalleryDesktop from '../components/ProductGalleryDesktop';

const ProductGallery = ({ products }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile/desktop detection (client-side)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize on first render

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobile ? (
        <ProductGalleryMobile products={products} />
      ) : (
        <ProductGalleryDesktop products={products} />
      )}
    </div>
  );
};

export default ProductGallery;