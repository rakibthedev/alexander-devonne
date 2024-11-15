// app/ProductSet.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight } from "react-icons/fi";
import ProductGalleryServer from '../ProductGalleryServer';
import {productSetData} from '../../constants/productSetData'

export default function ProductSet({setId}) {
  const filterProductSet = productSetData.filter(item => item.setId == setId);
  return (
    <>
      {filterProductSet.map((item, index) =>{
        return (
          <div key={index}>
            <section className='px-3 lg:px-5 mb-12 lg:mb-28'>
              <Link href={item.firstLinkHref}>
                <Image className="w-full h-auto" src={item.thumbnailUrl} width={700} height={540} alt={item.title} />
              </Link>
              <div className="flex pt-[14px]">
                <Link className='text-2xl' href={item.firstLinkHref}><span className='font-bookish'>{item.title}</span></Link>
              </div>
              <Link className='product__set__link text-xs uppercase mt-[13px] ml-[2px] pb-[2px] border-b border-black' href={item.firstLinkHref}>{item.firstLinkText}</Link>
            </section>
            <section className='px-3 lg:px-5 mb-3'>
              <div className="flex items-end gap-5" style={{maxWidth: "calc(100vw - 90px)"}}>
                  <span className='text-[14px] font-me  font-ibmPlexMedium uppercase'>{item.secondTitle}</span>
                  <div className="flex items-center gap-2">
                    <Link className='underline text-xs whitespace-nowrap' href={item.secondLinkHref}>{item.secondLinkText}</Link>
                    <Link className='text-[12px]' href={item.secondLinkHref}><FiArrowRight /></Link>
                  </div>
                </div>
            </section>
            <ProductGalleryServer apiUrl={item.apiUrl} />
          </div>
        )
      })}
    </>
  );
}
