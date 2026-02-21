import { SectionHeading } from "@/components/ui/section-heading";
import {
    Palette,
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
} from "lucide-react";

const serviceGroups = [
    {
        category: "Creative Design",
        accent: "from-violet-500 to-purple-500",
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
    return (
        <section className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 md:px-12 max-w-7xl">
                <SectionHeading
                    badge="Services"
                    title="Everything your brand needs. One subscription."
                    description="From social posts to full websites — we cover every design discipline."
                    align="center"
                />

                <div className="mt-16 space-y-12">
                    {serviceGroups.map((group) => (
                        <div key={group.category}>
                            {/* Category Header */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${group.accent}`} />
                                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                                    {group.category}
                                </h3>
                            </div>

                            {/* Service Cards Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {group.services.map((service) => {
                                    const Icon = service.icon;
                                    return (
                                        <div
                                            key={service.name}
                                            className="group relative bg-card border border-border/50 rounded-[14px] p-5 flex flex-col items-center gap-3 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-default"
                                        >
                                            {/* Subtle gradient glow on hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${group.accent} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300`} />

                                            <div className={`relative p-3 rounded-xl ${group.iconBg} transition-all duration-300 group-hover:scale-110`}>
                                                <Icon className={`h-6 w-6 ${group.iconColor}`} strokeWidth={1.5} />
                                            </div>
                                            <span className="relative text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                                                {service.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
