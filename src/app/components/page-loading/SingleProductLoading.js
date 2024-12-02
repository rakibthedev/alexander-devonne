

export default function SingleProductLoading({productsLength = 8 }) {
    const products = new Array(productsLength).fill(null);  // Create an array with `productsLength` items
    // Or a custom loading skeleton component
    return (
            <div
            className={`product__grid grid grid-cols-2 items-stretch`}
            >
            {products.map((item, index) => {
                    return (
               
                    <div
                    key={index}
                     className="product__wrapper"
                    >
                        <div className="flex flex-col gap-4 animate-pulse">
                            <div className="p-3">
                                <div className="h-[230px] lg:h-[500px] w-full bg-gray-800/20"></div>
                            </div>                            
                        </div>

                    </div>
                    )
                })}   

            </div>
    )
  }