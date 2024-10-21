"use client";
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { IoArrowDownSharp } from "react-icons/io5";
import VariationColor from '../VariationColor';
import { IoMdHeartEmpty } from "react-icons/io";

function removeHtmlTags(str) {
    return str.replace(/<[^>]*>/g, ''); // Removes everything between < and >
}

function formatStringWithLineBreaks(inputString) {
    return inputString.replace(/\r\n/g, '<br>');
}
  
export default function SingleProduct({ product }) {
  const [activeTab, setActiveTab] = useState('materials'); // Default active tab
  const [selectedSize, setSelectedSize] = useState(null); // State for selected size
  const [isExpanded, setIsExpanded] = useState(false); // State for read more/less
  const detailsRef = useRef(null); // Create a ref for the details section

  const materials = product.meta_data
    .filter(item => item.key === 'meterials')
    .map(item => item.value)[0] || ''; // Default to empty string if undefined

  const fitting = product.meta_data
    .filter(item => item.key === '_fitting')
    .map(item => item.value)[0] || ''; // Default to empty string if undefined

  const handleToggle = (tab) => {
    setActiveTab(tab);
  };

  const scrollToDetails = () => {
    const yOffset = -110; // Change this value to adjust the gap
    const y = detailsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size); // Set the selected size
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const descriptionText = removeHtmlTags(product.description);
  const truncatedDescription = descriptionText.length > 100 ? `${descriptionText.slice(0, 100)}...` : descriptionText;

  return (
    <div className="block lg:flex px-2 lg:px-5 gap-5">
        <div className="lg:flex-[70%] flex-[100%]">
            <div className='grid grid-cols-2 mb-16'>
                {product.images.map((item, index) => (
                    <div key={index} className='product__image__wrapper relative flex justify-center items-center'>
                        <Image className='w-full h-auto' src={item.src} height={339} width={254} alt={product.name} />
                        <div className='absolute top-0 left-0 py-2 px-3'>
                            <span className='text-xs'>{`[${index + 1}/${product.images.length}]`}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className='mb-16' ref={detailsRef}>
                <div className='flex items-start gap-5'>
                    <button 
                        className={`uppercase text-[14px] font-ibmPlexMedium ${activeTab === 'materials' ? 'border-b border-black pb-1' : ''}`}
                        onClick={() => handleToggle('materials')}
                    >
                        Materials
                    </button>
                    <button 
                        className={`uppercase text-[14px] font-ibmPlexMedium ${activeTab === 'fitting' ? 'border-b border-black pb-1' : ''}`}
                        onClick={() => handleToggle('fitting')}
                    >
                        Fitting
                    </button>
                </div>

                {activeTab === 'materials' && (
                    <div className='py-2 pt-4 text-xs'
                         dangerouslySetInnerHTML={{ __html: formatStringWithLineBreaks(materials) }} />
                )}
                {activeTab === 'fitting' && (
                    <div className='py-2 pt-4 text-xs'
                         dangerouslySetInnerHTML={{ __html: formatStringWithLineBreaks(fitting) }} />
                )}
            </div>
        </div>

        <div className="lg:flex-[30%] flex-[100%]">
            <h1 className="text-[22px] leading-[150%] font-ibmPlexRegular capitalize">
                {product.name}
            </h1>
            <p className="text-[22px] leading-[140%] font-ibmPlexRegular capitalize">
                {`$${product.price}`}
            </p>
            <p className="text-xs leading-[150%] mt-2">
                {isExpanded ? descriptionText : truncatedDescription}
                {descriptionText.length > 100 && (
                    <button onClick={toggleDescription} className="underline ml-[2px]">
                        {isExpanded ? 'Read less' : 'Read more'}
                    </button>
                )}
            </p>
            <div className="py-2 pt-5 flex items-center gap-1">
                <span className="text-xs"><IoArrowDownSharp /></span>
                <button className='text-xs uppercase hover:underline' onClick={scrollToDetails}>
                    Product Details
                </button>
            </div>
            <div className="pt-3 pb-0">
                <p className='text-xs uppercase'>Colors:</p>
                <div className="py-1">
                    <div className="flex items-center gap-2">
                        {
                            product.attributes
                            .filter(item => item.slug === 'color')
                            .flatMap(item => item.options)
                            .map((option, index) => (
                                <button key={index} className='color__variation__btn'>                            

                                    <VariationColor variationColor={option} />
                                </button>
                            ))                   

                        }
                    </div>
                </div>
            </div>
            <div className="py-4">
                <p className='text-xs uppercase'>Sizes (US):</p>
                <div className="py-1">
                    <div className="flex items-center gap-2">
                        {
                            product.attributes
                            .filter(item => item.slug === 'size')
                            .flatMap(item => item.options)
                            .map((option, index) => (
                                <button 
                                    className={`text-xs hover:text-white ${selectedSize === option ? 'bg-[#333] text-white hover:bg-[#333]' : 'bg-[#cecece80] text-black hover:bg-[#897f7b]'} py-3 px-2 rounded outline-none`} 
                                    key={index}
                                    onClick={() => handleSizeClick(option)}
                                >
                                    {option}
                                </button>
                            ))                   
                        }
                    </div>
                </div>
            </div>
            <div className="mt-5 flex items-center gap-2">
                <button className='bg-black rounded text-xs text-white py-1 uppercase h-[30px] w-[195px]'>Add to bag</button>
                <button className='bg-[#cecece80] rounded text-black h-[30px] flex items-center justify-start px-2 gap-2 group w-[36px] hover:w-[71px]' style={{transition: 'width .3s'}}>
                    <span className='w-5 h-5'>
                        <IoMdHeartEmpty className='text-[20px]' />
                    </span>
                    <span className='text-xs uppercase hidden group-hover:block'>Add</span>
                </button>
            </div>
        </div>
    </div>
  );
}
