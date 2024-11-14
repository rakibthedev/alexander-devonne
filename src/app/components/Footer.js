"use client"
import React from 'react'
import Link from 'next/link'
import SubscribeForm from './SubscribeForm'
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { useState } from 'react';

export default function Footer() {
  const [activeFooterMenu, setActiveFooterMenu] = useState(null);
  return (
    <div className="block lg:flex gap-24 px-2 pb-2 pt-5 lg:px-5">
      <div className="lg:flex-[25%]">
        <SubscribeForm />
      </div>
      <div className='lg:flex-[75%] grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 px-2'>
        <div className="footer__links pt-5 lg:pt-0 lg:border-none border-t border-[#e8e8e8]">
          <ul className="flex flex-col gap-[6px]">
          <li className="hidden lg:block lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Help</li>
          <div className="flex justify-between items-center cursor-pointer lg:hidden" 
          onClick={()=>{
            if(activeFooterMenu === 1){
              setActiveFooterMenu(null);
            }else{
              setActiveFooterMenu(1);
            }
          }}
          >
              <li className="lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Help</li>
              <div className="lg:hidden text-[24px]">
                {activeFooterMenu === 1 ? <GoChevronUp /> : <GoChevronDown />}
              </div>
            </div>
            <div className={`${activeFooterMenu === 1 ? 'flex p-4 rounded' : 'hidden'} lg:bg-transparent bg-[#f4f4f2] lg:flex flex-col gap-[6px] `}>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Contact Us</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/faq">FAQs</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Shipping & Returns</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Guest Returns</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Payment Methods</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Track your order</Link>
              </li>         
            </div>
          </ul>
        </div>
        <div className="footer__links lg:border-none border-b border-[#e8e8e8] pb-5 lg:pb-0">
          <ul className="flex flex-col gap-[6px]">
          <li className="hidden lg:block lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Legal</li>
          <div className="flex justify-between items-center cursor-pointer lg:hidden" 
          onClick={()=>{
            if(activeFooterMenu === 2){
              setActiveFooterMenu(null);
            }else{
              setActiveFooterMenu(2);
            }
          }}
          >
              <li className="lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Legal</li>
              <div className="lg:hidden text-[24px]">
                {activeFooterMenu === 2 ? <GoChevronUp /> : <GoChevronDown />}
              </div>
            </div>
            <div className={`${activeFooterMenu === 2 ? 'flex p-4 rounded' : 'hidden'} lg:bg-transparent bg-[#f4f4f2] lg:flex flex-col gap-[6px] `}>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Terms & Conditions</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Privacy Policy</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Cookie Policy</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Cookie Preferences</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Regulatory Framework</Link>
              </li>   
            </div>
          </ul>
        </div>
        <div className="footer__links">
          <ul className="flex flex-col gap-[6px]">
            <li className="text-[12px] uppercase font-medium font-ibmPlexMedium">Follow Us</li>          
            <li className="text-[12px] uppercase">
              <Link className="text-xs uppercase hover:underline" href="#">Instagram</Link>
            </li>   
          </ul>
        </div>
      </div>
    </div>
  )
}


