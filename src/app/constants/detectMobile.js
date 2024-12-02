import { useState, useEffect } from 'react';

// Detect Mobile
function useIsMobile() {
  // Initially set isMobile to null, indicating we haven't detected the window size yet
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // Ensure window is only accessed on the client side
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    // Initialize state on mount
    handleResize();

    // Add event listener for window resizing
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Returning null or a fallback state while the component is mounting (on first render)
  return isMobile;
}

export default useIsMobile;
