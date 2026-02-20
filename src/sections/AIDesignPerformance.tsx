"use client";

import { SectionHeading } from "@/components/ui/section-heading"
import React from "react";
import { motion } from "framer-motion";

export function AIDesignPerformance() {
    return (
        <section className="py-16 md:py-24 bg-background overflow-hidden relative">
            <div className="container px-4 md:px-12 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col gap-6"
                    >
                        <SectionHeading
                            badge="Efficiency"
                            title={<>Tired of design fatigue? <span className="block text-primary mt-2">It's time to refresh your design production</span></>}
                            align="left"
                            className="mb-6"
                        />

                        <div className="space-y-4 text-lg text-muted-foreground">
                            <h3 className="font-semibold text-foreground text-xl">
                                Designs lose effectiveness quickly.
                            </h3>
                            <p>
                                If it's not your audience getting bored, it's the algorithm.
                            </p>
                            <p>
                                You know it has a direct impact on your ROI but tight deadlines, limited resources, and talent gaps make it hard to keep up with the demand for compelling creative. That's what 30PX is for.
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="aspect-[4/3] relative rounded-lg overflow-hidden shadow-2xl">
                            <img
                                src="/ai-design-performance.png"
                                alt="AI Design Performance"
                                className="object-cover w-full h-full"
                            />
                            {/* Overlay gradient for better text readability if needed, though mostly for style here */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-50" />
                        <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
