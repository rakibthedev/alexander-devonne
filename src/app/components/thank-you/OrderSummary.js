import Image from 'next/image';

function OrderSummary({items}) {

const shipping = 8;

  return (
    <div>
        <div>            
            {Array.isArray(items) && items.length > 0 && 
                <div> 
                    <div className="flex items-center justify-start gap-1 text-xs uppercase">
                        <p>
                            <span>Order Summary</span>
                            <span>{`[${items.length}]`}</span>
                        </p>
                        <p className='rounded px-1 py-[2px] leading-3 text-white text-[9px] bg-black uppercase'>
                            Paid
                        </p>
                    </div>       
                    <div className="max-h-[345px] overflow-y-auto">
                        {items.map((item, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex gap-2 mt-3">
                                        <div className="flex flex-col">
                                        <Image
                                        src={item.image}
                                        alt={item.name}
                                        height={112}
                                        width={84}
                                        className='h-auto'
                                        />
                                        </div>
                                        <div>
                                            <div className="flex flex-col justify-between h-full py-1">
                                                <div>
                                                    <p className="font-bookish text-[15px] leading-5 capitalize">{item.name}</p>
                                                    <p className="text-[11px] leading-3">${item.price}</p>
                                                </div>
                                                <div className='mt-4'>
                                                    <p className="flex items-center gap-1 text-[11px] uppercase">
                                                        <span>Color:</span> 
                                                        <span>{item.color}</span> 
                                                    </p>
                                                    <p className="flex items-center gap-1 text-[11px] uppercase">
                                                        <span>Size:</span> 
                                                        <span>{item.size}</span> 
                                                    </p>
                                                    <p className="flex items-center gap-1 text-[11px] uppercase">
                                                        <span>Quntity:</span> 
                                                        <span>{item.quantity}</span> 
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
                            {`$${Intl.NumberFormat('en-US').format(items.reduce((total, item) => total + (item.price * item.quantity || 0), 0))}`}
                            </span>
                        </div>
                        <div className='flex justify-between text-[11px] uppercase leading-4'>
                            <span>Shipping</span>
                            <span>{`$${shipping}`}</span>
                        </div>
                        <div className='flex justify-between text-[11px] uppercase leading-4'>
                            <span>Total (Duties included)</span>
                            <span>
                            {`$${Intl.NumberFormat('en-US').format(items.reduce((total, item) => total + (item.price * item.quantity || 0), 0) + shipping)}`}
                            </span>
                        </div>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default OrderSummary;