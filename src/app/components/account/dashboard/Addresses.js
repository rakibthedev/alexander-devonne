import { LoginContext } from '@/app/context/loginContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';


export default function Addresses() {
    const [loaded, setLoaded] = useState(true);
    // Login context 
    const {loggedUserData} = useContext(LoginContext);
    // Path name 
    const currentPath = usePathname();

  return (
    <div>
        {currentPath === '/dashboard/addresses' && <div>
        {loaded ? (
            <div>
                <h1 className="text-xs uppercase mb-8">Your Address Book</h1>

                <p className="text-xs mb-8">
                    You don’t have any addresses saved. <Link className='underline' href="/">Discover our products</Link> or <Link className='underline' href="/contact-us">contact us</Link> if you need assistance.
                </p>
                <div>
                    <button 
                    className='bg-black rounded text-xs py-[6px] px-[14px] hover:bg-[#897b7f] text-white select-none outline-none uppercase' 
                    
                    >
                        Add New Address
                    </button>
                </div>
            </div>
        ):(
            <div>
                <div className="text-xs">Loading...</div>
                <div className="loading text-xs">/</div>
            </div>
        )}
        
        </div> }
        
    </div>
  )
}
