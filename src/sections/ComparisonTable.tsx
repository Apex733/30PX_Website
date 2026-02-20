"use client";

import { SectionHeading } from "@/components/ui/section-heading"
import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ComparisonRow {
    feature: string;
    thirtyPX: string | boolean;
    inHouse: string;
    freelancers: string;
    diyPlatforms: string;
}

const comparisonData: ComparisonRow[] = [
    {
        feature: "Predictable flat fee",
        thirtyPX: true,
        inHouse: "High fixed salary",
        freelancers: "Unpredictable rates",
        diyPlatforms: "Hidden time cost",
    },
    {
        feature: "Fast & reliable (24-48h)",
        thirtyPX: true,
        inHouse: "Limited by one person",
        freelancers: "Unreliable deadlines",
        diyPlatforms: "Slow for quality work",
    },
    {
        feature: "Vetted pro designers",
        thirtyPX: true,
        inHouse: "Single skill set",
        freelancers: "Hit or miss quality",
        diyPlatforms: "DIY = amateur results",
    },
    {
        feature: "Fully managed",
        thirtyPX: true,
        inHouse: "Full HR burden",
        freelancers: "You manage everything",
        diyPlatforms: "Diverts your team",
    },
    {
        feature: "Instantly scalable",
        thirtyPX: true,
        inHouse: "Slow & costly to scale",
        freelancers: "Hard to scale quickly",
        diyPlatforms: "Does not scale",
    },
];

function FeatureCell({ value }: { value: string | boolean }) {
    if (typeof value === "boolean") {
        return value ? (
            <Check className="w-5 h-5 text-primary" />
        ) : (
            <X className="w-5 h-5 text-muted-foreground" />
        );
    }
    return <span className="text-muted-foreground text-sm">{value}</span>;
}

function NegativeCell({ text }: { text: string }) {
    return (
        <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-sm">{text}</span>
            <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </div>
    );
}

export function ComparisonTable() {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <SectionHeading
                        badge="Why Us"
                        title="Why 500+ brands choose 30PX"
                        description="Same quality as expensive agencies. Fraction of the cost. Zero drama."
                        align="center"
                    />
                </div>

                {/* Comparison Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 max-w-6xl mx-auto overflow-hidden rounded-[10px] border border-border shadow-sm relative isolate">
                    {/* 30PX Column - Highlighted (Always Visible) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="bg-card text-card-foreground p-6 z-20 relative shadow-lg lg:shadow-none border-r border-border"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-xl text-primary">30PX</h3>
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-5 h-5 text-primary-foreground" />
                            </div>
                        </div>
                        <div className="space-y-0">
                            {comparisonData.map((row, index) => (
                                <div
                                    key={`30px-${index}`}
                                    className={cn(
                                        "py-5 flex items-center justify-between",
                                        index !== comparisonData.length - 1 && "border-b border-border"
                                    )}
                                >
                                    <span className="font-medium text-sm text-foreground">{row.feature}</span>
                                    <Check className="w-5 h-5 text-primary" />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Expand Button Overlay (Visible only on mobile when collapsed) */}
                        {!isExpanded && (
                            <div className="block lg:hidden mt-6 pt-6 border-t border-border">
                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="w-full py-3 bg-primary text-primary-foreground rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                                >
                                    Expand comparison chart
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </button>
                            </div>
                        )}
                    </motion.div>

                    {/* In-House Hire Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                        className={cn(
                            "bg-card/50 text-card-foreground p-6 border-r border-border transition-all duration-500",
                            !isExpanded ? "hidden lg:block" : "block"
                        )}
                    >
                        <h3 className="font-semibold text-lg mb-8 text-foreground/80">In-House Hire</h3>
                        <div className="space-y-0">
                            {comparisonData.map((row, index) => (
                                <div
                                    key={`inhouse-${index}`}
                                    className={cn(
                                        "py-5",
                                        index !== comparisonData.length - 1 && "border-b border-border"
                                    )}
                                >
                                    <NegativeCell text={row.inHouse} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Freelancers Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                        className={cn(
                            "bg-card/50 text-card-foreground p-6 border-r border-border transition-all duration-500",
                            !isExpanded ? "hidden lg:block" : "block"
                        )}
                    >
                        <h3 className="font-semibold text-lg mb-8 text-foreground/80">Freelancers</h3>
                        <div className="space-y-0">
                            {comparisonData.map((row, index) => (
                                <div
                                    key={`freelancers-${index}`}
                                    className={cn(
                                        "py-5",
                                        index !== comparisonData.length - 1 && "border-b border-border"
                                    )}
                                >
                                    <NegativeCell text={row.freelancers} />
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* DIY Platforms Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                        className={cn(
                            "bg-card/50 text-card-foreground p-6 transition-all duration-500",
                            !isExpanded ? "hidden lg:block" : "block"
                        )}
                    >
                        <h3 className="font-semibold text-lg mb-8 text-foreground/80">DIY Platforms</h3>
                        <div className="space-y-0">
                            {comparisonData.map((row, index) => (
                                <div
                                    key={`diy-${index}`}
                                    className={cn(
                                        "py-5",
                                        index !== comparisonData.length - 1 && "border-b border-border"
                                    )}
                                >
                                    <NegativeCell text={row.diyPlatforms} />
                                </div>
                            ))}
                        </div>
                        {/* Collapse Button (Mobile Only) */}
                        {isExpanded && (
                            <div className="block lg:hidden mt-6 pt-6 border-t border-border">
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="w-full py-3 bg-muted text-foreground rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-muted/80 transition-colors"
                                >
                                    Collapse comparison
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m6 9 6 6 6-6" /></svg>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
