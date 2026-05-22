import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface StoryModalProps {
    url: string | null;
    title?: string;
    onClose: () => void;
}

export function StoryModal({ url, title = "Story Modal", onClose }: StoryModalProps) {
    const [iframeReady, setIframeReady] = useState(false);

    useEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        const scrollY = window.scrollY;
        const previousHtmlOverflow = html.style.overflow;
        const previousBodyOverflow = body.style.overflow;
        const previousBodyPosition = body.style.position;
        const previousBodyTop = body.style.top;
        const previousBodyWidth = body.style.width;
        const previousBodyLeft = body.style.left;
        const previousBodyRight = body.style.right;

        if (!url) {
            setIframeReady(false);
            return;
        }

        setIframeReady(false);
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        body.style.position = "fixed";
        body.style.top = `-${scrollY}px`;
        body.style.left = "0";
        body.style.right = "0";
        body.style.width = "100%";

        return () => {
            html.style.overflow = previousHtmlOverflow;
            body.style.overflow = previousBodyOverflow;
            body.style.position = previousBodyPosition;
            body.style.top = previousBodyTop;
            body.style.width = previousBodyWidth;
            body.style.left = previousBodyLeft;
            body.style.right = previousBodyRight;
            window.scrollTo(0, scrollY);
        };
    }, [url]);

    if (typeof document === "undefined") {
        return null;
    }

    return createPortal(
        <AnimatePresence>
            {url && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex justify-center items-end md:items-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ y: "100vh" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100vh" }}
                        transition={{
                            type: "spring",
                            damping: 26,
                            stiffness: 220,
                            mass: 0.8,
                        }}
                        className="relative h-screen w-screen bg-background shadow-[0_0_80px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden will-change-transform transform-gpu"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="absolute top-4 right-4 z-[110] md:top-6 md:right-6">
                            <button
                                onClick={onClose}
                                className="p-2 bg-white text-black hover:bg-black hover:text-white shadow-lg transition-colors hover:scale-105 active:scale-95 rounded-full flex items-center justify-center cursor-pointer"
                                aria-label="Close modal"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {!iframeReady && (
                            <div className="absolute inset-0 z-[105] flex flex-col items-center justify-center bg-background">
                                <div className="h-8 w-8 !border-t-primary rounded-full border-4 border-muted/30 animate-spin"></div>
                            </div>
                        )}

                        <iframe
                            src={url}
                            className={`h-full w-full border-none bg-background transition-opacity duration-300 ${iframeReady ? "opacity-100" : "opacity-0"}`}
                            title={title}
                            onLoad={() => setIframeReady(true)}
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
        ,
        document.body
    );
}
