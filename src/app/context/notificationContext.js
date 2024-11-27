'use client'
import { createContext, useState } from "react";

export const NotificationContext = createContext(null);

export function NotificationProvider ({children}){
    const [notification, setNotification] = useState('')
    return (
        <NotificationContext.Provider value={{notification, setNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}