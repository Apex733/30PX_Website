"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

export const TextHoverEffect = ({
    text,
    duration,
    className,
}: {
    text: string;
    duration?: number;
    automatic?: boolean;
    className?: string;
}) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [cursor, setCursor] = useState({ x: 0, y: 0 });
    const [hovered, setHovered] = useState(false);
    const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

    const svgRectRef = useRef<DOMRect | null>(null);

    // === RUBBER BAND OVERSCROLL SYSTEM ===
    const rawStretch = useMotionValue(1);
    const decayTimerRef = useRef<number | null>(null);
    const accumulatedStretch = useRef(0);

    // Tuned spring: high stiffness for snappy return, moderate damping for 2-3 bounces
    const scaleY = useSpring(rawStretch, {
        stiffness: 300,
        damping: 15,
        mass: 0.8,
        restDelta: 0.001,
    });

    const isAtBottom = useCallback(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        // Within 2px of the absolute bottom
        return scrollTop + clientHeight >= scrollHeight - 2;
    }, []);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!isAtBottom()) {
                // Not at bottom — reset any stretch
                if (accumulatedStretch.current > 0) {
                    accumulatedStretch.current = 0;
                    rawStretch.set(1);
                }
                return;
            }

            // Only stretch on downward scroll attempts (deltaY > 0)
            if (e.deltaY > 0) {
                // Accumulate with logarithmic resistance (feels like rubber)
                const delta = Math.abs(e.deltaY);
                // Diminishing returns: sqrt creates natural rubber-band resistance
                accumulatedStretch.current += delta * 0.015;
                const maxStretch = 2.0; // Cap: text can grow to 3x (1 + 2.0)
                const dampedStretch = Math.min(
                    Math.sqrt(accumulatedStretch.current) * 0.3,
                    maxStretch
                );
                rawStretch.set(1 + dampedStretch);

                // Clear any existing decay timer
                if (decayTimerRef.current) {
                    clearTimeout(decayTimerRef.current);
                }

                // Start decay: after 80ms of no wheel events, snap back
                decayTimerRef.current = window.setTimeout(() => {
                    accumulatedStretch.current = 0;
                    rawStretch.set(1); // Spring handles the bounce-back
                }, 80);
            }
        };

        // Touch overscroll support for mobile
        let touchStartY = 0;
        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (!isAtBottom()) {
                if (accumulatedStretch.current > 0) {
                    accumulatedStretch.current = 0;
                    rawStretch.set(1);
                }
                return;
            }

            const touchY = e.touches[0].clientY;
            const delta = touchStartY - touchY; // Positive = scrolling down

            if (delta > 0) {
                accumulatedStretch.current += delta * 0.02;
                const maxStretch = 2.0;
                const dampedStretch = Math.min(
                    Math.sqrt(accumulatedStretch.current) * 0.3,
                    maxStretch
                );
                rawStretch.set(1 + dampedStretch);
                touchStartY = touchY; // Reset for next frame
            }
        };

        const handleTouchEnd = () => {
            if (accumulatedStretch.current > 0) {
                accumulatedStretch.current = 0;
                rawStretch.set(1);
            }
        };

        window.addEventListener("wheel", handleWheel, { passive: true });
        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchmove", handleTouchMove, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            if (decayTimerRef.current) clearTimeout(decayTimerRef.current);
        };
    }, [isAtBottom, rawStretch]);

    // === SVG HOVER MASK ===
    useEffect(() => {
        const updateRect = () => {
            if (svgRef.current) {
                svgRectRef.current = svgRef.current.getBoundingClientRect();
            }
        };

        updateRect();
        window.addEventListener("resize", updateRect);
        return () => window.removeEventListener("resize", updateRect);
    }, []);

    useEffect(() => {
        if (svgRectRef.current && cursor.x !== null && cursor.y !== null) {
            const svgRect = svgRectRef.current;
            const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
            const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
            setMaskPosition({
                cx: `${cxPercentage}%`,
                cy: `${cyPercentage}%`,
            });
        }
    }, [cursor]);

    return (
        <motion.div
            style={{
                scaleY,
                transformOrigin: "bottom center",
            }}
            className="w-full h-full flex items-end justify-center will-change-transform"
        >
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                viewBox="0 0 390 100"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
                className={cn("select-none uppercase cursor-pointer", className)}
            >
                <defs>
                    <linearGradient
                        id="textGradient"
                        gradientUnits="userSpaceOnUse"
                        cx="50%"
                        cy="50%"
                        r="25%"
                    >
                        {hovered && (
                            <>
                                <stop offset="0%" stopColor="#eab308" />
                                <stop offset="25%" stopColor="#ef4444" />
                                <stop offset="50%" stopColor="#80eeb4" />
                                <stop offset="75%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </>
                        )}
                    </linearGradient>

                    <motion.radialGradient
                        id="revealMask"
                        gradientUnits="userSpaceOnUse"
                        r="20%"
                        initial={{ cx: "50%", cy: "50%" }}
                        animate={maskPosition}
                        transition={{ duration: duration ?? 0, ease: "easeOut" }}
                    >
                        <stop offset="0%" stopColor="white" />
                        <stop offset="100%" stopColor="black" />
                    </motion.radialGradient>
                    <mask id="textMask">
                        <rect
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            fill="url(#revealMask)"
                        />
                    </mask>
                </defs>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.3"
                    className="fill-transparent stroke-neutral-200 font-[helvetica] text-7xl font-bold dark:stroke-neutral-800"
                    style={{ opacity: hovered ? 0.7 : 0 }}
                >
                    {text}
                </text>
                <motion.text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    strokeWidth="0.3"
                    className="fill-transparent stroke-[#3ca2fa] font-[helvetica] text-7xl font-bold 
        dark:stroke-[#3ca2fa99]"
                    initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
                    animate={{
                        strokeDashoffset: 0,
                        strokeDasharray: 1000,
                    }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                    }}
                >
                    {text}
                </motion.text>
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    stroke="url(#textGradient)"
                    strokeWidth="0.3"
                    mask="url(#textMask)"
                    className="fill-transparent font-[helvetica] text-7xl font-bold"
                >
                    {text}
                </text>
            </svg>
        </motion.div>
    );
};


export const FooterBackgroundGradient = () => {
    return (
        <div
            className="absolute inset-0 z-0"
            style={{
                background:
                    "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
            }}
        />
    );
};
