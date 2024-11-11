// components/LoadingIndicator.js
"use client"; // Ensure this is a client component

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const LoadingIndicator = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // Adjust duration as necessary

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && (
        <div className="loading-overlay flex flex-col">
          {/* You can add a spinner or loading text here */}
          {/* <span className="text-xs">Loading...</span>
          <span className="text-xs loading-text loading">/</span> */}
        </div>
      )}
    </>
  );
};

export default LoadingIndicator;
