'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react'; // Import Suspense for boundary handling
import OrderSummary from '../components/thank-you/OrderSummary';
import { CiCircleCheck } from "react-icons/ci";
import Link from 'next/link';

// Fallback loading component
const LoadingFallback = () => (
    <div className="px-2 lg:px-5 py-10 min-h-[500px] bg-[#E2DBC8]">
        <div className='text-[11px]'>Loading...</div>
        <div className='text-[11px] loading'>/</div>
    </div>
);

const Page = () => {
    const searchParams = useSearchParams();
    const [orderData, setOrderData] = useState(null);
    const order_id = searchParams.get('order_id'); // Get the query parameter 'order_id'  
    const products = searchParams.get('data'); // Get the query parameter 'data'  

    useEffect(() => {
        // Only make the API call if order_id is available
        if (order_id) {
            const fetchOrderData = async () => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/order/get_order?order_id=${order_id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch order data');
                    }

                    const data = await response.json();
                    setOrderData(data);
                } catch (error) {
                    console.error('Error fetching order data:', error);
                }
            };

            fetchOrderData();
        }
    }, [order_id]); // Runs when order_id changes

    // If no order_id or orderData is still loading
    if (!order_id || !orderData) {
        return <LoadingFallback />;
    }

    // If the 'products' parameter exists, parse it back to an array of objects
    const parsedProducts = products ? JSON.parse(JSON.parse(decodeURIComponent(products))) : [];

    return (
        <div className="px-2 lg:px-5 py-20 min-h-[500px] bg-[#E2DBC8]">
            {orderData.status === "completed" ? (
                <div>
                    <div className="flex-col gap-10 lg:flex lg:flex-row lg:gap-20 w-full">
                        <div className="lg:flex-[70%] flex-[100%]">
                            <div className="flex gap-1">
                                <div>
                                    <CiCircleCheck className='text-[35px]' />
                                </div>
                                <div>
                                    <p className='text-[11px] leading-3'>Order #{order_id}</p>
                                    <h2 className='font-bookish text-[28px] leading-7'>Thank you!</h2>
                                </div>
                            </div>
                            <div className="mt-10">
                                <h3 className='font-bookish text-[16px]'>
                                    Your order is confirmed. We are preparing your items for shipment and will notify you when it is on its way!
                                </h3>
                            </div>
                            <div className="mt-8 mb-10">
                                <Link href="/" className='bg-[#000000cc] inline-block text-center text-white text-[14px] uppercase rounded py-2 px-[14px] font-ibmPlexMedium hover:bg-[#897f7b]'>
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                        <div className="lg:flex-[30%] max-w-[350px] flex-[100%]">
                            <OrderSummary items={parsedProducts} />
                        </div>
                    </div>

                </div>
            ) : (
                <LoadingFallback />
            )}
        </div>
    );
};

// Wrap the Page component with Suspense to handle asynchronous behavior
export default function PageWithSuspense() {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Page />
        </Suspense>
    );
}
