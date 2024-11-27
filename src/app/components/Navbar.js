import Link from 'next/link';
import MegaMenu from './MegaMenu';
import { useEffect, useState } from 'react';
import { megaMenuItems } from '../constants/megaMenu';

export default function Navbar() {
  const [menuData, setMenuData] = useState(megaMenuItems);

  useEffect(()=>{
    async function getMenuData() {
      const apiUrl =  `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/menu/header-menu`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      if(res.ok){
        setMenuData(data);
      }
    }
    getMenuData();
  },[])
 
  return (
    <>
  <nav className='hidden lg:block px-5 pt-1 pb-2 relative'>
  <ul className='flex justify-center items-center gap-2'>
  {Array.isArray(menuData) && menuData.map((item, index) => ( 
    <li key={index} className='group nav__link rounded'>
            <Link className='hover:underline uppercase px-[11px] py-[5px] block' href={item.menu.menu_link}> 
              {item.menu.menu_title}
            </Link>
            {item.menu.sub_menu && <MegaMenu subMenu={item.menu.sub_menu} />}
       </li>
        ))}
      </ul>
    </nav>
    
    
    </>
  );
}

