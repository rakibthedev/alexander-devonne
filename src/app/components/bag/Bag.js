"use client"
import React from 'react'
import { CartContext } from '@/app/context/cartContext'
import { useContext } from 'react'
import Image from 'next/image'
import { FaRegTrashAlt } from "react-icons/fa";
import Link from "next/link"

function formatString(input) {
  return input
      .toUpperCase() // Convert to uppercase
      .replace(/[_\s,]+/g, ' - ') // Replace underscores, spaces, and commas with hyphens surrounded by spaces
      .replace(/[^A-Z0-9 -]/g, '') // Remove any remaining special characters, allowing spaces and hyphens
      .trim(); // Remove leading and trailing spaces
}

export default function Bag() {
  const cartState = useContext(CartContext);
  const {cartItem, setCartItem} = cartState;
  
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
    <main className='px-2 lg:px-5 pt-2 pb-28'>
      <div className={cartItem.length > 0 ? "hidden" : "block"}>
        <h1 className="text-[26px] font-bookish">
          Your Shopping Bag
        </h1>
        <p className="my-8 text-xs">
          Your shopping bag is currently empty.
        </p>
        <div className='pt-2'>
          <Link href="/" className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded py-2 px-[55px] font-ibmPlexMedium hover:bg-[#897f7b]'>Continue Shopping</Link>
        </div>
      </div>
      <div className={cartItem.length > 0 ? "block" : "hidden"}>
        <h1 className="text-[26px] font-bookish">
          Your Shopping Bag ({cartItem.length} items)
        </h1>
        <div className="flex gap-8">
          <div className="flex-[70%]">
            <div className="bag__wrapper mt-5">
              {
                cartItem.map((item, index) => {
                  return (
                    <div className="bag__item flex border border-[#e8e8e8] border-solid" key={index}>
                      <div className="flex items-center justify-center border-r border-[#e8e8e8]">
                        <Link href={`/shopping/${item.slug}`}>
                          <Image
                          src={item.image}
                          alt={item.name}
                          width={178}
                          height={238}
                          className="h-auto w-[178px]"
                          />
                        </Link>
                      </div>
                      <div className="flex justify-between w-full">
                        <div className="pl-6 pt-6">
                          <p className='mb-4 capitalize'>{item.name}</p>
                          <div className='flex items-center gap-1'>
                            <span className='text-[12px] leading-5 uppercase'>Color: </span>
                            <span className='text-[12px] leading-5 uppercase'>{formatString(item.color)}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <span className='text-[12px] leading-5 uppercase'>Size: </span>
                            <span className='text-[12px] leading-5 uppercase'>{item.size}</span>
                          </div>
                          <div className='flex items-center gap-1'>
                            <span className='text-[12px] leading-5 uppercase'>Quantity: </span>
                            <span className='text-[12px] leading-5 uppercase'>{item.quantity}</span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-between items-center pt-5 pr-4 pb-6">
                          <div className='flex'>
                            <span>{`$${item.price * item.quantity}`}</span>
                          </div>
                          <div>
                            <button className='py-[7px] px-[14px] hover:cursor-pointer hover:bg-gray-100 rounded' onClick={() => handleRemoveCartItem(item.id, item.size, item.color)}>
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
          </div>
          <div className={`flex-[30%] pt-5 ${cartItem.length > 0 ? "visible" : "invisible"}`}>
              <h2 className="text-[14px] font-ibmPlexMedium uppercase mb-5">
                Your Order Summary
              </h2>
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
              <div className='flex justify-between text-[16px] font-ibmPlexMedium font-semibold capitalize mt-4'>
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
              <div className='pt-8'>
                <button className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded block w-full p-2 font-ibmPlexMedium hover:bg-[#897f7b]'>Checkout</button>
              </div>
          </div>
        </div>
      </div>
    </main>
  )
}
