import React from 'react'
import { slugToWords } from '../methods/SlugToWords'
import Link from 'next/link'

export default function CategoryProductNotFound({productCategory}) {
  return (
    <div className='px-3 lg:px-5 pt-5 pb-20 min-h-[400px]'>
        <div> 
            <h1 className="text-[26px] font-bookish">{slugToWords(productCategory)}</h1>
            <p className="my-8 text-xs">
                {`We're currently updating the products in this category. Please stay tuned!`}
            </p>
            <div className='pt-2'>
                <Link href="/" className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded py-2 px-[55px] font-ibmPlexMedium hover:bg-[#897f7b] select-none'>Continue Shopping</Link>
            </div>
        </div>
    </div>
  )
}
