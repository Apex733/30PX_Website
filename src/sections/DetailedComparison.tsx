import { SectionHeading } from "@/components/ui/section-heading";
"use client";

import React from "react";
import { Check, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ComparisonRow {
    feature: string;
    tooltip?: string;
    startup: string | boolean;
    growth: string | boolean;
    scale: string | boolean;
    enterprise: string | boolean;
}

interface ComparisonSection {
    title: string;
    rows: ComparisonRow[];
}

const comparisonData: ComparisonSection[] = [
    {
        title: "Workflow & Delivery",
        rows: [
            {
                feature: "Design output",
                startup: "30 designs / month",
                growth: "Unlimited",
                scale: "Unlimited",
                enterprise: "Unlimited",
            },
            {
                feature: "Delivery model",
                tooltip: "How work is queued and delivered during the subscription.",
                startup: "1 per day or batch",
                growth: "Unlimited queue",
                scale: "Unlimited + video",
                enterprise: "Priority queue",
            },
            {
                feature: "Turnaround time",
                startup: "48 Hours",
                growth: "24-48 Hours",
                scale: "24-48 Hours",
                enterprise: "Same Day Priority",
            },
            {
                feature: "Unlimited revisions",
                startup: true,
                growth: true,
                scale: true,
                enterprise: true,
            },
        ],
    },
    {
        title: "Design Coverage",
        rows: [
            {
                feature: "Social media design",
                startup: true,
                growth: true,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Ad creatives & banners",
                startup: false,
                growth: true,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Flyers & basic print",
                startup: false,
                growth: true,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Full vector logos",
                startup: false,
                growth: false,
                scale: true,
                enterprise: true,
            },
            {
                feature: "UI design",
                startup: false,
                growth: false,
                scale: "Figma / XD",
                enterprise: "Included",
            },
        ],
    },
    {
        title: "Video & Motion",
        rows: [
            {
                feature: "Short-form video edits",
                startup: false,
                growth: false,
                scale: "8 / month",
                enterprise: "12 / month",
            },
            {
                feature: "Motion graphics",
                startup: false,
                growth: false,
                scale: true,
                enterprise: true,
            },
            {
                feature: "Long-form video",
                startup: false,
                growth: false,
                scale: false,
                enterprise: "Included",
            },
        ],
    },
    {
        title: "Support & Handoff",
        rows: [
            {
                feature: "Dedicated support",
                startup: false,
                growth: false,
                scale: false,
                enterprise: true,
            },
            {
                feature: "Slack + Zoom calls",
                startup: false,
                growth: false,
                scale: false,
                enterprise: true,
            },
            {
                feature: "Custom AI models & voice clones",
                startup: false,
                growth: false,
                scale: false,
                enterprise: true,
            },
            {
                feature: "WordPress / Framer development",
                startup: false,
                growth: false,
                scale: false,
                enterprise: true,
            },
            {
                feature: "Source files included",
                startup: "PNG / JPG",
                growth: true,
                scale: true,
                enterprise: true,
            },
        ],
    },
];

function Cell({ value, highlight = false }: { value: string | boolean; highlight?: boolean }) {
    if (typeof value === "boolean") {
        return (
            <div className="flex justify-center">
                {value ? (
                    <Check className="h-5 w-5 text-primary" />
                ) : (
                    <span className="text-muted-foreground/30">-</span>
                )}
            </div>
        );
    }

    return (
        <span
            className={cn(
                "text-sm",
                highlight ? "font-bold text-primary" : "text-muted-foreground"
            )}
        >
            {value}
        </span>
    );
}

interface DetailedComparisonProps {
    isOpen: boolean;
    frequency: string;
}

export function DetailedComparison({ isOpen, frequency }: DetailedComparisonProps) {
    const isYearly = frequency === "yearly";

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
                    <div className="container mx-auto px-4 py-12 md:px-12">
                        <div className="mb-10 text-center">
                            <SectionHeading
                                badge="Comparison"
                                title="Compare Plans in Detail"
                                description="See exactly what changes as you move from social-only support to full enterprise creative coverage."
                                align="center"
                            />
                        </div>

                        <div className="relative w-full overflow-auto rounded-[5px] border shadow-sm">
                            <table className="w-full caption-bottom text-left text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                                        <th className="sticky left-0 z-30 h-auto w-[250px] border-r bg-background px-4 py-8 text-left align-middle font-medium text-muted-foreground">
                                            <span className="sr-only">Features</span>
                                        </th>
                                        <th className="z-20 h-auto min-w-[150px] bg-background px-4 py-8 text-center align-middle font-medium text-muted-foreground">
                                            <div className="text-lg font-bold text-foreground">Social Media</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$24/mo" : "$60/mo"}
                                            </div>
                                        </th>
                                        <th className="z-20 h-auto min-w-[150px] bg-background px-4 py-8 text-center align-middle font-medium text-muted-foreground">
                                            <div className="text-lg font-bold text-foreground">Growth</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$59/mo" : "$149/mo"}
                                            </div>
                                        </th>
                                        <th className="z-20 h-auto min-w-[150px] bg-background px-4 py-8 text-center align-middle font-medium text-muted-foreground">
                                            <div className="text-lg font-bold text-foreground">Scale</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$119/mo" : "$299/mo"}
                                            </div>
                                        </th>
                                        <th className="z-20 h-auto min-w-[150px] bg-background px-4 py-8 text-center align-middle font-medium text-muted-foreground">
                                            <div className="text-lg font-bold text-foreground">Enterprise</div>
                                            <div className="text-sm font-normal text-muted-foreground">
                                                {isYearly ? "$199/mo" : "$499/mo"}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {comparisonData.map((section) => (
                                        <React.Fragment key={section.title}>
                                            <tr className="border-b bg-muted/50 transition-colors data-[state=selected]:bg-muted">
                                                <td
                                                    colSpan={5}
                                                    className="sticky left-0 z-10 border-r-0 bg-muted/50 p-4 align-middle text-xs font-bold uppercase tracking-wider text-primary"
                                                >
                                                    {section.title}
                                                </td>
                                            </tr>
                                            {section.rows.map((row) => (
                                                <tr
                                                    key={row.feature}
                                                    className="group border-b transition-colors data-[state=selected]:bg-muted"
                                                >
                                                    <td className="sticky left-0 z-10 border-r bg-background p-4 align-middle font-medium text-muted-foreground transition-colors group-hover:bg-muted/5">
                                                        <div className="flex items-center gap-2">
                                                            {row.feature}
                                                            {row.tooltip && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <HelpCircle className="h-3 w-3 text-muted-foreground/50 transition-colors hover:text-muted-foreground" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p className="max-w-xs">{row.tooltip}</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="bg-background p-4 text-center align-middle transition-colors group-hover:bg-muted/5">
                                                        <Cell value={row.startup} />
                                                    </td>
                                                    <td className="bg-background p-4 text-center align-middle transition-colors group-hover:bg-muted/5">
                                                        <Cell value={row.growth} highlight={typeof row.growth === "string"} />
                                                    </td>
                                                    <td className="bg-background p-4 text-center align-middle transition-colors group-hover:bg-muted/5">
                                                        <Cell value={row.scale} highlight={typeof row.scale === "string"} />
                                                    </td>
                                                    <td className="bg-background p-4 text-center align-middle transition-colors group-hover:bg-muted/5">
                                                        <Cell value={row.enterprise} highlight={typeof row.enterprise === "string"} />
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
    );
}
