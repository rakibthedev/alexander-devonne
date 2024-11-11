"use client"
import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '@/app/context/cartContext';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoMdHeartEmpty, IoIosHeart } from "react-icons/io";
import { WishContext } from '@/app/context/wishContext';
import WishPopup from '../wishlist-popup/WishlistPopup';

function formatString(input) {
  return input
      .toUpperCase()
      .replace(/[_\s,]+/g, ' - ')
      .replace(/[^A-Z0-9 -]/g, '')
      .trim();
}

export default function Bag() {
  const [removeLoading, setRemoveLoading] = useState({});
  const [moveToWishLoading, setMoveToWishLoading] = useState({});
  const { cartItem = [], setCartItem } = useContext(CartContext) || {};
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchWishlistItems = async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoading(false);
    };
    fetchWishlistItems();
  }, []);

  const handleRemoveCartItem = (itemId, itemSize, itemColor) => {
    setRemoveLoading((prev) => ({ ...prev, [itemId]: true,  [itemSize]: true, [itemColor]: true}));
    setTimeout(() => {
      setCartItem((prevItems) => 
        prevItems.filter(filteredItem => 
          !(filteredItem.id === itemId && 
            filteredItem.size === itemSize && 
            filteredItem.color === itemColor)
        )
      );
      setRemoveLoading((prev) => ({ ...prev, [itemId]: false,  [itemSize]: false, [itemColor]: false}));
    }, 1000);
  };

  const shipping = 8;

  const [editItemId, setEditItemId] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isWorking, setIsWorking] = useState(null);

  const handleEdit = (id, color, size) => {
    setEditItemId([]);
    const itemCombination = {
      id,
      color,
      size,
    };
    setEditItemId((prev) => [...prev, itemCombination]);
  };

  const handleSizeClick = (size, itemId, itemSize, itemColor) => {
    setIsWorking(true);
    setTimeout(() => {
      setSelectedSize(size);
      setCartItem((prevItems) => 
        prevItems.map(item => 
          item.id === itemId && 
          item.size === itemSize && 
          item.color === itemColor
            ? { ...item, size }
            : item
        )
      );
      setEditItemId([]); // Reset after selecting size
      setSelectedSize(null);
      setIsWorking(false);
    }, 500);
  };

  const handleQuantityInc = (itemQuantity, id, size, color) => {
    if (itemQuantity < 3) {  
      setIsWorking(true);
      setTimeout(() => { 
        setCartItem((prevItems) => 
          prevItems.map(item => 
            item.id === id &&
            item.size === size &&
            item.color === color            
              ? { ...item, quantity: itemQuantity + 1 }
              : item
          )
        );
        setIsWorking(false);
        setEditItemId([]); // Reset after adjusting quantity
      }, 500);
    }
  };

  const handleQuantityDec = (itemQuantity, id,  size, color) => {
    if (itemQuantity > 1) {  
      setIsWorking(true);
      setTimeout(() => {
        setCartItem((prevItems) => 
          prevItems.map(item => 
            item.id === id &&
            item.size === size &&
            item.color === color        
              ? { ...item, quantity: itemQuantity - 1 }
              : item
          )
        );
        setIsWorking(false);
        setEditItemId([]); // Reset after adjusting quantity
      }, 500);
    }
  };

  const { wishItem, setWishItem, lastWishItem, setLastWishItem } = useContext(WishContext);
  
  useEffect(() => {
    setLastWishItem([]); // Clear all items from lastWishItem
  }, []);

  const handleMoveToWishlist = (bagItem) => {
    setMoveToWishLoading((prev) => ({ ...prev, [bagItem.id]: true, [bagItem.size]: true, [bagItem.color]: true }));
    setTimeout(() => {
      setWishItem((prevItems) => [...prevItems, bagItem]);
      setCartItem((prevItems) => prevItems.filter(item => !(item.id === bagItem.id && item.size === bagItem.size && item.color === bagItem.color)));
      setMoveToWishLoading((prev) => ({ ...prev, [bagItem.id]: false, [bagItem.size]: false, [bagItem.color]: false }));

      setLastWishItem((prev) => [...prev, bagItem]);

      setTimeout(() => {
        setLastWishItem((prevItems) => prevItems.filter(item => item.id !== bagItem.id));
      }, 20000);

    }, 1000);
  };

  return (
    <div>
      {loading ? (
        <div className='loading text-center py-[200px] text-xs'></div>
      ) : (
        <div>
          <div className='fixed top-[100px] right-4 z-[9999] flex flex-col gap-5'>
            {
              lastWishItem.length > 0 && (
                lastWishItem.map((item, index) => (
                  <WishPopup key={index} wishProduct={item} />
                ))
              )
            }
          </div>
          <main className='px-2 lg:px-5 pt-2 pb-28 slide__up'>
            {cartItem.length === 0 ? (
              <div>
                <h1 className="text-[26px] font-bookish">Your Shopping Bag</h1>
                <p className="my-8 text-xs">Your shopping bag is currently empty.</p>
                <div className='pt-2'>
                  <Link href="/" className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded py-2 px-[55px] font-ibmPlexMedium hover:bg-[#897f7b]'>Continue Shopping</Link>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="text-[26px] font-bookish">Your Shopping Bag ({cartItem.length} items)</h1>
                <div className="block lg:flex gap-8">
                  <div className="lg:flex-[70%]">
                    <div className="bag__wrapper mt-5">
                      {cartItem.map((item) => (
                        <div className="bag__item flex border border-[#e8e8e8] border-solid" key={item.id}>
                          <div className="relative flex items-center justify-center border-r border-[#e8e8e8]">
                            <Link href={`/shopping/${item.slug}`}>
                              <Image
                                src={item.image}
                                alt={item.name}
                                width={178}
                                height={238}
                                className="h-auto w-[178px]"
                              />
                            </Link>
                            <div className="absolute z-30 top-2 right-2">
                              {wishItem.some(w_Item => w_Item.id === item.id) ? (
                                <Link href="/wishlist" className="outline-none group">
                                    <div>
                                      <IoIosHeart className="text-black text-[20px]" />
                                    </div>
                                </Link>
                              ) : (
                                <button 
                                  className="outline-none group"
                                  onClick={() => handleMoveToWishlist(item)}
                                >
                                   {moveToWishLoading[item.id] && moveToWishLoading[item.size] && moveToWishLoading[item.color] ? (
                                    <span className="loading text-xs">/</span>
                                  ) : (
                                    <div>
                                      <IoMdHeartEmpty className="text-[#949494] text-[20px] group-hover:hidden" />
                                      <IoIosHeart className="text-black text-[20px] hidden group-hover:block" />
                                    </div>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between w-full">
                            <div className="pl-6 pt-6">
                              <p className='mb-4 capitalize'>{item.name}</p>
                              <div className='flex items-center gap-1'>
                                <span className='text-[12px] leading-5 uppercase'>Color: </span>
                                <span className='text-[12px] leading-5 uppercase'>{formatString(item.color)}</span>
                              </div>
                              {!editItemId.some(editItem => 
                                editItem.id === item.id && 
                                editItem.color === item.color &&
                                editItem.size === item.size
                              ) && (
                                <div className='flex items-center gap-1'>
                                  <span className='text-[12px] leading-5 uppercase'>Size: </span>
                                  <span className='text-[12px] leading-5 uppercase'>{item.size}</span>
                                </div>
                              )}
                              {/* Edit Size */}
                              {editItemId.some(editItem => 
                                editItem.id === item.id && 
                                editItem.color === item.color &&
                                editItem.size === item.size
                              ) && (
                                <div className='mt-2 mb-3'>
                                  <p className='text-[12px] leading-5 uppercase mb-2'>Size: </p>
                                  <div className="flex items-center gap-[6px] flex-wrap">
                                    {item.allSize.map((size, index) => (
                                      cartItem.some(cartItem => cartItem.id === item.id) &&
                                      !cartItem.some(cartItem => cartItem.size === size && cartItem.size !== item.size) &&                    
                                      <button 
                                        className={`text-xs hover:text-white ${size === item.size && 'bg-black text-white hover:bg-black hover:text-white'} ${isWorking ? 'text-black/50 bg-[#cecece80] cursor-not-allowed' : 'bg-[#cecece80] text-black hover:bg-[#897f7b] cursor-pointer'} py-3 px-2 rounded outline-none`} 
                                        key={index}
                                        onClick={() => handleSizeClick(size, item.id, item.size, item.color)}
                                        disabled={isWorking}                                  
                                      >
                                        {size}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                               {!editItemId.some(editItem => 
                                editItem.id === item.id && 
                                editItem.color === item.color &&
                                editItem.size === item.size
                              ) && (
                              <div className='flex items-center gap-1'>
                                <span className='text-[12px] leading-5 uppercase'>Quantity: </span>
                                <span className='text-[12px] leading-5 uppercase'>{item.quantity}</span>
                              </div>
                            )}
                              {/* Edit Quantity */}
                              {editItemId.some(editItem => 
                                editItem.id === item.id && 
                                editItem.color === item.color &&
                                editItem.size === item.size
                              ) && (
                              <div className='mt-2 mb-3'>
                                <p className='text-[12px] leading-5 uppercase mb-2'>Quantity: </p>
                                <div className="flex items-center gap-3">
                                  <button 
                                    className={`text-xs leading-3 rounded text-white w-4 h-4 flex items-center justify-center disabled:cursor-not-allowed ${isWorking ? 'cursor-not-allowed bg-black/50' : 'cursor-pointer bg-black'}`}
                                    onClick={() => handleQuantityDec(item.quantity, item.id, item.size, item.color)}
                                    disabled={editItemId.some(editItem => 
                                      editItem.id === item.id && 
                                      editItem.color === item.color &&
                                      editItem.size === item.size
                                    ) && item.quantity < 2 || isWorking}
                                  >
                                    <FiMinus />
                                  </button>
                                  <span className='text-[12px] leading-5 uppercase'>{item.quantity}</span>
                                  <button 
                                    className={`text-xs leading-3 rounded text-white w-4 h-4 flex items-center justify-center disabled:cursor-not-allowed ${isWorking ? 'cursor-not-allowed bg-black/50' : 'cursor-pointer bg-black'}`}
                                    onClick={() => handleQuantityInc(item.quantity, item.id, item.size, item.color)}
                                    disabled={editItemId.some(editItem => 
                                      editItem.id === item.id && 
                                      editItem.color === item.color &&
                                      editItem.size === item.size
                                    ) && item.quantity > 2 || isWorking}
                                  >
                                    <FiPlus />
                                  </button>
                                </div>
                              </div>
                              )}
                              {!editItemId.some(editItem => 
                                editItem.id === item.id && 
                                editItem.color === item.color &&
                                editItem.size === item.size
                              ) && (
                                <div className='mt-1'>
                                  <button 
                                    className="underline text-xs mt-2"
                                    onClick={() => handleEdit(item.id, item.color, item.size)}
                                  >
                                    Edit
                                  </button>
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col justify-between items-center pt-5 pr-4 pb-6">
                              <div className='flex'>
                                <span>{`$${item.price * item.quantity}`}</span>
                              </div>
                              <div>
                                {removeLoading[item.id] && removeLoading[item.size] && removeLoading[item.color] ? (
                                  <span className="loading text-xs">/</span>
                                ) : (
                                  <button className='py-[7px] px-[14px] hover:cursor-pointer hover:bg-gray-100 rounded' onClick={() => handleRemoveCartItem(item.id, item.size, item.color)}>
                                    <FaRegTrashAlt className='text-4' />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={`lg:flex-[30%] pt-5 ${cartItem.length > 0 ? "block" : "hidden"}`}>
                    <h2 className="text-[14px] font-ibmPlexMedium uppercase mb-5">Your Order Summary</h2>
                    <div className='flex justify-between text-[12px] capitalize leading-5'>
                      <span>Subtotal</span>
                      <span>
                        {`$${Intl.NumberFormat('en-US').format(cartItem.reduce((total, item) => total + (item.price * item.quantity || 0), 0))}`}
                      </span>
                    </div>
                    <div className='flex justify-between text-[12px] capitalize leading-5'>
                      <span>Shipping</span>
                      <span>{`$${shipping}`}</span>
                    </div>
                    <div className='flex justify-between text-[16px] font-ibmPlexMedium font-semibold capitalize mt-4'>
                      <span>Total (Duties included)</span>
                      <span>
                        {`$${Intl.NumberFormat('en-US').format(cartItem.reduce((total, item) => total + (item.price * item.quantity || 0), 0) + shipping)}`}
                      </span>
                    </div>
                    <div className='pt-8'>
                      <Link href="/checkout" className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded block w-full p-2 font-ibmPlexMedium hover:bg-[#897f7b]'>Checkout</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
}
