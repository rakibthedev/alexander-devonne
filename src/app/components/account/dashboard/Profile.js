import { LoginContext } from "@/app/context/loginContext"
import { useContext, useState } from "react"
import CountryName from "../../methods/CountryName"
import EditProfile from "../EditProfile"
import ChangePassword from './../ChangePassword';
import { usePathname } from "next/navigation";

export default function Profile() {
  const {loggedUserData} = useContext(LoginContext)
  const [currentView, setCurrentView] = useState({name: 'main'})
  // Path name 
  const currentPath = usePathname();
  // Edit data code 
  const handleEdit = () => {
    setCurrentView({
      name: 'edit'
    });
  }
  const cancelEdit = () => {
    setCurrentView({
      name: 'main'
    });
  }
  // change Password function
  const handleChangePwd = () => {
    setCurrentView({
      name: 'change_pwd'
    });
  }
  // change Password function
  const cancelChangePwd = () => {
    setCurrentView({
      name: 'main'
    });
  }
  return (
    <div>
      {currentPath === '/dashboard/profile' && <div>
        <h1 className="text-xs uppercase mb-8">Your Personal Dashboard</h1>
        {loggedUserData && 
          <div>
            <p className="text-xs mb-20">
              Welcome {loggedUserData.first_name}. Here you can keep track of your recent activity, request returns and exchanges as well as view and manage your account.
            </p>
            {currentView.name === 'main' &&
            <div>
                <div className="flex justify-between mb-4">
                  <h2 className="text-xs uppercase">
                    Your Personal Information
                  </h2>
                  <div className='flex items-center gap-2'>
                    <button 
                    className='text-xs capitalize underline hover:no-underline'
                    onClick={handleEdit}
                    type='button'
                    >
                      Edit
                    </button>

                    <span>/</span>

                    <button 
                    className='text-xs capitalize underline hover:no-underline'
                    type='button'
                    onClick={handleChangePwd}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-8 bg-[#eeebeb] rounded p-4">
                  {/* Row  */}
                  <div className="flex">
                    <div className="flex flex-[50%]">
                      <div className="flex-[50%]">
                        <h3 className="uppercase text-xs mb-[2px]">
                          Gender
                        </h3>
                        <p className="text-xs">{loggedUserData.gender ? loggedUserData.gender : '--'}</p>
                      </div>
                      <div className="flex-[50%]">
                        <h3 className="uppercase text-xs mb-[2px]">
                          Name
                        </h3>
                        <p className="text-xs">{loggedUserData.full_name ? loggedUserData.full_name : '--'}</p>
                      </div>                
                    </div>
                    <div className="flex-[50%]">
                      <div className="">
                          <h3 className="uppercase text-xs mb-[2px]">
                            BOD
                          </h3>
                          <p className="text-xs">
                            {loggedUserData.birthdate_day && 
                            loggedUserData.birthdate_month &&
                            loggedUserData.birthdate_year ?
                            `${loggedUserData.birthdate_day}/${loggedUserData.birthdate_month}/${loggedUserData.birthdate_year}`
                            : '--'
                            }
                            
                            </p>
                        </div> 
                      </div>
                  </div>
                  {/* Row  */}
                  <div className="flex">
                    <div className="flex-[50%]">
                      <div>
                        <h3 className="uppercase text-xs mb-[2px]">
                          Phone
                        </h3>
                        <p className="text-xs">{loggedUserData.phone_number ? loggedUserData.phone_number : '--'}</p>
                      </div>                            
                    </div>   
                    <div className="flex-[50%]">
                      <div>
                          <h3 className="uppercase text-xs mb-[2px]">
                            Country
                          </h3>
                          <p className="text-xs">{loggedUserData.country ? <CountryName code={loggedUserData.country} /> : '--'}</p>
                      </div>
                    </div>             
                  </div>
                  {/* Row */}
                  <div className="flex">
                    <div className="flex-[50%]">
                      <div>
                          <h3 className="uppercase text-xs mb-[2px]">
                            Email
                          </h3>
                          <p className="text-xs">{loggedUserData.email ? loggedUserData.email : '--'}</p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>}

            {currentView.name === 'edit' && <EditProfile cancelEdit={cancelEdit}/>}
            {currentView.name === 'change_pwd' && <ChangePassword cancelChangePwd={cancelChangePwd}/>}
              
        </div>
        }
      </div>}
    </div>
  )
}
