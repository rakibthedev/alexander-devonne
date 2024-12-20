"use client"
import React from 'react'

import DashboardMenu from '@/app/components/account/dashboard/DashboardMenu'
import Profile from '@/app/components/account/dashboard/Profile'
import Orders from '@/app/components/account/dashboard/Orders'
import Addresses from '@/app/components/account/dashboard/Addresses'
import PaymentMethods from './../../components/account/dashboard/PaymentMethods';
import ScrollToTop from '@/app/components/ScrollToTop';

export default function page() {
  
  return (
    <div className='pt-5 pb-32 px-3 lg:px-5 bg-[#ddd7d6] min-h-[500px]'>
      <ScrollToTop />
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
        <div className="flex-[100%] lg:flex-[60%]">
            <Profile />
          
          
            <Orders />
          
          
            <Addresses />
          
            <PaymentMethods />
                     
        </div>
        <div className="flex-[100%] lg:flex-[40%] flex mt-5 justify-end">
          <DashboardMenu />
        </div>
      </div>
    </div>
  )
}
