"use client";
import { WishContext } from '@/app/context/wishContext';
import { CartContext } from '@/app/context/cartContext';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoIosHeart } from "react-icons/io"; 

function formatString(input) {
  if (!input) return '--'; 
  return input
    .toUpperCase()
    .replace(/[_\s,]+/g, ' - ')
    .replace(/[^A-Z0-9 -]/g, '')
    .trim();
}

export default function WishList() {
  const router = useRouter();
  const { wishItem, setWishItem } = useContext(WishContext);
  const { cartItem, setCartItem, setPopupShow } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [removalLoading, setRemovalLoading] = useState({});
  
  useEffect(() => {
    const fetchWishlistItems = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoading(false);
    };
    fetchWishlistItems();
  }, []);

  const handleMoveToBag = (wishItemId, wishFullItem) => {
    setCartItem(prevCartItem => [...prevCartItem, wishFullItem]);
    setWishItem(prevItems => prevItems.filter(item => item.id !== wishItemId));
    setPopupShow(true);
  };

  const handleGoBag = () => {   
    router.push("/bag");
  };

  const handleRemoveWishItem = (itemId) => {
    setRemovalLoading(prev => ({ ...prev, [itemId]: true }));
    setTimeout(() => {
      setWishItem(prevItems => prevItems.filter(item => item.id !== itemId));  
      setRemovalLoading(prev => ({ ...prev, [itemId]: false }));
    }, 1000);
  };

  // Edit Wishlist
  const [editItemId, setEditItemId] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentSize, setCurrentSize] = useState(null);
  const [isWorking, setIsWorking] = useState(false);

  const handleSelectSize = (itemId) => {
    setEditItemId(itemId);
  };

  const handleSizeClick = (size, itemId) => {
    setIsWorking(true);
    setTimeout(()=>{
      setSelectedSize(size);
      setWishItem(prevItems => 
        prevItems.map(item => 
          item.id === itemId 
            ? { ...item, size: size }
            : item
        )
      );
      // Reset after selecting size
      setEditItemId(null);
      setSelectedSize(null);
      setIsWorking(false);
    },800)
  };
  
  const handleEdit = (id, size) =>{
    setCurrentSize(size);
    setWishItem(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, size: null }
          : item
      )
    )
    setEditItemId(id);
  }

  return (
    <div className='pt-8 lg:pt-12 pb-20 lg:pb-[160px] px-3 lg:px-5'>
      {loading ? (
        <p className='loading text-[10px]'></p>
      ) : wishItem.length > 0 ? (
        <div className="slide__up">
          <h1 className="text-[20px] lg:text-[26px] font-bookish mb-6">
            {`Your wishlist (${wishItem.length} item${wishItem.length > 1 ? 's' : ''})`}
          </h1>
          <div className="product__grid grid grid-cols-2 lg:grid-cols-4">
            {wishItem.map((item, index) => (
              <div className="product__wrapper w-full relative" key={index}>
                <Link href={`/shopping/${item.slug}`}>
                  <div>
                    <Image
                      src={item.image}
                      width="254"
                      height="339"
                      className={`w-full h-auto`}
                      alt={item.name}
                    />
                  </div>
                </Link>
                <div className="px-[18px] py-5">
                  <p className="text-[12px] capitalize">{item.name}</p>
                  <p className="text-[12px]">{`$${item.price}`}</p>
                  <div className="mt-4">
                    <div className="flex items-center text-[11px] gap-2 uppercase">
                      <span>Color:</span>
                      <span>{formatString(item.color)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] uppercase">
                      <span>Size:</span>
                      <span>{editItemId === item.id ? '' : (item.size || "--")}</span>
                    </div>                                              
                  </div>
                  <div>
                    {cartItem.some(cartItem => cartItem.id === item.id && cartItem.size === item.size) && item.size ? (
                      <button 
                        className="bg-[#e1e1e180] text-black hover:bg-[#897f7b] rounded px-[55px] py-[5px] text-[14px] hover:text-white uppercase mt-4" 
                        onClick={handleGoBag}
                      >
                        In your bag
                      </button>
                    ) : (
                      item.size ? (
                        <button 
                        className="bg-[#000000cc] rounded w-full block lg:inline-block lg:w-auto lg:px-[55px] text-center px-[10px] py-[5px] text-[14px] text-white uppercase hover:bg-[#897f7b] mt-4"
                          onClick={() => handleMoveToBag(item.id, item)}
                        >
                          Move to bag
                        </button>
                        
                      ) : (
                        editItemId === item.id ? (
                          <div className='mt-4'>
                            <div className="flex items-center gap-[6px] flex-wrap">
                              {item.allSize.map((size, index) => (
                                <button 
                                  className={`${currentSize === size && 'bg-black text-white hover:bg-black hover:text-white'} text-xs hover:text-white ${item.size === size ? "bg-[#333333] text-white hover:bg-[#333333] hover:text-white" : ""} ${isWorking ? 'bg-[#cecece80] text-black/50 cursor-not-allowed' : 'bg-[#cecece80] text-black hover:bg-[#897f7b] cursor-pointer'} py-2 px-2 rounded outline-none`} 
                                  key={index}
                                  onClick={() => handleSizeClick(size, item.id)}   
                                  disabled={isWorking}                               
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <button 
                              className="bg-[#000000cc] rounded w-full block lg:inline-block lg:w-auto lg:px-[55px] text-center px-[10px] py-[5px] text-[14px] text-white uppercase hover:bg-[#897f7b] mt-4"
                              onClick={() => handleSelectSize(item.id)}
                            >
                              Select Size
                            </button>                            
                          </div>
                        )
                      )
                    )}
                  </div>
                  {item.size && (
                    <div className='mt-1'>
                      <button 
                        className="underline text-xs mt-2"
                        onClick={() => handleEdit(item.id, item.size)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
                <div className="absolute top-0 right-0 p-3 z-30 w-[45px] h-[45px] flex justify-center items-center">
                  {removalLoading[item.id] ? (
                    <span className="loading text-xs">/</span>
                  ) : (
                    <button 
                      className="outline-none"
                      onClick={() => handleRemoveWishItem(item.id)}
                    >
                      <IoIosHeart className="text-black text-[20px]" />
                    </button>
                  )}
                </div>            
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="slide__up">
          <h1 className="text-[20px] lg:text-[26px] font-bookish mb-8">Your wishlist</h1>
          <p className="my-8 text-xs">{`Add items to your wishlist so you can save them for later. Click or tap 'Add to Wishlist' throughout the site.`}</p>
          <div className='pt-2'>
            <Link href="/" className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded py-2 px-[55px] font-ibmPlexMedium hover:bg-[#897f7b]'>Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
