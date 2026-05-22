import React from 'react';
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";

const THEME_MAP: Record<string, any> = {
    violet: {
        nodeBg: "bg-violet-100 dark:bg-violet-900/40",
        nodeText: "text-violet-600 dark:text-violet-400",
        nodeBorder: "ring-violet-200 dark:ring-violet-800",
        cardBg: "",
        cardBorder: "border-border",
        tagBg: "bg-violet-100 dark:bg-violet-900/30",
        tagText: "text-violet-700 dark:text-violet-300"
    },
    blue: {
        nodeBg: "bg-blue-100 dark:bg-blue-900/40",
        nodeText: "text-blue-600 dark:text-blue-400",
        nodeBorder: "ring-blue-200 dark:ring-blue-800",
        cardBg: "",
        cardBorder: "border-border",
        tagBg: "bg-blue-100 dark:bg-blue-900/30",
        tagText: "text-blue-700 dark:text-blue-300"
    },
    pink: {
        nodeBg: "bg-pink-100 dark:bg-pink-900/40",
        nodeText: "text-pink-600 dark:text-pink-400",
        nodeBorder: "ring-pink-200 dark:ring-pink-800",
        cardBg: "",
        cardBorder: "border-border",
        tagBg: "bg-pink-100 dark:bg-pink-900/30",
        tagText: "text-pink-700 dark:text-pink-300"
    },
    orange: {
        nodeBg: "bg-orange-100 dark:bg-orange-900/40",
        nodeText: "text-orange-600 dark:text-orange-400",
        nodeBorder: "ring-orange-200 dark:ring-orange-800",
        cardBg: "",
        cardBorder: "border-border",
        tagBg: "bg-orange-100 dark:bg-orange-900/30",
        tagText: "text-orange-700 dark:text-orange-300"
    },
    emerald: {
        nodeBg: "bg-emerald-100 dark:bg-emerald-900/40",
        nodeText: "text-emerald-600 dark:text-emerald-400",
        nodeBorder: "ring-emerald-200 dark:ring-emerald-800",
        cardBg: "",
        cardBorder: "border-border",
        tagBg: "bg-emerald-100 dark:bg-emerald-900/30",
        tagText: "text-emerald-700 dark:text-emerald-300"
    },
    stone: {
        nodeBg: "bg-stone-200 dark:bg-stone-800",
        nodeText: "text-stone-700 dark:text-stone-300",
        nodeBorder: "ring-stone-300 dark:ring-stone-700",
        cardBg: "",
        cardBorder: "border-border",
        tagBg: "bg-stone-200 dark:bg-stone-800/30",
        tagText: "text-stone-800 dark:text-stone-300"
    }
};

const PROCESS_STEPS = [
    {
        phase: 1,
        color: "violet",
        title: "Discovery & Scope",
        description: "We analyze your brand, establish core objectives, and define the technical requirements.",
        tags: ["Brand Audit", "Competitive Analysis", "Goal Definition"]
    },
    {
        phase: 2,
        color: "blue",
        title: "AI Strategy",
        description: "Developing custom prompts and fine-tuning models to fit your unique visual footprint.",
        tags: ["Prompt Engineering", "Model Selection", "Asset Mapping"]
    },
    {
        phase: 3,
        color: "pink",
        title: "Generative Concepting",
        description: "Rapid iteration producing hundreds of visual directions for your feedback and approval.",
        tags: ["High-Volume Concepts", "Aesthetic Iteration", "Client Review"]
    },
    {
        phase: 4,
        color: "orange",
        title: "Refinement",
        description: "Upscaling, repainting, and color-treating selected generations to professional studio standards.",
        tags: ["Upscaling", "In-painting", "Color Grading"]
    },
    {
        phase: 5,
        color: "emerald",
        title: "Design Assembly",
        description: "Integrating assets into mockups, UI components, and fully structured campaign outputs.",
        tags: ["Typography", "Layout Design", "Mockup Creation"]
    },
    {
        phase: 6,
        color: "stone",
        title: "Delivery & Handoff",
        description: "Packaging pixel-perfect, ready-to-publish assets and style guides for your team.",
        tags: ["Asset Export", "Style Guide", "Final Review"]
    }
];

// Helper to determine accurate visual order for Snake Layout
const getOrder = (idx: number) => {
    const row = Math.floor(idx / 3);
    // Even rows (0, 2, 4...) stay left-to-right
    if (row % 2 === 0) return idx + 1;
    // Odd rows (1, 3, 5...) reverse right-to-left
    const base = row * 3;
    const pos = idx % 3;
    return base + 3 - pos;
};

