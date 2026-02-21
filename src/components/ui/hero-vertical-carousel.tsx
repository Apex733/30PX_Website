"use client";

import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { cn } from "@/lib/utils";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

// 1. DYNAMICALLY IMPORT IMAGES AND VIDEOS
const imageModules = import.meta.glob<{ default: string }>(
    "/Hero Carousel/*.{jpg,jpeg,png,webp,gif,webm}",
    { eager: true }
);
const images = Object.values(imageModules).map((module) => module.default);

// Helper to check if source is video
const isVideo = (src: string) => {
    return /\.webm($|\?)/i.test(src);
};

// Shared Observer Logic to reduce overhead
let sharedObserver: IntersectionObserver | null = null;
const observers = new Map<Element, (entry: IntersectionObserverEntry) => void>();

function getObserver() {
    if (typeof window === 'undefined') return null;
    if (!sharedObserver) {
        sharedObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const cb = observers.get(entry.target);
                cb?.(entry);
            });
        }, { threshold: 0.1 });
    }
    return sharedObserver;
}

const observe = (element: Element, callback: (entry: IntersectionObserverEntry) => void) => {
    const obs = getObserver();
    if (!obs) return () => { };
    observers.set(element, callback);
    obs.observe(element);
    return () => {
        observers.delete(element);
        obs.unobserve(element);
    };
};

// 2. PHYSICS STRIP COMPONENT
interface PhysicsStripProps {
    images: string[];
    direction: "forward" | "backward"; // Forward = Up, Backward = Down
    axis: "vertical" | "horizontal";
    initialSpeed?: number;
    className?: string;
}

// 3. LAZY VIDEO COMPONENT (Optimized for Performance)
const LazyVideo = memo(({ src, className, axis, onLoadedData }: { src: string, className?: string, axis: "vertical" | "horizontal", onLoadedData?: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        const container = containerRef.current;
        if (!video || !container) return;

        return observe(container, (entry) => {
            if (entry.isIntersecting) {
                video.play().catch(() => { }); // Ignore autoplay errors
            } else {
                video.pause();
            }
        });
    }, []);

    return (
        <div ref={containerRef} className={cn("relative overflow-hidden rounded-[5px] shadow-md transform-gpu", axis === "vertical" ? "w-full" : "h-full")}>
            <video
                ref={videoRef}
                src={src}
                className={cn("object-cover pointer-events-none block will-change-transform", axis === "vertical" ? "w-full h-auto" : "h-full w-auto")}
                loop
                muted
                playsInline
                preload="metadata"
                onLoadedData={onLoadedData} // Trigger measurement on load
            />
        </div>
    );
});

const CarouselColumn = ({ images, speed, className }: { images: string[], speed: number, className?: string }) => {
    // Low default speed, but high sensitivity to scroll
    return (
        <VelocityScroll
            axis="vertical"
            default_velocity={speed}
            velocity_sensitivity={5}
            className={cn("gap-4", className)}
        >
            <div className="flex flex-col gap-4 pb-4">
                {images.map((src, i) => {
                    const isVid = isVideo(src);
                    const commonClasses = "object-cover rounded-[5px] shadow-md pointer-events-none w-full h-auto";

                    if (isVid) {
                        return (
                            <LazyVideo
                                key={i}
                                src={src}
                                axis="vertical"
                                onLoadedData={() => { }}
                            />
                        );
                    }

                    return (
                        <img
                            key={i}
                            src={src}
                            className={commonClasses}
                            draggable={false}
                            alt=""
                            width="300"
                            height="400"
                            loading="eager"
                        />
                    );
                })}
            </div>
        </VelocityScroll>
    );
};

export function HeroCarousel() {
    if (images.length === 0) return <div className="text-white/50">No images</div>;

    // 1. Separate assets
    const videoAssets = images.filter(src => isVideo(src));
    const imgAssets = images.filter(src => !isVideo(src));

    // 2. Limit videos (Max 2 per row * 3 rows = 6 videos max)
    const videosToUse = videoAssets.slice(0, 6);

    // 3. Initialize Columns
    const cols: string[][] = [[], [], []];

    // 4. Distribute Videos (Round-Robin) -> Ensures e.g. Row 1 gets V1, Row 2 gets V2...
    videosToUse.forEach((vid, i) => {
        cols[i % 3].push(vid);
    });

    // 5. Distribute Images (Round-Robin) -> Balances the lengths
    imgAssets.forEach((img, i) => {
        cols[i % 3].push(img);
    });

    const [col1, col2, col3] = cols;

    // UNIFIED LAYOUT: 3 Vertical Columns (Up/Down/Up)
    return (
        <div className="grid grid-cols-3 gap-4 h-full w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
            {/* Col 1: Up - Very Slow Base */}
            <CarouselColumn images={col1} speed={2.5} />

            {/* Col 2: Down - Slow Base */}
            <CarouselColumn images={col2} speed={-3.5} className="pt-12" />

            {/* Col 3: Up - Very Slow Base */}
            <CarouselColumn images={col3} speed={2.5} />
        </div>
    );
}
