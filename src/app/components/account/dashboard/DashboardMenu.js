"use client";
import React, { useContext } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LoginContext } from '@/app/context/loginContext';

export default function DashboardMenu() {

    const currentPath = usePathname();
    const router = useRouter();

    // Login Context 
    const {setLoggedUserData} = useContext(LoginContext);

    const handleLogout = () => {
      setLoggedUserData(null);
      router.push('/account/login')
    }

    return (
        <div className='mt-10'>
            <ul className='text-[11px] flex flex-col gap-1 uppercase text-right'> 
              <li
                  className={`${currentPath === '/dashboard/profile' ? 'underline' : 'font-ibmPlexRegular hover:underline'}`}
              >
                  <Link href='/dashboard/profile'>Your Personal Dashboard</Link>
              </li>
              <li
                  className={`${currentPath === '/dashboard/orders' ? 'underline' : 'font-ibmPlexRegular hover:underline'}`}
              >
                  <Link href='/dashboard/orders'>Orders and returns</Link>
              </li>
              <li
                  className={`${currentPath === '/dashboard/addresses' ? 'underline' : 'font-ibmPlexRegular hover:underline'}`}
              >
                  <Link href='/dashboard/addresses'>Address Book</Link>
              </li>
              <li
                  className={`${currentPath === '/dashboard/wallet' ? 'underline' : 'font-ibmPlexRegular hover:underline'}`}
              >
                  <Link href='/dashboard/wallet'>Payment Methods</Link>
              </li>

              {/* Logout button  */}
              <li
                  className={`font-ibmPlexRegular inline-block mt-5`}
              >
                  <button 
                  className={`font-ibmPlexRegular hover:underline uppercase`} 
                  onClick={handleLogout}>Log out</button>
              </li>
            </ul>
        </div>
    );
}
