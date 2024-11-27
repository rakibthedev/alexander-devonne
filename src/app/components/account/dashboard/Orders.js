import { LoginContext } from '@/app/context/loginContext';
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { formatDate } from '../../methods/formate-date';
import OrderSum from '@/app/components/account/dashboard/OrderSum'

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loaded, setLoaded] = useState(false);
    // Login context 
    const {loggedUserData} = useContext(LoginContext);
    useEffect(()=>{
        
        const retriveOrders = async () => {
                if(loggedUserData){
                    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/order/retrive_order_by_email?email=${loggedUserData.username}`);
                    const data = await res.json();
                    
                    if(res.ok){
                        setOrders(data);
                    }
    
                    setLoaded(true);
                }
        }

        retriveOrders();


    }, []);

  return (
    <div>
        {loaded ? (
            <div>
            {orders.length > 0 ? (
                <div className='flex flex-col gap-5'>
                    <div className="flex justify-start gap-1">
                        <h1 className="text-xs uppercase mb-1">Your orders and returns</h1>
                        <span className='text-xs'>[{orders.length}]</span>
                    </div>
                    {orders.map((item, index)=>{
                        return (
                        <div
                        key={index} 
                        className="flex gap-0 bg-[#eeebeb] rounded p-4">
                            <div className="flex flex-col justify-start flex-[50%]">
                                <p className='text-xs mb-4 capitalize font-ibmPlexMedium'>#{index + 1}</p>

                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Order ID:</p>
                                    <p className='text-xs uppercase'>{item.id || '--'}</p>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Status:</p>
                                    <p className='text-[10px] leading-3 uppercase px-1 py-[3px] rounded bg-black text-white'>{item.status  || '--'}</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Order Date:</p>
                                    <p className='text-xs uppercase'>{formatDate(item.date_created  || '--')}</p>
                                </div>                                
                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Payment Method:</p>
                                    <p className='text-xs uppercase'>{item.payment_method || '--'}</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Transaction id:</p>
                                    <p className='text-xs '>{item.transaction_id || '--'}</p>
                                </div>
                            </div>
                            <div className="flex-[50%] border border-solid border-l-[#d8d8d8] pl-10">
                                <OrderSum lineItems={item.line_items} totalPrice={item.total} shippingTotal={item.shipping_lines[0]?.total || 0}/>
                            </div>
                        </div>
                        )
                    })}

                </div>
            ):(
                <div>
                    <h1 className="text-xs uppercase mb-8">Your orders and returns</h1>

                    <p className="text-xs mb-8">
                        You don’t have any orders or returns. <Link className='underline' href="/">Discover our products</Link> or <Link className='underline' href="/contact-us">contact us</Link> if you need assistance.
                    </p>
                    <div>
                        <Link 
                        className='bg-black rounded text-xs py-[6px] px-[14px] hover:bg-[#897b7f] text-white select-none outline-none uppercase' 
                        href='/'
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            )}
        </div>):(
            <div>
                <div className="text-xs">Loading...</div>
                <div className="loading text-xs">/</div>
            </div>
        )}
        
    </div>
  )
}
