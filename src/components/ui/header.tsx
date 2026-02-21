"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const navItems = [
    { label: "Services", sectionId: "services" },
    { label: "Pricing", sectionId: "pricing" },
    { label: "Reviews", sectionId: "reviews" },
];

export function Header() {
    const [isDark] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 50);
    });

    const scrollToSection = useCallback((sectionId: string) => {
        // Check if we're on the homepage by looking for the section
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            // We're on a different page — navigate home then scroll
            window.location.href = `/#/?scrollTo=${sectionId}`;
        }
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 h-20 z-50 transition-all duration-300",
                "bg-white border-b border-black/5",
            )}
        >
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
            <div className="container mx-auto h-full flex items-center justify-between px-12">
                <a href="/" className="flex items-center">
                    <img
                        src="/30px-logo.webp"
                        alt="30PX"
                        width="1000"
                        height="178"
                        className={cn(
                            "h-8 w-auto transition-all duration-300",
                            isDark ? "brightness-0 invert" : ""
                        )}
                    />
                </a>

                <nav
                    className={cn(
                        "hidden md:flex gap-1 text-sm font-bold transition-colors duration-300",
                        isDark ? "text-white" : "text-black"
                    )}
                    onMouseLeave={() => setHoveredTab(null)}
                >
                    {navItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => scrollToSection(item.sectionId)}
                            className="relative px-4 py-2 rounded-full cursor-pointer"
                            onMouseEnter={() => setHoveredTab(item.label)}
                        >
                            {hoveredTab === item.label && (
                                <motion.div
                                    layoutId="nav-pill"
                                    className={cn(
                                        "absolute inset-0 rounded-full -z-10",
                                        isDark
                                            ? "bg-white/15 backdrop-blur-lg"
                                            : "bg-black/5"
                                    )}
                                    transition={{
                                        type: "spring",
                                        bounce: 0.2,
                                        duration: 0.6,
                                    }}
                                />
                            )}
                            <span className={cn(
                                "relative z-10 transition-colors duration-200",
                                hoveredTab === item.label && (isDark ? "text-white" : "text-black")
                            )}>
                                {item.label}
                            </span>
                        </button>
                    ))}

                    {/* AI Lab - Special gradient item */}
                    <button
                        onClick={() => scrollToSection("ai-lab")}
                        className="relative px-4 py-2 rounded-full cursor-pointer"
                        onMouseEnter={() => setHoveredTab("AI Ads")}
                    >
                        {hoveredTab === "AI Ads" && (
                            <motion.div
                                layoutId="nav-pill"
                                className={cn(
                                    "absolute inset-0 rounded-full -z-10",
                                    isDark
                                        ? "bg-white/15 backdrop-blur-lg"
                                        : "bg-black/5"
                                )}
                                transition={{
                                    type: "spring",
                                    bounce: 0.2,
                                    duration: 0.6,
                                }}
                            />
                        )}
                        <span className="relative z-10 ai-lab-gradient ai-lab-glow">
                            ✨ AI Ads
                        </span>
                    </button>
                </nav>

                <div className="flex gap-4">
                    <ShimmerButton
                        className={cn(
                            "h-10 text-sm px-6 py-2 transition-all duration-300",
                        )}
                        shimmerColor={"#ffffff"}
                        background="#7C3AED"
                    >
                        Start for $24
                    </ShimmerButton>
                </div>
            </div>
        </header>
    );
}
