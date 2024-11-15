"use client"
import { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import { usePathname } from "next/navigation";

const FAQ = ({faqs = []}) =>{

    const currentPath = usePathname();

    const [openIndex, setOpenIndex] = useState(null);


    const handleOpenFaq = (index)=> {
        setOpenIndex(openIndex === index ? null : index);
    }

     
    const faq = faqs.find(item => item.path === currentPath);

    return (
        <div>
            {faq ? (
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <p className={`${faq.description ? 'font-bookish text-[26px] uppercase mb-5' : 'text-xs uppercase'}`}>{faq.title}</p>
                        {!faq.description && faq.faq_items.length > 0 && <p className="text-xs uppercase">[{faq.faq_items.length}]</p>}
                        
                    </div> 
                    {faq.description &&
                    <div className="text-xs mb-8" dangerouslySetInnerHTML={{__html: faq.description}}>                
                    </div>
                    }   
                    <div>
                    
                    {faq.faq_items.map((item, index) => {
                        return (
                            <div 
                            key={index} 
                            className="py-1 border-b border-black cursor-pointer"
                            onClick={()=>handleOpenFaq(index)}
                            >
                                <div className="flex justify-between items-center">
                                    <h2 className={`${openIndex === index ? 'font-ibmPlexBold text-[14px] pt-4' : 'font-ibmPlexRegular font-normal text-xs'} uppercase`}>
                                        {item.question}
                                    </h2>
                                    <div className="px-1">
                                        <button className="text-xs">
                                            {openIndex === index ? 
                                                <BiPlus /> 
                                            :
                                                <BiMinus />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className="">
                                    {openIndex === index && (
                                        <div dangerouslySetInnerHTML={{__html: item.answer}} className={`text-xs mt-5 mb-4`} />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>
                ):(
                    <div className="text-xs">Ops! something went wrong.</div>
                )}
        </div>
    )
}

export default FAQ;