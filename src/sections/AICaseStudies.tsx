import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StoryModal } from "@/components/ui/story-modal";
import { ButtonLabel } from "@/components/ui/button-label";
import { Link } from "react-router-dom";
import { useState } from "react";

const caseStudies = [
    {
        name: "GIGI Laurent | AI Campaign",
        description: "Product-only imagery transformed into model visuals, social ads, and AI video campaign assets.",
        details: "A full AI-assisted launch package that turned simple product references into editorial campaign scenes, model-led visuals, and social-ready ad creative.",
        deliverables: ["AI campaign visuals", "Model imagery", "Social ads", "Video assets"],
        bgClass: "bg-gradient-to-br from-rose-100 to-cyan-100 dark:from-rose-950 dark:to-cyan-950",
        image: "/portfolio/gigi-laurent/hero.webp",
        href: "/portfolio/gigi-laurent"
    },
    {
        name: "Fizz Bliss | Product Imagery",
        description: "Dynamic, engaging AI-generated product imagery to amplify a new functional beverage launch.",
        details: "A versatile image set for a beverage brand, built to cover studio, lifestyle, and social contexts while keeping the product bright, crisp, and launch-ready.",
        deliverables: ["Product renders", "Lifestyle scenes", "Flat lays", "Social assets"],
        bgClass: "bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950 dark:to-orange-900",
        image: "/portfolio/fizzbliss/dynamic-studio-pro_2760836823.avif",
        href: "/portfolio/fizzbliss"
    },
    {
        name: "Mondly SaaS | AI Product Build",
        description: "AI-assisted SaaS design and development covering UI/UX, dashboard systems, backend coding, database setup, and launch.",
        details: "A practical SaaS build shaped around product clarity, dashboard usability, and a launch path that moved from design decisions into working implementation.",
        deliverables: ["SaaS UI/UX", "Dashboard design", "Backend setup", "Database setup"],
        bgClass: "bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-950 dark:to-emerald-950",
        image: "/portfolio/mondly-saas/hero.avif",
        href: "/portfolio/mondly-saas"
    },
    {
        name: "Custom AI Models",
        description: "Fine-tuning localized AI models to consistently maintain brand voice and aesthetic identity.",
        details: "A brand-specific AI workflow designed to keep creative output consistent across campaigns, reducing visual drift while improving speed for recurring production needs.",
        deliverables: ["Model direction", "Style tuning", "Prompt system", "Creative QA"],
        bgClass: "bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950 dark:to-purple-900",
        image: null,
        href: "#"
    },
];

export function AICaseStudies() {
    const [activeModalUrl, setActiveModalUrl] = useState<string | null>(null);

    return (
        <section className="py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto" id="ai-case-studies">
            <div className="flex flex-col items-center mb-16 text-center gap-6">
                <SectionHeading
                    badge="Case Studies"
                    title="Real projects. Real results."
                    description="See how we used AI to ship these."
                    align="center"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 md:gap-8">
                {caseStudies.map((study, idx) => (
                    <div key={idx} className="group grid w-full cursor-pointer overflow-hidden rounded-[5px] border border-[#3ca2fa]/20 bg-card shadow-sm transition-all duration-300 hover:border-[#3ca2fa]/70 hover:bg-[#3ca2fa]/[0.06] hover:shadow-lg hover:shadow-[#3ca2fa]/10 md:grid-cols-[minmax(280px,42%)_1fr]">
                        <div className={`relative min-h-[260px] w-full overflow-hidden border-b border-[#3ca2fa]/20 ${study.bgClass} flex items-center justify-center shadow-sm md:h-full md:border-b-0 md:border-r`}>
                            {study.image ? (
                                <img src={study.image} alt={study.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                            ) : (
                                <span className="p-6 text-sm font-semibold uppercase text-[#3ca2fa]/60">Case Study #{idx + 1}</span>
                            )}
                            
                            {/* "Quick View" and "Detailed View" card arising from the bottom (chin) */}
                            <div className="portfolio-card-reveal w-[90%] mx-auto mb-4">
                                <div className="bg-background/80 backdrop-blur-xl border border-[#3ca2fa]/20 shadow-xl rounded-[5px] p-1.5 flex items-center justify-between gap-1.5">
                                     <button 
                                         onClick={(e) => {
                                             e.preventDefault();
                                             e.stopPropagation();
                                             if (study.href.startsWith("/portfolio/")) {
                                                 setActiveModalUrl(`${study.href}?modal=true`);
                                             }
                                         }}
                                         disabled={!study.href.startsWith("/portfolio/")}
                                         className="group/button flex-1 rounded-[6px] py-2 text-center text-sm font-semibold text-foreground transition-colors hover:bg-[#3ca2fa]/10 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
                                     >
                                         <ButtonLabel>Quick View</ButtonLabel>
                                     </button>
                                    <Link 
                                        to={study.href} 
                                        className="group/button flex-1 rounded-[6px] bg-[#3ca2fa] py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#258bd8]"
                                    >
                                        <ButtonLabel>Detailed View</ButtonLabel>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center gap-5 p-6 md:p-8">
                            <div className="flex flex-col gap-2">
                                <h3 className="text-2xl font-bold leading-tight transition-colors group-hover:text-[#3ca2fa] md:text-3xl">
                                    {study.name}
                                </h3>
                                <p className="text-base font-medium text-foreground/80 leading-relaxed">
                                    {study.description}
                                </p>
                            </div>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {study.details}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                <span className="w-full text-xs font-semibold uppercase text-muted-foreground sm:w-auto sm:py-1.5">
                                    Deliverables
                                </span>
                                {study.deliverables.map((deliverable) => (
                                    <span
                                        key={deliverable}
                                        className="rounded-[5px] border border-[#3ca2fa]/25 bg-[#3ca2fa]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#176da8] transition-colors group-hover:border-[#3ca2fa]/70 group-hover:bg-[#3ca2fa]/15 dark:text-[#7cccff]"
                                    >
                                        {deliverable}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 flex justify-center">
                <a
                    href="#"
                    className="group/button inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                >
                    <ButtonLabel>
                        View All Case Studies <ArrowRight className="h-4 w-4" />
                    </ButtonLabel>
                </a>
            </div>

            <StoryModal
                url={activeModalUrl}
                title="Case Study Quick View"
                onClose={() => setActiveModalUrl(null)}
            />
        </section>
    );
}
