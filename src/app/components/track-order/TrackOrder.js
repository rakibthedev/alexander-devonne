"use client"
import React, { useContext, useState } from 'react'
import OrderFound from '@/app/components/track-order/OrderFound'
import { validateEmail } from '../methods/ValidateEmail';
import { NotificationContext } from '@/app/context/notificationContext';

export default function TrackOrder({inputBg}) {
    const [value, setValue] = useState({});
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [foundedOrderData, setFoundedOrderData] = useState({});
    
    // Notification context init 
    const {setNotification} = useContext(NotificationContext);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        // Set value to current input state
        setValue(prev => ({...prev, [name]: value }));
        // Validate if any errors when inputting 
        // validateErrors();
    }

    const validateErrors = () => {
        const newErrors = {};
        // Order Number validate 
        if(!value.order_number) newErrors.order_number = "Please enter an order number";
        // Order Email validate 
        if(!value.order_email){
            newErrors.order_email = "Please enter a email address";
        } else if (!validateEmail(value.order_email)) {
            newErrors.order_email = "Please enter a valid email address";
        }

        setErrors(newErrors);

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorsValidation = validateErrors();

        if(Object.keys(errorsValidation).length === 0){

            setLoading(true);

            findOrder();           

        }else{
            setLoading(false);
        }
    }

    const findOrder = async () => {    
        let trackedData = [];
        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/order/track_order?email=${value.order_email}&order_number=${value.order_number}`);
            const result = await response.json();
            if(response.ok){
                setLoading(false);
                    trackedData.push(result.data);
                    setFoundedOrderData(trackedData);
                    console.log(trackedData)
            }else{                
                setNotification("Oops! Something went wrong. Please double-check your order number and email address to ensure they are correct.");                
                setLoading(false);
            }
        } catch (error) {
            setNotification("Oops! Something went wrong tracking order. Try again with correct input.");         
            setLoading(false);
        }       

    }

  return (
    <div>
        {foundedOrderData.length > 0 ? (
            <OrderFound orderData={foundedOrderData}/>
        ):(
        <div className="max-w-full lg:max-w-[400px] px-3 lg:px-5 pt-5 pb-16 min-h-screen">
            <h1 className="text-xs uppercase mb-5">Track your order</h1>
            <p className="text-xs leading-4">To track your order or see other details relating to it enter your order number and email used at checkout. This information can be found in the order confirmation email you’ve received.</p>
            <form onSubmit={handleSubmit}>
                <div className="custom__form flex flex-col gap-4 pt-3">                    
                    {/* Order Number Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative top-8 w-full ${errors.order_number ? "h-[72px]" : "h-12"}`}>
                            <input
                                onChange={handleInputChange}
                                id="order_number"
                                name="order_number"
                                className={`absolute form__input ${errors.order_number ? `bg-[#00448a33]` : `bg-[#${inputBg}] w-full`} ${value.order_number ? "active" : ""} h-12 outline-none text-xs leading-5`}
                                type="text"
                                autoComplete="off"
                                value={value.order_number || ''}
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="order_number">
                                Order Number
                            </label>
                            {errors.order_number && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.order_number}
                                </div>
                            )}
                        </div>
                    </div>

                     {/* Order Email Input */}
                     <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative top-8 w-full ${errors.order_email ? "h-[72px]" : "h-12"}`}>
                            <input
                                onChange={handleInputChange}
                                id="order_email"
                                name="order_email"
                                className={`absolute form__input ${errors.order_email ? `bg-[#00448a33]` : `bg-[#${inputBg}] w-full`} ${value.order_email ? "active" : ""} h-12 outline-none text-xs leading-5`}
                                type="text"
                                autoComplete="off"
                                value={value.order_email || ''}
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="order_email">
                                Email Address
                            </label>
                            {errors.order_email && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.order_email}
                                </div>
                            )}
                        </div>
                    </div>

                     {/* Submit button */}
                    <div>
                        <button
                            type="submit" 
                            className={`mt-5 min-w-[95px] select-none outline-none bg-[#000000cc] px-[14px] py-[7px] uppercase text-xs text-white ${loading ? 'hover:bg[#000000cc]': 'hover:bg-[#897f7b]'} rounded flex items-center justify-center`}
                            disabled={loading}
                        >
                            {loading ? 
                            <span className="loading">/</span>
                            : 
                            'View Order'}
                        </button>
                    </div>
                </div>                
            </form>
        </div>
        )}
    </div>
  )
}
