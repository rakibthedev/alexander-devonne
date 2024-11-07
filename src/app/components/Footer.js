import React from 'react'
import Link from 'next/link'
import SubscribeForm from './SubscribeForm'

export default function Footer() {
  return (
    <div className="block lg:flex gap-24 px-2 pb-2 pt-5 lg:px-5">
      <div className="lg:flex-[25%]">
        <SubscribeForm />
      </div>
      <div className='lg:flex-[75%] grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className="footer__links">
          <ul className="flex flex-col gap-[6px]">
            <li className="text-[12px] uppercase font-medium font-ibmPlexMedium">Help</li>
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
          </ul>
        </div>
        <div className="footer__links">
          <ul className="flex flex-col gap-[6px]">
            <li className="text-[12px] uppercase font-medium font-ibmPlexMedium">Leagal</li>
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


