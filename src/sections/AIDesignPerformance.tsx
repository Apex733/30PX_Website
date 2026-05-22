"use client";

import { SectionHeading } from "@/components/ui/section-heading"
import React from "react";
import { motion } from "framer-motion";

export function AIDesignPerformance() {
    return (
        <section className="py-12 md:py-16 bg-background overflow-hidden relative">
            <div className="container px-4 md:px-12 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="flex flex-col gap-6">
                        <SectionHeading
                            badge="Efficiency"
                            title={<>Your competitors are already using AI. <span className="block text-primary mt-2">Are you keeping up?</span></>}
                            align="left"
                            className="mb-6"
                        />

                        <div className="space-y-4 text-lg text-muted-foreground">
                            <h3 className="font-semibold text-foreground text-xl">
                                Fresh creative is not optional anymore.
                            </h3>
                            <p>
                                Algorithms reward fresh content. Your audience craves it. The brands winning right now ship creative daily, not monthly.
                            </p>
                            <p>
                                We pair experienced designers with enterprise-grade AI. Claude for strategy, Midjourney for visuals, Sora for video. You get agency-quality output at a pace and price that actually make sense.
                            </p>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative">
                        <div className="aspect-[4/3] relative rounded-[5px] overflow-hidden shadow-2xl">
                            <img
                                src="/ai-design-performance.webp"
                                alt="Abstract AI design performance visual showing 3D shapes"
                                className="object-cover w-full h-full"
                                loading="lazy"
                            />
                            {/* Overlay gradient for better text readability if needed, though mostly for style here */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
                        <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50" />
                    </div>
                </div>
            </div>
        </section>
    );
}
