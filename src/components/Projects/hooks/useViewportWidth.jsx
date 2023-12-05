import { useState, useEffect } from "react";

const useViewportWidth = () => {

    const [currentDevice, setCurrentDevice] = useState("mobile");

    const handleWindowResize = () => {
        if (window.innerWidth <= 767) {
            setCurrentDevice("mobile");
        } else if (window.innerWidth > 767 && window.innerWidth <= 1024) {
            setCurrentDevice("tablet");
        } else {
            setCurrentDevice("desktop");
        }
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return currentDevice;
};

export default useViewportWidth;
