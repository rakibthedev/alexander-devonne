"use client";
import React, { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import Link from 'next/link';
import { validateEmail } from './methods/ValidateEmail';

export default function SubscribeForm() {
  const [input, setInputChange] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    "your-email": "",
    "category-name": []
  });

  const [formData, setFormData] = useState({
    "your-email": '',
    "your-subject": 'New Subscriber Joined',
    "country-name": 'United States',  // Default country set to United States
    "subscribe-for": [],  // Stores selected category URLs
    "category-name": [],  // Stores selected category names in uppercase
  });

  const categoryLinks = {
    "manswear": `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/products/men`,
    "womenswear": `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/products/women`,
    "kids": `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/products/kids`,
    "gift": `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/products/gift-items`,
  };

  const handleInputChange = (e) => {
    if (e.target.value.length > 0) {
      setInputChange(true);
    } else {
      setInputChange(false);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
  
    // Create the formatted string with the category name in uppercase and the URL
    const categoryText = name.toUpperCase();
    const categoryWithLink = `${categoryText} (${categoryLinks[name]})`;
  
    setFormData((prevData) => {
      let updatedCategoriesWithLink = [...prevData["subscribe-for"]];
      let updatedCategoryNames = [...prevData["category-name"]];
  
      // If checked, add to arrays if not already present
      if (checked) {
        if (!updatedCategoriesWithLink.includes(categoryWithLink)) {
          updatedCategoriesWithLink.push(categoryWithLink);
        }
        if (!updatedCategoryNames.includes(categoryText)) {
          updatedCategoryNames.push(categoryText);
        }
      } else {
        // If unchecked, remove from arrays
        updatedCategoriesWithLink = updatedCategoriesWithLink.filter(item => item !== categoryWithLink);
        updatedCategoryNames = updatedCategoryNames.filter(item => item !== categoryText);
      }
  
      return {
        ...prevData,
        "subscribe-for": updatedCategoriesWithLink,
        "category-name": updatedCategoryNames
      };
    });
  };
  

  const handleSubscribeForm = async (e) => {
    e.preventDefault();
    const validationErrors = validateErrors();
    if(Object.keys(validationErrors).length === 0){
      validateFromDataText();
      setLoading(true);
      const requestData = {
        form_id: 357, // Your form ID
        fields: {
          "your-subject": formData["your-subject"],
          "your-email": formData["your-email"],
          "country-name": formData["country-name"],
          "subscribe-for": categoryData["subscribe-for"].join(', '), // Categories with links
          "category-name": categoryData["category-name"].join(', '), // Categories without links, just names
          "frontend-site-url": process.env.NEXT_PUBLIC_DOMAIN_ADDRESS, // Add the frontend site URL
          "backend-site-url": process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL, // Add the backend site URL
        },
      };

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/subscribe/send-subscribe-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const result = await response.json();
        if (response.ok) {
          setIsSubscribed(true);
          setLoading(false);
        } else {
          console.error(`There was an issue with your subscription: ${result?.message || 'Unknown error'}`);
          setLoading(false);

        }
      } catch (error) {
        console.error("Error submitting form:", error);
        setLoading(false);

      }
    }
  };


  // Making GIFT to GIFT ITEMS 
  const categoryData = {
    "subscribe-for": '',
    "category-name": ''
  }
  const validateFromDataText = () => {
    categoryData['subscribe-for'] = formData["subscribe-for"].map(item => item.includes("GIFT") ? item.replace("GIFT", "GIFT ITEMS") : item)
    categoryData['category-name'] = formData["category-name"].map(item => item.includes("GIFT") ? item.replace("GIFT", "GIFT ITEMS") : item)
  }


  // Validate Errors 
  const validateErrors = () => {
    let newErrors = {}; // Create a new object for errors
  
    // Check if email is provided
    if (!formData["your-email"]) {
      newErrors["your-email"] = "Please Enter an email address";
    }else if(!validateEmail(formData["your-email"])){
      newErrors["your-email"] = "Please Enter a valid email address";
    }
  
    // Check if category is selected
    if (!formData["category-name"] || formData["category-name"].length === 0) {
      newErrors["category-name"] = "Please choose a subscription category";
    }
  
    setErrors(newErrors); // Update the state with the new errors

    return newErrors; 
  }
  

  return (
    <div>
      {isSubscribed ? (
        <p className="text-xs">Thanks for your subscription. You have joined the Alexander Devonne coummunity.</p>
      ):(
      <form onSubmit={handleSubscribeForm}>
        <div className="flex flex-col gap-3">
          <p className="text-[13px] mb-5 font-ibmPlexMedium font-medium uppercase">Join the Alexander Devonne community</p>
          
          <div className="input__group relative h-12">
            <input 
              onChange={handleInputChange} 
              id='subscribe_email' 
              name='your-email'
              className={`absolute left-0 form__input ${input ? 'active' : ''} bg-transparent w-full outline-none border-b border-black text-xs leading-5`} 
              type="text" 
              autoComplete='off'              
            />
            <label className="form__label select-none w-full left-0 text-xs absolute uppercase" htmlFor="subscribe_email">EMAIL ADDRESS</label>
            <div className="text-[#196cb1] text-xs absolute w-full bottom-[5px] left-0">{errors["your-email"] && errors["your-email"]}</div>
          </div>
          
          <div className="input__group relative h-12">
          <select 
              id='subscribe_country'
              name='country-name' 
              value={formData["country-name"]} // Ensure country is always set
              onChange={handleInputChange}
              className={`bg-transparent absolute top-1 left-0 cursor-pointer form__input active w-full pb-2 outline-none border-b border-black text-xs leading-5`}
            >
              <option value="Afghanistan">Afghanistan</option>
              <option value="Albania">Albania</option>
              <option value="Algeria">Algeria</option>
              <option value="Andorra">Andorra</option>
              <option value="Angola">Angola</option>
              <option value="Antigua and Barbuda">Antigua and Barbuda</option>
              <option value="Argentina">Argentina</option>
              <option value="Armenia">Armenia</option>
              <option value="Australia">Australia</option>
              <option value="Austria">Austria</option>
              <option value="Azerbaijan">Azerbaijan</option>
              <option value="Bahamas">Bahamas</option>
              <option value="Bahrain">Bahrain</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Barbados">Barbados</option>
              <option value="Belarus">Belarus</option>
              <option value="Belgium">Belgium</option>
              <option value="Belize">Belize</option>
              <option value="Benin">Benin</option>
              <option value="Bhutan">Bhutan</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
              <option value="Botswana">Botswana</option>
              <option value="Brazil">Brazil</option>
              <option value="Brunei">Brunei</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Burkina Faso">Burkina Faso</option>
              <option value="Burundi">Burundi</option>
              <option value="Cabo Verde">Cabo Verde</option>
              <option value="Cambodia">Cambodia</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Canada">Canada</option>
              <option value="Central African Republic">Central African Republic</option>
              <option value="Chad">Chad</option>
              <option value="Chile">Chile</option>
              <option value="China">China</option>
              <option value="Colombia">Colombia</option>
              <option value="Comoros">Comoros</option>
              <option value="Congo">Congo</option>
              <option value="Congo (Democratic Republic)">Congo (Democratic Republic)</option>
              <option value="Costa Rica">Costa Rica</option>
              <option value="Croatia">Croatia</option>
              <option value="Cuba">Cuba</option>
              <option value="Cyprus">Cyprus</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Denmark">Denmark</option>
              <option value="Djibouti">Djibouti</option>
              <option value="Dominica">Dominica</option>
              <option value="Dominican Republic">Dominican Republic</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Egypt">Egypt</option>
              <option value="El Salvador">El Salvador</option>
              <option value="Equatorial Guinea">Equatorial Guinea</option>
              <option value="Eritrea">Eritrea</option>
              <option value="Estonia">Estonia</option>
              <option value="Eswatini">Eswatini</option>
              <option value="Ethiopia">Ethiopia</option>
              <option value="Fiji">Fiji</option>
              <option value="Finland">Finland</option>
              <option value="France">France</option>
              <option value="Gabon">Gabon</option>
              <option value="Gambia">Gambia</option>
              <option value="Georgia">Georgia</option>
              <option value="Germany">Germany</option>
              <option value="Ghana">Ghana</option>
              <option value="Greece">Greece</option>
              <option value="Grenada">Grenada</option>
              <option value="Guatemala">Guatemala</option>
              <option value="Guinea">Guinea</option>
              <option value="Guinea-Bissau">Guinea-Bissau</option>
              <option value="Guyana">Guyana</option>
              <option value="Haiti">Haiti</option>
              <option value="Honduras">Honduras</option>
              <option value="Hungary">Hungary</option>
              <option value="Iceland">Iceland</option>
              <option value="India">India</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Iran">Iran</option>
              <option value="Iraq">Iraq</option>
              <option value="Ireland">Ireland</option>
              <option value="Israel">Israel</option>
              <option value="Italy">Italy</option>
              <option value="Jamaica">Jamaica</option>
              <option value="Japan">Japan</option>
              <option value="Jordan">Jordan</option>
              <option value="Kazakhstan">Kazakhstan</option>
              <option value="Kenya">Kenya</option>
              <option value="Kiribati">Kiribati</option>
              <option value="Korea (North)">Korea (North)</option>
              <option value="Korea (South)">Korea (South)</option>
              <option value="Kuwait">Kuwait</option>
              <option value="Kyrgyzstan">Kyrgyzstan</option>
              <option value="Laos">Laos</option>
              <option value="Latvia">Latvia</option>
              <option value="Lebanon">Lebanon</option>
              <option value="Lesotho">Lesotho</option>
              <option value="Liberia">Liberia</option>
              <option value="Libya">Libya</option>
              <option value="Liechtenstein">Liechtenstein</option>
              <option value="Lithuania">Lithuania</option>
              <option value="Luxembourg">Luxembourg</option>
              <option value="Madagascar">Madagascar</option>
              <option value="Malawi">Malawi</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Maldives">Maldives</option>
              <option value="Mali">Mali</option>
              <option value="Malta">Malta</option>
              <option value="Marshall Islands">Marshall Islands</option>
              <option value="Mauritania">Mauritania</option>
              <option value="Mauritius">Mauritius</option>
              <option value="Mexico">Mexico</option>
              <option value="Micronesia">Micronesia</option>
              <option value="Moldova">Moldova</option>
              <option value="Monaco">Monaco</option>
              <option value="Mongolia">Mongolia</option>
              <option value="Montenegro">Montenegro</option>
              <option value="Morocco">Morocco</option>
              <option value="Mozambique">Mozambique</option>
              <option value="Myanmar">Myanmar</option>
              <option value="Namibia">Namibia</option>
              <option value="Nauru">Nauru</option>
              <option value="Nepal">Nepal</option>
              <option value="Netherlands">Netherlands</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Nicaragua">Nicaragua</option>
              <option value="Niger">Niger</option>
              <option value="Nigeria">Nigeria</option>
              <option value="North Macedonia">North Macedonia</option>
              <option value="Norway">Norway</option>
              <option value="Oman">Oman</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Palau">Palau</option>
              <option value="Panama">Panama</option>
              <option value="Papua New Guinea">Papua New Guinea</option>
              <option value="Paraguay">Paraguay</option>
              <option value="Peru">Peru</option>
              <option value="Philippines">Philippines</option>
              <option value="Poland">Poland</option>
              <option value="Portugal">Portugal</option>
              <option value="Qatar">Qatar</option>
              <option value="Romania">Romania</option>
              <option value="Russia">Russia</option>
              <option value="Rwanda">Rwanda</option>
              <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
              <option value="Saint Lucia">Saint Lucia</option>
              <option value="Saint Vincent and the Grenadines">Saint Vincent and the Grenadines</option>
              <option value="Samoa">Samoa</option>
              <option value="San Marino">San Marino</option>
              <option value="Sao Tome and Principe">Sao Tome and Principe</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="Senegal">Senegal</option>
              <option value="Serbia">Serbia</option>
              <option value="Seychelles">Seychelles</option>
              <option value="Sierra Leone">Sierra Leone</option>
              <option value="Singapore">Singapore</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Solomon Islands">Solomon Islands</option>
              <option value="Somalia">Somalia</option>
              <option value="South Africa">South Africa</option>
              <option value="South Sudan">South Sudan</option>
              <option value="Spain">Spain</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Sudan">Sudan</option>
              <option value="Suriname">Suriname</option>
              <option value="Sweden">Sweden</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Syria">Syria</option>
              <option value="Taiwan">Taiwan</option>
              <option value="Tajikistan">Tajikistan</option>
              <option value="Tanzania">Tanzania</option>
              <option value="Thailand">Thailand</option>
              <option value="Timor-Leste">Timor-Leste</option>
              <option value="Togo">Togo</option>
              <option value="Tonga">Tonga</option>
              <option value="Trinidad and Tobago">Trinidad and Tobago</option>
              <option value="Tunisia">Tunisia</option>
              <option value="Turkey">Turkey</option>
              <option value="Turkmenistan">Turkmenistan</option>
              <option value="Tuvalu">Tuvalu</option>
              <option value="Uganda">Uganda</option>
              <option value="Ukraine">Ukraine</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="United States">United States</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Uzbekistan">Uzbekistan</option>
              <option value="Vanuatu">Vanuatu</option>
              <option value="Vatican City">Vatican City</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Vietnam">Vietnam</option>
              <option value="Yemen">Yemen</option>
              <option value="Zambia">Zambia</option>
              <option value="Zimbabwe">Zimbabwe</option>

            </select>
            <label className="select-none form__label w-full left-0 text-xs absolute uppercase" htmlFor="subscribe_country">Country / Region</label>
            <BsChevronDown className='absolute top-1 text-[17px] right-0 cursor-pointer' />
          </div>

          <div className="flex flex-wrap gap-5">            
            {/* Checkbox inputs */}
            <div className="relative flex items-center justify-center gap-2">
              <input 
                className='form__checkbox' 
                type="checkbox" 
                name="manswear" 
                checked={formData["subscribe-for"].includes(`${"MANSWEAR"} (${categoryLinks["manswear"]})`)} 
                onChange={handleCheckboxChange}
                id='manswear'
                value="Manswear"
              />
              <label className='text-xs select-none capitalize mt-[-2px] ml-4' htmlFor="manswear">Manswear</label>
            </div>
            <div className="relative flex items-center justify-center gap-2">
              <input 
                className='form__checkbox' 
                type="checkbox" 
                name="womenswear" 
                checked={formData["subscribe-for"].includes(`${"WOMENSWEAR"} (${categoryLinks["womenswear"]})`)} 
                onChange={handleCheckboxChange}
                id="womenswear"
                value="Womenswear"
              />
              <label className='text-xs select-none capitalize mt-[-2px] ml-4' htmlFor="womenswear">Womenswear</label>
            </div>
            <div className="relative flex items-center justify-center gap-2">
              <input 
                className='form__checkbox' 
                type="checkbox" 
                name="kids" 
                checked={formData["subscribe-for"].includes(`${"KIDS"} (${categoryLinks["kids"]})`)} 
                onChange={handleCheckboxChange}
                id="kids"
                value="Kids"
              />
              <label className='text-xs select-none capitalize mt-[-2px] ml-4' htmlFor="kids">Kids</label>
            </div>
            <div className="relative flex items-center justify-center gap-2">
              <input 
                className='form__checkbox' 
                type="checkbox" 
                name="gift" 
                checked={formData["subscribe-for"].includes(`${"GIFT"} (${categoryLinks["gift"]})`)} 
                onChange={handleCheckboxChange}
                id='gift'
                value='Gift Items'
              />
              <label className='text-xs select-none capitalize mt-[-2px] ml-4' htmlFor="gift">Gift Items</label>
            </div>
            <div className="text-[#196cb1] text-xs mt-[-15px]">{errors["category-name"] && errors["category-name"]}</div>

          </div>

          <p className="text-[10px] leading-4 mt-2">
            Experience fashion as a platform for experimentation. 
            <br />
            <br />
            I have read the <Link className="underline" href="/policy/privacy-policy">Privacy Policy</Link> and I consent to the processing of my personal data for marketing purposes.
          </p>

          <div className="mt-4 pb-8 lg:pb-0">
            <button 
              className='min-w-[93px] flex items-center justify-center bg-[#000000cc] select-none rounded text-[12px] leading-6 font-ibmPlexMedium font-medium text-white py-1 px-[14px] uppercase outline-none border-none hover:bg-[#897f7b]' 
              type='submit'
              disabled={loading}
            >
              {loading ? <span className="loading text-xs text-white">/</span> : 'Subscribe'}              
            </button>
          </div>
        </div>
      </form>
      )}
    </div>
  );
}
