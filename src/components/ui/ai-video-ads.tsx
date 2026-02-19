import { SectionHeading } from "@/components/ui/section-heading"
"use client";

import React from "react";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

// Import all videos from AI ADS directory
const videoModules = import.meta.glob<{ default: string }>(
    "/Work/AI ADS/*.{mp4,webm}",
    { eager: true }
);

const allVideos = Object.values(videoModules).map((module) => module.default);
// Limit to 8 videos to prevent performance issues/crashing
const videos = allVideos.slice(0, 8);

export function AIVideoAds() {
    if (videos.length === 0) return null;

    return (
        <section className="py-16 md:py-24 bg-background overflow-hidden">
            <div className="container px-4 md:px-12 mx-auto mb-12">
                <SectionHeading
                    badge="AI Video"
                    title="AI Video Ads"
                    description="High-performing ad creatives generated with cutting-edge AI."
                    align="center"
                />
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <VelocityScroll
                        default_velocity={3}
                        className="flex items-center"
                    >
                        <div className="flex gap-6 pr-6">
                            {videos.map((src, index) => (
                                <div
                                    key={index}
                                    className="w-[200px] md:w-[280px] aspect-[9/16] rounded-lg overflow-hidden shadow-lg border border-white/10 shrink-0 bg-black/5"
                                >
                                    <video
                                        src={src}
                                        className="w-full h-full object-cover"
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                    />
                                </div>
                            ))}
                        </div>
                    </VelocityScroll>
                </div>
            </div>
        </section>
    );
}
