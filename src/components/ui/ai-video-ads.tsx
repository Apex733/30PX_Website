"use client";

import { SectionHeading } from "@/components/ui/section-heading"
import React, { useRef } from "react";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

// Import all videos from AI ADS directory
const videoModules = import.meta.glob<{ default: string }>(
    "/Work/AI ADS/*.{mp4,webm}",
    { eager: true }
);

const allVideos = Object.values(videoModules).map((module) => module.default);
// Limit to 5 videos to prevent performance issues
const videos = allVideos.slice(0, 5);

// Lazy video component — only plays when visible
const LazyAdVideo = React.memo(({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div
            className="w-[200px] md:w-[280px] aspect-[9/16] rounded-lg overflow-hidden shadow-lg border border-white/10 shrink-0 bg-black/5"
            onMouseEnter={() => videoRef.current?.play().catch(() => { })}
            onMouseLeave={() => {
                if (videoRef.current) {
                    videoRef.current.pause();
                }
            }}
        >
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover transition-opacity duration-300"
                muted
                loop
                playsInline
                preload="metadata"
            />
        </div>
    );
});

export function AIVideoAds() {
    if (videos.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-background overflow-hidden">
            <div className="container px-4 md:px-12 mx-auto mb-12">
                <SectionHeading
                    badge="AI Video"
                    title="AI UGC Ads"
                    description="High-performing ad creatives generated with cutting-edge AI."
                    align="center"
                />
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="relative w-full">
                    <VelocityScroll
                        default_velocity={3}
                        className="flex items-center"
                    >
                        <div className="flex gap-6 pr-6">
                            {videos.map((src, index) => (
                                <LazyAdVideo key={index} src={src} />
                            ))}
                        </div>
                    </VelocityScroll>
                </div>
            </div>
        </section>
    );
}
