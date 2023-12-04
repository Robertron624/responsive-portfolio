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

    return viewportWidth;
};

export default useViewportWidth;
