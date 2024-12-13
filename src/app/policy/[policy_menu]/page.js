import FAQ from "@/app/components/faq/FAQ";
import FaqMenu from "@/app/components/faq/FaqMenu";
import { policy_faqs } from "@/app/constants/faqs";
import ScrollToTop from '@/app/components/ScrollToTop';

const Page = () => {
    return (
        <div>
            <ScrollToTop />
            <div className="block lg:flex justify-between pt-10 pb-20 px-3 lg:px-5 relative">
                <div className="lg:flex-[70%]">
                    <FAQ faqs={policy_faqs}/>
                </div>
                <div className="lg:flex-[30%] lg:flex justify-end mt-10">
                    <FaqMenu faqs={policy_faqs}/>
                </div>
            </div>
        </div>
    )
}

export default Page;