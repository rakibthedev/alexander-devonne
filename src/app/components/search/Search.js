import { IoClose } from 'react-icons/io5'
import { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';

export default function Search({handleSearch}) {
    const [value, setValue] = useState('');
    const [searchResultLength, setSearchResultLength] = useState(null);
    const [isInputting, setIsInputting] = useState(false);
    const [searchedProducts, setSearchedProducts] = useState([]);

    const handleInputChange = (e) => {
        let newValue = e.target.value;
        setValue(newValue);
        setIsInputting(true);
        
        // if(searchedProducts.length > 0){
        //     setSearchedProducts([]);
        // }
    }

    const [debouncedValue, setDebouncedValue] = useState(value);

    // Debounce the value update
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value); // Update debounced value after 2 seconds
        }, 4000);

        return () => clearTimeout(timer); // Clear timeout if value changes
    }, [value]);

    // Fetch search results when debounced value updates
    useEffect(() => {
        if (debouncedValue.trim() !== "") {
            getSearchResult(debouncedValue);
        }
    }, [debouncedValue]);

    const getSearchResult = async (searchValue) => {


        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN_ADDRESS}/api/product/search-products?search=${searchValue}`);
            const result = await response.json();
    
            if(result.success === true){
                if(result.data.length > 0){
                    setSearchResultLength(result.data.length);
                    setSearchedProducts(result.data);
                }else{
                    setSearchResultLength(null);
                    setSearchedProducts([]);
                }
            }else(
                console.error(result.error)
            )

        } catch(err){
            console.error(err)
        }

        setIsInputting(false);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }
  return (
    <div
    className='h-screen fixed w-screen top-0 left-0 bg-[#cdedd380] z-[999999] border-box' 
    style={{backdropFilter: "blur(3rem)"}}
    >
        <div className="absolute z-[9999999] right-3 lg:right-5 top-2">
            <button 
            className='select-none outline-none flex items-center justify-center'
            onClick={handleSearch}>
                <IoClose className='text-[24px]'/>
            </button>
        </div>
        <div className="px-3 lg:px-5 h-screen overflow-y-auto">
                <div className="fixed top-10 left-3 lg:left-5 z-[999999] search__bar">
                    <form onSubmit={handleSubmit}>
                        <div className='relative'>
                            <input 
                            className='p-5 pr-[60px] bg-[#CECECE80] uppercase rounded text-xs outline-none w-full' 
                            type="text" 
                            placeholder='SEARCH HERE'
                            onChange={handleInputChange}
                            value={value || ''}                            
                            />
                            {value &&
                            <button 
                            className='absolute z-[99999] top-1/2 -translate-y-1/2 right-5 outline-none select-none text-[#000000a6] text-xs uppercase z-5'
                            type='button'
                            onClick={(e)=>{
                                e.preventDefault();
                                setValue('');
                                setSearchedProducts([]);
                                setIsInputting(false);
                            }}
                            >
                            Clear
                            </button>}
                        </div>
                    </form>
                </div>
                <div className="mt-[120px] lg:mt-0 pt-[10px] lg:pt-0 pl-1 lg:fixed lg:top-10 lg:right-5 lg:z-[999999] w-[100%] lg:w-[50%] flex-[100%] lg:flex-[50%] flex lg:justify-end lg:max-w-[50%] pb-2">
                    {value &&
                    <div className='pt-5 lg:pt-1'>
                        {isInputting ?(
                            <div className="flex gap-3">
                                <span className="font-bookish text-[22px] leading-7 max-w-full break-words">{`Searhing for you...`}</span>
                                
                            </div>

                        ): (
                            <div>
                                {searchResultLength > 0 ?
                                <span className="font-bookish text-[22px] leading-7 max-w-full break-words">{`I found ${searchResultLength} ${searchResultLength > 1 ? 'results' : 'result'} for`} 
                                    <span className='capitalize'>{` ‘${value}’.`}</span>
                                </span>
                                :
                                <span className="font-bookish text-[22px] leading-7 max-w-full break-words">{`I couldn't find any results for`}
                                    <span className='capitalize'>{` ‘${value}’.`}</span>
                                </span>
                                }
                            </div> 
                        )}
                    </div>}
            </div>

            <div className="py-5 mt-8 lg:mt-[150px] overflow-auto">
                {!isInputting && searchedProducts.length > 0 &&
                    <div>
                        <p className="text-[14px] font-ibmPlexMedium uppercase leading-10">Search Result</p>
                        <ProductCard products={searchedProducts} handleSearch={handleSearch}/>
                    </div>
            }

            {isInputting && value  &&
                <div>
                    <div className="text-[11px] leading-3">Searching...</div>
                    <div className='loading text-[11px] leading-3'>/</div>
                </div>
            }
            </div>
        </div>
    </div>
  )
}