export function ProjectProcess() {
    return (
        <section className="w-full py-12">
            <div className="flex flex-col items-center mb-16 text-center gap-6">
                <SectionHeading
                    badge="End-to-End Workflow"
                    title="Our Project Process."
                    description="How we plug AI into every phase of the creative pipeline, from brief to final delivery."
                    align="center"
                />
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-y-12 isolate">
                {PROCESS_STEPS.map((step, idx) => {
                    const theme = THEME_MAP[step.color] || THEME_MAP.stone;
                    const order = getOrder(idx);
                    
                    const isEvenRow = Math.floor(idx / 3) % 2 === 0;
                    
                    // Rules for continuous single-path snake flow
                    const connectRight = isEvenRow && (idx % 3 !== 2) && (idx !== PROCESS_STEPS.length - 1);
                    const connectLeft = !isEvenRow && (idx % 3 !== 2) && (idx !== PROCESS_STEPS.length - 1);
                    const connectDownDesktop = (idx % 3 === 2) && (idx !== PROCESS_STEPS.length - 1);
                    const connectDownMobile = idx !== PROCESS_STEPS.length - 1;

                    return (
                        <div 
                            key={idx} 
                            className={`relative border bg-card rounded-[5px] p-6 shadow-sm w-full h-full flex flex-col gap-4 ${theme.cardBorder} ${theme.cardBg}`}
                            style={{ order }}
                        >
                            {/* SVG / Div Line Connectors (Rendered in background) */}
                            
                            {/* Horizontal connect to the right */}
                            {connectRight && (
                                <div 
                                    className="hidden md:block absolute h-[2px] bg-border/40 -z-10 overflow-hidden"
                                    style={{ top: '3rem', left: '3rem', width: 'calc(100% + 2rem)' }}
                                >
                                    <motion.div 
                                        className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70"
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: idx * 0.2 }}
                                    />
                                </div>
                            )}
                            
                            {/* Horizontal connect to the left */}
                            {connectLeft && (
                                <div 
                                    className="hidden md:block absolute h-[2px] bg-border/40 -z-10 overflow-hidden"
                                    style={{ top: '3rem', right: '3rem', width: 'calc(100% + 2rem)' }}
                                >
                                    <motion.div 
                                        className="w-full h-full bg-gradient-to-l from-transparent via-primary to-transparent opacity-70"
                                        initial={{ x: "100%" }}
                                        animate={{ x: "-100%" }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: idx * 0.2 }}
                                    />
                                </div>
                            )}
                            
                            {/* Desktop connect down */}
                            {connectDownDesktop && (
                                <div 
                                    className="hidden md:block absolute w-[2px] bg-border/40 -z-10 overflow-hidden"
                                    style={{ top: '3rem', left: '3rem', height: 'calc(100% + 3rem)' }} // 3rem corresponds to md:gap-y-12
                                >
                                    <motion.div 
                                        className="w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-70"
                                        initial={{ y: "-100%" }}
                                        animate={{ y: "100%" }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: idx * 0.2 }}
                                    />
                                </div>
                            )}
                            
                            {/* Mobile connect down */}
                            {connectDownMobile && (
                                <div 
                                    className="block md:hidden absolute w-[2px] bg-border/40 -z-10 overflow-hidden"
                                    style={{ top: '3rem', left: '3rem', height: 'calc(100% + 2rem)' }} // 2rem corresponds to standard gap-8
                                >
                                    <motion.div 
                                        className="w-full h-full bg-gradient-to-b from-transparent via-primary to-transparent opacity-70"
                                        initial={{ y: "-100%" }}
                                        animate={{ y: "100%" }}
                                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: idx * 0.2 }}
                                    />
                                </div>
                            )}

                            {/* Node Header */}
                            <div className="relative z-10 flex items-center gap-4">
                                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${theme.nodeBg} ${theme.nodeText}`}>
                                    {step.phase}
                                </div>
                                <h3 className="text-xl font-bold leading-tight">{step.title}</h3>
                            </div>

                            {/* Body Description */}
                            <div className="relative z-10 flex-grow">
                                <p className="text-muted-foreground text-[15px] leading-relaxed">
                                    {step.description}
                                </p>
                            </div>

                            {/* Activity Tags */}
                            <div className="relative z-10 flex flex-wrap gap-2 mt-2">
                                {step.tags.map((tag, tIdx) => (
                                    <span 
                                        key={tIdx} 
                                        className={`text-xs font-semibold px-2.5 py-1 rounded-md ${theme.tagBg} ${theme.tagText}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
