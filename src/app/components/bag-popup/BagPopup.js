"use client"
import { React, useContext } from 'react'
import { CartContext } from '@/app/context/cartContext'
import { FaRegTrashAlt } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';

function formatString(input) {
    return input
        .toUpperCase() // Convert to uppercase
        .replace(/[_\s,]+/g, ' - ') // Replace underscores, spaces, and commas with hyphens surrounded by spaces
        .replace(/[^A-Z0-9 -]/g, '') // Remove any remaining special characters, allowing spaces and hyphens
        .trim(); // Remove leading and trailing spaces
  }
  function TruncatedText({ text }) {
    const truncateString = (str) => {
      if (str.length > 24) {
        return (
          <>
            {str.slice(0, 24)}
            <span style={{ letterSpacing: '-4px' }}>...</span>
          </>
        );
      }
      return str;
    };
  
    return (
      <div>
        {truncateString(text)}
      </div>
    );
  }
  
export default function BagPopup() {
    const cartState = useContext(CartContext);
    const {cartItem, setCartItem, popupShow, setPopupShow} = cartState;

    const showBagPopup  = () => {
        setPopupShow(true)
    }
    const hideBagPopup  = () => {
        setPopupShow(false)
    }
    
    const handleRemoveCartItem = (itemId, itemSize, itemColor) => {
        setCartItem((prevItems) => 
            prevItems.filter(filteredItem => 
                !(filteredItem.id === itemId && 
                  filteredItem.size === itemSize && 
                  filteredItem.color === itemColor)
            )
        );
    };

    const shipping = 8;
  return (
    <div 
    className={`bag__popup__box fixed top-0 right-0 min-h-screen overflow-hidden bg-[#e1e1e1] z-[9999999] ${popupShow ? 'w-[375px]' : 'w-0'}`} 
    onMouseEnter={showBagPopup} 
    onMouseLeave={hideBagPopup} 
    style={{transition: "width 0.2s ease", boxSizing: "border-box" }}
    >
        <div className={`p-5 w-[375px] min-h-screen ${cartItem.length > 0 ? "hidden" : "flex flex-col justify-between items-between"}`}>
            <div>
                <p className="text-[18px] font-bookish mb-3">Your shopping bag</p>
                <p className="my-10 text-[14px]">
                    Your shopping bag is currently empty.
                </p>
                <div className='pt-2 pb-5 text-center border-b border-black'>
                    <Link href="/" className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded py-[6px] w-full block font-ibmPlexMedium hover:bg-[#897f7b]'>Continue Shopping</Link>
                </div>
            </div>
            <div className='py-y pt-10 text-[14px] text-center underline uppercase'>
                <Link href="/bag">Go Shopping Bag</Link>
            </div>            
        </div>

        <div className={`p-5 w-[375px] ${cartItem.length > 0 ? "block" : "hidden"}`}>

            <p className="text-[18px] font-bookish mb-3">Your shopping bag ( {cartItem.length} items)</p>
            <div className="bag__wrapper mt-5 overflow-y-auto" style={{height: "calc(100vh - 280px)"}}>
                {
                cartItem.map((item, index) => {
                    return (
                    <div className="bag__item flex border border-[#e8e8e8] border-solid" key={index}>
                        <div className="flex items-center justify-center border-r border-[#e8e8e8]">
                            <Link href={`/shopping/${item.slug}`}>
                                <Image
                                src={item.image}
                                alt={item.name}
                                width={120}
                                height={90}
                                className="h-auto w-[120px]"
                                />
                            </Link>
                        </div>
                        <div className="flex justify-between w-full">
                        <div className="pl-3 pt-3 pb-2 relative">
                            <p className='capitalize text-[14px] leading-4'>
                                <TruncatedText text={item.name} />
                            </p>
                            <p className='mb-[6px] text-[12px] leading-5'>${item.price * item.quantity}</p>
                            <div className='flex items-center gap-1'>
                            <span className='text-[12px] leading-[18px] uppercase'>Color: </span>
                            <span className='text-[12px] leading-[18px] uppercase'>{formatString(item.color)}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                            <span className='text-[12px] leading-[18px] uppercase'>Size: </span>
                            <span className='text-[12px] leading-[18px] uppercase'>{item.size}</span>
                            </div>
                            <div className='flex items-center gap-1'>
                            <span className='text-[12px] leading-[18px] uppercase'>Quantity: </span>
                            <span className='text-[12px] leading-[18px] uppercase'>{item.quantity}</span>
                            </div>
                            <div className="absolute bottom-1  right-0">
                            <button className='py-[5px] px-[10px] hover:cursor-pointer hover:bg-gray-100 rounded' onClick={() => handleRemoveCartItem(item.id, item.size, item.color)}>
                                <FaRegTrashAlt className='text-4' />
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    )
                })
                }
            </div>
            <div className={`pt-3 ${cartItem.length > 0 ? "visible" : "invisible"}`}>
                <div className='flex justify-between text-[12px] capitalize leading-5'>
                <span>Subtotal</span>
                <span>
                    {cartItem.length > 0 ? (
                    `$${Intl.NumberFormat('en-US').format(cartItem.reduce((total, item) => {
                        if (item.price && item.quantity) {
                        return total + item.price * item.quantity;
                        }
                        return total;
                    }, 0))}`
                    ) : (
                    '$0' // Show a default value if the cart is empty
                    )}
                </span>
                </div>
                <div className='flex justify-between text-[12px] capitalize leading-5'>
                <span>Shipping</span>
                <span>
                    {`$${Intl.NumberFormat('en-US').format(shipping)}`}
                </span>
                </div>
                <div className='flex justify-between text-[16px] font-ibmPlexMedium capitalize mt-3'>
                <span>Total (Duties included)</span>
                <span>
                {cartItem.length > 0 ? (
                    `$${Intl.NumberFormat('en-US').format(cartItem.reduce((total, item) => {
                    if (item.price && item.quantity) {
                        return total + item.price * item.quantity;
                    }
                    return total; // No need to add $8 here
                    }, 0) + shipping)}` // Add $8 to the subtotal after reducing
                ) : (
                    '$0' // Show a default value if the cart is empty
                )}
                </span>
                </div>
                <div className='pt-6'>
                <button className='bg-[#000000cc] text-white text-[14px] uppercase rounded block w-full p-[6px] font-ibmPlexMedium hover:bg-[#897f7b] text-center'>Checkout Securely</button>
                </div>                
            </div>
            <div className='py-5 text-[14px] text-center underline uppercase'>
                <Link href="/bag">View Shopping Bag</Link>
            </div>
        </div>
      </div>
  )
}
