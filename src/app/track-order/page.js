import React from 'react'
import TrackOrder from '../components/track-order/TrackOrder'
import ScrollToTop from '../components/ScrollToTop'

export default function page() {
  return (
    <div>
        <ScrollToTop />
        <TrackOrder inputBg={`e1e1e180`}/>
    </div>
  )
}
