

import GridLoading from '../../components/page-loading/GridLoading';

export default function Loading() {

    // Or a custom loading skeleton component
    return (
        <div className="w-full bg-white px-3 lg:px-5 pt-5 pb-10">
            <div>
                <div className="w-[300px] bg-gray-800/20 mb-6 h-5 animate-pulse"></div>
            </div>
            <div>
                <div className="w-[200PX] bg-gray-800/20 mb-6 h-5 animate-pulse"></div>
            </div>

            <GridLoading productsLength={8}/>
        </div>
    )
  }