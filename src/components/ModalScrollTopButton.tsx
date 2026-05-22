import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ModalScrollTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > 320);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-border/60 bg-background/90 text-foreground shadow-lg backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-background md:bottom-7 md:right-7 ${
                isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
            }`}
            aria-label="Go to top"
        >
            <ArrowUp className="h-4 w-4" />
        </button>
    );
}
