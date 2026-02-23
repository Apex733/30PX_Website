import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const timelineData = [
    {
        day: "Welcome",
        title: "Get started.",
        accent: "from-violet-500 to-purple-500",
        markerBg: "bg-violet-500",
        markerText: "text-white",
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
        items: [
            "Dozens of high-quality assets delivered",
            "Consistent brand presence scaled effortlessly",
            "Pause or renew based on your needs",
        ],
    },
];

export function JourneyTimeline() {
    return (
        <section className="py-12 md:py-16 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col items-center mb-16 text-center gap-6">
                <SectionHeading
                    badge="Your Journey"
                    title="Here's what you can expect from 30PX in your first 30 days."
                    description="Great design shouldn't take months to deliver."
                    align="center"
                />
                <a
                    href="/#pricing"
                    className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-8 py-3 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                >
                    Start your subscription <ArrowRight className="h-4 w-4" />
                </a>
            </div>

            <div className="relative mt-20">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-[14px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-violet-300 via-purple-300 to-indigo-300" />

                {/* Connecting Line (Mobile) */}
                <div className="lg:hidden absolute top-[14px] bottom-0 left-[26px] w-[2px] bg-gradient-to-b from-violet-300 via-purple-300 to-indigo-300" />

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between relative">
                    {timelineData.map((node, index) => (
                        <div key={index} className="flex flex-col lg:w-1/3 z-10 relative group">
                            {/* Marker */}
                            <div className="flex items-center lg:justify-center mb-8 relative">
                                <span className={`${node.markerBg} ${node.markerText} text-sm font-semibold px-5 py-2 rounded-full z-10 shrink-0 shadow-md`}>
                                    {node.day}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="relative bg-card border border-border/50 rounded-[14px] overflow-hidden h-full ml-12 lg:ml-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                {/* Gradient accent bar */}
                                <div className={`h-1.5 w-full bg-gradient-to-r ${node.accent}`} />

                                <div className="p-8">
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
        </section>
    );
}
