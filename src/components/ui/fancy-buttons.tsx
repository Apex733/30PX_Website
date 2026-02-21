"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   1. MAGNETIC HOVER EFFECT
   Button follows the cursor with a magnetic pull
   ───────────────────────────────────────────── */
export function MagneticButton({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 200, damping: 15 });
    const springY = useSpring(y, { stiffness: 200, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.3);
        y.set((e.clientY - centerY) * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            style={{ x: springX, y: springY }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] border-2 border-foreground text-foreground bg-transparent rounded-[5px] cursor-pointer transition-colors duration-300 hover:bg-foreground hover:text-background",
                className
            )}
        >
            {children}
        </motion.button>
    );
}

/* ─────────────────────────────────────────────
   2. KINETIC TEXT REVEAL (Rolling Text)
   Text rolls up to reveal duplicate on hover
   ───────────────────────────────────────────── */
export function RollingTextButton({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <button
            className={cn(
                "group relative px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] border-2 border-foreground text-foreground bg-transparent rounded-[5px] cursor-pointer overflow-hidden",
                className
            )}
        >
            <span className="block overflow-hidden h-[1.2em] relative">
                {/* Original text — slides up on hover */}
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {children}
                </span>
                {/* Duplicate text — slides in from below */}
                <span className="absolute top-full left-0 w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {children}
                </span>
            </span>
        </button>
    );
}

/* ─────────────────────────────────────────────
   3. DIRECTIONAL LIQUID FILL
   Fill follows cursor entry direction
   ───────────────────────────────────────────── */
export function LiquidFillButton({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLButtonElement>(null);
    const [fillStyle, setFillStyle] = useState<React.CSSProperties>({});
    const [isHovered, setIsHovered] = useState(false);

    const getDirection = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return "left";

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const w = rect.width;
        const h = rect.height;

        // Determine closest edge
        const distances = [
            { dir: "top", dist: y },
            { dir: "bottom", dist: h - y },
            { dir: "left", dist: x },
            { dir: "right", dist: w - x },
        ];
        distances.sort((a, b) => a.dist - b.dist);
        return distances[0].dir;
    };

    const getTransform = (dir: string, entering: boolean) => {
        const from: Record<string, string> = {
            top: "translateY(-100%)",
            bottom: "translateY(100%)",
            left: "translateX(-100%)",
            right: "translateX(100%)",
        };
        return entering ? "translate(0, 0)" : from[dir] || "translateX(-100%)";
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        const dir = getDirection(e);
        // Instantly position fill at the entry edge (no transition)
        setFillStyle({
            transform: getTransform(dir, false),
            transition: "none",
        });

        // Force reflow, then animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setFillStyle({
                    transform: getTransform(dir, true),
                    transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                });
            });
        });
        setIsHovered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        const dir = getDirection(e);
        setFillStyle({
            transform: getTransform(dir, false),
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        });
        setIsHovered(false);
    };

    return (
        <button
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={cn(
                "relative px-10 py-4 text-sm font-semibold uppercase tracking-[0.2em] border-2 border-foreground rounded-[5px] cursor-pointer overflow-hidden",
                className
            )}
        >
            {/* Fill layer */}
            <span
                className="absolute inset-0 bg-foreground z-0"
                style={fillStyle}
            />
            {/* Text layer */}
            <span
                className={cn(
                    "relative z-10 transition-colors duration-300",
                    isHovered ? "text-background" : "text-foreground"
                )}
            >
                {children}
            </span>
        </button>
    );
}
