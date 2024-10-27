"use client";
import { WishContext } from '@/app/context/wishContext';
import { CartContext } from '@/app/context/cartContext';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image'; 
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { IoIosHeart } from "react-icons/io"; 

function formatString(input) {
  if (!input) return '--'; 
  return input
    .toUpperCase()
    .replace(/[_\s,]+/g, ' - ')
    .replace(/[^A-Z0-9 -]/g, '')
    .trim();
}

export default function WishList() {
  const Router = useRouter();
  const { wishItem = [], setWishItem } = useContext(WishContext) || { wishItem: [] };
  const { cartItem = [], setCartItem } = useContext(CartContext) || { cartItem: [] };
  const [loading, setLoading] = useState(true);
  const [removeloading, setRemoveloading] = useState({});

  useEffect(() => {
    // Simulate fetching wishlist items
    const fetchWishlistItems = async () => {
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 100));
      setLoading(false);
    };
    fetchWishlistItems();
  }, []);

  const handleMoveToBag = (wishItemId, wishFullItem) => {
    setCartItem((prevCartItem) => [...prevCartItem, wishFullItem]);
    setWishItem((prevItem) => prevItem.filter(item => item.id !== wishItemId));    
  };

  const handleGoBag = () => {   
    Router.push("/bag");
  };
  const handleRemoveWishItem = (itemId) => {
    setRemoveloading((prev) => ({ ...prev, [itemId]: true }));
    setTimeout(()=>{
      setWishItem((prevItem) => prevItem.filter(item => item.id !== itemId));  
      setRemoveloading((prev) => ({ ...prev, [itemId]: false }));
    }, 1000)
  }
  return (
    <div className='pt-12 pb-[160px] px-2 lg:px-5'>
      {loading ? (
        <p className='loading text-[10px]'></p> // You can customize this loading message or spinner
      ) : wishItem.length > 0 ? (
        <div>
          <h1 className="text-[26px] font-bookish mb-6">
            {`Your wishlist (${wishItem.length} item${wishItem.length > 1 ? 's' : ''})`}
          </h1>
          <div className="product__grid grid grid-cols-4">
            {wishItem.map((item, index) => (
              <div className="product__wrapper w-full relative" key={index}>
                <Link href={`/shopping/${item.slug}`}>
                  <div>
                    <Image
                      src={item.image}
                      width="254"
                      height="339"
                      className={`w-full h-auto`}
                      alt={item.name}
                    />
                  </div>
                  </Link>
                  <div className="pl-[18px] py-5">
                    <p className="text-[12px] capitalize">{item.name}</p>
                    <p className="text-[12px]">{`$${item.price}`}</p>
                    <div className="mt-4">
                      <div className="flex items-center text-[11px] gap-2 uppercase">
                        <span>Color:</span>
                        <span>{formatString(item.color)}</span>
                      </div>
                      <div className="flex items-center text-[11px] gap-2 uppercase">
                        <span>Size:</span>
                        <span>{formatString(item.size)}</span>
                      </div>
                    </div>
                    <div>
                      {
                        cartItem.some(cartItem => cartItem.id === item.id) ? (
                          <button 
                            className="bg-[#e1e1e180] text-black hover:bg-[#897f7b] rounded px-[55px] py-[5px] text-[14px] hover:text-white uppercase mt-4" 
                            onClick={handleGoBag}
                          >
                            In your bag
                          </button>
                        ) : (
                          <button 
                            className="bg-[#000000cc] rounded px-[55px] py-[5px] text-[14px] text-white uppercase hover:bg-[#897f7b] mt-4"
                            onClick={(e) => handleMoveToBag(item.id, item)}
                          >
                            Move to bag
                          </button>
                        )
                      }
                    </div>
                  </div>  
                  <div className="absolute top-0 right-0 p-3 z-30 w-[45px] h-[45px] flex justify-center items-center">
                  
                    {removeloading[item.id] ? (
                      <span className="loading text-xs">/</span>
                    ):(
                    <button 
                    className="outline-none"
                    onClick={()=> handleRemoveWishItem(item.id)}
                    >
                      <IoIosHeart className="text-black text-[20px]" />
                    </button>
                    )}
                  
                </div>            
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-[26px] font-bookish mb-8">Your wishlist</h1>
          <p className="my-8 text-xs">{`Add items to your wishlist so you can save them for later. Click or tap 'Add to Wishlist' throughout the site.`}</p>
          <div className='pt-2'>
            <Link href="/" className='bg-[#000000cc] text-center text-white text-[14px] uppercase rounded py-2 px-[55px] font-ibmPlexMedium hover:bg-[#897f7b]'>Continue Shopping</Link>
          </div>
        </div>
      )}
    </div>
  );
}
