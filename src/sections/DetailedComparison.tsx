import { SectionHeading } from "@/components/ui/section-heading"
"use client"

import React from "react"
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

// Feature data structure mapping to 4 tiers: Startup, Growth, Scale, Enterprise
// Based on HTML reference: Bit -> Startup, Pixel -> Growth, Vector -> Scale, Resolution -> Enterprise

interface ComparisonRow {
    feature: string
    tooltip?: string
    startup: string | boolean
    growth: string | boolean
    scale: string | boolean
    enterprise: string | boolean
}

interface ComparisonSection {
    title: string
    rows: ComparisonRow[]
}

const comparisonData: ComparisonSection[] = [
    {
        title: "Core Workflow",
        rows: [
            {
                feature: "Request Limit",
                startup: "5 Requests / mo",
                growth: "Unlimited",
                scale: "Unlimited",
                enterprise: "Unlimited",
            },
            {
                feature: "Active Workers",
                tooltip: "How many requests we work on simultaneously",
                startup: "1 Active",
                growth: "1 Active",
                scale: "1 Active",
                enterprise: "2 Active Requests 🚀",
            },
            {
                feature: "Turnaround Time",
                startup: "~48 Hours",
                growth: "24-48 Hours",
                scale: "24 Hours",
                enterprise: "Same Day Priority",
            },
            {
                feature: "Cancel Anytime",
                startup: true,
                growth: true,
                scale: true,
                enterprise: true,
            },
        ],
    },
    {
        title: "Graphic Design Suite",
        rows: [
            {
                feature: "Social Posts & Thumbnails",
                startup: true,
                growth: true,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Ad Creatives",
                startup: false,
                growth: true,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Advanced Print & Packaging",
                startup: false,
                growth: "Flyers Only",
                scale: true,
                enterprise: true,
            },
            {
                feature: "Presentations & Decks",
                startup: false,
                growth: false,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Brand Identity",
                startup: false,
                growth: "Simple Logos",
                scale: "Full Vector Logos",
                enterprise: "Complete Brand Suite",
            },
        ],
    },
    {
        title: "Video & Motion",
        rows: [
            {
                feature: "Short-Form Video (Reels/TikTok)",
                startup: false,
                growth: false,
                scale: "8 Edits / month",
                enterprise: "12 Edits / month",
            },
            {
                feature: "Long-Form Video (Podcast/YT)",
                startup: false,
                growth: false,
                scale: false,
                enterprise: "Included",
            },
            {
                feature: "Motion Graphics (Lottie/GIF)",
                startup: false,
                growth: false,
                scale: "Simple",
                enterprise: "Advanced",
            },
        ],
    },
    {
        title: "Web Design & UI",
        rows: [
            {
                feature: "UI Design (No Code)",
                startup: false,
                growth: false,
                scale: "Figma / XD",
                enterprise: "Figma / XD",
            },
            {
                feature: "Web Development",
                startup: false,
                growth: false,
                scale: false,
                enterprise: "WordPress / Framer",
            },
        ],
    },
    {
        title: "✨ AI Creative Suite",
        rows: [
            {
                feature: "AI Photo Enhancements & Upscaling",
                startup: false,
                growth: true,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Generative AI Images",
                startup: false,
                growth: false,
                scale: "Midjourney / Flux",
                enterprise: "Custom Models",
            },
            {
                feature: "AI Copywriting (Captions/Blogs)",
                startup: false,
                growth: "Basic Captions",
                scale: "SEO Blogs & Ads",
                enterprise: "Included",
            },
            {
                feature: "AI Voice Clones (ElevenLabs)",
                startup: false,
                growth: false,
                scale: false,
                enterprise: "Included",
            },
            {
                feature: "Custom AI Avatars (HeyGen)",
                startup: false,
                growth: false,
                scale: false,
                enterprise: "Included",
            },
        ],
    },
    {
        title: "Assets & Licensing",
        rows: [
            {
                feature: "Source Files Included",
                startup: "JPG/PNG Only",
                growth: true,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Stock Assets",
                startup: "Free/Standard",
                growth: "Standard",
                scale: "Premium Stock",
                enterprise: "Premium + AI Gen",
            },
            {
                feature: "Communication",
                startup: "Trello Board",
                growth: "Trello + Email",
                scale: "Trello + Slack",
                enterprise: "Slack + Zoom Calls",
            },
        ],
    },
]

