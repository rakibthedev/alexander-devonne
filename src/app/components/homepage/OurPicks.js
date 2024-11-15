import React from 'react'
import ProductGalleryServer from '../ProductGalleryServer'

export default function OurPicks() {
  return (
    <div>
        <div className='px-3 lg:px-5 pb-3'>
            <p className='text-[14px] font-ibmPlexMedium font-medium uppercase'>Our Picks For You</p>
        </div>
        <ProductGalleryServer apiUrl={`https://dummyjson.com/products/search?q=phone`} />
    </div>
  )
}
