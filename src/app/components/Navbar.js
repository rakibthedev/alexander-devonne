"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { megaMenuItems } from '../constants/megaMenu'
import MegaMenu from './MegaMenu';

export default function Navbar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className='hidden lg:block px-5 pt-1 pb-2 relative'>
      <ul className='flex justify-center items-center gap-2'>
        {megaMenuItems.map((item) => (
          <li key={item.category} className='group nav__link rounded'>
            <Link className='hover:underline uppercase px-[11px] py-[5px] block' href={item.href}>
              {item.category}
            </Link>
              {isMounted && item.menu && <MegaMenu menuItem={item.menu} />}
          </li>
        ))}
      </ul>
    </nav>
  );
}
