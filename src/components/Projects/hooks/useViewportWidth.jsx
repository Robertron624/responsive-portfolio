import { useState, useEffect } from "react";

const useViewportWidth = () => {
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    const handleWindowResize = () => {
        setViewportWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", handleWindowResize);
        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const isMobile = viewportWidth <= 767;
    const isTablet = viewportWidth > 767 && viewportWidth <= 1024;
    const isDesktop = viewportWidth > 1024;

    return { viewportWidth, isMobile, isTablet, isDesktop };
};

export default useViewportWidth;
