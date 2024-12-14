import Login from "@/app/components/account/Login";
import Register from "@/app/components/account/Register";

const Page = () =>{

    return (
        <div className="pt-5 pb-10 px-3 md:px-5 flex md:flex-row gap-14 md:gap-20 flex-col">
            <div className="w-full md:w-[395px]">
                <Login inputBg={"e1e1e180"} title={"Sign in to your account"} redirect={`/dashboard/profile`}  />
            </div>
            <div className="w-full md:w-[395px]">
                <Register />
            </div>
        </div>
    )
}

export default Page;