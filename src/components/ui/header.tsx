"use client";

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    AnimatePresence,
    motion,
    useMotionValueEvent,
    useSpring,
    useTransform,
} from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { ButtonLabel } from "@/components/ui/button-label";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useSharedScroll } from "@/lib/scroll-context";
import { cn } from "@/lib/utils";

const navItems = [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
];

const MORPH_SCROLL_START = 96;
const MORPH_SCROLL_END = 164;
const SCROLL_DOWN_THRESHOLD = 116;
const SCROLL_UP_THRESHOLD = 72;

const HEADER_EXPANDED_HEIGHT = 88;
const HEADER_COMPACT_HEIGHT = 64;
const HEADER_COMPACT_Y = 16;
const HEADER_DESKTOP_MIN_WIDTH = 780;
const HEADER_DESKTOP_MAX_WIDTH = 1280;
const MOBILE_SECTION_GUTTER = 16;
const DESKTOP_SECTION_GUTTER = 48;

const shellSpring = {
    stiffness: 240,
    damping: 30,
    mass: 0.9,
};

const mobileMenuPanelVariants = {
    closed: {
        opacity: 0,
        y: -10,
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.12,
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.18,
            delay: 0.08,
        },
    },
};

const mobileMenuShapeVariants = {
    closed: {
        scaleX: 0.13,
        scaleY: 0.12,
        borderRadius: 28,
    },
    open: {
        scaleX: 1,
        scaleY: 1,
        borderRadius: 5,
        transition: {
            type: "spring",
            stiffness: 260,
            damping: 26,
            mass: 0.9,
        },
    },
    exit: {
        scaleX: 0.13,
        scaleY: 0.12,
        borderRadius: 28,
        transition: {
            duration: 0.24,
            ease: [0.4, 0, 0.2, 1],
        },
    },
};

const mobileMenuNavVariants = {
    closed: {},
    open: {
        transition: {
            delayChildren: 0.18,
            staggerChildren: 0.055,
        },
    },
    exit: {
        transition: {
            staggerChildren: 0.035,
            staggerDirection: -1,
        },
    },
};

const mobileMenuItemVariants = {
    closed: {
        opacity: 0,
        y: -10,
        filter: "blur(6px)",
    },
    open: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.34,
            ease: [0.22, 1, 0.36, 1],
        },
    },
    exit: {
        opacity: 0,
        y: -6,
        filter: "blur(4px)",
        transition: {
            duration: 0.14,
        },
    },
};

function getCompactWidth(viewportWidth: number) {
    const compactScale = 0.8;

    if (viewportWidth < 768) {
        return Math.max((viewportWidth - 16) * compactScale, 0);
    }

    return Math.min(
        viewportWidth - 32,
        Math.max(HEADER_DESKTOP_MIN_WIDTH, Math.min(HEADER_DESKTOP_MAX_WIDTH, viewportWidth - 320))
    ) * compactScale;
}

function getExpandedWidth(viewportWidth: number) {
    const gutter = viewportWidth < 768 ? MOBILE_SECTION_GUTTER : DESKTOP_SECTION_GUTTER;
    const availableWidth = Math.max(viewportWidth - gutter * 2, 0);

    if (viewportWidth >= 1536) {
        return Math.min(availableWidth, 1400);
    }

    if (viewportWidth >= 1280) {
        return Math.min(availableWidth, 1280);
    }

    if (viewportWidth >= 1024) {
        return Math.min(availableWidth, 1024);
    }

    if (viewportWidth >= 768) {
        return Math.min(availableWidth, 768);
    }

    if (viewportWidth >= 640) {
        return Math.min(availableWidth, 640);
    }

    return availableWidth;
}

