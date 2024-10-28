"use client"
import { WishContext } from '@/app/context/wishContext'
import React, { useContext, useState} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaRegTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
 
function formatString(input) {
    if (!input) return '--'; 
    return input
      .toUpperCase()
      .replace(/[_\s,]+/g, ' - ')
      .replace(/[^A-Z0-9 -]/g, '')
      .trim();
  }

function TruncatedText({ text }) {
    const truncateString = (str) => {
        if (str.length > 32) {
            return (
                <div>
                    {str.slice(0, 32)}
                    <span style={{ letterSpacing: '0px' }}>...</span>
                </div>
            );
        }
        return str;
    };

    return <div>{truncateString(text)}</div>;
}


export default function WishPopup({wishProduct}) {
    const [isAnimating, setIsAnimating] = useState(false);
    const {wishItem, setWishItem, lastWishItem, setLastWishItem} = useContext(WishContext);
    const wishlistPopupItem = wishProduct;

    const handleRemoveWishItem = (itemId) => {
        setIsAnimating(true);
        setTimeout(()=>{
            setWishItem((prevItems) => prevItems.filter(item => item.id !== itemId));
            setLastWishItem((prevItems) => prevItems.filter(item => item.id !== itemId));
        setIsAnimating(false);
    }, 300);
    }

    const handalePopupClose = (itemId) =>{
        setIsAnimating(true);
        setTimeout(()=>{
            setLastWishItem((prevItems) => prevItems.filter(item => item.id !== itemId));
            setIsAnimating(false);
        }, 300);
    }
  return (
    <div>
        <div 
        className={`wish__poupup__item bg-[#e1e1e180] rounded overflow-hidden ${isAnimating ? 'wish__poupup__item exit' : 'wish__poupup__item'} ${lastWishItem.length > 0 ? 'w-[375px] block opacity-100' : 'w-0 hidden opacity-0'}`} 
        style={{backdropFilter: 'blur(30px)'}}
        >
            {wishProduct ? (
            <div className={`p-4 w-[375px]`}>
                <div className="flex justify-between">
                    <p className="text-xs leading-3 mb-3">Your wishlist</p>
                    <button
                    onClick={()=> handalePopupClose(wishlistPopupItem.id)}
                    >
                        <IoClose className='text-[20px]' />
                    </button>
                </div>
                <div className="mt-5 overflow-y-auto">
                    <div className="flex">
                        <div className="flex items-start justify-center border-r border-[#e8e8e8]">
                            <Link href={`/shopping/${wishlistPopupItem.slug}`}>
                                <Image
                                    src={wishlistPopupItem.image}
                                    alt={wishlistPopupItem.name}
                                    width={120}
                                    height={90}
                                    className="h-auto w-[120px]"
                                />
                            </Link>
                        </div>
                        <div className="w-full">
                            <div className="pl-3 pt-[6px] pb-2 relative">
                                <div className='capitalize font-bookish text-[15px] leading-5'>
                                    <TruncatedText text={wishlistPopupItem.name} />
                                </div>
                                <p className='mb-[6px] text-[12px] leading-5'>${wishlistPopupItem.price * wishlistPopupItem.quantity}</p>
                                <div className='flex items-center gap-1 mt-5'>
                                    <span className='text-[12px] leading-[18px] uppercase'>Color: </span>
                                    <span className='text-[12px] leading-[18px] uppercase'>{formatString(wishlistPopupItem.color)}</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <span className='text-[12px] leading-[18px] uppercase'>Size: </span>
                                    <span className='text-[12px] leading-[18px] uppercase'>{wishlistPopupItem.size == null ? "--" : wishlistPopupItem.size}</span>
                                </div>                            
                                <div className="absolute bottom-0 right-1">
                                    <button 
                                    className='hover:cursor-pointe rounded' 
                                    onClick={() => handleRemoveWishItem(wishlistPopupItem.id)}
                                    >
                                        <FaRegTrashAlt className='text-[16px]' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-7">
                    <Link
                    className='px-[14px] py-[7px] text-xs bg-[#e1e1ee80] hover:bg-[#897f7b] rounded uppercase'
                    href='/wishlist'
                    >
                    View Wishlist [{wishItem.length}]
                    </Link>
                </div>
            </div>
            ):""}
        </div>
    </div>
  )
}
