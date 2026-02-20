import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";

const timelineData = [
    {
        day: "Welcome",
        title: "Get started.",
        items: [
            "Subscribe and access your portal in minutes",
            "Submit your first design request",
            "Match with your dedicated designer",
        ],
    },
    {
        day: "Day 3",
        title: "See results.",
        items: [
            "Receive your first designs in 24-48 hours",
            "Request unlimited revisions easily",
            "Approve and get all source files",
        ],
    },
    {
        day: "Day 30",
        title: "Ask why you didn't switch years ago.",
        items: [
            "Dozens of high-quality assets delivered",
            "Consistent brand presence scaled effortlessly",
            "Pause or renew based on your needs",
        ],
    },
];

export function JourneyTimeline() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
            <div className="flex flex-col items-center mb-16 text-center">
                <SectionHeading
                    badge="Your Journey"
                    title="Here's what you can expect from 30PX in your first 30 days."
                    description="Great design shouldn't take months to deliver."
                    align="center"
                />
                <a href="#pricing" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
                    Start your subscription <ArrowRight className="ml-1 h-4 w-4" />
                </a>
            </div>

            <div className="relative mt-20">
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-[14px] left-[15%] right-[15%] h-[2px] bg-neutral-200 dark:bg-neutral-800" />

                {/* Connecting Line (Mobile) */}
                <div className="lg:hidden absolute top-[14px] bottom-0 left-[26px] w-[2px] bg-neutral-200 dark:bg-neutral-800" />

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 justify-between relative">
                    {timelineData.map((node, index) => (
                        <div key={index} className="flex flex-col lg:w-1/3 z-10 relative">
                            {/* Marker */}
                            <div className="flex items-center lg:justify-center mb-8 relative">
                                <span className="bg-background border-2 border-neutral-200 dark:border-neutral-800 text-sm font-medium px-4 py-1.5 rounded-full z-10 shrink-0">
                                    {node.day}
                                </span>
                            </div>

                            {/* Card Content */}
                            <div className="bg-card border border-border/50 shadow-sm rounded-[14px] p-8 h-full hover:shadow-md transition-shadow duration-300 ml-12 lg:ml-0">
                                <h3 className="text-xl font-semibold mb-6 tracking-tight">{node.title}</h3>
                                <ul className="space-y-4">
                                    {node.items.map((item, itemIndex) => (
                                        <li key={itemIndex} className="flex items-start gap-3 text-muted-foreground">
                                            <Check className="h-5 w-5 shrink-0 text-muted-foreground/50 mt-0.5" />
                                            <span className="text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
