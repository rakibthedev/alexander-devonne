"use client";
import React, {useContext, useState, useRef, useEffect } from 'react';
import { IoArrowDownSharp } from "react-icons/io5";
import VariationColor from '../VariationColor';
import { CartContext } from '@/app/context/cartContext';
import { WishContext } from '@/app/context/wishContext';
import { useRouter } from 'next/navigation';
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import WishPopup from '../wishlist-popup/WishlistPopup';
import { HiOutlinePlus } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";

function removeHtmlTags(str) {
    return str.replace(/<[^>]*>/g, ''); // Removes everything between < and >
}

function formatStringWithLineBreaks(inputString) {
    return inputString.replace(/\r\n/g, '<br>');
}


export default function SingleProduct({ product }) {
  const [activeTab, setActiveTab] = useState('materials'); // Default active tab
  const [selectedColor, setSelectedColor] = useState(null); // State for selected color
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [isExpanded, setIsExpanded] = useState(false); // State for read more/less
  const detailsRef = useRef(null); // Create a ref for the details section
  const [itemInCart, setItemInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const router = useRouter();
  const isSizeSelectRef = useRef(null);
  const addBagRef = useRef(null);
  //Modal 
  const [modalImage, setModalImage] = useState(''); // State for the image that should be displayed in the modal
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [imageNumber, setImageNumber] = useState(null); // State for the image that should be displayed in the modal
  const [isPopupClose, setIsPopupClose] = useState(false);
  const modalRef = useRef(null);
  //Image Zoom 
  const [isZoom, setIsZoom] = useState(false);
  const imgContainerRef = useRef(null);
  
  const handleZoomImage = (index, imageSrc) => {           
    if(isZoom){
        setIsZoom(false);   
    }else{
        setIsZoom(true);
        setModalImage(imageSrc);
        setImageNumber(`${index + 1}`);
        setIsModalOpen(true);        
             
        const id = `image-${index}`;
        const childElement = document.getElementById(id);

        setTimeout(()=>{
            if (childElement && imgContainerRef.current) {                
                imgContainerRef.current.scrollTop = childElement.offsetTop; // Scroll within the container
            }
        }, 600)
    }
  }
// Image zoom popup hide     
useEffect(()=>{
    if(isModalOpen){
        // modalRef.current.focus();
        setTimeout(()=>{
            setIsModalOpen(false);
            imgContainerRef.current.focus();   
        },2000);
    }
},[isModalOpen]);
   

const closeModal = () => {
    setIsPopupClose(true);
    setIsZoom(false);
    setTimeout(()=>{
        setIsModalOpen(false);
        setIsPopupClose(false);
    },500)
}; 


  const materials = product.meta_data
    .filter(item => item.key === 'meterials')
    .map(item => item.value)[0] || ''; // Default to empty string if undefined

  const fitting = product.meta_data
    .filter(item => item.key === '_fitting')
    .map(item => item.value)[0] || ''; // Default to empty string if undefined

  const handleToggle = (tab) => {
    setActiveTab(tab);
  };

  const scrollToDetails = () => {
    const yOffset = -110; // Change this value to adjust the gap
    const y = detailsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleColorClick = (color) => {
    setSelectedColor(color); // Set the selected size
  };
  const handleSizeClick = (size) => {
    setSelectedSize(size); // Set the selected size
    isSizeSelectRef.current.innerHTML = 'Sizes (US):';
    isSizeSelectRef.current.style.color = '#000';
  };


  const descriptionText = removeHtmlTags(product.description);
  const truncatedDescription = descriptionText.length > 100 ? `${descriptionText.slice(0, 100)}...` : descriptionText;


    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
      };

    useEffect(() => {
        const firstColor = product.attributes
            .filter(item => item.slug === 'color')
            .flatMap(item => item.options)[0]; // Make sure to get the first option properly
        
        if (firstColor) {
            setSelectedColor(firstColor);
        }
    }, [product]); 
    
    // Add to cart 
    const {cartItem, setCartItem, setPopupShow} = useContext(CartContext);

    const allSize = product.attributes
        .filter(item => item.slug === 'size')
        .flatMap(item => item.options);

    const productCartItem = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0].src,
        price: product.price,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
        allSize: allSize
    }

    const handleAddToCart = () => {
        const itemExists = cartItem.some(item => item.id === product.id && item.size === selectedSize && item.color === selectedColor);

        if (!itemExists) {
            if (selectedSize && selectedColor) {
                setLoading(true); // Start loading
                addBagRef.current.innerHTML = `<span class='loading'>/</span>`;
                
                setTimeout(() => {
                    setCartItem(prevItems => [...prevItems, productCartItem]);
                    setLoading(false); // Stop loading
                    setPopupShow(true);
                }, 2000);
            } else {
                if (!selectedSize) {
                    isSizeSelectRef.current.innerHTML = 'Please select your size first';
                    isSizeSelectRef.current.style.color = '#f21515';
                }
            }
        }else{
            router.push('/bag');
        }
    }

    useEffect(() => {
        // Check if the item exists whenever selectedSize or cartItem changes
        const itemExists = cartItem.some(item => item.id == product.id &&  item.size == selectedSize && item.color == selectedColor);
        setItemInCart(itemExists);
    }, [selectedSize, cartItem, product.id, selectedColor]);

    // Wish List
    const wishState = useContext(WishContext);
    const { wishItem, setWishItem, lastWishItem, setLastWishItem } = wishState;

    // Reset lastWishItem when the component mounts
    useEffect(() => {
        setLastWishItem([]); // Clear all items from lastWishItem
    }, []);

    const itemInWishlist = wishItem.some(item => 
        item.id === product.id 
        // && 
        // item.size === selectedSize && 
        // item.color === selectedColor
    );

    const handleAddWishList = async () => {
        if (!itemInWishlist) {
            setLoadingWishlist(true);           
            try {
                await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
                setWishItem(prevItems => [...prevItems, productCartItem]);
                setLastWishItem(prevItems => [...prevItems, productCartItem]);
                
                setTimeout(()=>{
                    setLastWishItem((prevItems) => prevItems.filter(item => item.id !== product.id));
                  }, 20000);
            } catch (error) {
                console.error("Error adding to wishlist:", error);
            } finally {
                setLoadingWishlist(false);
            }
        }else {
            router.push('/wishlist');
        }
    };

    const [isShowBottomBar, setIsShowBottomBar] = useState(false); // Initially fixed
    const productInfoRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (productInfoRef.current) {
          // Get the bottom of the productInfoRef element
          const productInfoBottom = productInfoRef.current.getBoundingClientRect().bottom;
          
          // If the bottom of the productInfoRef element (plus 100px) is out of the viewport, set bottom bar to fixed
          if (productInfoBottom <= window.innerHeight - 100) {
            setIsShowBottomBar(false); // Fixed when the bottom of productInfoRef (plus 100px) is out of view
          } else {
            setIsShowBottomBar(false); // Static when the bottom part of productInfoRef is still in view
          }
        }
      };
  
      // Add scroll event listener
      window.addEventListener("scroll", handleScroll);
  
      // Run once on mount to set the initial state
      handleScroll();
  
      // Clean up event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  return (
    <div>
        <div className='fixed top-[100px] right-4 z-[9999]'>
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
        {/* Main content */}
        <div className="block lg:flex gap-5 slide__up">
            <div className="px-3 lg:px-5 lg:flex-[70%] flex-[100%]">
                <div ref={imgContainerRef} className={`bg-white outline-none ${isZoom ? 'fixed top-0 left-0 w-full h-screen overflow-y-auto z-[9999] image__modal image__popup zoom__in image__zoom__out' : 'grid grid-cols-2 mb-8 lg:mb-16 image__zoom__in'}`}>
                    {product.images.map((item, index) => (
                        <div 
                        id={`image-${index}`} 
                        key={index} 
                        className={`${isZoom ? 'relative border-b border-[#e8e8e8] w-full bg-white min-h-screen flex justify-center items-center' : 'product__image__wrapper'}`}                        
                        onClick={()=>handleZoomImage(index, item.src)}
                        >
                            <div className={`${isZoom ? 'static w-full' : 'relative' } flex justify-center items-center`}>
                                <img className={`w-full h-auto`} src={item.src} height={339} width={254} alt={product.name} />
                                <div className='absolute top-0 left-0 py-2 px-3'>
                                    <span className='text-xs'>{`[${index + 1}/${product.images.length}]`}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Right product info  */}
            <div className="lg:flex-[30%] flex-[100%] px-3 lg:px-5 mb-20 mt-8 lg:mt-0 lg:mb-0" ref={productInfoRef}>
                <h1 className="text-[22px] leading-[150%] font-ibmPlexRegular capitalize">
                    {product.name}
                </h1>
                <p className="text-[22px] leading-[140%] font-ibmPlexRegular capitalize">
                    {`$${Intl.NumberFormat('en-US').format(product.price, 0)}`}
                </p>
                <p className="text-xs leading-[150%] mt-2">
                    {isExpanded ? descriptionText : truncatedDescription}
                    {descriptionText.length > 100 && (
                        <button onClick={toggleDescription} className="underline ml-[2px]">
                            {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                    )}
                </p>
                <div className="py-2 pt-5 flex items-center gap-1">
                    <span className="text-xs"><IoArrowDownSharp /></span>
                    <button className='text-xs uppercase hover:underline' onClick={scrollToDetails}>
                        Product Details
                    </button>
                </div>
                <div className="pt-3 pb-0">
                    <p className='text-xs uppercase'>Colors:</p>
                    <div className="py-1">
                        <div className="flex items-center gap-2">
                            {
                                product.attributes
                                .filter(item => item.slug == 'color')
                                .flatMap(item => item.options)
                                .map((option, index) => (                                
                                    <button 
                                        key={index} 
                                        className={`color__variation__btn`}
                                        style={{
                                            border: selectedColor === option ? '1px solid #000' : '0px solid #000'
                                        }} 
                                        onClick={() => handleColorClick(option)}
                                    >                           
                                        <VariationColor variationColor={option} />                                    
                                    </button>
                                ))                   

                            }
                        </div>
                    </div>
                </div>
                
                <div 
                className={`${isShowBottomBar ? 'fixed bg-[#e1e1e180] w-full bottom-0 left-0 z-[999] lg:static lg:bg-transparent p-4 lg:p-0' : 'static'}`}
                style={{backdropFilter: ` ${isShowBottomBar ? 'blur(3rem)' : ''}`}}
                >
                    <div className="py-4">
                        <p className='text-xs uppercase' ref={isSizeSelectRef}>Sizes (US):</p>
                        <div className="py-1">
                            <div className="flex items-center gap-[6px] flex-wrap">
                                {
                                    product.attributes
                                    .filter(item => item.slug === 'size')
                                    .flatMap(item => item.options)
                                    .map((option, index) => (
                                        <button 
                                            className={`min-w-8 min-h-[41px] px-2 flex items-center justify-center text-xs hover:text-white ${selectedSize === option ? 'bg-[#333] text-white hover:bg-[#333]' : 'bg-[#cecece80] text-black hover:bg-[#897f7b]'} rounded outline-none ${loading ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}`} 
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
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                        {/* Add to cart button  */}
                        <button className={`bg-black rounded text-xs text-white py-1 uppercase h-[30px] w-[195px] ${loading ? 'disabled:cursor-not-allowed' : 'cursor-pointer'}`} 
                        onClick={handleAddToCart} ref={addBagRef} 
                        disabled={loading}>
                        {itemInCart ? 'In Your Bag' : 'Add to bag'}
                        </button>
                        <button 
                        className={`bg-[#cecece80] rounded text-black h-[30px] flex items-center justify-start px-2 gap-2 group w-[36px] overflow-hidden ${loadingWishlist ? 'hover:w-auto' : 'hover:w-[160px]'} hover:min-w-[36px]`} 
                        style={{ transition: '0.3s ease' }}
                        onClick={handleAddWishList}
                        disabled={loadingWishlist}
                        >
                        {loadingWishlist ? (    
                        <span className='loading__wishlist text-center w-full cursor-pointer text-xs'>/</span>
                        ) : (
                            itemInWishlist ? (
                                <div className="flex gap-2 items-center w-[141px] text-nowrap">
                                    <span className='w-5 h-5'>
                                        <IoIosHeart className={`text-[20px]`} />
                                    </span>
                                    <span className='text-xs uppercase'>Saved to wishlist</span>
                                </div>
                            ) : (
                                <div className="flex gap-2 items-center w-[141px] text-nowrap">
                                    <span className='w-5 h-5'>
                                        <IoMdHeartEmpty className={`text-[20px]`} />
                                    </span>
                                    <span className='text-xs uppercase'>Add to wishlist</span>
                                </div>
                            )
                        )}
                    </button>

                    </div>
                </div>             
            </div>
            </div>
            {/* Bottom poduct additional details  */}
            <div className='mt-16 mb-10 px-3 lg:px-5 ' ref={detailsRef}>
                <div className='flex items-start gap-5'>
                    <button 
                        className={`uppercase text-[12px] lg:text-[14px] font-ibmPlexMedium ${activeTab === 'materials' ? 'border-b border-black pb-1' : ''}`}
                        onClick={() => handleToggle('materials')}
                    >
                        Materials
                    </button>
                    <button 
                        className={`uppercase text-[12px] lg:text-[14px] font-ibmPlexMedium ${activeTab === 'fitting' ? 'border-b border-black pb-1' : ''}`}
                        onClick={() => handleToggle('fitting')}
                    >
                        Fitting
                    </button>
                </div>

                {activeTab === 'materials' && (
                    <div className='py-2 pt-4 text-xs'
                        dangerouslySetInnerHTML={{ __html: formatStringWithLineBreaks(materials) }} />
                )}
                {activeTab === 'fitting' && (
                    <div className='py-2 pt-4 text-xs'
                        dangerouslySetInnerHTML={{ __html: formatStringWithLineBreaks(fitting) }} />
                )}
            </div>           

        {/* Product image popup modal  */}
        {isModalOpen && (
            <div 
            className={`w-full ${isPopupClose ? 'zoom__out' : ''} outline-none zoom__in image__popup image__modal fixed inset-0 bg-white/40 h-screen z-[99999] overflow-y-hidden image__zoom__out`} 
            onClick={closeModal}      
            ref={modalRef}                             
            >
                <div className="bg-white relative w-full min-h-screen flex flex-col justify-center items-center border-b border-[#e8e8e8]">
                    <div className="absolute top-3 left-3 text-xs">{`[${imageNumber}/${product.images.length}]`}</div>
                    <img                        
                        className="w-full h-auto"
                        src={modalImage}
                        alt="Full-size product image"
                        style={{ maxWidth: '100vw', maxHeight: 'auto' }} // Ensure image doesn't exceed the viewport
                    />
                </div>  
                <div className="absolute min-h-screen w-full top-0 left-0 z-[999999]  flex flex-col items-center justify-center">
                    <div className="text-center p-2 px-2 rounded-md" style={{backdropFilter: "blur(3rem)", background: "#e1e1e180"}}>
                        <div className="text-xs leading-3 capitalize">loading...</div> 
                        <span className='loading text-xs leading-4 text-black'>/</span>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
