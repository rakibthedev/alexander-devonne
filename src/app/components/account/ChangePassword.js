"use client"
import React, { useState, useEffect, useContext } from 'react';
import { LoginContext } from '@/app/context/loginContext';
import { IoClose } from "react-icons/io5";
import { NotificationContext } from '@/app/context/notificationContext';

export default function ChangePassword({cancelChangePwd}) {
    const [errors, setErrors] = useState({});
    const [isInitialRender, setIsInitialRender] = useState(true); // Flag to check if it's initial render
    const [loading, setLoading] = useState(false); // Flag to check if it's initial render
    const {setNotification} = useContext(NotificationContext);
    // Show / hide password state
    const [pwdShow, setPwdShow] = useState({
        password: 'hide',
        confirm_password: 'hide',
    });
    const [currentPwd, setCurrentPwd] = useState({
        password: 'no',
        confirm_password: 'no',
    });
    // Login State 
    const {loggedUserData} = useContext(LoginContext);

    const [value, setValue] = useState({
        password: '',
        confirm_password: ''
    });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValue((prevValue) => ({
            ...prevValue,
            [name]: value
        }));

        // Trigger validation immediately after updating the state
        if (!isInitialRender && Object.keys(errors).length > 0) {
            validateErrors();
        }
    };

    // Validation function
    const checkErrors = () => {
        const newErrors = {};

        // Check password
        if (!value.password) {
            newErrors.password = "Please enter a password";
        } else if (value.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }

        // Check confirm password
        if (!value.confirm_password) {
            newErrors.confirm_password = "Please enter password confirmation";
        } else if (value.password !== value.confirm_password) {
            newErrors.confirm_password = "Your passwords don't match";
        }

        return newErrors;
    };

    // Validate errors
    const validateErrors = () => {
        const checkingErrors = checkErrors();
        setErrors(checkingErrors);  // Update error state immediately
    };



    // Submit Registration Form 
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsInitialRender(false);
        validateErrors(); // Ensure validation is done on submit
        
        if (Object.keys(checkErrors()).length === 0) {
            setLoading(true);
            try{

                const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rakib/v2/change-password`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${loggedUserData.token}`
                    },
                    body: JSON.stringify({
                        password: value.password
                      })
                });
                
                const data = await res.json();
                
                if (res.ok) {                     
                    
                    setLoading(false);

                    setNotification("User password changed successfully."); 
                    
                    cancelChangePwd();

                    notificationGone();                    
                } else {
                    
                    setNotification("Opps! something went wrong changing password");
                    
                    setLoading(false);

                    notificationGone();

                    console.error(data);
                }            
            }catch(error){
                setNotification("Opps! something went wrong changing password");
                setLoading(false);

                notificationGone();

                console.error(error);
                
            }

        }
    };

    const notificationGone = () => {
        setTimeout(() => {
            setNotification(null)
        }, 10000);
    }

    // Watch for changes in form value and run validation when `value` changes
    useEffect(() => {
        if (!isInitialRender && Object.keys(errors).length > 0) {
            validateErrors();
        } else {
            setIsInitialRender(false); // After initial render, stop showing errors
        }
    }, [value]);


    //handle pwdType Toggle function 
    const handlePwdShow = (inputName, isShow) => {
        setPwdShow(prev => ({
            ...prev, // Properly spread the previous state
            [inputName]: isShow// Dynamically set the property for the given input name
        }));
    };
    const handleCurrentPwd = (inputName, isTrue) => {
        setCurrentPwd(prev => ({
            ...prev, 
            [inputName]: isTrue
        }));
    };

    return (
        <div>           
            <form onSubmit={handleSubmit}>
                <div className="custom__form flex flex-col gap-4">
                    <h2 className='text-xs uppercase mb-4'>Change password</h2>

                     {/* Password Input */}
                     <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative w-full ${errors.password ? "h-[72px]" : "h-12"} pwd__container`}>                            
                            {currentPwd.password === 'yes' &&
                            <div>
                                {pwdShow.password === 'hide' ? 
                                    <button
                                    type="button" 
                                    className='absolute outline-none select-none text-xs underline hover:no-underline top-[-6px] right-3 z-[11] pwd__visibility'
                                    onClick={()=>handlePwdShow('password', 'show')}
                                    >
                                        Show
                                    </button>
                                :
                                    <button
                                    type="button" 
                                    className='absolute outline-none select-none text-xs underline hover:no-underline top-[-6px] right-3 z-[11] pwd__visibility'
                                    onClick={()=>handlePwdShow('password', 'hide')}
                                    >
                                        hide
                                    </button>
                                }
                            </div>}
                            <input
                                onChange={handleInputChange}
                                id="password"
                                name="password"
                                className={`absolute form__input ${errors.password ? "bg-[#00448a33]" : "bg-white w-full"} ${value.password ? "active" : ""} h-12 outline-none text-xs leading-5`}
                                autoComplete="off"
                                value={value.password || ''}
                                type={pwdShow.password === 'show' ? 'text' : 'password' || 'password'}
                                onFocus={()=>{
                                    handleCurrentPwd('password', 'yes');
                                }}                                
                                onBlur={()=>{
                                    if(!value.password){                                        
                                        handleCurrentPwd('password', 'no');                                                                    
                                    }
                                }}                                
                            />                            
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="password">
                                New Password
                            </label>
                            {errors.password && !isInitialRender && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                        {/* Confirm Password Input */}
                        <div className={`input__group relative w-full ${errors.confirm_password ? "h-[72px]" : "h-12"} pwd__container`}>
                            {currentPwd.confirm_password === 'yes' &&
                            <div>
                                {pwdShow.confirm_password === 'hide' ? 
                                    <button
                                    type="button" 
                                    className='absolute outline-none select-none text-xs underline hover:no-underline top-[-6px] right-3 z-[11] pwd__visibility'
                                    onClick={()=>handlePwdShow('confirm_password', 'show')}
                                    >
                                        Show
                                    </button>
                                :
                                    <button
                                    type="button" 
                                    className='absolute outline-none select-none text-xs underline hover:no-underline top-[-6px] right-3 z-[11] pwd__visibility'
                                    onClick={()=>handlePwdShow('confirm_password', 'hide')}
                                    >
                                        hide
                                    </button>
                                }
                            </div>}
                            <input
                                onChange={handleInputChange}
                                id="confirm_password"
                                name="confirm_password"
                                className={`absolute form__input ${errors.confirm_password ? "bg-[#00448a33]" : "bg-white w-full"} ${value.confirm_password ? "active" : ""} h-12 outline-none text-xs leading-5`}                                
                                autoComplete="off"
                                value={value.confirm_password || ''}
                                type={pwdShow.confirm_password === 'show' ? 'text' : 'password' || 'password'}
                                onFocus={()=>{
                                    handleCurrentPwd('confirm_password', 'yes');
                                }}                                
                                onBlur={()=>{
                                    if(!value.confirm_password){                                        
                                        handleCurrentPwd('confirm_password', 'no');                                                                    
                                    }
                                }}                              
                                
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="confirm_password">
                                Confirm New Password
                            </label>
                            {errors.confirm_password && !isInitialRender && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.confirm_password}
                                </div>
                            )}
                        </div>
                    </div>
                </div>                

                <div className='flex items-center gap-4'>
                    <button
                        type='button'
                        className={`min-w-[80px] select-none outline-none bg-[#e1e1e180] text-black px-[14px] py-[7px] uppercase text-xs hover:text-white hover:bg-[#897f7b] rounded flex items-center justify-center`}
                        onClick={cancelChangePwd}
                    >   
                    Cancel
                    </button>
                    <button
                        type='submit'
                        className={`min-w-[110px] select-none outline-none bg-[#000000cc] px-[14px] py-[7px] uppercase text-xs text-white ${loading ? 'hover:bg[#000000cc]': 'hover:bg-[#897f7b]'} rounded flex items-center justify-center`}
                        disabled={loading}
                    >   
                        {loading ? 
                        <span className="loading">/</span>
                        : 
                        'Save details'}
                    </button>
                </div>
            </form>
        </div>
    );
}
