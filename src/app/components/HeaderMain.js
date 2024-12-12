"use client";
import Link from 'next/link';
import { React, useContext, useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { BsBag } from "react-icons/bs";
import Navbar from './Navbar';
import { CartContext } from '@/app/context/cartContext';
import { WishContext } from '../context/wishContext';
import { IoCloseOutline } from "react-icons/io5";
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import { megaMenuItems } from "@/app/constants/megaMenu";
import { GoChevronLeft, GoChevronRight, GoChevronUp, GoChevronDown } from "react-icons/go";
import { LoginContext } from '../context/loginContext';
import Search from './search/Search';


export default function HeaderMain() {
  const [isShowMobileMenu, SetIsShowMobileMenu] = useState(false);
  const [currentSubCat, setCurrentSubCat] = useState(null);
  const [currentMenuItem, setCurrentMenuItem] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [menuData, setMenuData] = useState(megaMenuItems);
  const [isSearching, setIsSearching] = useState(false);
  // Login Context 
  const {loggedUserData, setLoggedUserData} = useContext(LoginContext);

  const { cartItem = [], setPopupShow } = useContext(CartContext) || {}; // Default to empty array
  const cartItemCount = cartItem.length;

  const showBagPopup = () => {
    setPopupShow(true);
  };

  const { wishItem = [] } = useContext(WishContext) || {}; // Default to empty array
  const wishItemCount = wishItem.length;

  // Toggle mobile menu function 
  const toggleMobileMenu = () => {
    SetIsShowMobileMenu(prev => !prev);
    setCurrentSubCat(null);
    setCurrentMenuItem(null);
    setSelectedCat(null);
  }

  // Fetch Menu Data
  useEffect(()=>{
    async function getMenuData() {
      const apiUrl =  `${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/menu/header-menu`;
      const res = await fetch(apiUrl);
      const data = await res.json();
      
      if(res.ok){
        setMenuData(data);
      }
    }
    getMenuData();

  },[])

  useEffect(() => {
    if (isSearching) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSearching]);

  // Close Search 
  const handleSearch = () => {
    setIsSearching(false);
  }

  return (
    <div className='header__main bg-white sticky z-[100] w-full top-[-1px]'>
      {/* Search Component start  */}
      {isSearching && <Search handleSearch={handleSearch} />}
      {/* Search Component end */}
      <div className='px-3 py-2 lg:px-5 flex justify-between lg:pt-3 items-center'>
        <div className='flex-[25%] lg:hidden'>
          <button 
          className='inline-block mt-1 border-none p-0 outline-none text-[24px] cursor-pointer'
          onClick={toggleMobileMenu}
          >
            {isShowMobileMenu ? <IoCloseOutline /> : <HiOutlineMenuAlt4 />}
          </button>         
        </div>
        <div className='hidden lg:flex justify-start gap-[30px] items-center flex-[25%]'>
          <div className='flex justify-between gap-1 items-center'>
            <button className='border-none p-0 outline-none text-xs font-normal hover:underline'>United States $</button>
            <span className='text-xs'>/</span>
            <button className='border-none p-0 outline-none text-xs font-normal hover:underline'>EN</button>
          </div>
          <Link href="https://www.alexanderdevonne.com/contact-us" className='border-none p-0 outline-none text-xs font-normal hover:underline'>Contact us</Link>
        </div>
        <div className='flex-[50%] flex justify-center select-none'>
          <Link href="/"><img className='h-auto lg:w-[200px] lg:h-auto' src='/images/logo.png' width={150} height={50} alt="Alexander Devonne" /></Link>
        </div>
        <div className='flex-[25%] flex justify-end gap-[30px] items-center'>
          <div className='flex justify-between gap-[25px] items-center'>
            {loggedUserData ? 
              <Link href="/dashboard/profile" className='hidden lg:block border-none p-0 outline-none text-xs font-normal hover:underline'>My Account</Link>
              :
              <Link href="/account/login" className='hidden lg:block border-none p-0 outline-none text-xs font-normal hover:underline'>Login</Link>
            }
            {/* Search button  */}
            <button 
            className='border-none p-0 outline-none text-[18px] font-normal hover:underline'
            onClick={()=>setIsSearching(true)}
            >
              <IoSearchOutline />
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className='hidden lg:block text-[18px]'>
              <div className="relative">
                <IoIosHeartEmpty />
                <span className='absolute top-[-4px] left-[18px] text-[8px]'>{wishItemCount > 0 ? wishItemCount : ''}</span>
              </div>
            </Link>
            <button className='text-[18px]' 
              onClick={showBagPopup}
              onMouseEnter={showBagPopup}
            >
              <div className="relative">
                <BsBag />
                <span className='absolute top-[-4px] left-[18px] text-[8px]'>{cartItemCount > 0 ? cartItemCount : ''}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <Navbar />
      {/* Mobile Menu */}
      {isShowMobileMenu && 
      <div 
        className="absolute bg-white lg:hidden w-full top-12 left-0 z-20 py-1 overflow-y-auto" 
        style={{height: "calc(100vh - 48px)"}}
        >
          <div>
            {isShowMobileMenu &&
            <div>
                {currentSubCat === null && menuData.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="py-4 px-4 text-[14px] uppercase cursor-pointer">
                                <div className="flex justify-between" onClick={()=>setCurrentSubCat(index)}>
                                    <span>{item.menu.menu_title}</span>
                                    <span className="text-[22px]">
                                        <GoChevronRight />
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
                
                {currentSubCat !== null && 
                <div>
                    <div className="py-4 px-4 mb-2 text-[14px] uppercase border-b border-[#e8e8e8] flex items-center gap-2 cursor-pointer"
                    onClick={()=>setCurrentSubCat(null)}
                    >
                        <span className="text-[22px]">
                            <GoChevronLeft/>
                        </span>
                        <span>
                            {menuData[currentSubCat].menu.menu_title}
                        </span>
                        {selectedCat !== null &&
                        <div className="flex items-center gap-2">
                            <span>/</span>
                            <span>{selectedCat}</span>
                        </div>
                        }
                    </div>
                      <div className='py-4 px-4 pl-8 text-[14px] font-ibmPlexMedium uppercase'>
                        <Link onClick={()=>SetIsShowMobileMenu(false)} href={menuData[currentSubCat].menu.menu_link}>All {menuData[currentSubCat].menu.menu_title}</Link>
                      </div>
                      {menuData[currentSubCat].menu.sub_menu.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="py-4 px-4 pl-8 text-[14px] font-ibmPlexMedium uppercase">
                                    <div 
                                    className="flex justify-between items-center cursor-pointer"
                                    onClick={()=>{
                                      if(currentMenuItem === index){
                                        if(currentMenuItem === null){
                                              setCurrentMenuItem(index);
                                              setSelectedCat(item.sub_menu_title);
                                            }else{
                                                setCurrentMenuItem(null);
                                                setSelectedCat(null);
                                            }
                                        }else{
                                            setCurrentMenuItem(index);
                                            setSelectedCat(item.sub_menu_title);
                                        }
                                    }}
                                    >
                                        <span>{item.sub_menu_title}</span>
                                        <span className="text-[22px]">
                                            {currentMenuItem === index ? <GoChevronUp/> : <GoChevronDown />}
                                        </span>
                                    </div>

                                    {currentMenuItem === index && <div className="mt-5 text-[13px] capitalize font-ibmPlexRegular cursor-pointer">
                                        <Link href={item.sub_menu_link} onClick={()=>SetIsShowMobileMenu(false)}>
                                          All {item.sub_menu_title}
                                        </Link>    
                                    </div>}
                                    {currentMenuItem === index && item.sub_menu_items.map((menuItem, miIndex) => {
                                        return (
                                            <div key={miIndex} className="mt-5">
                                                <div className="text-[13px] capitalize font-ibmPlexRegular cursor-pointer">
                                                    <Link href={menuItem.item_link} onClick={()=>SetIsShowMobileMenu(false)}>
                                                      {menuItem.item_title}
                                                    </Link>    
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                      })}
                </div>}
            </div>
            }
        </div>  
      </div>
      }
    </div>
  );
}
