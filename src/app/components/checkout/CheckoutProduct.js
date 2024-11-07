import Image from 'next/image';

function CheckoutProduct({cartItem}) {

    function formatString(input) {
        return input
        .toUpperCase()
        .replace(/[_\s,]+/g, ' - ')
        .replace(/[^A-Z0-9 -]/g, '')
        .trim();
    }

    const shipping = 8;

  return (
    <div>
        <div>
            <p className="flex items-center gap-1 text-xs uppercase">
                <span>Your Order Summary</span>
                <span>{`[${cartItem.length}]`}</span>
            </p>
            <div className="max-h-[345px] overflow-y-auto">
                {cartItem.map((item, index) => {
                    return (
                        <div key={index}>
                            <div className="flex gap-2 mt-5">
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
                                                <span>{formatString(item.color)}</span> 
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
            <div className='mt-8 block'>
                <div className='flex justify-between text-[11px] uppercase leading-4'>
                    <span>Subtotal</span>
                    <span>
                    {`$${Intl.NumberFormat('en-US').format(cartItem.reduce((total, item) => total + (item.price * item.quantity || 0), 0))}`}
                    </span>
                </div>
                <div className='flex justify-between text-[11px] uppercase leading-4'>
                    <span>Shipping</span>
                    <span>{`$${shipping}`}</span>
                </div>
                <div className='flex justify-between text-[11px] uppercase leading-4'>
                    <span>Total (Duties included)</span>
                    <span>
                    {`$${Intl.NumberFormat('en-US').format(cartItem.reduce((total, item) => total + (item.price * item.quantity || 0), 0) + shipping)}`}
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CheckoutProduct