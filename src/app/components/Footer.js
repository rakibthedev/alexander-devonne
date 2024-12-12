"use client"
import React from 'react'
import Link from 'next/link'
import SubscribeForm from './SubscribeForm'
import { GoChevronUp, GoChevronDown } from "react-icons/go";
import { useState } from 'react';

export default function Footer() {
  const [activeFooterMenu, setActiveFooterMenu] = useState({help: "", legal: ""});
  return (
    <div className="block lg:flex gap-24 px-3 pb-2 pt-5 lg:px-5">
      <div className="lg:flex-[25%]">
        <SubscribeForm />
      </div>
      <div className='lg:flex-[75%] grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8'>
        <div className="footer__links pt-5 lg:pt-0 lg:border-none border-t border-[#e8e8e8]">
          <ul className="flex flex-col gap-[6px]">
          <li className="hidden lg:block lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Help</li>
          <div className="flex justify-between items-center cursor-pointer lg:hidden" 
          onClick={()=>{
            if(activeFooterMenu.help === "active"){
              setActiveFooterMenu(prev => ({...prev, help: ""}));
            }else{
              setActiveFooterMenu(prev => ({...prev, help: "active"}));
            }
          }}
          >
              <li className="lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Help</li>
              <div className="lg:hidden text-[24px]">
                {activeFooterMenu.help === "active" ? <GoChevronUp /> : <GoChevronDown />}
              </div>
            </div>
            <div className={`${activeFooterMenu.help === 'active' ? 'flex p-4 rounded' : 'hidden'} lg:bg-transparent bg-[#f4f4f2] lg:flex flex-col gap-[6px] `}>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/contact-us">Contact Us</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/customer-service/faq">FAQs</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/customer-service/shipping-and-returns">Shipping & Returns</Link>
              </li>
              {/* <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="#">Guest Returns</Link>
              </li> */}
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/customer-service/payment-methods">Payment Methods</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/track-order">Track your order</Link>
              </li>         
            </div>
          </ul>
        </div>
        <div className="footer__links lg:border-none border-b border-[#e8e8e8] pb-5 lg:pb-0">
          <ul className="flex flex-col gap-[6px]">
          <li className="hidden lg:block lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Legal</li>
          <div className="flex justify-between items-center cursor-pointer lg:hidden" 
          onClick={()=>{
            if(activeFooterMenu.legal === "active"){
              setActiveFooterMenu(prev => ({...prev, legal: ""}));
            }else{
              setActiveFooterMenu(prev => ({...prev, legal: "active"}));
            }
          }}
          >
              <li className="lg:text-[12px] text-[13px] uppercase font-medium font-ibmPlexMedium">Legal</li>
              <div className="lg:hidden text-[24px]">
                {activeFooterMenu.legal === "active" ? <GoChevronUp /> : <GoChevronDown />}
              </div>
            </div>
            <div className={`${activeFooterMenu.legal === 'active' ? 'flex p-4 rounded' : 'hidden'} lg:bg-transparent bg-[#f4f4f2] lg:flex flex-col gap-[6px] `}>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/policy/terms-and-conditions">Terms & Conditions</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/policy/privacy-policy">Privacy Policy</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/policy/cookie-policy">Cookie Policy</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/policy/cookie-preferences">Cookie Preferences</Link>
              </li>
              <li className="text-[12px] uppercase">
                <Link className="text-xs uppercase hover:underline" href="/policy/regulatory-framework">Regulatory Framework</Link>
              </li>   
            </div>
          </ul>
        </div>
        <div className="footer__links">
          <ul className="flex flex-col gap-[6px]">
            <li className="text-[12px] uppercase font-medium font-ibmPlexMedium">Follow Us</li>          
            <li className="text-[12px] uppercase">
              <Link className="text-xs uppercase hover:underline" target='_blank' href="https://instagram.com">Instagram</Link>
            </li>   
          </ul>
        </div>
      </div>
    </div>
  )
}


