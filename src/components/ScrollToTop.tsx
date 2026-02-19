import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Instant scroll to top
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });

        // Backup scroll in case of browser restoration race condition
        const timer = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
            });
        }, 50);

        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
}
