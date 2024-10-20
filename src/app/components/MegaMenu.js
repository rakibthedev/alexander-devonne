import Link from 'next/link'
import React from 'react'

export default function MegaMenu({ menuItem = [] }) { // Provide a default value
  return (
    <div className="menu__container absolute top-[34px] left-0 w-full opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-black/70 min-h-screen hover:invisible hover:opacity-0">
      <div className='menu__wrapper bg-white flex justify-center gap-5 pt-7 pb-7 flex-wrap w-full'>
        {menuItem.map((item, index) => (
          <div key={index} className='flex flex-col gap-2 lg:min-w-[200px] delay-200'>
            <Link className='font-medium hover:underline uppercase font-ibmPlexMedium text-[13px] mb-2' href={item.href}>
              {item.title}
            </Link>
            {item.items.map((menu, id) => (
              <Link className='hover:underline capitalize text-xs' key={id} href={menu.href}>
                {menu.item}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
