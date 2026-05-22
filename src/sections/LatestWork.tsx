import { SectionHeading } from "@/components/ui/section-heading";
import { StoryModal } from "@/components/ui/story-modal";
import { ButtonLabel } from "@/components/ui/button-label";
import { useState } from "react";
import { Link } from "react-router-dom";

export const portfolioProjects = [
    {
        name: "GIGI Laurent | AI Campaign",
        description: "Product-only imagery transformed into model visuals, social ads, and AI video campaign assets.",
        details: "We built a campaign system around product-only references, creating polished model-led visuals and launch-ready social assets while keeping the product as the hero across every format.",
        deliverables: ["AI model visuals", "Social ad set", "Campaign art direction", "Video assets"],
        image: "/portfolio/gigi-laurent/hero.webp",
        href: "/portfolio/gigi-laurent"
    },
    {
        name: "Mondly SaaS | AI Product Build",
        description: "AI-assisted SaaS design and development covering UI/UX, dashboard systems, backend coding, database setup, and launch.",
        details: "A full product build from interface strategy to launch support, shaped around clear dashboards, scalable product flows, and a clean SaaS experience for end users.",
        deliverables: ["Product UI/UX", "Dashboard system", "Backend build", "Launch support"],
        image: "/portfolio/mondly-saas/hero.avif",
        href: "/portfolio/mondly-saas"
    },
    {
        name: "LoudMinds Complete Branding",
        description: "Modern visual identity and scalable design system tailored for a creative agency.",
        details: "We developed a flexible identity with bold visuals, usable brand rules, and a design language that can stretch across digital, social, and presentation touchpoints.",
        deliverables: ["Brand identity", "Logo system", "Visual direction", "Brand assets"],
        image: "/portfolio/loudminds/22.webp",
        href: "/portfolio/loudminds"
    },
    {
        name: "GhostTongue Complete Branding",
        description: "Mobile application interface designed to provide seamless language learning experiences.",
        details: "A characterful brand and product presence for a language-focused experience, pairing app-facing visuals with real-world collateral and a memorable identity system.",
        deliverables: ["App visual system", "Packaging", "Print assets", "Brand collateral"],
        image: "/portfolio/ghosttongue/post.avif",
        href: "/portfolio/ghosttongue"
    },
    {
        name: "Fizz Bliss | Product Imagery",
        description: "Dynamic, engaging AI-generated product imagery to amplify a new functional beverage launch.",
        details: "We created energetic beverage visuals built for fast campaign testing, giving the brand a broad set of product scenes without a traditional studio production timeline.",
        deliverables: ["Product imagery", "Lifestyle scenes", "Social creatives", "Launch visuals"],
        image: "/portfolio/fizzbliss/dynamic-studio-pro_2760836823.avif",
        href: "/portfolio/fizzbliss"
    },
    {
        name: "Vitavibe Campaign",
        description: "High-energy social media promotional campaign assets optimized for conversion.",
        details: "A punchy campaign direction for a wellness product line, designed to make product benefits easy to scan while keeping the visual system sharp and campaign-ready.",
        deliverables: ["Social campaign", "Product mockups", "Promotional assets", "Conversion visuals"],
        image: "/portfolio/vitavibe/PILLS-BOTTLE_mockup_v.webp",
        href: "/portfolio/vitavibe"
    },
];

interface LatestWorkProps {
    layout?: "grid" | "wide";
}

