"use client"
import React, { useContext, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs';
import { validateEmail } from '../methods/ValidateEmail';
import { NotificationContext } from '@/app/context/notificationContext';

export default function ContactUs({inputBg}) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [value, setValue] = useState({});
  
  // Notification Context 
  const {notification, setNotification} = useContext(NotificationContext);
  // Input value change function 
  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setValue(prev => ({...prev, [name]: value}));    
  }

  //Validate errors function 
  const validateErrors = () =>{
    let newErrors = {};

    if(!value.email) newErrors.email = "Please enter your email address";
    else if (!validateEmail(value.email)) newErrors.email = "Please enter a valid email address";
    
    if(!value.enquiry_reason) newErrors.enquiry_reason = "Please select an enquiry reason";

    if(!value.contact_message) newErrors.contact_message = "Please enter a message";

      setErrors(newErrors);

      return newErrors;
  }

  // Form submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateErrors();

    if(Object.keys(validationErrors).length === 0){
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/subscribe/send-subscribe-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            form_id: 434,
            fields:{
              "first_name": value.first_name || '--',
              "last_name": value.last_name || '--',
              "your-name": `${value.first_name || '-'} ${value.last_name || '-'}` ,
              "your-email": value.email,
              "your-subject": "New Message From Contact Page",
              "your-email": value.email,
              "enquiry_reason": value.enquiry_reason,
              "phone_number": value.phone_number || "--",
              "order_number": value.order_number || "--",
              "your-message": value.contact_message,
              "domain_address": process.env.NEXT_PUBLIC_DOMAIN_ADDRESS,
              "wp_address": process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL,
            }
          }),
        });

        const result = await response.json();
        if (response.ok) {
          setValue({});
          setNotification("We have recieved you message. You will notify by email. thank you!")        
          setLoading(false);
          clearNotification();
        } else {
          setNotification("Opps! something went wrong. Try again.")
          setLoading(false);
          clearNotification();

        }
      } catch (error) {
        setNotification("Opps! something went wrong. Try again.")
        setLoading(false);
        clearNotification();

      }
    }

  }

  // Clear Notification after 10 seconds 
  const clearNotification = () => {
    setTimeout(()=>{
      setNotification(null);
    }, 10000);
  }
  return (
    <div className='px-3 lg:px-5 pt-5 pb-10 min-h-screen'>
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex-[100%] lg:flex-[70%]">
          <h1 className="text-[26px] mb-9 font-bookish uppercase">CONTACT US</h1>
          <p className='text-xs'>
            Customer service support, inquiries related to: prices and currency, order and preorder payment, order status, shipment info, return and exchange.
          </p>
          <h2 className="mb-4 mt-10 text-xs uppercase">Send an enquiry</h2>
          <div className="custom__form pt-5">
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-4'>
                  {/* Input row */}
                  <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.first_name ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="first_name"
                        name="first_name"
                        className={`absolute form__input ${
                          errors.first_name ? "bg-[#B5BDBC]" :`bg-[#${inputBg}]`
                        } ${
                          value.first_name ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={value.first_name || ''}
                      />
                      <label
                        className={`form__label text-xs absolute`}
                        htmlFor="first_name"
                      >
                        First Name (optional)
                      </label>
                      {errors.first_name && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.first_name}
                        </div>
                      )}
                    </div>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.last_name ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="last_name"
                        name="last_name"
                        className={`absolute form__input ${
                          errors.last_name ? "bg-[#B5BDBC]" : `bg-[#${inputBg}]`
                        } ${
                          value.last_name ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={value.last_name  || ''}
                      />
                      <label
                        className={`form__label text-xs absolute`}
                        htmlFor="last_name"
                      >
                        Last Name (optional)
                      </label>
                      {errors.last_name && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.last_name}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Input row */}
                  <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.phone_number ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="phone_number"
                        name="phone_number"
                        className={`absolute form__input ${
                          errors.phone_number ? "bg-[#B5BDBC]" :`bg-[#${inputBg}]`
                        } ${
                          value.phone_number ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={value.phone_number || ''}
                      />
                      <label
                        className={`form__label text-xs absolute`}
                        htmlFor="phone_number"
                      >
                        Phone Number (optional)
                      </label>
                      {errors.phone_number && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.phone_number}
                        </div>
                      )}
                    </div>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.email ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="email"
                        name="email"
                        className={`absolute form__input ${
                          errors.email ? "bg-[#B5BDBC]" : `bg-[#${inputBg}]`
                        } ${
                          value.email ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={value.email  || ''}
                      />
                      <label
                        className={`form__label text-xs absolute`}
                        htmlFor="email"
                      >
                        Email Address
                      </label>
                      {errors.email && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.email}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Input row */}
                  <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                      {/* Form Input  */}
                      <div
                        className={`input__group relative w-full ${
                          errors.enquiry_reason ? "h-[72px]" : "h-12"
                        }`}
                      >
                        <select
                          id="enquiry_reason"
                          name="enquiry_reason"
                          value={value.enquiry_reason || ''}
                          className={`custom__select ${value.enquiry_reason ? 'active' : ''} ${
                            errors.enquiry_reason ? "bg-[#B5BDBC]" : `bg-[#${inputBg}]`} absolute top-1 left-0 form__input w-full h-12 outline-none text-xs leading-5`}
                          onChange={handleInputChange}
                        >
                          <option value="" hidden></option>
                          <option value="Product Information">Product Information</option>
                          <option value="Shipping">Shipping</option>
                          <option value="Return">Return</option>
                          <option value="Press">Press</option>
                          <option value="Order Info">Order Info</option>
                          <option value="Other">Other</option>
                        </select>
                        <label
                          className={`form__label w-full left-0 text-xs absolute`}
                          htmlFor="enquiry_reason"
                        >
                          Enquiry Reason
                        </label>
                        <BsChevronDown className="absolute top-0 z-[10] text-[11px] right-4" />
                        {errors.enquiry_reason && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.enquiry_reason}
                        </div>
                      )}
                      </div>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.order_number ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="order_number"
                        name="order_number"
                        className={`absolute form__input ${
                          errors.order_number ? "bg-[#B5BDBC]" : `bg-[#${inputBg}]`
                        } ${
                          value.order_number ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={value.order_number  || ''}
                      />
                      <label
                        className={`form__label text-xs absolute`}
                        htmlFor="order_number"
                      >
                        Order Number (optional)
                      </label>
                      {errors.order_number && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.order_number}
                        </div>
                      )}
                    </div>
                  </div>                
                  {/* Input row */}
                  <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full mt-2`}>                      
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.contact_message ? "h-[180px]" : "h-[160px]"
                      }`}
                    >
                      <textarea
                        onChange={handleInputChange}
                        id="contact_message"
                        name="contact_message"
                        className={`absolute form__input form__textarea ${
                          errors.contact_message ? "bg-[#B5BDBC]" : `bg-[#${inputBg}]`
                        } ${
                          value.contact_message ? "active" : ""
                        } outline-none text-xs leading-5`}                        
                        autoComplete="off"
                        value={value.contact_message  || ''}
                        rows="7"
                        style={{ resize: 'none' }}  // Disable resizing                        
                      >
                      </textarea>
                      <label
                        className={`form__label text-xs absolute`}
                        htmlFor="contact_message"
                      >
                        Your message (360 characters max).
                      </label>
                      {errors.contact_message && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.contact_message}
                        </div>
                      )}
                    </div>
                  </div>                
                </div>
                 {/* Submit button */}
                 <div>
                      <button
                          type="submit" 
                          className={`min-w-[68px] select-none outline-none bg-[#000000cc] px-[14px] py-[7px] uppercase text-xs text-white ${loading ? 'hover:bg[#000000cc]': 'hover:bg-[#897f7b]'} rounded flex items-center justify-center`}
                          disabled={loading}
                      >
                          {loading ? 
                          <span className="loading">/</span>
                          : 
                          'Submit'}
                      </button>
                  </div>
            </form>
          </div>
        </div>
        <div className="flex-[100%] lg:flex-[30%]">

        </div>
      </div>
    </div>
  )
}
