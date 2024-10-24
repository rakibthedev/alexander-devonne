"use client"
import React from 'react'
import { CartContext } from '@/app/context/cartContext'
import { useContext } from 'react'
import Image from 'next/image'
import { FaRegTrashAlt } from "react-icons/fa";

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

  return (
    <main className='px-2 lg:px-5 pt-10 pb-28'>
      <div className="flex gap-5">
        <div className="flex-[75%]">
          <h1 className="text-[26px] font-bookish">
            Your Shopping Bag ({cartItem.length} items)
          </h1>
          <div className="bag__wrapper mt-5">
            {
              cartItem.map(item => {
                return (
                  <div className="bag__item flex border border-[#e8e8e8] border-solid" key={item.id}>
                    <div className="flex items-center justify-center border-r border-[#e8e8e8]">
                      <Image
                      src={item.image}
                      alt={item.name}
                      width={178}
                      height={238}
                      className="h-auto w-[178px]"
                      />
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
                          <span>{`$${item.price}`}</span>
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
        <div className="flex-[25%]">

        </div>
      </div>
    </main>
  )
}
