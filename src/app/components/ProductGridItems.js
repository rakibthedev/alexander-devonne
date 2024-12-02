"use client";
import Image from 'next/image';
import Link from 'next/link';
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5";
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useState, useRef, useContext, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import VariationColor from './VariationColor';
import { WishContext } from '@/app/context/wishContext';
import { IoMdClose } from "react-icons/io";
import { CartContext } from '../context/cartContext';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
// import Swiper core and required modules
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';

import WishPopup from './wishlist-popup/WishlistPopup';
import ImageSlider from './quick-shop/ImageSlider';
import { slugToWords } from './methods/SlugToWords';
import useIsMobile from '../constants/detectMobile';

const ProductGridItems = ({ products, productCategory }) => {
  const router = useRouter();
  
  const [currentImages, setCurrentImages] = useState({}); // State to manage current images for each product
  const swiperRefs = useRef({}); // To store Swiper instances
  const [showArrows, setShowArrows] = useState({}); // To manage arrow visibility for each product
  const [hoverTimeouts, setHoverTimeouts] = useState({}); // Track the timeout for each product
  const [quickShop, setQuickShop] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [loading, setLoading] = useState(false);
  const [sortby, setSortby] = useState('recommended');

  const selectSizeError = useRef(null);

  const isMobile = useIsMobile();
  const handleMouseEnter = (id, images) => {
    const timeoutId = setTimeout(() => {
      // Show the second image after 400ms
      setCurrentImages((prev) => ({
        ...prev,
        [id]: images[1]?.src || images[0]?.src, // Show second image or fallback to first
      }));
      setShowArrows((prev) => ({
        ...prev,
        [id]: true, // Show arrows after delay
      }));
    }, 400); // Set the 400ms delay

    // Store the timeout ID to potentially clear it later
    setHoverTimeouts((prev) => ({
      ...prev,
      [id]: timeoutId,
    }));
  };

  const handleMouseLeave = (id, images) => {
    // Clear the timeout to prevent image change if mouse leaves before 400ms
    clearTimeout(hoverTimeouts[id]);

    // Reset the current image to the first image immediately
    setCurrentImages((prev) => ({
      ...prev,
      [id]: images[0]?.src, // Reset to the first image
    }));
    setShowArrows((prev) => ({
      ...prev,
      [id]: false, // Hide arrows when mouse leaves
    }));

    if (swiperRefs.current[id]) {
      // Temporarily disable loop to reset to the first slide
      swiperRefs.current[id].loopDestroy();
      swiperRefs.current[id].slideTo(0, 0, false); // Directly jump to the first slide
      // Re-enable loop after resetting
      swiperRefs.current[id].loopCreate();
    }
  };

  const handleArrowClick = (e, id, direction) => {
    // Prevent default link behavior (navigation) when clicking on arrows
    e.preventDefault();

    if (swiperRefs.current[id]) {
      if (direction === "next") {
        swiperRefs.current[id].slideNext(); // Go to next slide
      } else if (direction === "prev") {
        swiperRefs.current[id].slidePrev(); // Go to previous slide
      }
    }
  };

  const handleColorVariationClick = (e) => {
    e.preventDefault(); // Prevent Link click behavior
    e.stopPropagation(); // Prevent other event handlers
    // Add your color variation selection logic here
  };

  // Wishlist funcitionalities 
  const [loadingAddWish, setLoadingAddWish] = useState({});
  const {wishItem, setWishItem, lastWishItem, setLastWishItem} = useContext(WishContext);

    // Reset lastWishItem when the component mounts
    useEffect(() => {
      setLastWishItem([]); // Clear all items from lastWishItem
  }, []);

  const handleAddToWishlist = (product) =>{
   const selectedColor = product.attributes
  .filter(item => item.slug === 'color')
  .flatMap(item => item.options)[0];
   const allSize = product.attributes
  .filter(item => item.slug === 'size')
  .flatMap(item => item.options);
    const productItem = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      image: product.images[0].src,
      price: product.price,
      quantity: 1,
      color: selectedColor,
      size: null,
      allSize: allSize
    }
    setLoadingAddWish((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      setWishItem((prevItems) => [...prevItems, productItem]);
      setLoadingAddWish((prev) => ({ ...prev, [product.id]: false }));

      setLastWishItem((prev) => [...prev, productItem]);
      
      setTimeout(()=>{
        setLastWishItem((prevItems) => prevItems.filter(item => item.id !== product.id));
      }, 20000);
    
    }, 1000);
  }

  const handleRemoveWishItem = (productId) =>{
    setLoadingAddWish((prev) => ({ ...prev, [productId]: true }));
    
    setTimeout(() => {
      setWishItem((prevItems) => prevItems.filter(item => item.id !== productId));
      setLastWishItem((prevItems) => prevItems.filter(item => item.id !== productId));
      setLoadingAddWish((prev) => ({ ...prev, [productId]: false }));
    }, 1000);
  }
  // Quick Shop 
  function removeHtmlTags(str) {
    return str.replace(/<[^>]*>/g, ''); // Removes everything between < and >
  }

  const handleQuickAddClick = (item) => {
    //quick add logic
    setQuickShop([item]);
    setTimeout(()=>{
      selectSizeError.current.innerHTML = "1. Confirm your size (IT) selection";
      setSelectedSize(null);
    },100)
  };
  const handleQuickShopClose = () =>{
    setQuickShop([]);
  }
  const handleSizeClick = (size) => {
    setSelectedSize(size); // Set the selected size
    selectSizeError.current.innerHTML = "1. Confirm your size (IT) selection";
  };
  // Cart context state 
  const {cartItem, setCartItem, setPopupShow} = useContext(CartContext)
  
  const handleAddToBagQuicKShop = (product) =>{
    const firstColor = product.attributes
    .filter(item => item.slug === 'color')
    .flatMap(item => item.options)[0];

    const allSize = product.attributes
        .filter(item => item.slug === 'size')
        .flatMap(item => item.options);

    const cartItemObj = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0].src,
        price: product.price,
        quantity: 1,
        color: firstColor,
        size: selectedSize,
        allSize: allSize
    }
    if(selectedSize === null){
      selectSizeError.current.innerHTML = "<span style='color: red'>Please Select Your size first</span>"
    }else{
      setLoading(true);
      setTimeout(()=>{
        setCartItem((prevItems) => [...prevItems, cartItemObj])
        setPopupShow(true);
        setLoading(false);
        setSelectedSize(null);
      }, 1500);
    }
  }
  // Dragg Quick Shop 
  const [position, setPosition] = useState({ top: 100, left: 0 }); // Default left to 0
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // This will run only on the client side
    setPosition({ top: 100, left: window.innerWidth - 370 });
  }, []);

  useEffect(() => {
      // Clean up event listeners on unmount
      const handleMouseMove = (e) => {
          if (isDragging) {
              setPosition({
                  left: e.clientX - offset.x,
                  top: e.clientY - offset.y,
              });
          }
      };

      const handleMouseUp = () => {
          setIsDragging(false);
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };

      if (isDragging) {
          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
      }

      return () => {
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
      };
  }, [isDragging, offset]);

  const handleMouseDown = (e) => {
      setIsDragging(true);
      setOffset({
          x: e.clientX - position.left,
          y: e.clientY - position.top,
      });
  };
  
  const searchParams = useSearchParams();

  const orderby = searchParams.get('orderby');
  const order = searchParams.get('order');

  useEffect(() => {
        
    // Setting recommended sort
    if (orderby === 'popularity' && order === 'desc') {
      setSortby('recommended');
    }
    // Setting newest sort
    if (orderby === 'date' && order === 'desc') {
      setSortby('newest');
    }
    // Setting Price High to low sort
    if (orderby === 'price' && order === 'desc') {
      setSortby('Price High to low');
    }
    // Setting Price low to high sort
    if (orderby === 'price' && order === 'asc') {
      setSortby('Price low to high');
    }
  }, [orderby, order]);  // Trigger the effect whenever orderby or order changes


  return (
    <div>
      <div className='fixed top-[100px] right-4 z-[9999] flex flex-col gap-5'>
        {
          lastWishItem.length > 0 &&(
            lastWishItem.map((item, index)=> {
                return (
                  <WishPopup key={index} wishProduct={item} />
                )
              })              
          )
        }
        </div>
        {/* QuickShop UI  */}
        <div className='hidden lg:block'>
        {quickShop.length > 0 && (
            quickShop.map((qs_item, index) =>{
                return (
                  <div
                    key={index}
                    className="select-none cursor-move py-4 pl-4 pr-4 fixed bg-[#e1e1e180] z-[9999] rounded w-[350px] overflow-hidden"
                    style={{
                        height: "calc(100vh - 130px)",
                        backdropFilter: "blur(3rem)",
                        top: `${position.top}px`,
                        left: `${position.left}px`,
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <div className="flex justify-between mb-8">
                      <p className="text-xs uppercase">Quick Shop</p>
                      <button onClick={handleQuickShopClose} className='outline-none text-[22px]'>
                          <IoMdClose />
                      </button>
                    </div>
                    <div>
                      <p className="text-[22px] leading-6 font-bookish capitalize">
                        {qs_item.name}
                      </p>
                      <p className="text-[22px] leading-6 font-bookish capitalize">                        
                        {`$${Intl.NumberFormat('en-US').format(qs_item.price, 0)}`}
                      </p>
                      <div className='overflow-y-auto pb-3' style={{height: "calc(100vh - 252px)"}}>
                        <p className="mt-2 text-xs">
                          {removeHtmlTags(qs_item.description)}
                        </p>
                        <div className='mt-6'>
                          <ImageSlider images={qs_item.images}/>
                        </div>
                        <div>
                          <p className='mt-5 mb-2 text-xs uppercase' ref={selectSizeError}>1. Confirm your size (IT) selection</p>
                          <div className="flex items-center gap-[6px] flex-wrap">
                              {
                                  qs_item.attributes
                                  .filter(item => item.slug === 'size')
                                  .flatMap(item => item.options)
                                  .map((option, index) => (
                                      <button 
                                          className={`text-xs hover:text-white ${selectedSize === option ? 'bg-[#333] text-white hover:bg-[#333]' : 'bg-[#cecece80] text-black hover:bg-[#897f7b]'} py-3 px-2 rounded outline-none ${loading ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}`} 
                                          key={index}
                                          onClick={() => handleSizeClick(option)}     
                                          disabled={loading}                               
                                      >
                                          {option}
                                      </button>
                                  ))                   
                              }
                          </div>
                        </div>
                        <div>
                          <p className='mt-5 mb-4 text-xs uppercase'>2. Confirm your action</p>
                          {cartItem.some(checkItem => 
                            checkItem.id === qs_item.id &&                        
                            checkItem.size === selectedSize) ? (
                              <Link 
                              href="/bag"
                              className="inline-block hover:bg-[#897f7b] min-w-[94px] min-h-[34px] rounded bg-black py-[7px] px-[14px] text-xs text-white uppercase"
                              >
                                In Your Bag
                              </Link>
                          ):(
                          <button 
                          className="min-w-[94px] hover:bg-[#897f7b] rounded disabled:cursor-not-allowed bg-black py-[7px] px-[14px] text-xs text-white uppercase"
                          disabled={loading}
                          onClick={()=>handleAddToBagQuicKShop(qs_item)}
                          >
                            {loading ? (
                              <span className='loading text-xs'>/</span>
                            ):(
                                `Add to bag`
                            )}
                          </button>
                        )}
                        </div>
                        <div className="mt-6">
                          <Link className="text-xs hover:underline capitalize" href={`/shopping/${qs_item.slug}`}> More Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            })
          
        )}
      </div>
      {/* Main Content Start  */}
      <section className="px-3 lg:px-5 mb-36 relative slide__up">
        <h1 className="capitalize font-bookish  text-[20px] lg:text-2xl pb-5 lg:pb-7 pt-2">{slugToWords(productCategory)}</h1>
        <div className="flex justify-between items-start mb-2 sticky top-[54px] lg:top-[112px] left-0 py-4 z-[99] bg-white">
          <div className="flex gap-[6px]">
            {/* <div className="flex items-center px-4 py-1 hover:bg-[#897f7b] cursor-pointer bg-[#e1e1e180] rounded">
              <span className="text-xs uppercase">Filter</span>
            </div> */}
            <div className='relative'>
              <div className="absolute min-w-[174px] top-0 left-0 hover:min-w-[200px] px-3 py-1 cursor-pointer bg-[#e1e1e1] rounded group">
                <div className='flex items-center gap-[6px]  whitespace-nowrap'>
                  <span className="text-xs uppercase w-[55px] whitespace-nowrap">Sort By:</span>
                  <button className="text-xs uppercase hover:underline">{sortby}</button>
                  <div>
                    <span className="text-xs group-hover:hidden">
                      <IoChevronDownSharp />
                    </span>
                    <span className="text-xs hidden group-hover:block">
                      <IoChevronUpSharp />
                    </span>
                  </div>
                </div>
                <div className="gap-[6px] hidden group-hover:flex">
                  <div className="w-[55px]"></div>
                  <div className="flex flex-col items-start">                
                    {sortby !== 'recommended' && <button
                     className="text-xs uppercase hover:underline"
                     onClick={()=>{
                       router.push(`/products/sort?productCategory=${productCategory}&orderby=popularity&order=desc`);
                     }
                    }
                     >
                      Recommended
                      </button>}
                    
                    {sortby !== 'newest' && <button
                     className="text-xs uppercase hover:underline"
                     onClick={()=>{
                      router.push(`/products/sort?productCategory=${productCategory}&orderby=date&order=desc`);
                    }}
                     >
                      Newest
                      </button>}
                    
                    {sortby !== 'Price High to low' && <button
                     className="text-xs uppercase hover:underline"
                     onClick={()=>{
                      router.push(`/products/sort?productCategory=${productCategory}&orderby=price&order=desc`);
                    }}
                     >
                      Price High to low
                      </button>}
                    
                    {sortby !== 'Price low to high' && <button
                     className="text-xs uppercase hover:underline"
                     onClick={()=>{
                      router.push(`/products/sort?productCategory=${productCategory}&orderby=price&order=asc`);
                    }}
                     >
                      Price low to high
                      </button>}
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-xs">{`[${products.length}]`}</span>
          </div>
        </div>        
        <div className={`pt-10 product__grid grid grid-cols-2 lg:grid-cols-4 items-stretch ${Object.values(showArrows).some((value) => value) ? 'lg:items-start' : 'lg:items-stretch'}`}>
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
                    <article>
                      <Link href={`/shopping/${item.slug}`}>
                      <div className="w-full h-[220px] lg:min-h-[435px] flex flex-col justify-center items-center select-none group">
                        <Swiper
                          modules={[Navigation, Pagination]}
                          navigation={{
                            nextEl: `.custom-next-${item.id}`,
                            prevEl: `.custom-prev-${item.id}`,
                          }}
                          pagination={
                            isMobile
                              ? {
                                  nextEl: `.custom-next-${item.id}`,
                                  prevEl: `.custom-prev-${item.id}`,
                                }
                              : false
                          }
                          loop={true} // Keep the loop enabled here
                          spaceBetween={10}
                          slidesPerView={1}
                          className="w-full h-full"
                          onSwiper={(swiper) => {
                            swiperRefs.current[item.id] = swiper; // Store swiper instance for each product
                          }}
                        >
                          <SwiperSlide>
                            <img
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
                          <div className='hidden lg:block'>
                            <div
                              className={`custom-prev-${item.id} absolute  left-4 transform z-10`}
                              style={{top: 'calc(50% - 100px)'}}
                              onClick={(e) => handleArrowClick(e, item.id, "prev")}
                            >
                              <GoChevronLeft className="text-[28px] text-black" />
                            </div>
                            <div
                              className={`custom-next-${item.id} absolute top-1/2 right-4 transform z-10`}
                              style={{top: 'calc(50% - 100px)'}}
                              onClick={(e) => handleArrowClick(e, item.id, "next")}
                            >
                              <GoChevronRight className="text-[28px] text-black" />
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                    
                      <section className={`flex flex-col pb-3 lg:pb-5 border-t border-[#e8e8e8] ${showArrows[item.id] ? 'lg:border-[#e8e8e8] lg:border-solid ' : 'lg:border-none'}`}>
                        <p className="m-[13px] mb-0 text-[11px] capitalize leading-4">{item.name}</p>
                        <div>
                          <span className="m-[13px] mb-0 mt-[2px] text-[12px] capitalize leading-5">                            
                            {`$${Intl.NumberFormat('en-US').format(item.price, 0)}`}
                            </span>
                        </div>
                        {/* Conditionally render .card__bottom */}
                        <div className="relative">
                          <div
                            className={`absolute top-0 left-0 w-full z-[999] bg-white card__bottom hidden ${showArrows[item.id] ? 'lg:block border-b border-[#e8e8e8] pb-3' : 'hidden'} mt-3`}
                          >
                            <div className="px-3 mt-3 flex gap-1">
                              {
                                item.attributes
                                  .filter(item => item.slug === 'color')
                                  .flatMap(item => item.options)
                                  .map((option, index) => (
                                    <button key={index} className={`color__variation__btn ${index === 0 ? 'active' : ''}`}  onClick={handleColorVariationClick} >
                                      <VariationColor variationColor={option} />
                                    </button>
                                  ))
                              }
                            </div>
                            <div className="mt-3 px-3">
                              <button onClick={()=>handleQuickAddClick(item)} className="block w-full select-none bg-[#cecece80] text-xs uppercase p-1 rounded text-center hover:bg-[#939393] hover:text-white">
                                Quick Shop                              
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
                    </article>
                  <div 
                  className="absolute top-0 right-0 p-3 z-30 flex justify-center items-center w-[45px] h-[45px]"                
                  > 
                  {wishItem.some(w_item => w_item.id == item.id) ? (
                    <button 
                    className="outline-none group"
                    onClick={()=> handleRemoveWishItem(item.id)}
                    >
                      {loadingAddWish[item.id] ? (
                        <span className="loading text-xs">/</span>
                      ):(
                      <div>
                        <IoIosHeart className="text-[#949494] text-[20px]" />
                      </div>  
                      )}                  
                    </button>
                  ):(
                    <button 
                    className="outline-none group"
                    onClick={()=> handleAddToWishlist(item)}
                    >
                      {loadingAddWish[item.id] ? (
                        <span className="loading text-xs">/</span>
                      ):(
                        <div>
                          <IoMdHeartEmpty className="text-[#949494] text-[20px] group-hover:hidden" />
                          <IoIosHeart className="text-[#949494] text-[20px] hidden group-hover:block" />
                        </div>
                      )}
                    </button>
                  )}                 
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
};

export default ProductGridItems;
