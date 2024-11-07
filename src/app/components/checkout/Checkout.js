"use client";
import React from "react";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import CountryName from "../methods/CountryName";
import { CartContext } from '@/app/context/cartContext';
import { useContext } from "react";
import CheckoutProduct from './CheckoutProduct';

export default function Checkout() {
  const [formData, setFormData] = useState({
    payment_method: "ppcp-gateway",
    payment_method_title: "paypal",
    set_paid: false,
    billing: {},
    shipping: {},    
    line_items: [], 
    shipping_lines: [
      {
        method_id: "flat_rate",
        method_title: "Flat Rate",
        total: "8.00"
      }
    ],
    email: "alexander@example.com"
  });

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [shippingAsBilling, setShippingAsBilling] = useState(true);


  // Method for every Input change 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev };

      if (step === 1) {
        updatedData.shipping[name] = value;
      } else if (step === 2) {
        updatedData.billing[name] = value;
      }
      // Add more steps as necessary...

      // Error validation
      if (Object.keys(errors).length > 0) {
        validateErrors();
      }

      return updatedData;
    });
  };


  const handleSubmitForm = (e) => {
    e.preventDefault();
  };



  // variable for testing just accept numaric digit 
  const numberValidate = /^\d+$/;

  // Form validation
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      // Required fields for Shipping
      if (!formData.shipping.first_name)
        newErrors.first_name = "Please enter your first name";
      if (!formData.shipping.last_name)
        newErrors.last_name = "Please enter your last name";
      if (!formData.shipping.phone) {
        newErrors.phone = "Please enter your phone number";
      } else {
        if (!numberValidate.test(formData.shipping.phone))
          newErrors.phone = "Please enter a valid phone number";
      }
      if (!formData.shipping.address_1)
        newErrors.address_1 = "Please enter your address line 1";
      if (!formData.shipping.city) newErrors.city = "Please enter your city";
      if (!formData.shipping.state)
        newErrors.state = "Please enter your county / state / region";
      if (!formData.shipping.postcode)
        newErrors.postcode = "Please enter your postcode / zip code";
    }
    if (step === 2) {
      // Required fields for Shipping
      if (!formData.billing.first_name)
        newErrors.first_name = "Please enter your first name";
      if (!formData.billing.last_name)
        newErrors.last_name = "Please enter your last name";
      if (!formData.billing.phone) {
        newErrors.phone = "Please enter your phone number";
      } else {
        if (!numberValidate.test(formData.billing.phone))
          newErrors.phone = "Please enter a valid phone number";
      }
      if (!formData.billing.address_1)
        newErrors.address_1 = "Please enter your address line 1";
      if (!formData.billing.city) newErrors.city = "Please enter your city";
      if (!formData.billing.state)
        newErrors.state = "Please enter your county / state / region";
      if (!formData.billing.postcode)
        newErrors.postcode = "Please enter your postcode / zip code";
    }
    return newErrors;
  };

  const validateErrors = () => {
    const validationErrors = validateStep();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };


  // Next button onClick Method from different Step 
  const nextStep = (e) => {
    e.preventDefault();

    if(step === 2){
      if(shippingAsBilling === true){
        setBilingAutomatically();
        lineItems();
        sendOrderData();
        console.log(formData);
      }
    }

    const validationErrors = validateStep();

    if (Object.keys(validationErrors).length === 0) {
      setErrors({});
      setStep((prev) => prev + 1);
    } else {
      setErrors(validationErrors);
    }
  };


  // Shipping as Billing checkbox onChange method
  const handleShippingAsBilling = () => {
    
    if(shippingAsBilling === true){

      setShippingAsBilling(false); 
      
      formData.billing = {
        first_name: "",
        last_name: "",
        address_1: "",
        address_2: "",
        city: "",
        state: "",
        postcode: "",
        country: "US",
        email: "",
        phone: "",
      }  

    }else if(shippingAsBilling === false){

      setShippingAsBilling(true);

    }

  }

  // Set Billing info from shipping 
  const setBilingAutomatically = () => {
    formData.billing = formData.shipping;
  }

  // Product Info
  const {cartItem} = useContext(CartContext);
  
  const lineItems = () => {
    cartItem.map(item => {
      formData.line_items.push({
        product_id: item.id,
        quantity: item.quantity
      })
    })
  }

  // Send data to woocommerce to create order 
  const sendOrderData = async () => {
    try{
      const response = await fetch(`/api/create_order`, {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if(response.ok){
        console.log("success: ", result);
      }else{
        console.error("error: ", result);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="px-2 lg:px-5 py-10 bg-[#E2DBC8]">
      <form className="checkout__form" onSubmit={handleSubmitForm}>
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="customer__info flex-[100%] lg:flex-[70%]">
            {/* Form step  */}
            <div>
              <div className="flex justify-between mb-5 mt-6">
                <p className="text-xs uppercase">1. Shipping Information</p>
                {step >= 2 && (
                  <button onClick={()=>setStep(1)} className="underline text-xs">
                    Edit
                  </button>
                )}
              </div>
              {step === 1 && (
                <div className={`form__step flex flex-col gap-4`}>
                  <p className="text-xs uppercase mb-5">Shipping Address</p>
                  {/* Input row */}
                  <div className={`flex items-stretch gap-4 w-full`}>
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
                          errors.first_name ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.first_name ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={formData.shipping.first_name || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="first_name"
                      >
                        First Name
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
                          errors.last_name ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.last_name ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={formData.shipping.last_name  || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="last_name"
                      >
                        Last Name
                      </label>
                      {errors.last_name && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.last_name}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Input row */}
                  <div className="flex items-streatch gap-4 w-full">
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.phone ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="phone"
                        name="phone"
                        className={`absolute form__input ${
                          errors.phone ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.phone ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="tel"
                        autoComplete="off"
                        value={formData.shipping.phone || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="phone"
                      >
                        Phone Number
                      </label>
                      {errors.phone && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.phone}
                        </div>
                      )}
                    </div>
                    {/* Form Input  */}
                    <div className="input__group relative h-12 w-full">
                      <select
                        id="country"
                        name="country"
                        value={formData.shipping.country || ''}
                        className={`absolute top-1 left-0 form__input active w-full h-12 outline-none text-xs leading-5`}
                        onChange={handleInputChange}
                      >
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
                        className={`form__label w-full left-0 text-xs absolute uppercase`}
                        htmlFor="country"
                      >
                        Country / Region
                      </label>
                      <BsChevronDown className="absolute top-0 z-[10] text-[11px] right-4" />
                    </div>
                  </div>
                  {/* Input row */}
                  <div className={`flex items-stretch gap-4 `}>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.address_1 ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="address_1"
                        name="address_1"
                        className={`absolute form__input ${
                          errors.address_1 ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.address_1 ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={formData.shipping.address_1 || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="address_1"
                      >
                        Address Line 1
                      </label>
                      {errors.address_1 && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.address_1}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Input row */}
                  <div className={`flex items-stretch gap-4 `}>
                    {/* Form Input  */}
                    <div className="input__group relative h-12 w-full">
                      <input
                        onChange={handleInputChange}
                        id="address_2"
                        name="address_2"
                        className={`absolute form__input ${
                          errors.address_2 ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.address_2 ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={formData.shipping.address_2 || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="address_2"
                      >
                        Address Line 2
                      </label>
                    </div>
                  </div>
                  {/* Input row */}
                  <div className={`flex items-stretch gap-4 `}>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.city ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="city"
                        name="city"
                        className={`absolute form__input ${
                          errors.city ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.city ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={formData.shipping.city || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="city"
                      >
                        City
                      </label>
                      {errors.city && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.city}
                        </div>
                      )}
                    </div>
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.state ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="state"
                        name="state"
                        className={`absolute form__input ${
                          errors.state ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.state ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={formData.shipping.state || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="state"
                      >
                        County / state / region
                      </label>
                      {errors.state && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.state}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Input row */}
                  <div className="flex items-streatch gap-4">
                    {/* Form Input  */}
                    <div
                      className={`input__group relative w-full ${
                        errors.postcode ? "h-[72px]" : "h-12"
                      }`}
                    >
                      <input
                        onChange={handleInputChange}
                        id="postcode"
                        name="postcode"
                        className={`absolute form__input ${
                          errors.postcode ? "bg-[#B5BDBC]" : "bg-white"
                        } ${
                          formData.shipping.postcode ? "active" : ""
                        } h-12 outline-none text-xs leading-5`}
                        type="text"
                        autoComplete="off"
                        value={formData.shipping.postcode || ''}
                      />
                      <label
                        className={`form__label text-xs absolute capitalize`}
                        htmlFor="postcode"
                      >
                        Postcode / zip code
                      </label>
                      {errors.postcode && (
                        <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                          {errors.postcode}
                        </div>
                      )}
                    </div>
                    {/* Form Input  */}
                    <div className="input__group relative h-12 w-full"></div>
                  </div>
                  {/* Next step button  */}
                  <div className="pb-5">
                    <button
                      className="px-4 py-[6px] inline-block bg-black rounded text-xs text-white uppercase hover:bg-[#897f7b]"
                      onClick={nextStep}
                    >
                      Save Shipping Informatin
                    </button>
                  </div>
                </div>
              )}
              {step >= 2 && (
                <div className="p-4 rounded bg-[#F1EDE4]">
                  <p className="text-xs uppercase mb-1">Shipping Address</p>
                  <div className="text-[11px] flex flex-col">
                    <span>
                      {formData.shipping.first_name} {formData.shipping.last_name}
                    </span>
                    <span>{formData.shipping.phone}</span>
                    <span>{formData.shipping.address_1}</span>
                    <span>{formData.shipping.address_2}</span>
                    <span>
                      {formData.shipping.city} {formData.shipping.state}{" "}
                      <CountryName code={formData.shipping.country} />{" "}
                    </span>
                    <span>{formData.shipping.postcode}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Form step  */}
            <div>
              <div className="flex justify-between mb-5 mt-10">
                <p className="text-xs uppercase">2. Payment and Billing</p>
                {step >= 3 && (
                  <button onClick={()=>setStep(2)} className="underline text-xs">
                    Edit
                  </button>
                )}
              </div>
                <div className={`form__step`}>
                    {step === 2 && shippingAsBilling === true && (
                    <div>
                        <p className="text-xs uppercase mb-5">Billing Address</p>
                        <div className="relative flex items-center justify-start gap-2 pb-5">
                            <input
                            className="form__checkbox"
                            type="checkbox"
                            name="shipping_as_billing"
                            id="shipping_as_billing"
                            checked={shippingAsBilling}
                            onChange={handleShippingAsBilling}
                            />
                            <label
                            className="select-none text-xs mt-[-2px] ml-4"
                            htmlFor="shipping_as_billing"
                            >
                            Use Shipping Address as Billing Address
                            </label>
                        </div>
                    </div>
                    )}

                  {!shippingAsBilling && (
                    <div>
                    {step === 2 && (
                        <div className="flex flex-col gap-4 mt-8">
                            {/* Input row */}
                            <div className={`flex items-stretch gap-4 w-full`}>
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
                                    errors.first_name ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.first_name ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="text"
                                    autoComplete="off"
                                    value={formData.billing.first_name || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="first_name"
                                >
                                    First Name
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
                                    errors.last_name ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.last_name ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="text"
                                    autoComplete="off"
                                    value={formData.billing.last_name || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="last_name"
                                >
                                    Last Name
                                </label>
                                {errors.last_name && (
                                    <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.last_name}
                                    </div>
                                )}
                                </div>
                            </div>
                            {/* Input row */}
                            <div className="flex items-streatch gap-4 w-full">
                                {/* Form Input  */}
                                <div
                                className={`input__group relative w-full ${
                                    errors.phone ? "h-[72px]" : "h-12"
                                }`}
                                >
                                <input
                                    onChange={handleInputChange}
                                    id="phone"
                                    name="phone"
                                    className={`absolute form__input ${
                                    errors.phone ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.phone ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="tel"
                                    autoComplete="off"
                                    value={formData.billing.phone || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="phone"
                                >
                                    Phone Number
                                </label>
                                {errors.phone && (
                                    <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.phone}
                                    </div>
                                )}
                                </div>
                                {/* Form Input  */}
                                <div className="input__group relative h-12 w-full">
                                <select
                                    id="country"
                                    name="country"
                                    value={formData.billing.country || ''}
                                    className={`absolute top-1 left-0 form__input active w-full h-12 outline-none text-xs leading-5`}
                                    onChange={handleInputChange}
                                >
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
                                    <option value="VC">
                                    Saint Vincent and the Grenadines
                                    </option>
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
                                    className={`form__label w-full left-0 text-xs absolute uppercase`}
                                    htmlFor="country"
                                >
                                    Country / Region
                                </label>
                                <BsChevronDown className="absolute top-0 z-[10] text-[11px] right-4" />
                                </div>
                            </div>
                            {/* Input row */}
                            <div className={`flex items-stretch gap-4 `}>
                                {/* Form Input  */}
                                <div
                                className={`input__group relative w-full ${
                                    errors.address_1 ? "h-[72px]" : "h-12"
                                }`}
                                >
                                <input
                                    onChange={handleInputChange}
                                    id="address_1"
                                    name="address_1"
                                    className={`absolute form__input ${
                                    errors.address_1 ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.address_1 ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="text"
                                    autoComplete="off"
                                    value={formData.billing.address_1 || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="address_1"
                                >
                                    Address Line 1
                                </label>
                                {errors.address_1 && (
                                    <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.address_1}
                                    </div>
                                )}
                                </div>
                            </div>
                            {/* Input row */}
                            <div className={`flex items-stretch gap-4 `}>
                                {/* Form Input  */}
                                <div className="input__group relative h-12 w-full">
                                <input
                                    onChange={handleInputChange}
                                    id="address_2"
                                    name="address_2"
                                    className={`absolute form__input ${
                                    errors.address_2 ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.address_2 ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="text"
                                    autoComplete="off"
                                    value={formData.billing.address_2 || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="address_2"
                                >
                                    Address Line 2
                                </label>
                                </div>
                            </div>
                            {/* Input row */}
                            <div className={`flex items-stretch gap-4 `}>
                                {/* Form Input  */}
                                <div
                                className={`input__group relative w-full ${
                                    errors.city ? "h-[72px]" : "h-12"
                                }`}
                                >
                                <input
                                    onChange={handleInputChange}
                                    id="city"
                                    name="city"
                                    className={`absolute form__input ${
                                    errors.city ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.city ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="text"
                                    autoComplete="off"
                                    value={formData.billing.city || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="city"
                                >
                                    City
                                </label>
                                {errors.city && (
                                    <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.city}
                                    </div>
                                )}
                                </div>
                                {/* Form Input  */}
                                <div
                                className={`input__group relative w-full ${
                                    errors.state ? "h-[72px]" : "h-12"
                                }`}
                                >
                                <input
                                    onChange={handleInputChange}
                                    id="state"
                                    name="state"
                                    className={`absolute form__input ${
                                    errors.state ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.state ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="text"
                                    autoComplete="off"
                                    value={formData.billing.state || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="state"
                                >
                                    County / state / region
                                </label>
                                {errors.state && (
                                    <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.state}
                                    </div>
                                )}
                                </div>
                            </div>
                            {/* Input row */}
                            <div className="flex items-streatch gap-4">
                                {/* Form Input  */}
                                <div
                                className={`input__group relative w-full ${
                                    errors.postcode ? "h-[72px]" : "h-12"
                                }`}
                                >
                                <input
                                    onChange={handleInputChange}
                                    id="postcode"
                                    name="postcode"
                                    className={`absolute form__input ${
                                    errors.postcode ? "bg-[#B5BDBC]" : "bg-white"
                                    } ${
                                    formData.billing.postcode ? "active" : ""
                                    } h-12 outline-none text-xs leading-5`}
                                    type="text"
                                    autoComplete="off"
                                    value={formData.billing.postcode || ''}
                                />
                                <label
                                    className={`form__label text-xs absolute capitalize`}
                                    htmlFor="postcode"
                                >
                                    Postcode / zip code
                                </label>
                                {errors.postcode && (
                                    <div className="absolute bottom-4 left-0 w-full text-[#196cb1] text-xs">
                                    {errors.postcode}
                                    </div>
                                )}
                                </div>
                                {/* Form Input  */}
                                <div className="input__group relative h-12 w-full"></div>
                            </div>                        
                        </div>
                    )}
                    </div>
                  )}
                </div>
                  {step >= 3 && (
                  <div className="p-4 rounded bg-[#F1EDE4]">
                      <p className="text-xs uppercase mb-1">Billing Address</p>
                      <div className="text-[11px] flex flex-col">
                      <span>
                          {formData.billing.first_name} {formData.billing.last_name}
                      </span>
                      <span>{formData.billing.phone}</span>
                      <span>{formData.billing.address_1}</span>
                      <span>{formData.billing.address_2}</span>
                      <span>
                          {formData.billing.city} {formData.billing.state}{" "}
                          <CountryName code={formData.billing.country} />{" "}
                      </span>
                      <span>{formData.billing.postcode}</span>
                      </div>
                  </div>
                  )}
                  {/* Next step button  */}
                  {step === 2 && (
                    <div className="pb-5 flex items-center gap-2">
                      <button
                      className="px-4 py-[6px] inline-block bg-black rounded text-xs text-white uppercase hover:bg-[#897f7b]"
                      onClick={nextStep}
                      >
                      Save Billing Informatin
                      </button>
                      {!shippingAsBilling && (
                        <button
                        className="px-4 py-[6px] inline-block bg-[#e1e1e180] rounded text-xs text-black uppercase hover:bg-[#897f7b]"
                        onClick={()=>{setShippingAsBilling(true)}}
                        >
                        Cancel
                        </button>
                      )}
                    </div>
                  )}
            </div>
          </div>
          <div className="product__info flex-[100%] lg:flex-[30%]">
            <CheckoutProduct cartItem={cartItem} />
          </div>
        </div>
        
      </form>
    </div>
  );
}
