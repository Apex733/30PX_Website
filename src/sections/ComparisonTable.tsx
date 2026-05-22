"use client";

import { SectionHeading } from "@/components/ui/section-heading"
import { ButtonLabel } from "@/components/ui/button-label";
import React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ComparisonRow {
    feature: string;
    thirtyPX: string | boolean;
    inHouse: string;
    freelancers: string;
}

const LEFT_SIDE_BLOCKS = [
    {
        className: "left-8 top-20 h-20 w-20",
        baseColor: "rgba(186, 230, 253, 0.8)",
        hoverGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.98) 0%, rgba(129, 140, 248, 0.92) 55%, rgba(244, 114, 182, 0.88) 100%)",
        glow: "0 0 28px rgba(56, 189, 248, 0.32), 0 0 64px rgba(129, 140, 248, 0.18)",
    },
    {
        className: "left-28 top-20 h-20 w-20",
        baseColor: "rgba(221, 214, 254, 0.78)",
        hoverGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.96) 0%, rgba(96, 165, 250, 0.9) 50%, rgba(196, 181, 253, 0.82) 100%)",
        glow: "0 0 28px rgba(168, 85, 247, 0.28), 0 0 64px rgba(96, 165, 250, 0.16)",
    },
    {
        className: "left-8 top-40 h-20 w-20",
        baseColor: "rgba(255, 255, 255, 0.92)",
        hoverGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(191, 219, 254, 0.96) 45%, rgba(125, 211, 252, 0.92) 100%)",
        glow: "0 0 24px rgba(191, 219, 254, 0.26), 0 0 56px rgba(125, 211, 252, 0.14)",
    },
    {
        className: "left-28 top-60 h-20 w-20",
        baseColor: "rgba(34, 211, 238, 0.82)",
        hoverGradient: "linear-gradient(135deg, rgba(34, 211, 238, 0.98) 0%, rgba(59, 130, 246, 0.92) 52%, rgba(14, 165, 233, 0.84) 100%)",
        glow: "0 0 28px rgba(34, 211, 238, 0.32), 0 0 68px rgba(59, 130, 246, 0.18)",
    },
];

const RIGHT_SIDE_BLOCKS = [
    {
        className: "right-8 top-20 h-20 w-20",
        baseColor: "rgba(167, 243, 208, 0.78)",
        hoverGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.96) 0%, rgba(45, 212, 191, 0.9) 52%, rgba(125, 211, 252, 0.86) 100%)",
        glow: "0 0 28px rgba(16, 185, 129, 0.28), 0 0 64px rgba(45, 212, 191, 0.16)",
    },
    {
        className: "right-28 top-40 h-20 w-20",
        baseColor: "rgba(125, 211, 252, 0.8)",
        hoverGradient: "linear-gradient(135deg, rgba(56, 189, 248, 0.98) 0%, rgba(14, 165, 233, 0.9) 45%, rgba(99, 102, 241, 0.84) 100%)",
        glow: "0 0 28px rgba(56, 189, 248, 0.28), 0 0 64px rgba(99, 102, 241, 0.18)",
    },
    {
        className: "right-8 top-60 h-20 w-20",
        baseColor: "rgba(255, 255, 255, 0.92)",
        hoverGradient: "linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(167, 243, 208, 0.94) 45%, rgba(56, 189, 248, 0.84) 100%)",
        glow: "0 0 24px rgba(167, 243, 208, 0.24), 0 0 56px rgba(56, 189, 248, 0.14)",
    },
    {
        className: "right-28 top-80 h-20 w-20",
        baseColor: "rgba(99, 102, 241, 0.82)",
        hoverGradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.98) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(52, 211, 153, 0.84) 100%)",
        glow: "0 0 28px rgba(99, 102, 241, 0.28), 0 0 68px rgba(52, 211, 153, 0.16)",
    },
];

const comparisonData: ComparisonRow[] = [
    {
        feature: "Predictable flat fee",
        thirtyPX: true,
        inHouse: "High fixed salary",
        freelancers: "Unpredictable rates",
    },
    {
        feature: "Fast & reliable (24-48h)",
        thirtyPX: true,
        inHouse: "Limited by one person",
        freelancers: "Unreliable deadlines",
    },
    {
        feature: "Vetted pro designers",
        thirtyPX: true,
        inHouse: "Single skill set",
        freelancers: "Hit or miss quality",
    },
    {
        feature: "Fully managed",
        thirtyPX: true,
        inHouse: "Full HR burden",
        freelancers: "You manage everything",
    },
    {
        feature: "Instantly scalable",
        thirtyPX: true,
        inHouse: "Slow & costly to scale",
        freelancers: "Hard to scale quickly",
    },
];

