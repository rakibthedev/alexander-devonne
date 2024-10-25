"use client";
import Link from 'next/link';
import { React, useContext } from 'react';
import Image from 'next/image';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import { HiMenuAlt4 } from "react-icons/hi";
import Navbar from './Navbar';
import { CartContext } from '@/app/context/cartContext';
import { WishContext } from '../context/wishContext';

export default function HeaderMain() {
  const { cartItem = [], setPopupShow } = useContext(CartContext) || {}; // Default to empty array
  const cartItemCount = cartItem.length;

  const showBagPopup = () => {
    setPopupShow(true);
  };

  const { wishItem = [] } = useContext(WishContext) || {}; // Default to empty array
  const wishItemCount = wishItem.length;

  return (
    <div className='header__main bg-white sticky z-[100] w-full top-0'>
      <div className='px-2 py-2 lg:px-5 flex justify-between lg:pt-3 items-center'>
        <div className='flex-[25%] lg:hidden'>
          <button className='border-none p-0 outline-none text-[24px]'><HiMenuAlt4 /></button>
        </div>
        <div className='hidden lg:flex justify-start gap-[30px] items-center flex-[25%]'>
          <div className='flex justify-between gap-1 items-center'>
            <button className='border-none p-0 outline-none text-xs font-normal hover:underline'>United States $</button>
            <span className='text-xs'>/</span>
            <button className='border-none p-0 outline-none text-xs font-normal hover:underline'>EN</button>
          </div>
          <Link href="#" className='border-none p-0 outline-none text-xs font-normal hover:underline'>Contact us</Link>
        </div>
        <div className='flex-[50%] flex justify-center'>
          <Link href="/"><Image className='h-auto lg:w-[200px] lg:h-auto' src='/images/logo.png' width={150} height={50} alt="Alexander Devonne" /></Link>
        </div>
        <div className='flex-[25%] flex justify-end gap-[30px] items-center'>
          <div className='flex justify-between gap-[25px] items-center'>
            <Link href="#" className='hidden lg:block border-none p-0 outline-none text-xs font-normal hover:underline'>Login</Link>
            <button className='border-none p-0 outline-none text-[18px] font-normal hover:underline'><IoSearchOutline /></button>
            <Link href="/wishlist" className='hidden lg:block text-[18px]'>
              <div className="relative">
                <IoIosHeartEmpty />
                <span className='absolute top-[-4px] left-[18px] text-[8px]'>{wishItemCount > 0 ? wishItemCount : ''}</span>
              </div>
            </Link>
            <button className='text-[18px]' onMouseEnter={showBagPopup}>
              <div className="relative">
                <BsBag />
                <span className='absolute top-[-4px] left-[18px] text-[8px]'>{cartItemCount > 0 ? cartItemCount : ''}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <Navbar />
    </div>
  );
}
