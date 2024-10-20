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
              <input onChange={handleInputChange} id='subscribe_email' className={`absolute left-0 form__input ${input ? 'active' : ''} w-full pb-2 outline-none border-b border-black text-xs leading-5`} type="text" autoComplete='off' />
              <label className={`form__label w-full left-0 text-xs absolute uppercase`} htmlFor="subscribe_email">EMAIL ADDRESS</label>
            </div>
            <div className="input__group relative h-12">
              <select id='subscribe_country' defaultValue="United States" className={`absolute top-1 left-0 form__input active w-full pb-2 outline-none border-b border-black text-xs leading-5`}>
                <option value='Afghanistan'>Afghanistan</option>
                <option value='Albania'>Albania</option>
                <option value='Algeria'>Algeria</option>
                <option value='Andorra'>Andorra</option>
                <option value='Angola'>Angola</option>
                <option value='Antigua and Barbuda'>Antigua and Barbuda</option>
                <option value='Argentina'>Argentina</option>
                <option value='Armenia'>Armenia</option>
                <option value='Australia'>Australia</option>
                <option value='Austria'>Austria</option>
                <option value='Azerbaijan'>Azerbaijan</option>
                <option value='Bahamas'>Bahamas</option>
                <option value='Bahrain'>Bahrain</option>
                <option value='Bangladesh'>Bangladesh</option>
                <option value='Barbados'>Barbados</option>
                <option value='Belarus'>Belarus</option>
                <option value='Belgium'>Belgium</option>
                <option value='Belize'>Belize</option>
                <option value='Benin'>Benin</option>
                <option value='Bhutan'>Bhutan</option>
                <option value='Bolivia'>Bolivia</option>
                <option value='Bosnia and Herzegovina'>Bosnia and Herzegovina</option>
                <option value='Botswana'>Botswana</option>
                <option value='Brazil'>Brazil</option>
                <option value='Brunei'>Brunei</option>
                <option value='Bulgaria'>Bulgaria</option>
                <option value='Burkina Faso'>Burkina Faso</option>
                <option value='Burundi'>Burundi</option>
                <option value='Cabo Verde'>Cabo Verde</option>
                <option value='Cambodia'>Cambodia</option>
                <option value='Cameroon'>Cameroon</option>
                <option value='Canada'>Canada</option>
                <option value='Central African Republic'>Central African Republic</option>
                <option value='Chad'>Chad</option>
                <option value='Chile'>Chile</option>
                <option value='China'>China</option>
                <option value='Colombia'>Colombia</option>
                <option value='Comoros'>Comoros</option>
                <option value='Congo, Republic of the'>Congo, Republic of the</option>
                <option value='Congo, Democratic Republic of the'>Congo, Democratic Republic of the</option>
                <option value='Costa Rica'>Costa Rica</option>
                <option value='Croatia'>Croatia</option>
                <option value='Cuba'>Cuba</option>
                <option value='Cyprus'>Cyprus</option>
                <option value='Czech Republic'>Czech Republic</option>
                <option value='Denmark'>Denmark</option>
                <option value='Djibouti'>Djibouti</option>
                <option value='Dominica'>Dominica</option>
                <option value='Dominican Republic'>Dominican Republic</option>
                <option value='Ecuador'>Ecuador</option>
                <option value='Egypt'>Egypt</option>
                <option value='El Salvador'>El Salvador</option>
                <option value='Equatorial Guinea'>Equatorial Guinea</option>
                <option value='Eritrea'>Eritrea</option>
                <option value='Estonia'>Estonia</option>
                <option value='Eswatini'>Eswatini</option>
                <option value='Ethiopia'>Ethiopia</option>
                <option value='Fiji'>Fiji</option>
                <option value='Finland'>Finland</option>
                <option value='France'>France</option>
                <option value='Gabon'>Gabon</option>
                <option value='Gambia'>Gambia</option>
                <option value='Georgia'>Georgia</option>
                <option value='Germany'>Germany</option>
                <option value='Ghana'>Ghana</option>
                <option value='Greece'>Greece</option>
                <option value='Grenada'>Grenada</option>
                <option value='Guatemala'>Guatemala</option>
                <option value='Guinea'>Guinea</option>
                <option value='Guinea-Bissau'>Guinea-Bissau</option>
                <option value='Guyana'>Guyana</option>
                <option value='Haiti'>Haiti</option>
                <option value='Honduras'>Honduras</option>
                <option value='Hungary'>Hungary</option>
                <option value='Iceland'>Iceland</option>
                <option value='India'>India</option>
                <option value='Indonesia'>Indonesia</option>
                <option value='Iran'>Iran</option>
                <option value='Iraq'>Iraq</option>
                <option value='Ireland'>Ireland</option>
                <option value='Israel'>Israel</option>
                <option value='Italy'>Italy</option>
                <option value='Jamaica'>Jamaica</option>
                <option value='Japan'>Japan</option>
                <option value='Jordan'>Jordan</option>
                <option value='Kazakhstan'>Kazakhstan</option>
                <option value='Kenya'>Kenya</option>
                <option value='Kiribati'>Kiribati</option>
                <option value='Korea, North'>Korea, North</option>
                <option value='Korea, South'>Korea, South</option>
                <option value='Kuwait'>Kuwait</option>
                <option value='Kyrgyzstan'>Kyrgyzstan</option>
                <option value='Laos'>Laos</option>
                <option value='Latvia'>Latvia</option>
                <option value='Lebanon'>Lebanon</option>
                <option value='Lesotho'>Lesotho</option>
                <option value='Liberia'>Liberia</option>
                <option value='Libya'>Libya</option>
                <option value='Liechtenstein'>Liechtenstein</option>
                <option value='Lithuania'>Lithuania</option>
                <option value='Luxembourg'>Luxembourg</option>
                <option value='Madagascar'>Madagascar</option>
                <option value='Malawi'>Malawi</option>
                <option value='Malaysia'>Malaysia</option>
                <option value='Maldives'>Maldives</option>
                <option value='Mali'>Mali</option>
                <option value='Malta'>Malta</option>
                <option value='Marshall Islands'>Marshall Islands</option>
                <option value='Mauritania'>Mauritania</option>
                <option value='Mauritius'>Mauritius</option>
                <option value='Mexico'>Mexico</option>
                <option value='Micronesia'>Micronesia</option>
                <option value='Moldova'>Moldova</option>
                <option value='Monaco'>Monaco</option>
                <option value='Mongolia'>Mongolia</option>
                <option value='Montenegro'>Montenegro</option>
                <option value='Morocco'>Morocco</option>
                <option value='Mozambique'>Mozambique</option>
                <option value='Myanmar'>Myanmar</option>
                <option value='Namibia'>Namibia</option>
                <option value='Nauru'>Nauru</option>
                <option value='Nepal'>Nepal</option>
                <option value='Netherlands'>Netherlands</option>
                <option value='New Zealand'>New Zealand</option>
                <option value='Nicaragua'>Nicaragua</option>
                <option value='Niger'>Niger</option>
                <option value='Nigeria'>Nigeria</option>
                <option value='North Macedonia'>North Macedonia</option>
                <option value='Norway'>Norway</option>
                <option value='Oman'>Oman</option>
                <option value='Pakistan'>Pakistan</option>
                <option value='Palau'>Palau</option>
                <option value='Palestine'>Palestine</option>
                <option value='Panama'>Panama</option>
                <option value='Papua New Guinea'>Papua New Guinea</option>
                <option value='Paraguay'>Paraguay</option>
                <option value='Peru'>Peru</option>
                <option value='Philippines'>Philippines</option>
                <option value='Poland'>Poland</option>
                <option value='Portugal'>Portugal</option>
                <option value='Qatar'>Qatar</option>
                <option value='Romania'>Romania</option>
                <option value='Russia'>Russia</option>
                <option value='Rwanda'>Rwanda</option>
                <option value='Saint Kitts and Nevis'>Saint Kitts and Nevis</option>
                <option value='Saint Lucia'>Saint Lucia</option>
                <option value='Saint Vincent and the Grenadines'>Saint Vincent and the Grenadines</option>
                <option value='Samoa'>Samoa</option>
                <option value='San Marino'>San Marino</option>
                <option value='Sao Tome and Principe'>Sao Tome and Principe</option>
                <option value='Saudi Arabia'>Saudi Arabia</option>
                <option value='Senegal'>Senegal</option>
                <option value='Serbia'>Serbia</option>
                <option value='Seychelles'>Seychelles</option>
                <option value='Sierra Leone'>Sierra Leone</option>
                <option value='Singapore'>Singapore</option>
                <option value='Slovakia'>Slovakia</option>
                <option value='Slovenia'>Slovenia</option>
                <option value='Solomon Islands'>Solomon Islands</option>
                <option value='Somalia'>Somalia</option>
                <option value='South Africa'>South Africa</option>
                <option value='South Sudan'>South Sudan</option>
                <option value='Spain'>Spain</option>
                <option value='Sri Lanka'>Sri Lanka</option>
                <option value='Sudan'>Sudan</option>
                <option value='Suriname'>Suriname</option>
                <option value='Sweden'>Sweden</option>
                <option value='Switzerland'>Switzerland</option>
                <option value='Syria'>Syria</option>
                <option value='Taiwan'>Taiwan</option>
                <option value='Tajikistan'>Tajikistan</option>
                <option value='Tanzania'>Tanzania</option>
                <option value='Thailand'>Thailand</option>
                <option value='Togo'>Togo</option>
                <option value='Tonga'>Tonga</option>
                <option value='Trinidad and Tobago'>Trinidad and Tobago</option>
                <option value='Tunisia'>Tunisia</option>
                <option value='Turkey'>Turkey</option>
                <option value='Turkmenistan'>Turkmenistan</option>
                <option value='Tuvalu'>Tuvalu</option>
                <option value='Uganda'>Uganda</option>
                <option value='Ukraine'>Ukraine</option>
                <option value='United Arab Emirates'>United Arab Emirates</option>
                <option value='United Kingdom'>United Kingdom</option>
                <option value='United States'>United States</option>
                <option value='Uruguay'>Uruguay</option>
                <option value='Uzbekistan'>Uzbekistan</option>
                <option value='Vanuatu'>Vanuatu</option>
                <option value='Vatican City'>Vatican City</option>
                <option value='Venezuela'>Venezuela</option>
                <option value='Vietnam'>Vietnam</option>
                <option value='Yemen'>Yemen</option>
                <option value='Zambia'>Zambia</option>
                <option value='Zimbabwe'>Zimbabwe</option>

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
            I have read the <Link className="underline" href="#">Privacy Policy</Link> and I consent the processing of my personal data for marketing purposes.
            </p>
            <div className="mt-4 pb-8 lg:pb-0">
              <button className='bg-[#000000cc] rounded text-[12px] leading-6 font-ibmPlexMedium font-medium text-white py-1 px-[14px] uppercase outline-none border-none hover:bg-[#897f7b]' type='submit'>Subscribe</button>
            </div>
          </div>
        </form>
    </div>
  )
}
