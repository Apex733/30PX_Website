import type { MouseEvent } from "react";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const timelineData = [
    {
        day: "Welcome",
        title: "Get started.",
        accent: "from-violet-500 to-purple-500",
        markerBg: "bg-violet-500",
        markerText: "text-white",
        cardBg: "bg-violet-500/[0.04]",
        cardBorder: "border-violet-500/20",
        items: [
            "Subscribe and access your portal in minutes",
            "Submit your first design request",
            "Match with your dedicated designer",
        ],
    },
    {
        day: "Day 3",
        title: "See results.",
        accent: "from-purple-500 to-indigo-500",
        markerBg: "bg-purple-500",
        markerText: "text-white",
        cardBg: "bg-purple-500/[0.04]",
        cardBorder: "border-purple-500/20",
        items: [
            "Receive your first designs in 24-48 hours",
            "Request unlimited revisions easily",
            "Approve and get all source files",
        ],
    },
    {
        day: "Day 30",
        title: "Ask why you didn't switch years ago.",
        accent: "from-indigo-500 to-blue-500",
        markerBg: "bg-indigo-500",
        markerText: "text-white",
        cardBg: "bg-indigo-500/[0.04]",
        cardBorder: "border-indigo-500/20",
        items: [
            "Dozens of high-quality assets delivered",
            "Consistent brand presence scaled effortlessly",
            "Pause or renew based on your needs",
        ],
    },
];

export function JourneyTimeline() {
    const isModal = typeof window !== 'undefined' && window.location.search.includes('modal=true');
    if (isModal) return null;

    const handlePricingClick = (event: MouseEvent<HTMLAnchorElement>) => {
        const pricingSection = document.getElementById("pricing");

        if (!pricingSection) {
            return;
        }

        event.preventDefault();
        pricingSection.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col items-center mb-12 text-center gap-6">
                <SectionHeading
                    badge="Your Journey"
                    title="From zero to full creative pipeline in 30 days."
                    description="Most agencies take weeks to onboard. We take minutes. Here is what that looks like."
                    align="center"
                />
            </div>

            <div className="relative">
                {/* Labeled Header Strip Parent Wrapper */}
                <div className="border border-border/60 bg-card rounded-[5px] overflow-hidden shadow-sm">
                    {/* Header Strip */}
                    <div className="flex items-center justify-between px-6 py-4 bg-muted/40 border-b border-border/60">
                        <h2 className="text-sm font-semibold tracking-tight text-foreground">Process Timeline</h2>
                        <span className="text-xs font-semibold tracking-wide text-muted-foreground bg-secondary px-3 py-1 rounded-full border border-border/60">
                            First 30 Days
                        </span>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                            {timelineData.map((node, index) => (
                                <div key={index} className="flex flex-col z-10 relative group h-full">
                                    {/* Card Content */}
                                    <div className={`relative ${node.cardBg} border ${node.cardBorder} rounded-[5px] overflow-hidden h-full shadow-sm`}>

                                        <div className="p-8">
                                            <div className="mb-4">
                                                <span className={`${node.markerBg} ${node.markerText} text-xs font-bold tracking-wide uppercase px-3 py-1.5 rounded-full shadow-sm inline-block`}>
                                                    {node.day}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-6 tracking-tight">{node.title}</h3>
                                            <ul className="space-y-4">
                                                {node.items.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-start gap-3">
                                                        <div className={`p-0.5 rounded-full bg-gradient-to-br ${node.accent} shrink-0 mt-0.5`}>
                                                            <Check className="h-4 w-4 text-white" />
                                                        </div>
                                                        <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 flex justify-center">
                <a
                    href="/pricing"
                    onClick={handlePricingClick}
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                    Start your subscription <ArrowRight className="h-4 w-4" />
                </a>
            </div>
        </section>
    );
}
