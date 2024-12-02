

import SingleProductLoading from '@/app/components/page-loading/SingleProductLoading';
import GridLoading from './../../components/page-loading/GridLoading';

export default function Loading() {

    // Or a custom loading skeleton component
    return (
        <div className="w-full bg-white px-3 lg:px-5 pt-5 pb-10">
            <div className="flex flex-col lg:flex-row gap-14">
                <div className="lg:flex-[70%]">
                    <SingleProductLoading productsLength={4}/>                
                </div>
                <div className="lg:flex-[30%]">
                    <div>
                        <div className="w-full bg-gray-800/20 mb-4 h-8 animate-pulse"></div>
                    </div>
                    <div>
                        <div className="w-full bg-gray-800/20 mb-6 h-14 animate-pulse"></div>
                    </div>
                    <div>
                        <div className="w-full bg-gray-800/20 mb-6 h-[200px] animate-pulse"></div>
                    </div>

                </div>
            </div>
        </div>
    )
  }