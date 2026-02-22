import { SectionHeading } from "@/components/ui/section-heading";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Share2,
    Presentation,
    PenTool,
    Hexagon,
    Stamp,
    Mail,
    BookOpen,
    Printer,
    Package,
    Layout,
    Globe,
    Code,
    Film,
    Sparkles,
    Box,
    Wand2,
    Cpu,
    TrendingUp,
    Users,
    Megaphone,
    ChevronDown,
} from "lucide-react";

const serviceGroups = [
    {
        category: "Creative Design",
        accent: "from-violet-500 to-purple-500",
        headerBg: "bg-violet-50/70",
        headerText: "text-violet-700",
        headerChevron: "text-violet-400",
        countBg: "bg-violet-100 text-violet-600",
        iconBg: "bg-violet-50",
        iconColor: "text-violet-500",
        services: [
            { name: "Social Media", icon: Share2 },
            { name: "Presentations", icon: Presentation },
            { name: "Illustrations", icon: PenTool },
            { name: "Logo Design", icon: Hexagon },
            { name: "Branding", icon: Stamp },
            { name: "Email Design", icon: Mail },
            { name: "eBook & Reports", icon: BookOpen },
            { name: "Print Design", icon: Printer },
            { name: "Packaging & Merch", icon: Package },
        ],
    },
    {
        category: "Digital Experience",
        accent: "from-blue-500 to-cyan-500",
        headerBg: "bg-blue-50/70",
        headerText: "text-blue-700",
        headerChevron: "text-blue-400",
        countBg: "bg-blue-100 text-blue-600",
        iconBg: "bg-blue-50",
        iconColor: "text-blue-500",
        services: [
            { name: "UX/UI & Product", icon: Layout },
            { name: "Web Design", icon: Globe },
            { name: "Web Development", icon: Code },
        ],
    },
    {
        category: "Motion & Immersive",
        accent: "from-pink-500 to-rose-500",
        headerBg: "bg-pink-50/70",
        headerText: "text-pink-700",
        headerChevron: "text-pink-400",
        countBg: "bg-pink-100 text-pink-600",
        iconBg: "bg-pink-50",
        iconColor: "text-pink-500",
        services: [
            { name: "Video Editing", icon: Film },
            { name: "Motion Design", icon: Sparkles },
            { name: "3D Design", icon: Box },
        ],
    },
    {
        category: "AI Services",
        accent: "from-amber-500 to-orange-500",
        headerBg: "bg-amber-50/70",
        headerText: "text-amber-700",
        headerChevron: "text-amber-400",
        countBg: "bg-amber-100 text-amber-600",
        iconBg: "bg-amber-50",
        iconColor: "text-amber-500",
        services: [
            { name: "AI Creative", icon: Wand2 },
            { name: "AI Solutions", icon: Cpu },
        ],
    },
    {
        category: "Marketing & Growth",
        accent: "from-emerald-500 to-teal-500",
        headerBg: "bg-emerald-50/70",
        headerText: "text-emerald-700",
        headerChevron: "text-emerald-400",
        countBg: "bg-emerald-100 text-emerald-600",
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-500",
        services: [
            { name: "Strategy & SEO", icon: TrendingUp },
            { name: "Social Media Mgmt", icon: Users },
            { name: "Paid Ads", icon: Megaphone },
        ],
    },
];

export function OurServices() {
    const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

    const toggle = (category: string) => {
        setOpenCategories((prev) => {
            const next = new Set(prev);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }
            return next;
        });
    };

    return (
        <section className="py-16 md:py-24 bg-background" id="services">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                <SectionHeading
                    badge="Services"
                    title="Everything your brand needs. One subscription."
                    description="From social posts to full websites — we cover every design discipline."
                    align="center"
                />

                <div className="mt-16 space-y-4">
                    {serviceGroups.map((group, index) => {
                        const isOpen = openCategories.has(group.category);
                        const isLast = index === serviceGroups.length - 1;

                        return (
                            <div key={group.category}>
                                {/* Category Header — Clickable */}
                                <button
                                    onClick={() => toggle(group.category)}
                                    className={`w-full flex items-center justify-between px-5 py-4 rounded-xl group cursor-pointer transition-all duration-200 ${group.headerBg} hover:shadow-sm`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`h-2.5 w-2.5 rounded-full bg-gradient-to-r ${group.accent}`} />
                                        <h3 className={`text-base font-semibold ${group.headerText} transition-colors`}>
                                            {group.category}
                                        </h3>
                                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${group.countBg}`}>
                                            {group.services.length}
                                        </span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <ChevronDown className={`h-5 w-5 ${group.headerChevron} transition-colors`} />
                                    </motion.div>
                                </button>

                                {/* Collapsible Service Cards */}
                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-6">
                                                {group.services.map((service) => {
                                                    const Icon = service.icon;
                                                    return (
                                                        <div
                                                            key={service.name}
                                                            className="group/card relative bg-card border border-border/50 rounded-[14px] p-5 flex flex-col items-center gap-3 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default"
                                                        >
                                                            {/* Subtle gradient glow on hover */}
                                                            <div className={`absolute inset-0 bg-gradient-to-br ${group.accent} opacity-0 group-hover/card:opacity-[0.04] transition-opacity duration-300`} />

                                                            <div className={`relative p-3 rounded-xl ${group.iconBg} transition-all duration-300 group-hover/card:scale-110`}>
                                                                <Icon className={`h-6 w-6 ${group.iconColor}`} strokeWidth={1.5} />
                                                            </div>
                                                            <span className="relative text-sm font-medium text-foreground/80 group-hover/card:text-foreground transition-colors">
                                                                {service.name}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Separator line */}
                                {!isLast && (
                                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
