"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    useAnimationFrame,
    useMotionValue,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface VelocityScrollProps {
    children: React.ReactNode;
    default_velocity?: number;
    className?: string;
    axis?: "horizontal" | "vertical";
    velocity_sensitivity?: number;
}

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
    className?: string;
    axis?: "horizontal" | "vertical";
    velocity_sensitivity: number;
}

export const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function VelocityScroll({
    children,
    default_velocity = 5,
    className,
    axis = "horizontal",
    velocity_sensitivity = 5,
}: VelocityScrollProps) {
    return (
        <section className="relative w-full h-full">
            <ParallaxText baseVelocity={default_velocity} className={className} axis={axis} velocity_sensitivity={velocity_sensitivity}>
                {children}
            </ParallaxText>
        </section>
    );
}

function ParallaxText({
    children,
    baseVelocity = 100,
    className,
    axis = "horizontal",
    velocity_sensitivity,
}: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400,
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, velocity_sensitivity], {
        clamp: true,
    });

    const [repetitions, setRepetitions] = useState(2);
    // Track the size of the content (single repetition) in pixels
    const contentSize = useRef(0);
    // Track visibility to pause animation when off-screen
    const [isVisible, setIsVisible] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    // Visibility observer — pause animation when off-screen
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { rootMargin: "200px" } // Start slightly before entering viewport
        );
        observer.observe(container);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const calculateRepetitions = () => {
            if (containerRef.current && textRef.current) {
                const containerSize = axis === "horizontal"
                    ? containerRef.current.offsetWidth
                    : containerRef.current.offsetHeight;
                const textSize = axis === "horizontal"
                    ? textRef.current.offsetWidth
                    : textRef.current.offsetHeight;

                if (textSize > 0) {
                    const newRepetitions = Math.ceil(containerSize / textSize) + 2;
                    setRepetitions(Math.min(newRepetitions, 20));
                    contentSize.current = textSize; // Store pixel size
                }
            }
        };

        calculateRepetitions();

        const resizeObserver = new ResizeObserver(() => {
            calculateRepetitions();
        });

        if (textRef.current) {
            resizeObserver.observe(textRef.current);
        }

        window.addEventListener("resize", calculateRepetitions);
        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", calculateRepetitions);
        };
    }, [children, axis]);

    const motionValue = useTransform(baseX, (v) => {
        const size = contentSize.current;
        if (size === 0) return "0px";
        // Wrap between -size and 0 (pixels)
        return `${wrap(-size, 0, v)}px`;
    });

    const isDragging = useRef(false);
    const lastPointerRef = useRef(0);

    const onPointerDown = (e: React.PointerEvent) => {
        isDragging.current = true;
        (e.target as Element).setPointerCapture(e.pointerId);
        lastPointerRef.current = axis === "horizontal" ? e.clientX : e.clientY;
    };

    const onPointerMove = (e: React.PointerEvent) => {
        if (!isDragging.current) return;

        e.preventDefault(); // Prevent default browser actions
        const current = axis === "horizontal" ? e.clientX : e.clientY;
        const delta = current - lastPointerRef.current;
        lastPointerRef.current = current;

        // Apply drag delta directly to baseX
        baseX.set(baseX.get() + delta);

        // Update velocity direction based on drag
        if (delta > 0) {
            directionFactor.current = -1;
        } else if (delta < 0) {
            directionFactor.current = 1;
        }
    };

    const onPointerUp = (e: React.PointerEvent) => {
        isDragging.current = false;
        (e.target as Element).releasePointerCapture(e.pointerId);
    };

    const directionFactor = React.useRef<number>(1);

    useAnimationFrame((t, delta) => {
        if (contentSize.current === 0) return;

        // Skip animation when off-screen
        if (!isVisible) return;

        // Skip auto-scroll logic while dragging
        if (isDragging.current) return;

        // FIXED SPEED LOGIC
        const pixelsPerSecond = baseVelocity * 10;

        let moveBy = directionFactor.current * pixelsPerSecond * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    const style = axis === "horizontal" ? { x: motionValue } : { y: motionValue };

    return (
        <div
            className={cn(
                "w-full h-full overflow-hidden cursor-grab active:cursor-grabbing touch-none select-none", // Added select-none
                axis === "horizontal" ? "whitespace-nowrap" : ""
            )}
            ref={containerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
        >
            <motion.div
                className={cn(axis === "horizontal" ? "inline-flex" : "flex flex-col", className)}
                style={style}
            >
                {Array.from({ length: repetitions }).map((_, i) => (
                    <div key={i} ref={i === 0 ? textRef : null} className={cn("flex shrink-0", axis === "horizontal" ? "" : "flex-col")}>
                        {children}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
