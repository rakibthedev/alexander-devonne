import Image from 'next/image';

function OrderSum({lineItems, totalPrice, shippingTotal}) {

    function formatString(input) {
        if(input){
            return input
            .toUpperCase()
            .replace(/[_\s,]+/g, ' - ')
            .replace(/[^A-Z0-9 -]/g, '')
            .trim();
        }else{
            return
        }
    }

    const shipping = Number(shippingTotal);

  return (
    <div>
        <div>
            <p className="flex items-center gap-1 text-xs uppercase">
                <span>Order Summary</span>
                <span>{`[${lineItems.length}]`}</span>
            </p>
            <div className="max-h-[280px] overflow-y-auto">
                {lineItems.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex gap-2 mt-5">
                                <div className="flex flex-col">
                                <Image
                                src={item.image.src}
                                alt={item.name}
                                height={112}
                                width={84}
                                className='h-auto'
                                />
                                </div>
                                <div>
                                    <div className="flex flex-col justify-between h-full py-1">
                                        <div>
                                            <p className="font-bookish text-[15px] leading-5 capitalize">{item.name  || '--'}</p>
                                            <p className="text-[11px] leading-3">${item.price  || '--'}</p>
                                        </div>
                                        <div className='mt-4'>
                                            <p className="flex items-center gap-1 text-[11px] uppercase">
                                                <span>Color:</span> 
                                                <span>{formatString(item.meta_data[0]?.value?.color  || '--')}</span> 
                                            </p>
                                            <p className="flex items-center gap-1 text-[11px] uppercase">
                                                <span>Size:</span> 
                                                <span>{item.meta_data[0]?.value?.size  || '--'}</span> 
                                            </p>
                                            <p className="flex items-center gap-1 text-[11px] uppercase">
                                                <span>Quntity:</span> 
                                                <span>{item.quantity || '--'}</span> 
                                            </p>                                            
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )
                })} 
            </div>
            <div className='mt-5 block'>
                <div className='flex justify-between text-[11px] uppercase leading-4'>
                    <span>Subtotal</span>
                    <span>
                    {`$${Intl.NumberFormat('en-US').format((Number(totalPrice) || 0), 0)}`}
                    </span>
                </div>
                <div className='flex justify-between text-[11px] uppercase leading-4'>
                    <span>Shipping</span>
                    <span>{`$${shipping}`}</span>
                </div>
                <div className='flex justify-between text-[11px] uppercase leading-4'>
                    <span>Total (Duties included)</span>
                    <span>
                    {`$${Intl.NumberFormat('en-US', { minimumFractionDigits: 0 }).format((Number(totalPrice) || 0) + (Number(shipping) || 0))}`}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderSum;