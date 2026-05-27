"use client";

import React, { useEffect, useRef, useState, memo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
    AnimatePresence,
    motion,
    type MotionValue,
    useMotionValue,
    useSpring,
} from "framer-motion";
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

const describeCarouselImage = (src: string, index: number) => {
    const fileName = decodeURIComponent(src.split("/").pop() || "");
    const baseName = fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();

    if (baseName.length >= 3) {
        return `30PX design showcase ${baseName}`;
    }

    return `30PX design showcase image ${index + 1}`;
};

const PREVIEW_SCALE = 0.595;
const PREVIEW_GUTTER = 18;
const PREVIEW_OFFSET = 28;

type PreviewMediaType = "image" | "video";

interface HoverPreview {
    src: string;
    mediaType: PreviewMediaType;
}

interface PreviewSize {
    width: number;
    height: number;
}

interface PreviewableMediaProps {
    src: string;
    mediaType: PreviewMediaType;
    canPreview: boolean;
    children: React.ReactNode;
    onPreviewEnter: (src: string, mediaType: PreviewMediaType, event: React.PointerEvent<HTMLElement>) => void;
    onPreviewMove: (event: React.PointerEvent<HTMLElement>) => void;
    onPreviewLeave: () => void;
}

function useDesktopHoverPreview() {
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const query = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
        const update = () => setEnabled(query.matches);

        update();

        if (query.addEventListener) {
            query.addEventListener("change", update);
            return () => query.removeEventListener("change", update);
        }

        query.addListener(update);
        return () => query.removeListener(update);
    }, []);

    return enabled;
}

const PreviewableMedia = ({
    src,
    mediaType,
    canPreview,
    children,
    onPreviewEnter,
    onPreviewMove,
    onPreviewLeave,
}: PreviewableMediaProps) => {
    const handlePointerEnter = (event: React.PointerEvent<HTMLElement>) => {
        if (!canPreview || event.pointerType !== "mouse") return;
        onPreviewEnter(src, mediaType, event);
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
        if (!canPreview || event.pointerType !== "mouse") return;
        onPreviewMove(event);
    };

    return (
        <div
            className={cn(
                "relative block rounded-[5px]",
                canPreview && "cursor-zoom-in"
            )}
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={onPreviewLeave}
            onPointerCancel={onPreviewLeave}
            onPointerDown={onPreviewLeave}
        >
            {children}
        </div>
    );
};

const HeroHoverPreview = ({
    preview,
    x,
    y,
    onSizeChange,
}: {
    preview: HoverPreview | null;
    x: MotionValue<number>;
    y: MotionValue<number>;
    onSizeChange: (size: PreviewSize) => void;
}) => {
    const [portalNode, setPortalNode] = useState<HTMLElement | null>(null);
    const [viewportLimit, setViewportLimit] = useState<PreviewSize | null>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const springX = useSpring(x, { stiffness: 260, damping: 30, mass: 0.55 });
    const springY = useSpring(y, { stiffness: 260, damping: 30, mass: 0.55 });

    useEffect(() => {
        setPortalNode(document.body);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const updateViewportLimit = () => {
            setViewportLimit({
                width: Math.max(1, (window.innerWidth - PREVIEW_GUTTER * 2) / PREVIEW_SCALE),
                height: Math.max(1, (window.innerHeight - PREVIEW_GUTTER * 2) / PREVIEW_SCALE),
            });
        };

        updateViewportLimit();
        window.addEventListener("resize", updateViewportLimit);
        return () => window.removeEventListener("resize", updateViewportLimit);
    }, []);

    const measurePreview = useCallback(() => {
        const element = previewRef.current;
        if (!element) return;

        const width = element.offsetWidth;
        const height = element.offsetHeight;
        if (width > 0 && height > 0) {
            onSizeChange({ width, height });
        }
    }, [onSizeChange]);

    useEffect(() => {
        const element = previewRef.current;
        if (!preview || !element) return;

        const frame = window.requestAnimationFrame(measurePreview);
        const resizeObserver = new ResizeObserver(measurePreview);
        resizeObserver.observe(element);

        return () => {
            window.cancelAnimationFrame(frame);
            resizeObserver.disconnect();
        };
    }, [measurePreview, preview]);

    if (!portalNode) return null;

    const mediaStyle: React.CSSProperties = viewportLimit
        ? {
            maxWidth: `${viewportLimit.width}px`,
            maxHeight: `${viewportLimit.height}px`,
        }
        : {};

    return createPortal(
        <AnimatePresence>
            {preview ? (
                <motion.div
                    ref={previewRef}
                    key={preview.src}
                    aria-hidden="true"
                    className="fixed left-0 top-0 z-[90] hidden origin-top-left pointer-events-none lg:block"
                    style={{
                        x: springX,
                        y: springY,
                        scale: PREVIEW_SCALE,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                >
                    {preview.mediaType === "video" ? (
                        <video
                            src={preview.src}
                            className="block h-auto w-auto max-h-none max-w-none"
                            style={mediaStyle}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            onLoadedData={measurePreview}
                            onLoadedMetadata={measurePreview}
                        />
                    ) : (
                        <img
                            src={preview.src}
                            className="block h-auto w-auto max-h-none max-w-none"
                            style={mediaStyle}
                            alt={describeCarouselImage(preview.src, 0)}
                            decoding="async"
                            draggable={false}
                            onLoad={measurePreview}
                        />
                    )}
                </motion.div>
            ) : null}
        </AnimatePresence>,
        portalNode
    );
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

interface CarouselColumnProps {
    images: string[];
    speed: number;
    className?: string;
    canPreview: boolean;
    onPreviewEnter: (src: string, mediaType: PreviewMediaType, event: React.PointerEvent<HTMLElement>) => void;
    onPreviewMove: (event: React.PointerEvent<HTMLElement>) => void;
    onPreviewLeave: () => void;
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

const CarouselColumn = ({
    images,
    speed,
    className,
    canPreview,
    onPreviewEnter,
    onPreviewMove,
    onPreviewLeave,
}: CarouselColumnProps) => {
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
                    const commonClasses = "block object-cover rounded-[5px] shadow-md pointer-events-none w-full h-auto";
                    const mediaType: PreviewMediaType = isVid ? "video" : "image";

                    if (isVid) {
                        return (
                            <PreviewableMedia
                                key={`${src}-${i}`}
                                src={src}
                                mediaType={mediaType}
                                canPreview={canPreview}
                                onPreviewEnter={onPreviewEnter}
                                onPreviewMove={onPreviewMove}
                                onPreviewLeave={onPreviewLeave}
                            >
                                <LazyVideo
                                    src={src}
                                    axis="vertical"
                                    onLoadedData={() => { }}
                                />
                            </PreviewableMedia>
                        );
                    }

                    return (
                        <PreviewableMedia
                            key={`${src}-${i}`}
                            src={src}
                            mediaType={mediaType}
                            canPreview={canPreview}
                            onPreviewEnter={onPreviewEnter}
                            onPreviewMove={onPreviewMove}
                            onPreviewLeave={onPreviewLeave}
                        >
                            <img
                                src={src}
                                className={commonClasses}
                                draggable={false}
                                alt={describeCarouselImage(src, i)}
                                width="300"
                                height="400"
                                loading="eager"
                            />
                        </PreviewableMedia>
                    );
                })}
            </div>
        </VelocityScroll>
    );
};

export function HeroCarousel() {
    const canUseHoverPreview = useDesktopHoverPreview();
    const [hoverPreview, setHoverPreview] = useState<HoverPreview | null>(null);
    const previewSizeRef = useRef<PreviewSize>({ width: 420 / PREVIEW_SCALE, height: 560 / PREVIEW_SCALE });
    const lastPointerRef = useRef<{ clientX: number; clientY: number } | null>(null);
    const previewX = useMotionValue(0);
    const previewY = useMotionValue(0);

    const setPreviewPosition = useCallback((clientX: number, clientY: number) => {
        if (!canUseHoverPreview || typeof window === "undefined") return;

        const rawWidth = previewSizeRef.current.width || 1;
        const rawHeight = previewSizeRef.current.height || 1;
        const previewWidth = Math.min(rawWidth * PREVIEW_SCALE, window.innerWidth - PREVIEW_GUTTER * 2);
        const previewHeight = Math.min(rawHeight * PREVIEW_SCALE, window.innerHeight - PREVIEW_GUTTER * 2);
        const maxX = Math.max(PREVIEW_GUTTER, window.innerWidth - previewWidth - PREVIEW_GUTTER);
        const maxY = Math.max(PREVIEW_GUTTER, window.innerHeight - previewHeight - PREVIEW_GUTTER);
        const shouldPlaceLeft = clientX + PREVIEW_OFFSET + previewWidth > window.innerWidth - PREVIEW_GUTTER;
        const nextX = shouldPlaceLeft
            ? clientX - previewWidth - PREVIEW_OFFSET
            : clientX + PREVIEW_OFFSET;
        const nextY = clientY - previewHeight * 0.5;

        previewX.set(Math.min(Math.max(PREVIEW_GUTTER, nextX), maxX));
        previewY.set(Math.min(Math.max(PREVIEW_GUTTER, nextY), maxY));
    }, [canUseHoverPreview, previewX, previewY]);

    const updatePreviewPosition = useCallback((event: React.PointerEvent<HTMLElement>) => {
        lastPointerRef.current = { clientX: event.clientX, clientY: event.clientY };
        setPreviewPosition(event.clientX, event.clientY);
    }, [setPreviewPosition]);

    const handlePreviewEnter = useCallback((src: string, mediaType: PreviewMediaType, event: React.PointerEvent<HTMLElement>) => {
        if (typeof window !== "undefined") {
            previewSizeRef.current = {
                width: Math.min(window.innerWidth * 0.34, 420) / PREVIEW_SCALE,
                height: Math.min(window.innerHeight * 0.72, 560) / PREVIEW_SCALE,
            };
        }
        updatePreviewPosition(event);
        setHoverPreview({ src, mediaType });
    }, [updatePreviewPosition]);

    const handlePreviewSizeChange = useCallback((size: PreviewSize) => {
        previewSizeRef.current = size;
        if (lastPointerRef.current) {
            setPreviewPosition(lastPointerRef.current.clientX, lastPointerRef.current.clientY);
        }
    }, [setPreviewPosition]);

    const handlePreviewLeave = useCallback(() => {
        setHoverPreview(null);
    }, []);

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
        <>
            <div className="grid grid-cols-3 gap-4 h-full w-full overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                {/* Col 1: Up - Very Slow Base */}
                <CarouselColumn
                    images={col1}
                    speed={2.5}
                    canPreview={canUseHoverPreview}
                    onPreviewEnter={handlePreviewEnter}
                    onPreviewMove={updatePreviewPosition}
                    onPreviewLeave={handlePreviewLeave}
                />

                {/* Col 2: Down - Slow Base */}
                <CarouselColumn
                    images={col2}
                    speed={-3.5}
                    className="pt-12"
                    canPreview={canUseHoverPreview}
                    onPreviewEnter={handlePreviewEnter}
                    onPreviewMove={updatePreviewPosition}
                    onPreviewLeave={handlePreviewLeave}
                />

                {/* Col 3: Up - Very Slow Base */}
                <CarouselColumn
                    images={col3}
                    speed={2.5}
                    canPreview={canUseHoverPreview}
                    onPreviewEnter={handlePreviewEnter}
                    onPreviewMove={updatePreviewPosition}
                    onPreviewLeave={handlePreviewLeave}
                />
            </div>

            <HeroHoverPreview
                preview={canUseHoverPreview ? hoverPreview : null}
                x={previewX}
                y={previewY}
                onSizeChange={handlePreviewSizeChange}
            />
        </>
    );
}