export function LatestWork({ layout = "grid" }: LatestWorkProps) {
    const [activeModalUrl, setActiveModalUrl] = useState<string | null>(null);
    const isWide = layout === "wide";

    return (
        <section className={`${isWide ? "pt-6 pb-16 md:pt-8 md:pb-24" : "py-16 md:py-24"} px-6 md:px-12 max-w-7xl mx-auto`} id="featured-work">
            {isWide ? (
                <>
                    <div className="mx-auto mb-10 flex max-w-4xl flex-col items-center gap-5 text-center md:mb-14">
                        <span className="website-pill">Featured Work</span>
                        <h1 className="text-4xl font-bold leading-tight tracking-normal md:text-6xl">
                            Branding, web design, product design, and AI campaign work.
                        </h1>
                        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
                            A focused 30PX portfolio of shipped client projects across brand identity, SaaS UI/UX, product imagery, social media campaigns, AI-generated launch visuals, and conversion-ready creative assets.
                        </p>
                        <p className="max-w-3xl text-base leading-relaxed text-muted-foreground">
                            Each case study shows the strategy, creative direction, deliverables, and finished work behind real campaigns, giving founders and marketing teams a clearer look at how our design process moves from idea to production.
                        </p>
                    </div>

                </>
            ) : (
                <div className="flex flex-col items-center mb-16 text-center gap-6">
                    <SectionHeading
                        badge="Featured Work"
                        title="Proof, not padding."
                        description="A tighter mix of branding, product design, and AI-assisted campaigns for real clients."
                        align="center"
                    />
                </div>
            )}

            <div className={isWide ? "grid grid-cols-1 gap-6 md:gap-8" : "grid grid-cols-1 md:grid-cols-2 gap-8"}>
                {portfolioProjects.map((project, idx) => (
                    <div
                        key={idx}
                        className={
                            isWide
                                ? "group grid w-full cursor-pointer overflow-hidden rounded-[5px] border border-[#3ca2fa]/20 bg-card shadow-sm transition-colors duration-300 hover:border-[#3ca2fa]/70 hover:bg-[#3ca2fa]/[0.06] md:grid-cols-[minmax(280px,42%)_1fr]"
                                : "group flex cursor-pointer flex-col gap-5 rounded-[5px] border border-[#3ca2fa]/20 bg-[#3ca2fa]/[0.06] p-5 shadow-sm transition-colors hover:bg-[#3ca2fa]/[0.10]"
                        }
                    >
                        <div className={isWide ? "relative min-h-[260px] w-full overflow-hidden border-b border-[#3ca2fa]/20 shadow-sm md:h-full md:border-b-0 md:border-r" : "relative aspect-[4/3] w-full overflow-hidden rounded-[5px] border border-[#3ca2fa]/25 shadow-sm"}>
                            <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />

                            <div className="portfolio-card-reveal">
                                <div className="flex w-full items-center justify-between gap-1.5 rounded-[5px] border border-[#3ca2fa]/18 bg-background/95 p-1.5 shadow-xl">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setActiveModalUrl(`${project.href}?modal=true`);
                                        }}
                                        className="group/button flex-1 rounded-[6px] py-2 text-center text-sm font-semibold text-foreground transition-colors hover:bg-[#3ca2fa]/10"
                                    >
                                        <ButtonLabel>Quick View</ButtonLabel>
                                    </button>
                                    <Link 
                                        to={project.href} 
                                        className="group/button flex-1 rounded-[6px] bg-[#3ca2fa] py-2 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#258bd8]"
                                    >
                                        <ButtonLabel>Detailed View</ButtonLabel>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={isWide ? "flex flex-col justify-center gap-5 p-6 md:p-8" : "flex flex-col gap-2 px-1"}>
                            <div className="flex flex-col gap-2">
                                <h3 className={isWide ? "text-2xl font-bold leading-tight transition-colors group-hover:text-[#3ca2fa] md:text-3xl" : "font-bold text-lg leading-tight"}>
                                    {project.name}
                                </h3>
                                <p className={isWide ? "text-base font-medium text-foreground/80 leading-relaxed" : "text-sm text-muted-foreground line-clamp-2 leading-relaxed"}>
                                    {project.description}
                                </p>
                            </div>

                            {isWide && (
                                <>
                                    <p className="text-base text-muted-foreground leading-relaxed">
                                        {project.details}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="w-full text-xs font-semibold uppercase text-muted-foreground sm:w-auto sm:py-1.5">
                                            Deliverables
                                        </span>
                                        {project.deliverables.map((deliverable) => (
                                            <span
                                                key={deliverable}
                                                className="rounded-[5px] border border-[#3ca2fa]/25 bg-[#3ca2fa]/[0.06] px-3 py-1.5 text-xs font-semibold text-[#176da8] transition-colors group-hover:border-[#3ca2fa]/70 group-hover:bg-[#3ca2fa]/15 dark:text-[#7cccff]"
                                            >
                                                {deliverable}
                                            </span>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <StoryModal
                url={activeModalUrl}
                title="Project Quick View"
                onClose={() => setActiveModalUrl(null)}
            />
        </section>
    );
}