function Cell({ value, highlight = false }: { value: string | boolean; highlight?: boolean }) {
    if (typeof value === "boolean") {
        return (
            <div className="flex justify-center">
                {value ? (
                    <Check className="h-5 w-5 text-primary" />
                ) : (
                    <span className="text-muted-foreground/30">—</span>
                )}
            </div>
        )
    }
    return (
        <span
            className={cn(
                "text-sm",
                highlight ? "text-primary font-bold" : "text-muted-foreground"
            )}
        >
            {value}
        </span>
    )
}

interface DetailedComparisonProps {
    isOpen: boolean
    frequency: string
}

export function DetailedComparison({ isOpen, frequency }: DetailedComparisonProps) {
    const isYearly = frequency === "yearly"

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.section
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-background"
                >
                    <div className="container mx-auto px-4 md:px-12 py-12">
                        <div className="text-center mb-10">
                            <SectionHeading
                                badge="Comparison"
                                title="Compare Plans in Detail"
                                description="See exactly what's included in each package to find the perfect fit for your brand."
                                align="center"
                            />
                        </div>

                        <div className="relative w-full overflow-auto rounded-lg border shadow-sm">
                            <table className="w-full caption-bottom text-sm text-left">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                                        <th className="h-auto py-8 px-4 text-left align-middle font-medium text-muted-foreground w-[250px] sticky left-0 z-30 bg-background border-r">
                                            <span className="sr-only">Features</span>
                                        </th>
                                        <th className="h-auto py-8 px-4 text-center align-middle font-medium text-muted-foreground min-w-[150px] z-20 bg-background">
                                            <div className="font-bold text-lg text-foreground">Startup</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$24/mo" : "$60/mo"}
                                            </div>
                                        </th>
                                        <th className="h-auto py-8 px-4 text-center align-middle font-medium text-muted-foreground min-w-[150px] z-20 bg-background">
                                            <div className="font-bold text-lg text-foreground">Growth</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$59/mo" : "$149/mo"}
                                            </div>
                                        </th>
                                        <th className="h-auto py-8 px-4 text-center align-middle font-medium text-muted-foreground min-w-[150px] z-20 bg-background">
                                            <div className="font-bold text-lg text-foreground">Scale</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$119/mo" : "$299/mo"}
                                            </div>
                                        </th>
                                        <th className="h-auto py-8 px-4 text-center align-middle font-medium text-muted-foreground min-w-[150px] z-20 bg-background">
                                            <div className="font-bold text-lg text-foreground">Enterprise</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$199/mo" : "$499/mo"}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {comparisonData.map((section, sectionIndex) => (
                                        <React.Fragment key={section.title}>
                                            <tr className="border-b bg-muted/50 transition-colors data-[state=selected]:bg-muted">
                                                <td colSpan={5} className="p-4 align-middle font-bold text-xs uppercase tracking-wider text-primary sticky left-0 z-10 bg-muted/50 border-r-0">
                                                    {section.title}
                                                </td>
                                            </tr>
                                            {section.rows.map((row, rowIndex) => (
                                                <tr
                                                    key={row.feature}
                                                    className="border-b transition-colors data-[state=selected]:bg-muted group"
                                                >
                                                    <td className="p-4 align-middle font-medium sticky left-0 z-10 bg-background border-r text-muted-foreground group-hover:bg-muted/5 transition-colors">
                                                        <div className="flex items-center gap-2">
                                                            {row.feature}
                                                            {row.tooltip && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <HelpCircle className="h-3 w-3 text-muted-foreground/50 hover:text-muted-foreground transition-colors" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p className="max-w-xs">{row.tooltip}</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 align-middle text-center bg-background group-hover:bg-muted/5 transition-colors">
                                                        <Cell value={row.startup} />
                                                    </td>
                                                    <td className="p-4 align-middle text-center bg-background group-hover:bg-muted/5 transition-colors">
                                                        <Cell value={row.growth} highlight={typeof row.growth === 'string'} />
                                                    </td>
                                                    <td className="p-4 align-middle text-center bg-background group-hover:bg-muted/5 transition-colors">
                                                        <Cell value={row.scale} highlight={typeof row.scale === 'string'} />
                                                    </td>
                                                    <td className="p-4 align-middle text-center bg-background group-hover:bg-muted/5 transition-colors">
                                                        <Cell value={row.enterprise} highlight={typeof row.enterprise === 'string'} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.section>
            )}
        </AnimatePresence>
    )
}