function NegativeCell({
    text,
    iconClassName,
}: {
    text: string
    iconClassName?: string
}) {
    return (
        <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground text-sm">{text}</span>
            <X className={cn("w-4 h-4 text-muted-foreground flex-shrink-0", iconClassName)} />
        </div>
    );
}

export function ComparisonTable() {
    const [isExpanded, setIsExpanded] = React.useState(false);

    return (
        <section className="relative overflow-hidden bg-background py-12 md:py-16">


            <div className="container relative z-10 mx-auto px-4 md:px-12">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <SectionHeading
                        badge="Why Us"
                        title="The math is simple."
                        description="Agencies charge $5K to $15K a month. A full-time designer costs $60K+ a year. We deliver the same quality of work, powered by premium AI, starting at $24/mo."
                        align="center"
                    />
                </div>

                {/* Comparison Grid */}
                <div className="grid max-w-6xl grid-cols-1 gap-4 mx-auto lg:grid-cols-3 lg:gap-5 relative isolate">
                    {/* 30PX Column - Highlighted (Always Visible) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50, filter: "blur(20px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-20 rounded-[5px] border border-primary/20 bg-primary/[0.05] p-6 text-card-foreground ring-1 ring-inset ring-primary/10"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-xl text-primary">30PX</h3>
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-5 h-5 text-primary-foreground" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            {comparisonData.map((row, index) => (
                                <div
                                    key={`30px-${index}`}
                                    className="flex items-center justify-between rounded-[5px] border border-primary/15 bg-background/80 px-4 py-4"
                                >
                                    <span className="font-medium text-sm text-foreground">{row.feature}</span>
                                    <Check className="w-5 h-5 text-primary" />
                                </div>
                            ))}
                        </div>

                        {/* Mobile Expand Button Overlay (Visible only on mobile when collapsed) */}
                        {!isExpanded && (
                            <div className="block lg:hidden mt-6 pt-6 border-t border-primary/15">
                                <button
                                    onClick={() => setIsExpanded(true)}
                                    className="group/button flex w-full items-center justify-center gap-2 rounded-md bg-primary py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
                                >
                                    <ButtonLabel>
                                        Expand comparison chart
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    </ButtonLabel>
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
                            "rounded-[5px] border border-slate-300 bg-slate-100/70 p-6 text-card-foreground ring-1 ring-inset ring-slate-200 transition-all duration-500",
                            !isExpanded ? "hidden lg:block" : "block"
                        )}
                    >
                        <h3 className="mb-8 text-lg font-semibold text-slate-700">In-House Hire</h3>
                        <div className="space-y-3">
                            {comparisonData.map((row, index) => (
                                <div
                                    key={`inhouse-${index}`}
                                    className="rounded-[5px] border border-slate-300/80 bg-background/80 px-4 py-4"
                                >
                                    <NegativeCell text={row.inHouse} iconClassName="text-slate-500" />
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
                            "rounded-[5px] border border-slate-300 bg-slate-100/70 p-6 text-card-foreground ring-1 ring-inset ring-slate-200 transition-all duration-500",
                            !isExpanded ? "hidden lg:block" : "block"
                        )}
                    >
                        <h3 className="mb-8 text-lg font-semibold text-slate-700">Freelancers</h3>
                        <div className="space-y-3">
                            {comparisonData.map((row, index) => (
                                <div
                                    key={`freelancers-${index}`}
                                    className="rounded-[5px] border border-slate-300/80 bg-background/80 px-4 py-4"
                                >
                                    <NegativeCell text={row.freelancers} iconClassName="text-slate-500" />
                                </div>
                            ))}
                        </div>
                        {/* Collapse Button (Mobile Only) */}
                        {isExpanded && (
                            <div className="block lg:hidden mt-6 pt-6 border-t border-slate-300/80">
                                <button
                                    onClick={() => setIsExpanded(false)}
                                    className="group/button flex w-full items-center justify-center gap-2 rounded-md bg-muted py-3 font-semibold text-foreground transition-colors hover:bg-muted/80"
                                >
                                    <ButtonLabel>
                                        Collapse comparison
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m6 9 6 6 6-6" /></svg>
                                    </ButtonLabel>
                                </button>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section >
    );
}
