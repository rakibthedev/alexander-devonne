import React from 'react'
import WishList from '../components/wishlist/WishList'
import ScrollToTop from '../components/ScrollToTop'

export default function page() {
  // noStore();

  return (
    <div>
      <ScrollToTop />
      <WishList/>
    </div>
  )
}
