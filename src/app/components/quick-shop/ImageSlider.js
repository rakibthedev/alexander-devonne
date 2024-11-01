import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const ImageSlider = ({ images }) => {
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={3.5} // Show 3 full and half of the 4th image
      grabCursor={true} // Enables grabbing cursor
      touchEventsTarget="container" // Makes it work better with touch events
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} style={{ width: 'calc(100% / 3.5 - 10px)' }}>
          <img src={image.src} alt={`image-${index}`} style={{ width: '100%', height: 'auto' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
