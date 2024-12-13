"use client"
import {useEffect} from 'react';

const ScrollToTop = () => {
    useEffect(() => {

        if(typeof window !== 'undefined'){
           window.scrollTo({
                  top: 0,
                  left: 0,
                  behavior: "smooth"
                });
           }
        }, [])

  return null;
};

export default ScrollToTop;
