import React from 'react';
import Marquee from "react-fast-marquee";
import Link from 'next/link'

export default function HeaderTop() {
  return (
    <div className='relative z-[999] font-ibmPlexRegular border-b border-black border-solid'>
        <Marquee pauseOnHover="true" speed="15">
            <p className='py-[7px] text-[11px]'><Link className='hover:underline' href="#">JOIN</Link> the Alexander Devonne community ~ 10% off your first order on full price items.</p>
        </Marquee>
    </div>
  )
}
