"use client";
import React, { useState, useEffect, useContext} from 'react';
import { validateEmail } from '../methods/ValidateEmail';
import { useRouter } from 'next/navigation';
import { LoginContext } from '@/app/context/loginContext';
import { IoClose } from 'react-icons/io5';

export default function Login({inputBg, title, redirect}) {
    const router = useRouter();

    const [loginData, setLoginData] = useState({
        login_email: '',
        login_password: ''
    });
    const [errors, setErrors] = useState({});
    const [isInitialRender, setIsInitialRender] = useState(true); // Flag for initial render
    const [loading, setLoading] = useState(false); // Flag to check if it's initial render
    const [notification, setNotification] = useState({});
    const [token, setToken] = useState('');
    // Show / hide password state
    const [pwdShow, setPwdShow] = useState({
        login_password: 'hide',
    });
    const [currentPwd, setCurrentPwd] = useState({
        login_password: 'no',
    });

    // Login context 
    const {loggedUserData, setLoggedUserData} = useContext(LoginContext);


    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update login data state
        setLoginData({
            ...loginData,
            [name]: value
        });

        // Remove error for the specific field if it's being corrected
        if (errors[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: null // Remove the error for the current field
            }));
        }
    };

    // Validation function
    const checkErrors = () => {
        const newErrors = {};

        // Validate email
        if (!loginData.login_email) {
            newErrors.login_email = "Please enter an email address";
        } else {
            if (!validateEmail(loginData.login_email)) {
                newErrors.login_email = "Please enter a valid email address";
            }
        }

        // Validate password
        if (!loginData.login_password) {
            newErrors.login_password = "Please enter a password";
        }
        else if (loginData.login_password.length < 6) newErrors.login_password = "Password must be at least 6 characters long";

        return newErrors;
    };

    // Validate errors
    const validateErrors = () => {
        const checkingErrors = checkErrors();

        if (Object.keys(checkingErrors).length === 0) {
            setErrors({});
        } else {
            setErrors(checkingErrors);
        }
    };

    // Handle form submit
    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        setIsInitialRender(false); // Set to false after the initial render

        validateErrors();

        // If there are no errors, proceed with form submission (e.g., API call)
        if (Object.keys(checkErrors()).length === 0) {
            setLoading(true);
            try{

                const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/jwt-auth/v1/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "username": loginData.login_email,
                        "password": loginData.login_password,                        
                    })
                });
                
                const data = await res.json();
                
                if (res.ok) {

                    setLoading(false);

                    setToken(data.token);

                    getLoggedUserData(data.token);

                } else {

                    setNotification({message: "Incorrect email or password!"});

                    setLoading(false);

                    notificationGone();

                    clearLoginData();
                }            
            }catch(error){
                setNotification({message: "Login failed. Try again."});
                setLoading(false);

                notificationGone();

                clearLoginData();
                
            }
        }
    };


    // GetLoggedUserData 
    const getLoggedUserData = async (token) => {

        setLoading(true);
        
        try{

            const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/wp/v2/users/me`, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }                
            });
            
            const data = await res.json();
            
            if (res.ok) {
                const structuredUserData = {
                    id: data.id,
                    username: data.username,
                    email: data.email,
                    full_name: data.name,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone_number: data.custom_fields.phone_number,
                    address: data.custom_fields.address,
                    gender: data.custom_fields.gender,
                    country: data.custom_fields.country,
                    birthdate_day: data.custom_fields.birthdate_day,
                    birthdate_month: data.custom_fields.birthdate_month,
                    birthdate_year: data.custom_fields.birthdate_year,
                    subscribe_to_newsletter: data.custom_fields.subscribe_to_newsletter,
                    token: token                   
                }

                setLoading(false);
                
                // setLoginData to login context
                setLoggedUserData(structuredUserData);    
                
                // // Set cookie for middleware
                document.cookie = `authToken=${data.token}; path=/`;

                router.push(`${redirect}`);
            } else {

                setNotification({message: "Login failed. Try again."});
                
               
                setLoading(false);

                notificationGone();

                clearLoginData();

            }            
        }catch(error){
            setNotification({message: "Login failed. Try again."});            
            setLoading(false);

            notificationGone();

            clearLoginData();
            
        }
    }

    const notificationGone = () => {
        setTimeout(() => {
            setNotification({})
        }, 6000);
    }
    
    const clearLoginData = () => {
        setLoginData(
            {
                login_email: '',
                login_password: ''
            }
        );

        setErrors({});

        setIsInitialRender(true);

    }

    // Effect to handle validation after the initial render
    useEffect(() => {
        if (!isInitialRender) {
            validateErrors(); // Validate the form if it's not the initial render
        }
    }, [loginData]);

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
             {/* Notification Start */}
             {Object.keys(notification).length > 0 && 
            <div className="fixed top-[100px] z-[999999] rounded w-[350px] right-5 p-5 bg-[#e1e1e180] text-xs" style={{backdropFilter: 'blur(3rem)'}}>
               <div className="flex justify-between mb-4">
                    <p className='text-xs uppercase'>Message</p>
                    <button onClick={()=>setNotification({})}>
                        <IoClose className='text-[20px]'/>
                    </button>
                </div> 
                <p className="mb-3">{notification.message}</p>
            </div>
            }
            {/* Notification End */}
            <form onSubmit={handleLoginFormSubmit}>
                <div className="custom__form flex flex-col gap-4">
                    <h2 className='text-xs uppercase mb-4'>{`${title}`}</h2>

                    {/* Email Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative w-full ${errors.login_email ? "h-[72px]" : "h-12"}`}>
                            <input
                                onChange={handleInputChange}
                                id="login_email"
                                name="login_email"
                                className={`absolute form__input ${errors.login_email ? `bg-[#00448a33]` : `bg-[#${inputBg}] w-full`} ${loginData.login_email ? "active" : ""} h-12 outline-none text-xs leading-5`}
                                type="text"
                                autoComplete="off"
                                value={loginData.login_email || ''}
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="login_email">
                                Email Address
                            </label>
                            {!isInitialRender && errors.login_email && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.login_email}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative w-full ${errors.login_password ? "h-[72px]" : "h-12"} pwd__container`}>
                        {currentPwd.login_password === 'yes' &&
                            <div>
                                {pwdShow.login_password === 'hide' ? 
                                    <button
                                    type="button" 
                                    className='absolute outline-none select-none text-xs underline hover:no-underline top-[-6px] right-3 z-[11] pwd__visibility'
                                    onClick={()=>handlePwdShow('login_password', 'show')}
                                    >
                                        Show
                                    </button>
                                :
                                    <button
                                    type="button" 
                                    className='absolute outline-none select-none text-xs underline hover:no-underline top-[-6px] right-3 z-[11] pwd__visibility'
                                    onClick={()=>handlePwdShow('login_password', 'hide')}
                                    >
                                        hide
                                    </button>
                                }
                            </div>}
                            <input
                                onChange={handleInputChange}
                                id="login_password"
                                name="login_password"
                                className={`absolute form__input ${errors.login_password ? "bg-[#00448a33]" : `bg-[#${inputBg}] w-full`} ${loginData.login_password ? "active" : ""} h-12 outline-none text-xs leading-5`}                                
                                autoComplete="off"
                                value={loginData.login_password || ''}
                                type={pwdShow.login_password === 'show' ? 'text' : 'password' || 'password'}
                                onFocus={()=>{
                                    handleCurrentPwd('login_password', 'yes');
                                }}                                
                                onBlur={()=>{
                                    if(!loginData.login_password){                                        
                                        handleCurrentPwd('login_password', 'no');                                                                    
                                    }
                                }}     
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="login_password">
                                Password
                            </label>
                            {!isInitialRender && errors.login_password && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.login_password}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Forgot password link */}
                <div className="flex justify-between">
                    <div></div>
                    <div>
                        <button type="button" className='text-xs underline hover:no-underline'>
                            I forgot my password
                        </button>
                    </div>
                </div>

                {/* Submit button */}
                <div>
                    <button
                        type="submit" 
                        className={`min-w-[75px] select-none outline-none bg-[#000000cc] px-[14px] py-[7px] uppercase text-xs text-white ${loading ? 'hover:bg[#000000cc]': 'hover:bg-[#897f7b]'} rounded flex items-center justify-center`}
                        disabled={loading}
                    >
                        {loading ? 
                        <span className="loading">/</span>
                        : 
                        'Sign In'}
                    </button>
                </div>
            </form>
        </div>    
    );
}
