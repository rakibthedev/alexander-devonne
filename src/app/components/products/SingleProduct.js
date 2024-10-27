"use client";
import React, {useContext, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { IoArrowDownSharp } from "react-icons/io5";
import VariationColor from '../VariationColor';
import { CartContext } from '@/app/context/cartContext';
import { WishContext } from '@/app/context/wishContext';
import { useRouter } from 'next/navigation';
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";

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
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [modalImage, setModalImage] = useState(''); // State for the image that should be displayed in the modal
  const [imageNumber, setImageNumber] = useState(''); // State for the image that should be displayed in the modal
  const [itemInCart, setItemInCart] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const router = useRouter();
  const isSizeSelectRef = useRef(null);
  const addBagRef = useRef(null);


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

    // Function to open the modal with the selected image
    const openModal = (imageSrc, imgNumber) => {
        setModalImage(imageSrc);
        setImageNumber(imgNumber);
        setIsModalOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    }; 

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

    const productCartItem = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0].src,
        price: product.price,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
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
    const { wishItem, setWishItem, setWishPopupShow } = wishState;

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
                setWishPopupShow(true);
                setTimeout(()=>{
                    setWishPopupShow(false);
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
        
  return (
    <div className="block lg:flex px-2 lg:px-5 gap-5">
        <div className="lg:flex-[70%] flex-[100%]">
            <div className='grid grid-cols-2 mb-16'>
                {product.images.map((item, index) => (
                    <div key={index} className='product__image__wrapper relative flex justify-center items-center'>
                        <Image onClick={() => openModal(item.src, (index+1))} className='w-full h-auto' src={item.src} height={339} width={254} alt={product.name} />
                        <div className='absolute top-0 left-0 py-2 px-3'>
                            <span className='text-xs'>{`[${index + 1}/${product.images.length}]`}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mb-16' ref={detailsRef}>
                <div className='flex items-start gap-5'>
                    <button 
                        className={`uppercase text-[14px] font-ibmPlexMedium ${activeTab === 'materials' ? 'border-b border-black pb-1' : ''}`}
                        onClick={() => handleToggle('materials')}
                    >
                        Materials
                    </button>
                    <button 
                        className={`uppercase text-[14px] font-ibmPlexMedium ${activeTab === 'fitting' ? 'border-b border-black pb-1' : ''}`}
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
        </div>

        <div className="lg:flex-[30%] flex-[100%]">
            <h1 className="text-[22px] leading-[150%] font-ibmPlexRegular capitalize">
                {product.name}
            </h1>
            <p className="text-[22px] leading-[140%] font-ibmPlexRegular capitalize">
                {`$${product.price}`}
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
                            .filter(item => item.slug === 'color')
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
            <div className="py-4">
                <p className='text-xs uppercase' ref={isSizeSelectRef}>Sizes (US):</p>
                <div className="py-1">
                    <div className="flex items-center gap-[6px]">
                        {
                            product.attributes
                            .filter(item => item.slug === 'size')
                            .flatMap(item => item.options)
                            .map((option, index) => (
                                <button 
                                    className={`text-xs hover:text-white ${selectedSize === option ? 'bg-[#333] text-white hover:bg-[#333]' : 'bg-[#cecece80] text-black hover:bg-[#897f7b]'} py-3 px-2 rounded outline-none`} 
                                    key={index}
                                    onClick={() => handleSizeClick(option)}                                    
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
                <button className='bg-black rounded text-xs text-white py-1 uppercase h-[30px] w-[195px]' 
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
        {/* Product image popup modal  */}
        {isModalOpen && (
        <div className="image__popup fixed inset-0 bg-white z-[99999] flex justify-center items-center" onClick={closeModal}>
          <div className="relative w-full h-full">
            <div className="absolute top-3 left-3 text-xs">{`[${imageNumber}/${product.images.length}]`}</div>
            {/* Use an img tag instead of Image component */}
            <img
              className="w-full h-auto object-contain"
              src={modalImage}
              alt="Full-size product image"
              style={{ maxWidth: '100vw', maxHeight: '100vh' }} // Ensure image doesn't exceed the viewport
            />
          </div>
        </div>
      )}
    </div>
  );
}