export function Header() {
    const [isDark] = useState(false);
    const [isCompact, setIsCompact] = useState(false);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [viewportWidth, setViewportWidth] = useState(() =>
        typeof window !== "undefined" ? window.innerWidth : 1440
    );

    const { scrollY } = useSharedScroll();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleResize = () => setViewportWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsCompact((prev) => {
            if (!prev && latest > SCROLL_DOWN_THRESHOLD) return true;
            if (prev && latest < SCROLL_UP_THRESHOLD) return false;
            return prev;
        });
    });

    const rawProgress = useTransform(scrollY, [MORPH_SCROLL_START, MORPH_SCROLL_END], [0, 1], {
        clamp: true,
    });
    const progress = useSpring(rawProgress, shellSpring);

    const compactWidth = getCompactWidth(viewportWidth);
    const expandedWidth = getExpandedWidth(viewportWidth);
    const mobileMenuWidth = expandedWidth;
    const mobileMenuLeft = Math.max((viewportWidth - mobileMenuWidth) / 2, MOBILE_SECTION_GUTTER);
    const mobileMenuTop = isCompact ? HEADER_COMPACT_HEIGHT + HEADER_COMPACT_Y + 10 : HEADER_EXPANDED_HEIGHT + 6;

    const shellWidth = useTransform(progress, [0, 1], [expandedWidth, compactWidth]);
    const shellHeight = useTransform(progress, [0, 1], [HEADER_EXPANDED_HEIGHT, HEADER_COMPACT_HEIGHT]);
    const shellY = useTransform(progress, [0, 1], [0, HEADER_COMPACT_Y]);
    const shellRadius = useTransform(progress, [0, 1], [999, 999]);
    const shellPaddingX = useTransform(progress, [0, 1], [0, 28]);
    const shellPaddingXMobile = useTransform(progress, [0, 1], [0, 18]);

    const railOpacity = useTransform(progress, [0, 0.62, 1], [1, 0.42, 0]);
    const railBorderAlpha = useTransform(progress, [0, 1], [0.08, 0]);
    const railBorder = useTransform(railBorderAlpha, (alpha) => `rgba(15, 23, 42, ${alpha})`);

    const logoX = useTransform(progress, [0, 1], [0, 10]);
    const logoScale = useTransform(progress, [0, 1], [1, 0.96]);
    const logoHeight = useTransform(progress, [0, 1], [33, 29]);

    const rightClusterX = useTransform(progress, [0, 1], [0, -10]);
    const rightClusterScale = useTransform(progress, [0, 1], [1, 0.98]);
    const navGap = useTransform(progress, [0, 1], [6, 1]);
    const navPadX = useTransform(progress, [0, 1], [16, 13]);
    const navPadY = useTransform(progress, [0, 1], [8, 9]);
    const navFontSize = useTransform(progress, [0, 1], [15, 14]);

    const ctaWidth = useTransform(progress, [0, 0.55, 1], [176, 176, 0]);
    const ctaOpacity = useTransform(progress, [0, 0.55, 0.85, 1], [1, 1, 0.22, 0]);
    const ctaScale = useTransform(progress, [0, 1], [1, 0.96]);
    const ctaMarginLeft = useTransform(progress, [0, 0.55, 1], [16, 16, 0]);

    const navPillClassName = "absolute inset-0 z-0 rounded-full border border-black/10 bg-black/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]";
    const isActiveRoute = useCallback((href: string) => location.pathname === href, [location.pathname]);

    const scrollToSection = useCallback((sectionId: string) => {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            navigate(`/?scrollTo=${sectionId}`);
        }

        setIsMobileMenuOpen(false);
    }, [navigate]);

    const navigateToPage = useCallback((href: string) => {
        navigate(href);
        setIsMobileMenuOpen(false);
    }, [navigate]);

    const isModal = typeof window !== "undefined" && window.location.search.includes("modal=true");
    if (isModal || typeof document === "undefined") return null;

    const headerContent = (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
            <style>{`
                @keyframes gradient-shift {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .ai-lab-gradient {
                    background: linear-gradient(90deg, #ff6b6b, #a855f7, #3b82f6, #ff6b6b);
                    background-size: 300% 100%;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gradient-shift 3s ease infinite;
                }
                .ai-lab-glow {
                    text-shadow: 0 0 20px rgba(168, 85, 247, 0.5), 0 0 40px rgba(59, 130, 246, 0.3);
                }
            `}</style>

            <motion.div
                className="absolute inset-x-0 top-0 h-[88px] bg-white"
                style={{
                    opacity: railOpacity,
                    borderBottom: "1px solid",
                    borderColor: railBorder,
                }}
            />

            <motion.div
                className="pointer-events-auto relative isolate flex items-center justify-between overflow-hidden bg-white"
                style={{
                    width: shellWidth,
                    height: shellHeight,
                    y: shellY,
                    borderRadius: shellRadius,
                    willChange: "width, height, transform, border-radius",
                }}
            >
                <motion.div
                    className="relative z-10 hidden h-full w-full items-center justify-between md:flex"
                    style={{ paddingLeft: shellPaddingX, paddingRight: shellPaddingX }}
                >
                    <motion.div
                        aria-label="30PX Home"
                        className="flex shrink-0 items-center"
                        style={{ x: logoX, scale: logoScale }}
                    >
                        <Link to="/" className="flex shrink-0 items-center">
                            <motion.img
                                src="/30px-logo.webp"
                                alt="30PX"
                                width="1000"
                                height="178"
                                className={cn("w-auto", isDark ? "brightness-0 invert" : "")}
                                style={{ height: logoHeight }}
                            />
                        </Link>
                    </motion.div>

                    <motion.div
                        className="flex items-center"
                        style={{ x: rightClusterX, scale: rightClusterScale }}
                    >
                        <motion.nav
                            className={cn(
                                "flex items-center font-bold tracking-[-0.01em] text-black",
                                isDark ? "text-white" : "text-black"
                            )}
                            onMouseLeave={() => setHoveredTab(null)}
                            style={{ gap: navGap, fontSize: navFontSize }}
                        >
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.label}
                                    onClick={() => navigateToPage(item.href)}
                                    className="relative isolate cursor-pointer rounded-full transition-colors duration-200 hover:bg-white/65"
                                    onMouseEnter={() => setHoveredTab(item.label)}
                                    style={{ paddingLeft: navPadX, paddingRight: navPadX, paddingTop: navPadY, paddingBottom: navPadY }}
                                >
                                    {(hoveredTab === item.label || isActiveRoute(item.href)) && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className={navPillClassName}
                                            transition={{
                                                type: "spring",
                                                bounce: 0.2,
                                                duration: 0.6,
                                            }}
                                        />
                                    )}
                                    <span
                                        className={cn(
                                            "relative z-10 transition-colors duration-200",
                                            (hoveredTab === item.label || isActiveRoute(item.href)) && (isDark ? "text-white" : "text-black")
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                </motion.button>
                            ))}

                            <motion.button
                                type="button"
                                onClick={() => navigate("/order")}
                                className="relative isolate cursor-pointer rounded-full transition-colors duration-200 hover:bg-white/65"
                                onMouseEnter={() => setHoveredTab("Order")}
                                style={{ paddingLeft: navPadX, paddingRight: navPadX, paddingTop: navPadY, paddingBottom: navPadY }}
                            >
                                {(hoveredTab === "Order" || isActiveRoute("/order")) && (
                                    <motion.div
                                        layoutId="nav-pill"
                                        className={navPillClassName}
                                        transition={{
                                            type: "spring",
                                            bounce: 0.2,
                                            duration: 0.6,
                                        }}
                                    />
                                )}
                                <span className="relative z-10 transition-colors duration-200">Order</span>
                            </motion.button>

                        </motion.nav>

                        <motion.div
                            className="overflow-hidden"
                            style={{
                                maxWidth: ctaWidth,
                                opacity: ctaOpacity,
                                scale: ctaScale,
                                marginLeft: ctaMarginLeft,
                            }}
                        >
                            <ShimmerButton
                                className="h-10 whitespace-nowrap px-6 py-2 text-sm transition-all duration-300"
                                shimmerColor="#ffffff"
                                background="#7C3AED"
                                onClick={() => {
                                    navigate("/order");
                                }}
                            >
                                Start a request
                            </ShimmerButton>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative z-10 flex h-full w-full items-center justify-between px-4 md:hidden"
                    style={{ paddingLeft: shellPaddingXMobile, paddingRight: shellPaddingXMobile }}
                >
                    <Link to="/" aria-label="30PX Home" className="flex items-center">
                        <img
                            src="/30px-logo.webp"
                            alt="30PX"
                            width="1000"
                            height="178"
                            className="h-7 w-auto"
                        />
                    </Link>

                    <motion.button
                        type="button"
                        className="relative grid h-11 w-11 place-items-center rounded-full text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
                        aria-controls="mobile-navigation"
                        aria-expanded={isMobileMenuOpen}
                        whileTap={{ scale: 0.94 }}
                    >
                        <span className="sr-only">{isMobileMenuOpen ? "Close menu" : "Open menu"}</span>
                        <span className="relative h-5 w-6">
                            <motion.span
                                className="absolute left-0 top-0 h-[2px] w-6 rounded-full bg-black"
                                animate={isMobileMenuOpen ? { y: 9, rotate: 45 } : { y: 0, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                            />
                            <motion.span
                                className="absolute left-0 top-[9px] h-[2px] w-6 rounded-full bg-black"
                                animate={isMobileMenuOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                                transition={{ duration: 0.18, ease: "easeOut" }}
                            />
                            <motion.span
                                className="absolute bottom-0 left-0 h-[2px] w-6 rounded-full bg-black"
                                animate={isMobileMenuOpen ? { y: -9, rotate: -45 } : { y: 0, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 360, damping: 28 }}
                            />
                        </span>
                    </motion.button>
                </motion.div>
            </motion.div>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-navigation"
                        initial="closed"
                        animate="open"
                        exit="exit"
                        variants={mobileMenuPanelVariants}
                        className="pointer-events-auto absolute overflow-hidden rounded-[5px] md:hidden"
                        style={{
                            top: mobileMenuTop,
                            left: mobileMenuLeft,
                            width: mobileMenuWidth,
                        }}
                    >
                        <motion.div
                            aria-hidden="true"
                            className="absolute inset-0 border border-black/10 bg-white shadow-xl"
                            variants={mobileMenuShapeVariants}
                            style={{
                                transformOrigin: "top center",
                            }}
                        />

                        <motion.nav className="relative z-10 flex flex-col gap-3 p-4" variants={mobileMenuNavVariants}>
                            {navItems.map((item) => (
                                <motion.button
                                    key={item.label}
                                    variants={mobileMenuItemVariants}
                                    onClick={() => navigateToPage(item.href)}
                                    className="group/button rounded-md px-4 py-3 text-left text-lg font-bold hover:bg-muted"
                                >
                                    <ButtonLabel>{item.label}</ButtonLabel>
                                </motion.button>
                            ))}

                            <motion.button
                                type="button"
                                variants={mobileMenuItemVariants}
                                className="rounded-md px-4 py-3 text-left text-lg font-bold hover:bg-muted"
                                onClick={() => navigateToPage("/order")}
                            >
                                Order
                            </motion.button>

                            <motion.div variants={mobileMenuItemVariants} className="mt-2 border-t border-border px-4 py-2">
                                <ShimmerButton
                                    className="h-12 w-full text-base"
                                    shimmerColor="#ffffff"
                                    background="#7C3AED"
                                    onClick={() => {
                                        navigate("/order");
                                        setIsMobileMenuOpen(false);
                                    }}
                                >
                                    Start a request
                                </ShimmerButton>
                            </motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );

    // Keep the header outside animated route wrappers so `position: fixed`
    // stays pinned to the viewport during scroll and page transitions.
    return createPortal(headerContent, document.body);
}
