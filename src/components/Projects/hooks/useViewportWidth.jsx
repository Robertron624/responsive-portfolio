import { useState, useEffect, useRef } from "react";

const useViewportWidth = () => {

    const [currentDevice, setCurrentDevice] = useState("mobile");
    const prevWidth = useRef(window.innerWidth);
  
    const handleWindowResize = () => {
      const width = window.innerWidth;
      if (width <= 767) {
        setCurrentDevice("mobile");
      } else if (width > 767 && width <= 1024) {
        setCurrentDevice("tablet");
      } else {
        setCurrentDevice("desktop");
      }
    };
  
    useEffect(() => {
      handleWindowResize(); // Set initial device type
      window.addEventListener("resize", handleWindowResize);
  
      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }, []);
  
    useEffect(() => {
      const width = window.innerWidth;
      const prevDevice = prevWidth.current <= 767 ? "mobile" : prevWidth.current > 767 && prevWidth.current <= 1024 ? "tablet" : "desktop";
      const currentDevice = width <= 767 ? "mobile" : width > 767 && width <= 1024 ? "tablet" : "desktop";
  
      // Check if device type changed to update itemsPerPage
      if (prevDevice !== currentDevice) {
        prevWidth.current = width;
        handleWindowResize();
      }
    }, [currentDevice]);
  
    return currentDevice;
};

export default useViewportWidth;
