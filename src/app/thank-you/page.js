'use client';

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
    const [orderData, setOrderData] = useState(null);
    const [products, setProducts] = useState(null); // State for storing products
    const [orderId, setOrderId] = useState(null); // State for storing order ID

    useEffect(() => {
        // Fetch products from localStorage when the component mounts
        const storedProducts = JSON.parse(localStorage.getItem('orderedItems'));
        if (storedProducts) {
            setProducts(storedProducts.items); // Parse and set products
            setOrderId(storedProducts.orderId); // Set orderId
        }
    }, []); // Only run once on mount

    useEffect(() => {
        // Only fetch order data if orderId is available
        const fetchOrderData = async () => {
            if (orderId) {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/order/get_order?order_id=${orderId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Failed to fetch order data');
                    }

                    const data = await response.json();
                    setOrderData(data); // Set the fetched order data
                } catch (error) {
                    console.error('Error fetching order data:', error);
                }
            }
        };

        if (orderId) {
            fetchOrderData();
        }
    }, [orderId]); // Run this effect whenever the orderId changes

    // If no orderId or orderData is still loading
    if (!orderData || !products) {
        return <LoadingFallback />;
    }

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
                                    <p className='text-[11px] leading-3'>Order #{orderId}</p>
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
                            <OrderSummary items={products} />
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
