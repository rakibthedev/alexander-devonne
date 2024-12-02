

export default function GridLoading({productsLength = 8 }) {
    const products = new Array(productsLength).fill(null);  // Create an array with `productsLength` items
    // Or a custom loading skeleton component
    return (
            <div
            className={`product__grid grid grid-cols-2 lg:grid-cols-4 items-stretch`}
            >
            {products.map((item, index) => {
                    return (
               
                    <div
                    key={index}
                     className="product__wrapper"
                    >
                        <div className="flex flex-col gap-4 animate-pulse">
                            <div className="p-3">
                                <div className="h-[230px] lg:h-[350px] w-full bg-gray-800/20"></div>
                            </div>
                            <div className="p-3 w-full border-t border-[#e1e1e1]">
                                <div className="w-full bg-gray-800/20 mb-3 h-4"></div>
                                <div className="w-full bg-gray-800/20 mb-3 h-4"></div>
                            </div>
                        </div>

                    </div>
                    )
                })}   

            </div>
    )
  }