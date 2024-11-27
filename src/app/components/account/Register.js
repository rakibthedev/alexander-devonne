"use client"
import React, { useState, useEffect, useContext } from 'react';
import { validateEmail } from './../methods/ValidateEmail';
import Link from 'next/link';
import { BsChevronDown } from "react-icons/bs";
import { LoginContext } from '@/app/context/loginContext';
import { useRouter } from 'next/navigation';
import { IoClose } from 'react-icons/io5';

export default function Register() {
    const router = useRouter();

    const [value, setValue] = useState({
        gender: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
        country: 'US',
        birthdate_day: '',
        birthdate_month: '',
        birthdate_year: ''
    });

    const [errors, setErrors] = useState({});
    const [isInitialRender, setIsInitialRender] = useState(true); // Flag to check if it's initial render
    const [loading, setLoading] = useState(false); // Flag to check if it's initial render
    const [notification, setNotification] = useState({});
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
    const {loggedUserData, setLoggedUserData} = useContext(LoginContext);

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

        // Check first name
        if (!value.first_name) {
            newErrors.first_name = "Please enter your first name";
        }

        // Check last name
        if (!value.last_name) {
            newErrors.last_name = "Please enter your last name"; 
        }

        // Check email
        if (!value.email) {
            newErrors.email = "Please enter an email address";
        } else {
            if (!validateEmail(value.email)) {
                newErrors.email = "Please enter a valid email address";
            }
        }

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
    const handleRegisterFormSubmit = async (e) => {
        e.preventDefault();
        setIsInitialRender(false);
        validateErrors(); // Ensure validation is done on submit
        
        if (Object.keys(checkErrors()).length === 0) {
            setLoading(true);
            try{

                const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/rakib/v2/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "email": value.email,
                        "password": value.password,
                        "first_name": value.first_name,
                        "last_name": value.last_name,
                        "phone_number": "",
                        "address": "",
                        "gender": value.gender,
                        "country": value.country,
                        "birthdate_day": value.birthdate_day,
                        "birthdate_month": value.birthdate_month,
                        "birthdate_year": value.birthdate_year,
                        "subscribe_to_newsletter": "no"
                    })
                });
                
                const data = await res.json();
                
                if (res.ok) {

                    const token = await login();

                    const structuredUserData = {
                        id: data.user_data.user_id,
                        username: data.user_data.email,
                        email: data.user_data.email,
                        full_name: data.user_data.display_name,
                        first_name: data.user_data.first_name,
                        last_name: data.user_data.last_name,
                        phone_number: data.user_data.phone_number_rkb,
                        address: data.user_data.address_rkb,
                        gender: data.user_data.gender_rkb,
                        country: data.user_data.country_rkb,
                        birthdate_day: data.user_data.birthdate_day_rkb,
                        birthdate_month: data.user_data.birthdate_month_rkb,
                        birthdate_year: data.user_data.birthdate_year_rkb,
                        subscribe_to_newsletter: data.user_data.subscribe_to_newsletter_rkb,
                        token: token                                         
                    }                 

                    // setLoginData to Login Context
                   setLoggedUserData(structuredUserData);  
                    
                    setLoading(false);
                    
                    router.push('/dashboard/profile');
                } else {

                    if(data === "email_exist_yes"){
                        setNotification({message: "Opps! Email already exist."});
                    }else if(data === "Sorry, that username already exists!"){
                        setNotification({message: "Sorry, that email or username already exists!"});
                    }else{
                        setNotification({message: "Opps! something went wrong creating new account"});
                    }
                    setLoading(false);

                    regErrorGone();

                    console.error(data);
                }            
            }catch(error){
                setNotification({message: "Opps! something went wrong creating new account"});
                setLoading(false);

                regErrorGone();

                console.error(error);
                
            }

        }
    };

    const login = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "username": value.email,
                "password": value.password                        
            })
        });
        
        const data = await res.json();

        return data.token;
    }

    const regErrorGone = () => {
        setTimeout(() => {
            setNotification({})
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
            <form onSubmit={handleRegisterFormSubmit}>
                <div className="custom__form flex flex-col gap-4">
                    <h2 className='text-xs uppercase mb-5'>Edit Your Personal Information</h2>

                    {/* Gender Input  */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-2 w-full`}>
                        <div className="input__group relative h-12 w-full">
                            <select
                                id="gender"
                                name="gender"
                                value={value.gender || ''}
                                className={`custom__select ${value.gender ? 'active' : ''} bg-[#e1e1e180] absolute top-1 left-0 form__input w-full h-12 outline-none text-xs leading-5`}
                                onChange={handleInputChange}
                            >
                                <option value="" hidden></option>
                                <option value="Prefer not to say">Prefer not to say</option>
                                <option value="Man">Man</option>
                                <option value="Woman">Woman</option>
                            </select>
                            <label
                                className={`form__label w-full left-0 text-xs absolute select-none`}
                                htmlFor="gender"
                            >
                                {`Gender (optional)`}
                            </label>
                            <BsChevronDown className="absolute top-0 z-[10] text-black text-[11px] right-4" />
                        </div>
                    </div>
                    {/* First Name Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative w-full ${errors.first_name ? "h-[72px]" : "h-12"}`}>
                            <input
                                onChange={handleInputChange}
                                id="first_name"
                                name="first_name"
                                className={`absolute form__input ${errors.first_name ? "bg-[#00448a33]" : "bg-[#e1e1e180] w-full"} ${value.first_name ? "active" : ""} h-12 outline-none text-xs leading-5`}
                                type="text"
                                autoComplete="off"
                                value={value.first_name || ''}
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="first_name">
                                First Name
                            </label>
                            {errors.first_name && !isInitialRender && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.first_name}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Last Name Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative w-full ${errors.last_name ? "h-[72px]" : "h-12"}`}>
                            <input
                                onChange={handleInputChange}
                                id="last_name"
                                name="last_name"
                                className={`absolute form__input ${errors.last_name ? "bg-[#00448a33]" : "bg-[#e1e1e180] w-full"} ${value.last_name ? "active" : ""} h-12 outline-none text-xs leading-5`}
                                type="text"
                                autoComplete="off"
                                value={value.last_name || ''}
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="last_name">
                                Last Name
                            </label>
                            {errors.last_name && !isInitialRender && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.last_name}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className={`input__group relative w-full ${errors.email ? "h-[72px]" : "h-12"}`}>
                            <input
                                onChange={handleInputChange}
                                id="email"
                                name="email"
                                className={`absolute form__input ${errors.email ? "bg-[#00448a33]" : "bg-[#e1e1e180] w-full"} ${value.email ? "active" : ""} h-12 outline-none text-xs leading-5`}
                                type="text"
                                autoComplete="off"
                                value={value.email || ''}
                            />
                            <label className="form__label text-xs absolute capitalize select-none" htmlFor="email">
                                Email Address
                            </label>
                            {errors.email && !isInitialRender && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>

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
                                className={`absolute form__input ${errors.password ? "bg-[#00448a33]" : "bg-[#e1e1e180] w-full"} ${value.password ? "active" : ""} h-12 outline-none text-xs leading-5`}
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
                                Password
                            </label>
                            {errors.password && !isInitialRender && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.password}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Confirm Password Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
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
                                className={`absolute form__input ${errors.confirm_password ? "bg-[#00448a33]" : "bg-[#e1e1e180] w-full"} ${value.confirm_password ? "active" : ""} h-12 outline-none text-xs leading-5`}                                
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
                                Confirm Password
                            </label>
                            {errors.confirm_password && !isInitialRender && (
                                <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.confirm_password}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Country Input */}
                    <div className={`flex flex-col lg:flex-row items-stretch gap-4 w-full`}>
                        <div className="input__group relative h-12 w-full">
                            <select
                                id="country"
                                name="country"
                                value={value.country || 'US'}
                                className={`custom__select bg-[#e1e1e180] absolute top-1 left-0 form__input active w-full h-12 outline-none text-xs leading-5`}
                                onChange={handleInputChange}
                            >
                                <option value="" hidden></option>
                                <option value="AF">Afghanistan</option>
                                <option value="AL">Albania</option>
                                <option value="DZ">Algeria</option>
                                <option value="AD">Andorra</option>
                                <option value="AO">Angola</option>
                                <option value="AG">Antigua and Barbuda</option>
                                <option value="AR">Argentina</option>
                                <option value="AM">Armenia</option>
                                <option value="AU">Australia</option>
                                <option value="AT">Austria</option>
                                <option value="AZ">Azerbaijan</option>
                                <option value="BS">Bahamas</option>
                                <option value="BH">Bahrain</option>
                                <option value="BD">Bangladesh</option>
                                <option value="BB">Barbados</option>
                                <option value="BY">Belarus</option>
                                <option value="BE">Belgium</option>
                                <option value="BZ">Belize</option>
                                <option value="BJ">Benin</option>
                                <option value="BT">Bhutan</option>
                                <option value="BO">Bolivia</option>
                                <option value="BA">Bosnia and Herzegovina</option>
                                <option value="BW">Botswana</option>
                                <option value="BR">Brazil</option>
                                <option value="BN">Brunei</option>
                                <option value="BG">Bulgaria</option>
                                <option value="BF">Burkina Faso</option>
                                <option value="BI">Burundi</option>
                                <option value="CV">Cabo Verde</option>
                                <option value="KH">Cambodia</option>
                                <option value="CM">Cameroon</option>
                                <option value="CA">Canada</option>
                                <option value="CF">Central African Republic</option>
                                <option value="TD">Chad</option>
                                <option value="CL">Chile</option>
                                <option value="CN">China</option>
                                <option value="CO">Colombia</option>
                                <option value="KM">Comoros</option>
                                <option value="CG">Congo, Republic of the</option>
                                <option value="CD">
                                Congo, Democratic Republic of the
                                </option>
                                <option value="CR">Costa Rica</option>
                                <option value="HR">Croatia</option>
                                <option value="CU">Cuba</option>
                                <option value="CY">Cyprus</option>
                                <option value="CZ">Czech Republic</option>
                                <option value="DK">Denmark</option>
                                <option value="DJ">Djibouti</option>
                                <option value="DM">Dominica</option>
                                <option value="DO">Dominican Republic</option>
                                <option value="EC">Ecuador</option>
                                <option value="EG">Egypt</option>
                                <option value="SV">El Salvador</option>
                                <option value="GQ">Equatorial Guinea</option>
                                <option value="ER">Eritrea</option>
                                <option value="EE">Estonia</option>
                                <option value="SZ">Eswatini</option>
                                <option value="ET">Ethiopia</option>
                                <option value="FJ">Fiji</option>
                                <option value="FI">Finland</option>
                                <option value="FR">France</option>
                                <option value="GA">Gabon</option>
                                <option value="GM">Gambia</option>
                                <option value="GE">Georgia</option>
                                <option value="DE">Germany</option>
                                <option value="GH">Ghana</option>
                                <option value="GR">Greece</option>
                                <option value="GD">Grenada</option>
                                <option value="GT">Guatemala</option>
                                <option value="GN">Guinea</option>
                                <option value="GW">Guinea-Bissau</option>
                                <option value="GY">Guyana</option>
                                <option value="HT">Haiti</option>
                                <option value="HN">Honduras</option>
                                <option value="HU">Hungary</option>
                                <option value="IS">Iceland</option>
                                <option value="IN">India</option>
                                <option value="ID">Indonesia</option>
                                <option value="IR">Iran</option>
                                <option value="IQ">Iraq</option>
                                <option value="IE">Ireland</option>
                                <option value="IL">Israel</option>
                                <option value="IT">Italy</option>
                                <option value="JM">Jamaica</option>
                                <option value="JP">Japan</option>
                                <option value="JO">Jordan</option>
                                <option value="KZ">Kazakhstan</option>
                                <option value="KE">Kenya</option>
                                <option value="KI">Kiribati</option>
                                <option value="KP">Korea, North</option>
                                <option value="KR">Korea, South</option>
                                <option value="KW">Kuwait</option>
                                <option value="KG">Kyrgyzstan</option>
                                <option value="LA">Laos</option>
                                <option value="LV">Latvia</option>
                                <option value="LB">Lebanon</option>
                                <option value="LS">Lesotho</option>
                                <option value="LR">Liberia</option>
                                <option value="LY">Libya</option>
                                <option value="LI">Liechtenstein</option>
                                <option value="LT">Lithuania</option>
                                <option value="LU">Luxembourg</option>
                                <option value="MG">Madagascar</option>
                                <option value="MW">Malawi</option>
                                <option value="MY">Malaysia</option>
                                <option value="MV">Maldives</option>
                                <option value="ML">Mali</option>
                                <option value="MT">Malta</option>
                                <option value="MH">Marshall Islands</option>
                                <option value="MR">Mauritania</option>
                                <option value="MU">Mauritius</option>
                                <option value="MX">Mexico</option>
                                <option value="FM">Micronesia</option>
                                <option value="MD">Moldova</option>
                                <option value="MC">Monaco</option>
                                <option value="MN">Mongolia</option>
                                <option value="ME">Montenegro</option>
                                <option value="MA">Morocco</option>
                                <option value="MZ">Mozambique</option>
                                <option value="MM">Myanmar</option>
                                <option value="NA">Namibia</option>
                                <option value="NR">Nauru</option>
                                <option value="NP">Nepal</option>
                                <option value="NL">Netherlands</option>
                                <option value="NZ">New Zealand</option>
                                <option value="NI">Nicaragua</option>
                                <option value="NE">Niger</option>
                                <option value="NG">Nigeria</option>
                                <option value="MK">North Macedonia</option>
                                <option value="NO">Norway</option>
                                <option value="OM">Oman</option>
                                <option value="PK">Pakistan</option>
                                <option value="PW">Palau</option>
                                <option value="PS">Palestine</option>
                                <option value="PA">Panama</option>
                                <option value="PG">Papua New Guinea</option>
                                <option value="PY">Paraguay</option>
                                <option value="PE">Peru</option>
                                <option value="PH">Philippines</option>
                                <option value="PL">Poland</option>
                                <option value="PT">Portugal</option>
                                <option value="QA">Qatar</option>
                                <option value="RO">Romania</option>
                                <option value="RU">Russia</option>
                                <option value="RW">Rwanda</option>
                                <option value="KN">Saint Kitts and Nevis</option>
                                <option value="LC">Saint Lucia</option>
                                <option value="VC">Saint Vincent and the Grenadines</option>
                                <option value="WS">Samoa</option>
                                <option value="SM">San Marino</option>
                                <option value="ST">Sao Tome and Principe</option>
                                <option value="SA">Saudi Arabia</option>
                                <option value="SN">Senegal</option>
                                <option value="RS">Serbia</option>
                                <option value="SC">Seychelles</option>
                                <option value="SL">Sierra Leone</option>
                                <option value="SG">Singapore</option>
                                <option value="SK">Slovakia</option>
                                <option value="SI">Slovenia</option>
                                <option value="SB">Solomon Islands</option>
                                <option value="SO">Somalia</option>
                                <option value="ZA">South Africa</option>
                                <option value="SS">South Sudan</option>
                                <option value="ES">Spain</option>
                                <option value="LK">Sri Lanka</option>
                                <option value="SD">Sudan</option>
                                <option value="SR">Suriname</option>
                                <option value="SE">Sweden</option>
                                <option value="CH">Switzerland</option>
                                <option value="SY">Syria</option>
                                <option value="TW">Taiwan</option>
                                <option value="TJ">Tajikistan</option>
                                <option value="TZ">Tanzania</option>
                                <option value="TH">Thailand</option>
                                <option value="TG">Togo</option>
                                <option value="TO">Tonga</option>
                                <option value="TT">Trinidad and Tobago</option>
                                <option value="TN">Tunisia</option>
                                <option value="TR">Turkey</option>
                                <option value="TM">Turkmenistan</option>
                                <option value="TV">Tuvalu</option>
                                <option value="UG">Uganda</option>
                                <option value="UA">Ukraine</option>
                                <option value="AE">United Arab Emirates</option>
                                <option value="GB">United Kingdom</option>
                                <option value="US">United States</option>
                                <option value="UY">Uruguay</option>
                                <option value="UZ">Uzbekistan</option>
                                <option value="VU">Vanuatu</option>
                                <option value="VA">Vatican City</option>
                                <option value="VE">Venezuela</option>
                                <option value="VN">Vietnam</option>
                                <option value="YE">Yemen</option>
                                <option value="ZM">Zambia</option>
                                <option value="ZW">Zimbabwe</option>
                            </select>
                            <label
                                className={`form__label w-full left-0 text-xs absolute uppercase select-none`}
                                htmlFor="country"
                            >
                                Country / Region
                            </label>
                            <BsChevronDown className="absolute top-0 z-[10] text-black text-[11px] right-4" />
                        </div>
                    </div>
                     {/* BOD Day Input */}
                     <div className={`flex flex-col lg:flex-row items-stretch gap-2 w-full`}>
                        <div className="input__group relative h-12 w-full">
                            <select
                                id="birthdate_day"
                                name="birthdate_day"
                                value={value.birthdate_day || ''}
                                className={`custom__select ${value.birthdate_day ? 'active' : ''} bg-[#e1e1e180] absolute top-1 left-0 form__input w-full h-12 outline-none text-xs leading-5`}
                                onChange={handleInputChange}
                            >
                                <option value="" hidden></option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>

                            </select>
                            <label
                                className={`form__label w-full left-0 text-xs absolute select-none`}
                                htmlFor="birthdate_day"
                            >
                                {`Day (opt.)`}
                            </label>
                            <BsChevronDown className="absolute top-0 z-[10] text-black text-[11px] right-4" />
                        </div>
                        {/* BOD Month Select  */}
                        <div className="input__group relative h-12 w-full">
                            <select
                                id="birthdate_month"
                                name="birthdate_month"
                                value={value.birthdate_month || ''}
                                className={`custom__select ${value.birthdate_month ? 'active' : ''} bg-[#e1e1e180] absolute top-1 left-0 form__input w-full h-12 outline-none text-xs leading-5`}
                                onChange={handleInputChange}
                            >
                                <option value="" hidden></option>
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>                              
                            </select>
                            <label
                                className={`form__label w-full left-0 text-xs absolute select-none`}
                                htmlFor="birthdate_month"
                            >
                                {`Month (opt.)`}
                            </label>
                            <BsChevronDown className="absolute top-0 z-[10] text-black text-[11px] right-4" />
                        </div>
                        {/* BOD Year Select  */}
                        <div className="input__group relative h-12 w-full">
                            <select
                                id="birthdate_year"
                                name="birthdate_year"
                                value={value.birthdate_year || ''}
                                className={`custom__select ${value.birthdate_year ? 'active' : ''} bg-[#e1e1e180] absolute top-1 left-0 form__input w-full h-12 outline-none text-xs leading-5`}
                                onChange={handleInputChange}
                            >
                                <option value="" hidden></option>
                                <option value="2024">2024</option>
                                <option value="2023">2023</option>
                                <option value="2022">2022</option>
                                <option value="2021">2021</option>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                                <option value="2015">2015</option>
                                <option value="2014">2014</option>
                                <option value="2013">2013</option>
                                <option value="2012">2012</option>
                                <option value="2011">2011</option>
                                <option value="2010">2010</option>
                                <option value="2009">2009</option>
                                <option value="2008">2008</option>
                                <option value="2007">2007</option>
                                <option value="2006">2006</option>
                                <option value="2005">2005</option>
                                <option value="2004">2004</option>
                                <option value="2003">2003</option>
                                <option value="2002">2002</option>
                                <option value="2001">2001</option>
                                <option value="2000">2000</option>
                                <option value="1999">1999</option>
                                <option value="1998">1998</option>
                                <option value="1997">1997</option>
                                <option value="1996">1996</option>
                                <option value="1995">1995</option>
                                <option value="1994">1994</option>
                                <option value="1993">1993</option>
                                <option value="1992">1992</option>
                                <option value="1991">1991</option>
                                <option value="1990">1990</option>
                                <option value="1989">1989</option>
                                <option value="1988">1988</option>
                                <option value="1987">1987</option>
                                <option value="1986">1986</option>
                                <option value="1985">1985</option>
                                <option value="1984">1984</option>
                                <option value="1983">1983</option>
                                <option value="1982">1982</option>
                                <option value="1981">1981</option>
                                <option value="1980">1980</option>
                                <option value="1979">1979</option>
                                <option value="1978">1978</option>
                                <option value="1977">1977</option>
                                <option value="1976">1976</option>
                                <option value="1975">1975</option>
                                <option value="1974">1974</option>
                                <option value="1973">1973</option>
                                <option value="1972">1972</option>
                                <option value="1971">1971</option>
                                <option value="1970">1970</option>
                                <option value="1969">1969</option>
                                <option value="1968">1968</option>
                                <option value="1967">1967</option>
                                <option value="1966">1966</option>
                                <option value="1965">1965</option>
                                <option value="1964">1964</option>
                                <option value="1963">1963</option>
                                <option value="1962">1962</option>
                                <option value="1961">1961</option>
                                <option value="1960">1960</option>
                                <option value="1959">1959</option>
                                <option value="1958">1958</option>
                                <option value="1957">1957</option>
                                <option value="1956">1956</option>
                                <option value="1955">1955</option>
                                <option value="1954">1954</option>
                                <option value="1953">1953</option>
                                <option value="1952">1952</option>
                                <option value="1951">1951</option>
                                <option value="1950">1950</option>
                                <option value="1949">1949</option>
                                <option value="1948">1948</option>
                                <option value="1947">1947</option>
                                <option value="1946">1946</option>
                                <option value="1945">1945</option>
                                <option value="1944">1944</option>
                                <option value="1943">1943</option>
                                <option value="1942">1942</option>
                                <option value="1941">1941</option>
                                <option value="1940">1940</option>
                                <option value="1939">1939</option>
                                <option value="1938">1938</option>
                                <option value="1937">1937</option>
                                <option value="1936">1936</option>
                                <option value="1935">1935</option>
                                <option value="1934">1934</option>
                                <option value="1933">1933</option>
                                <option value="1932">1932</option>
                                <option value="1931">1931</option>
                                <option value="1930">1930</option>
                                <option value="1929">1929</option>
                                <option value="1928">1928</option>
                                <option value="1927">1927</option>
                                <option value="1926">1926</option>
                                <option value="1925">1925</option>
                                <option value="1924">1924</option>
                                <option value="1923">1923</option>
                                <option value="1922">1922</option>
                                <option value="1921">1921</option>
                                <option value="1920">1920</option>
                                <option value="1919">1919</option>
                                <option value="1918">1918</option>
                                <option value="1917">1917</option>
                                <option value="1916">1916</option>
                                <option value="1915">1915</option>
                                <option value="1914">1914</option>
                                <option value="1913">1913</option>
                                <option value="1912">1912</option>
                                <option value="1911">1911</option>
                                <option value="1910">1910</option>
                                <option value="1909">1909</option>
                                <option value="1908">1908</option>
                                <option value="1907">1907</option>
                                <option value="1906">1906</option>
                                <option value="1905">1905</option>
                                <option value="1904">1904</option>
                                <option value="1903">1903</option>
                                <option value="1902">1902</option>
                                <option value="1901">1901</option>
                                <option value="1900">1900</option>
                                <option value="1899">1899</option>
                                <option value="1898">1898</option>
                                <option value="1897">1897</option>
                                <option value="1896">1896</option>
                                <option value="1895">1895</option>
                                <option value="1894">1894</option>
                                <option value="1893">1893</option>
                                <option value="1892">1892</option>
                                <option value="1891">1891</option>
                                <option value="1890">1890</option>
                                <option value="1889">1889</option>
                                <option value="1888">1888</option>
                                <option value="1887">1887</option>
                                <option value="1886">1886</option>
                                <option value="1885">1885</option>
                                <option value="1884">1884</option>
                                <option value="1883">1883</option>
                                <option value="1882">1882</option>
                                <option value="1881">1881</option>
                                <option value="1880">1880</option>
                                <option value="1879">1879</option>
                                <option value="1878">1878</option>
                                <option value="1877">1877</option>
                                <option value="1876">1876</option>
                                <option value="1875">1875</option>
                            </select>
                            <label
                                className={`form__label w-full left-0 text-xs absolute select-none`}
                                htmlFor="birthdate_year"
                            >
                                {`Year (opt.)`}
                            </label>
                            <BsChevronDown className="absolute top-0 z-[10] text-black text-[11px] right-4" />
                        </div>
                    </div>
                </div>


                <div className='text-xs mb-7'>
                    By registering you agree to accept the <Link className='underline' href='/policy/terms-and-conditions'>Terms & Conditions</Link> and have read the <Link className='underline' href='/policy/privacy-policy'>Privacy Policy</Link>
                </div>

                <div>
                    <button
                        type='submit'
                        className={`min-w-[120px] select-none outline-none bg-[#000000cc] px-[14px] py-[7px] uppercase text-xs text-white ${loading ? 'hover:bg[#000000cc]': 'hover:bg-[#897f7b]'} rounded flex items-center justify-center`}
                        disabled={loading}
                    >   
                        {loading ? 
                        <span className="loading">/</span>
                        : 
                        'Create account'}
                    </button>
                </div>
            </form>
        </div>
    );
}
