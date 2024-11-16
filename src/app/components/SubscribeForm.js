"use client"
import React from 'react'
import { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import Link from 'next/link';

export default function SubscribeForm() {
   const [input, setInputChange] = useState(false)
    const handleInputChange = (e) => {
      if(e.target.value.length > 0){
        setInputChange(true)
      }else{
        setInputChange(false)
      }
    }
    const handleSubscribeForm = (e) => {
        e.preventDefault();
    }
  return (
    <div>
        <form onSubmit={handleSubscribeForm}>
          <div className="flex flex-col gap-3">
            <p className="text-[13px] mb-5 font-ibmPlexMedium font-medium uppercase">Join the Alexander Devonne community for 10% off your first order</p>
            <div className="input__group relative h-12">
              <input onChange={handleInputChange} id='subscribe_email' className={`absolute left-0 form__input ${input ? 'active' : ''} bg-transparent w-full pb-2 outline-none border-b border-black text-xs leading-5`} type="text" autoComplete='off' />
              <label className={`form__label w-full left-0 text-xs absolute uppercase`} htmlFor="subscribe_email">EMAIL ADDRESS</label>
            </div>
            <div className="input__group relative h-12">
            <select id='subscribe_country' defaultValue="US" className={`bg-transparent absolute top-1 left-0 form__input active w-full pb-2 outline-none border-b border-black text-xs leading-5`}>
                <option value='AF'>Afghanistan</option>
                <option value='AL'>Albania</option>
                <option value='DZ'>Algeria</option>
                <option value='AD'>Andorra</option>
                <option value='AO'>Angola</option>
                <option value='AG'>Antigua and Barbuda</option>
                <option value='AR'>Argentina</option>
                <option value='AM'>Armenia</option>
                <option value='AU'>Australia</option>
                <option value='AT'>Austria</option>
                <option value='AZ'>Azerbaijan</option>
                <option value='BS'>Bahamas</option>
                <option value='BH'>Bahrain</option>
                <option value='BD'>Bangladesh</option>
                <option value='BB'>Barbados</option>
                <option value='BY'>Belarus</option>
                <option value='BE'>Belgium</option>
                <option value='BZ'>Belize</option>
                <option value='BJ'>Benin</option>
                <option value='BT'>Bhutan</option>
                <option value='BO'>Bolivia</option>
                <option value='BA'>Bosnia and Herzegovina</option>
                <option value='BW'>Botswana</option>
                <option value='BR'>Brazil</option>
                <option value='BN'>Brunei</option>
                <option value='BG'>Bulgaria</option>
                <option value='BF'>Burkina Faso</option>
                <option value='BI'>Burundi</option>
                <option value='CV'>Cabo Verde</option>
                <option value='KH'>Cambodia</option>
                <option value='CM'>Cameroon</option>
                <option value='CA'>Canada</option>
                <option value='CF'>Central African Republic</option>
                <option value='TD'>Chad</option>
                <option value='CL'>Chile</option>
                <option value='CN'>China</option>
                <option value='CO'>Colombia</option>
                <option value='KM'>Comoros</option>
                <option value='CG'>Congo, Republic of the</option>
                <option value='CD'>Congo, Democratic Republic of the</option>
                <option value='CR'>Costa Rica</option>
                <option value='HR'>Croatia</option>
                <option value='CU'>Cuba</option>
                <option value='CY'>Cyprus</option>
                <option value='CZ'>Czech Republic</option>
                <option value='DK'>Denmark</option>
                <option value='DJ'>Djibouti</option>
                <option value='DM'>Dominica</option>
                <option value='DO'>Dominican Republic</option>
                <option value='EC'>Ecuador</option>
                <option value='EG'>Egypt</option>
                <option value='SV'>El Salvador</option>
                <option value='GQ'>Equatorial Guinea</option>
                <option value='ER'>Eritrea</option>
                <option value='EE'>Estonia</option>
                <option value='SZ'>Eswatini</option>
                <option value='ET'>Ethiopia</option>
                <option value='FJ'>Fiji</option>
                <option value='FI'>Finland</option>
                <option value='FR'>France</option>
                <option value='GA'>Gabon</option>
                <option value='GM'>Gambia</option>
                <option value='GE'>Georgia</option>
                <option value='DE'>Germany</option>
                <option value='GH'>Ghana</option>
                <option value='GR'>Greece</option>
                <option value='GD'>Grenada</option>
                <option value='GT'>Guatemala</option>
                <option value='GN'>Guinea</option>
                <option value='GW'>Guinea-Bissau</option>
                <option value='GY'>Guyana</option>
                <option value='HT'>Haiti</option>
                <option value='HN'>Honduras</option>
                <option value='HU'>Hungary</option>
                <option value='IS'>Iceland</option>
                <option value='IN'>India</option>
                <option value='ID'>Indonesia</option>
                <option value='IR'>Iran</option>
                <option value='IQ'>Iraq</option>
                <option value='IE'>Ireland</option>
                <option value='IL'>Israel</option>
                <option value='IT'>Italy</option>
                <option value='JM'>Jamaica</option>
                <option value='JP'>Japan</option>
                <option value='JO'>Jordan</option>
                <option value='KZ'>Kazakhstan</option>
                <option value='KE'>Kenya</option>
                <option value='KI'>Kiribati</option>
                <option value='KP'>Korea, North</option>
                <option value='KR'>Korea, South</option>
                <option value='KW'>Kuwait</option>
                <option value='KG'>Kyrgyzstan</option>
                <option value='LA'>Laos</option>
                <option value='LV'>Latvia</option>
                <option value='LB'>Lebanon</option>
                <option value='LS'>Lesotho</option>
                <option value='LR'>Liberia</option>
                <option value='LY'>Libya</option>
                <option value='LI'>Liechtenstein</option>
                <option value='LT'>Lithuania</option>
                <option value='LU'>Luxembourg</option>
                <option value='MG'>Madagascar</option>
                <option value='MW'>Malawi</option>
                <option value='MY'>Malaysia</option>
                <option value='MV'>Maldives</option>
                <option value='ML'>Mali</option>
                <option value='MT'>Malta</option>
                <option value='MH'>Marshall Islands</option>
                <option value='MR'>Mauritania</option>
                <option value='MU'>Mauritius</option>
                <option value='MX'>Mexico</option>
                <option value='FM'>Micronesia</option>
                <option value='MD'>Moldova</option>
                <option value='MC'>Monaco</option>
                <option value='MN'>Mongolia</option>
                <option value='ME'>Montenegro</option>
                <option value='MA'>Morocco</option>
                <option value='MZ'>Mozambique</option>
                <option value='MM'>Myanmar</option>
                <option value='NA'>Namibia</option>
                <option value='NR'>Nauru</option>
                <option value='NP'>Nepal</option>
                <option value='NL'>Netherlands</option>
                <option value='NZ'>New Zealand</option>
                <option value='NI'>Nicaragua</option>
                <option value='NE'>Niger</option>
                <option value='NG'>Nigeria</option>
                <option value='MK'>North Macedonia</option>
                <option value='NO'>Norway</option>
                <option value='OM'>Oman</option>
                <option value='PK'>Pakistan</option>
                <option value='PW'>Palau</option>
                <option value='PS'>Palestine</option>
                <option value='PA'>Panama</option>
                <option value='PG'>Papua New Guinea</option>
                <option value='PY'>Paraguay</option>
                <option value='PE'>Peru</option>
                <option value='PH'>Philippines</option>
                <option value='PL'>Poland</option>
                <option value='PT'>Portugal</option>
                <option value='QA'>Qatar</option>
                <option value='RO'>Romania</option>
                <option value='RU'>Russia</option>
                <option value='RW'>Rwanda</option>
                <option value='KN'>Saint Kitts and Nevis</option>
                <option value='LC'>Saint Lucia</option>
                <option value='VC'>Saint Vincent and the Grenadines</option>
                <option value='WS'>Samoa</option>
                <option value='SM'>San Marino</option>
                <option value='ST'>Sao Tome and Principe</option>
                <option value='SA'>Saudi Arabia</option>
                <option value='SN'>Senegal</option>
                <option value='RS'>Serbia</option>
                <option value='SC'>Seychelles</option>
                <option value='SL'>Sierra Leone</option>
                <option value='SG'>Singapore</option>
                <option value='SK'>Slovakia</option>
                <option value='SI'>Slovenia</option>
                <option value='SB'>Solomon Islands</option>
                <option value='SO'>Somalia</option>
                <option value='ZA'>South Africa</option>
                <option value='SS'>South Sudan</option>
                <option value='ES'>Spain</option>
                <option value='LK'>Sri Lanka</option>
                <option value='SD'>Sudan</option>
                <option value='SR'>Suriname</option>
                <option value='SE'>Sweden</option>
                <option value='CH'>Switzerland</option>
                <option value='SY'>Syria</option>
                <option value='TW'>Taiwan</option>
                <option value='TJ'>Tajikistan</option>
                <option value='TZ'>Tanzania</option>
                <option value='TH'>Thailand</option>
                <option value='TG'>Togo</option>
                <option value='TO'>Tonga</option>
                <option value='TT'>Trinidad and Tobago</option>
                <option value='TN'>Tunisia</option>
                <option value='TR'>Turkey</option>
                <option value='TM'>Turkmenistan</option>
                <option value='TV'>Tuvalu</option>
                <option value='UG'>Uganda</option>
                <option value='UA'>Ukraine</option>
                <option value='AE'>United Arab Emirates</option>
                <option value='GB'>United Kingdom</option>
                <option value='US'>United States</option>
                <option value='UY'>Uruguay</option>
                <option value='UZ'>Uzbekistan</option>
                <option value='VU'>Vanuatu</option>
                <option value='VA'>Vatican City</option>
                <option value='VE'>Venezuela</option>
                <option value='VN'>Vietnam</option>
                <option value='YE'>Yemen</option>
                <option value='ZM'>Zambia</option>
                <option value='ZW'>Zimbabwe</option>
            </select>
              <label className={`form__label w-full left-0 text-xs absolute uppercase`} htmlFor="subscribe_country">Country / Region</label>
              <BsChevronDown className='absolute top-1 text-[17px] right-0'/>
            </div>
            <div className="flex flex-wrap gap-5">
              <div className="relative flex items-center justify-center gap-2">
                <input className='form__checkbox' type="checkbox" name="product_category" id="womenswear_category" />
                <label className='text-xs capitalize mt-[-2px] ml-4' htmlFor="womenswear_category">Womenswear</label>
              </div>
              <div className="relative flex items-center justify-center gap-2">
                <input className='form__checkbox' type="checkbox" name="product_category" id="manswear_category" />
                <label className='text-xs capitalize mt-[-2px] ml-4' htmlFor="manswear_category">Manswear</label>
              </div>
              <div className="relative flex items-center justify-center gap-2">
                <input className='form__checkbox' type="checkbox" name="product_category" id="kids_category" />
                <label className='text-xs capitalize mt-[-2px] ml-4' htmlFor="kids_category">Kids</label>
              </div>
              <div className="relative flex items-center justify-center gap-2">
                <input className='form__checkbox' type="checkbox" name="product_category" id="homedecor_category" />
                <label className='text-xs capitalize mt-[-2px] ml-4' htmlFor="homedecor_category">Home Decor</label>
              </div>
            </div>
            <p className="text-[10px] leading-4 mt-2">
            Experience fashion as a platform for experimentation. 
            <br />
            <br />
            I have read the <Link className="underline" href="/policy/privacy-policy">Privacy Policy</Link> and I consent the processing of my personal data for marketing purposes.
            </p>
            <div className="mt-4 pb-8 lg:pb-0">
              <button className='bg-[#000000cc] rounded text-[12px] leading-6 font-ibmPlexMedium font-medium text-white py-1 px-[14px] uppercase outline-none border-none hover:bg-[#897f7b]' type='submit'>Subscribe</button>
            </div>
          </div>
        </form>
    </div>
  )
}
