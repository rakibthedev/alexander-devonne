'use client'
import { NotificationContext } from "@/app/context/notificationContext";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";

const NotificationPopup = () => {
    const {notification, setNotification} = useContext(NotificationContext);
    return(
        <div>
        {/* Notification Start */}
            {notification &&
            <div className="fixed top-[100px] z-[999999] rounded w-[350px] right-5 p-5 bg-[#e1e1e180] text-xs" style={{backdropFilter: 'blur(3rem)'}}>
               <div className="flex justify-between mb-4">
                    <p className='text-xs uppercase'>Message</p>
                    <button onClick={()=>setNotification(null)}>
                        <IoClose className='text-[20px]'/>
                    </button>
                </div> 
                <p className="mb-3">{notification}</p>
            </div>}
        {/* Notification End */}
        </div>
    )
}

export default NotificationPopup;