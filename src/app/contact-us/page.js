import React from 'react'
import ContactUs from '../components/contact-us/ContactUs'
import ScrollToTop from '@/app/components/ScrollToTop';

export default function Page() {
  return (
    <div>
        <ScrollToTop />
        <ContactUs inputBg={'e1e1e180'}/>
    </div>
  )
}
