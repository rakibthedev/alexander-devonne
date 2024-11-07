"use client"
import { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";



const FAQ = () =>{
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        {
            question: "WHAT IS PSD2?",
            answer: `PSD2 is a new European law introduced to make online payments more secure. It will impact customers in the European Economic Area (EEA) and customers using EU bank accounts. When you place an order online using a card payment, your bank may ask you to confirm your identity through 3D Secure authentication.
                What are the payment steps when I place an order?
                When you place an order within Europe, you may be directed to a 3D Secure authentication by your bank. There are many ways to authenticate online payments and you could be asked to confirm your identity through SMS, email, or TouchID. Once your payment is authenticated and the order has been placed, you’ll return to the confirmation page. As soon as your order has been confirmed, you’ll receive an email.

                How will my bank confirm my identity?
                Get in contact with your bank to understand their 3D Secure authentication process. Make sure they have the correct contact details for you just in case they use SMS or email for authentication.

                If I'm unable to place an order, what should I do?
                If something didn't go quite right, you may contact our Customer Service team.

                I have some more questions about payment: who should I contact?
                Our Customer Service Advisors are happy to answer any additional questions you may have.`
        },
        {
            question: "WHERE CAN I FIND SIZE AND FIT INFORMATION?",
            answer: `Click on ‘Size Chart' on each item’s page to view our conversion chart. We also provide model measurements. For more information, do not hesitate to contact us at ecommerce@off---white.com..`
        },
        {
            question: "WHAT IS A PRE-ORDER?",
            answer: `A pre-order is the reservation of an item that is not yet available for sale but will be soon. Pre-order items are shipped upon the arrival of the products in the warehouse within the time that is stated on the item’s purchase page.
                    In pre-order purchases, credit cards are debited at the moment the order is placed. Regarding order with available items and pre-orderable items, shipment will happen in 2 different phases: available merchandise will be shipped with standard shipping methods. Pre-orderable items will be shipped right after items are available in stock.`
        }
    ];

    const handleOpenFaq = (index)=> {
        setOpenIndex(openIndex === index ? null : index);
    }

    return (
        <div className="px-2 lg:px-5 py-10">
            <div className="flex items-center justify-between mb-1">
                <p className="text-xs uppercase">FAQs</p>
                <p className="text-xs uppercase">[{faqs.length}]</p>
                
            </div>    
            <div>
            {faqs.map((item, index) => {
                return (
                    <div 
                    key={index} 
                    className="py-1 border-b border-black cursor-pointer"
                    onClick={()=>handleOpenFaq(index)}
                    >
                        <div className="flex justify-between items-center">
                            <h2 className={`text-xs ${openIndex === index ? 'font-ibmPlexMedium font-semibold' : 'font-ibmPlexRegular font-normal'} uppercase`}>
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
                                <p className={`text-xs mt-5 mb-4`}>
                                    {item.answer}
                                </p>
                            )}
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default FAQ;