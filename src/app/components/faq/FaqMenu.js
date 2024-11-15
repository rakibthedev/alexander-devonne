"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function FaqMenu({ faqs = [] }) {
    const currentPath = usePathname();


    return (
        <div className='faq__menu'>
            <ul className='text-[13px] flex flex-col gap-[6px] uppercase'>
                {faqs.map((item, index) => {
                    return (
                        <li
                            className={`${item.path === currentPath ? 'font-ibmPlexSemiBold' : 'font-ibmPlexRegular'}`}
                            key={index}
                        >
                            <Link href={item.path}>{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
