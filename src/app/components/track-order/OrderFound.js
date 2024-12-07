"use client"
import OrderSum from '../account/dashboard/OrderSum'
import { formatDate } from '../methods/formate-date'

export default function OrderFound({orderData}) {

  return (
    <div className='pt-10 pb-32 px-3 lg:px-5 bg-[#ddd7d6] min-h-[500px]'>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
        <div className="flex-[100%] lg:flex-[65%]">                     
          
        <div className='flex flex-col gap-5'>
                    <div className="flex justify-between gap-1">
                        <h1 className="text-xs uppercase mb-1">Your tracked order</h1>                                             
                    </div>
                    {orderData.length > 0 && orderData.map((item, index)=>{
                     return (
                        <div
                        key={index} 
                        className="flex flex-col lg:flex-row gap-10 lg:gap-0 bg-[#eeebeb] rounded p-4">
                            <div className="flex flex-col justify-start flex-[100%] lg:flex-[50%]">

                                {/* <p className='text-xs mb-4 capitalize font-ibmPlexMedium'>#{index + 1}</p> */}

                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Order ID:</p>
                                    <p className='text-xs uppercase'>{item.id || '--'}</p>
                                </div>
                                <div className="flex gap-1 items-center">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Status:</p>
                                    <p className='text-[10px] leading-3 uppercase px-1 py-[3px] rounded bg-black text-white'>{item.status  || '--'}</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Order Date:</p>
                                    <p className='text-xs uppercase'>{formatDate(item.date_created  || '--')}</p>
                                </div>                                
                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Payment Method:</p>
                                    <p className='text-xs uppercase'>{item.payment_method || '--'}</p>
                                </div>
                                <div className="flex gap-1">
                                    <p className='text-xs uppercase font-ibmPlexMedium'>Transaction id:</p>
                                    <p className='text-xs '>{item.transaction_id || '--'}</p>
                                </div>
                            </div>
                            <div className="flex-[100%] lg:flex-[50%] lg:border lg:border-solid lg:border-l-[#d8d8d8] lg:pl-10 max-w-[350px]">
                                <OrderSum lineItems={item.line_items} totalPrice={item.total} shippingTotal={item.shipping_lines[0]?.total || 0}/>
                            </div>
                        </div>
                        )
                    })}

                </div>
                     
        </div>
        <div className="flex-[100%] lg:flex-[45%] flex mt-5 justify-end">

        </div>
      </div>
    </div>
  )
}
