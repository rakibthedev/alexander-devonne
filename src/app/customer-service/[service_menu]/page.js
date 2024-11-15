import FAQ from "@/app/components/faq/FAQ";
import FaqMenu from "@/app/components/faq/FaqMenu";
import { faqs } from "@/app/constants/faqs";

const Page = () => {
    return (
        <div>
            <div className="block lg:flex justify-between pt-10 pb-20 px-3 lg:px-5 relative">
                <div className="lg:flex-[70%]">
                    <FAQ faqs={faqs}/>
                </div>
                <div className="lg:flex-[30%] lg:flex justify-end mt-10">
                    <FaqMenu faqs={faqs}/>
                </div>
            </div>
        </div>
    )
}

export default Page;