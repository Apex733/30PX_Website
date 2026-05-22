import React from 'react';
import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { ModalScrollTopButton } from "@/components/ModalScrollTopButton";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";
import { ProjectProcess } from "@/sections/ProjectProcess";

/*
AI CODER NOTE:
Follow the CASE STUDY MEDIA LAYOUT CONTRACT used by CaseStudyTemplate when
duplicating or extending this standalone page.

- Hero media must be wide/landscape and full-width.
- Body wide media must stack full-width, one per row.
- Body portrait/square media must use grids: 2-4 items use 2 columns, 5+ use
  3 columns.
- Mixed wide and portrait/square media must be separated into distinct blocks.
- Videos need poster thumbnails and lazy-friendly preload behavior.
*/

// ==========================================
// TEMPLATE DATA (AI TO REPLACE THIS DATA)
// ==========================================
const TEMPLATE_DATA = {
    seoTitle: "Fizz Bliss | Product Imagery",
    seoDescription: "A complete AI-generated product photography suite for Fizz Bliss.",
    heroImage: "/portfolio/fizzbliss/dynamic-studio-pro_2760836823.avif",
    projectName: "Fizz Bliss",
    description: "Fizz Bliss needed dynamic, engaging product imagery to amplify their new functional beverage launch. They required high-tier studio-style photography that popped with vibrant colors and lifestyle energy, all without the logistics and high costs of a traditional photoshoot.",
    deliverables: [
        "AI Product Photography",
        "Creative Direction",
        "Vibrant Studio Mockups",
        "Lifestyle Imagery",
        "Social Media Assets"
    ],
    theProblem: "Traditional photoshoots are expensive, time-consuming, and difficult to scale. Fizz Bliss struggled to produce enough high-quality content across different environments to keep their marketing fresh and engaging.",
    ourSolution: "We utilized our advanced AI image generation workflows to produce hyper-realistic, studio-quality product mockups. By meticulously generating lifestyle and studio setups, we captured the exact brand aesthetic with perfect lighting and composition.",
    clientGain: "A massive library of stunning, ready-to-use marketing assets. The brand launched its campaigns weeks ahead of schedule and achieved remarkable visual consistency across all digital touchpoints.",
    stats: [
        { value: "100%", label: "AI Generated" },
        { value: "10x", label: "Faster Delivery" },
        { value: "1/5", label: "Cost vs Traditional" }
    ],
    images: [
        {
            src: "/portfolio/fizzbliss/dynamic-studio-pro_2760836823.avif",
            aspectRatio: "4:3",
            description: "High-impact hero visualization capturing the essence of the campaign."
        },
        {
            src: "/portfolio/fizzbliss/vibrant-studio-pro_2760901564.avif",
            aspectRatio: "4:3",
            description: "Vibrant studio product shot highlighting brand identity."
        },
        {
            src: "/portfolio/fizzbliss/closeup-lifestyle-_2760901017.avif",
            aspectRatio: "4:3",
            description: "Close-up lifestyle imagery integrating natural lighting."
        },
        {
            src: "/portfolio/fizzbliss/overhead-flatlay-p_2760835851.avif",
            aspectRatio: "4:3",
            description: "Overhead flatlay composition perfect for e-commerce."
        },
        {
            src: "/portfolio/fizzbliss/lifestyle-product-_2760901863.avif",
            aspectRatio: "4:3",
            description: "Refreshing lifestyle product mockup in an organic setting."
        },
        {
            src: "/portfolio/fizzbliss/closeup-overhead-p_2760874539.avif",
            aspectRatio: "4:3",
            description: "Detailed overhead view emphasizing texture and environment."
        }
    ],
    moreProjects: [
        {
            name: "GIGI Laurent | AI Campaign",
            description: "AI-generated campaign visuals turning product-only assets into a full launch system.",
            bgClass: "bg-gradient-to-br from-rose-100 to-cyan-100 dark:from-rose-950 dark:to-cyan-950",
            image: "/portfolio/gigi-laurent/hero.webp",
            href: "/portfolio/gigi-laurent"
        },
        {
            name: "Mondly SaaS | AI Product Build",
            description: "AI-assisted SaaS design and development for a polished dashboard product.",
            bgClass: "bg-gradient-to-br from-teal-100 to-emerald-100 dark:from-teal-950 dark:to-emerald-950",
            image: "/portfolio/mondly-saas/hero.avif",
            href: "/portfolio/mondly-saas"
        }
    ]
};

const FizzBlissProject = () => {
    const location = useLocation();
    const isModal = location.search.includes("modal=true");

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <SEO
                title={TEMPLATE_DATA.seoTitle}
                description={TEMPLATE_DATA.seoDescription}
            />
            <Header />

            <main className={`flex-grow ${isModal ? "pb-10 pt-0" : "pb-16"}`}>
                {/* Full Width Hero */}
                {/* Full Width Hero */}
                <div className={`container mx-auto max-w-7xl px-4 md:px-6 ${isModal ? "pt-4 md:pt-6" : "pt-24 md:pt-28"}`}>
                    <div className="rounded-[5px] border p-3 md:p-5 shadow-sm bg-[#7C3AED]/10 border-[#7C3AED]/20">
                        <div className="relative h-[58vh] min-h-[360px] w-full overflow-hidden rounded-[5px] shadow-sm border border-[#7C3AED]/30">
                            <img
                                src={TEMPLATE_DATA.heroImage}
                                alt={TEMPLATE_DATA.projectName}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className={`container mx-auto px-4 max-w-7xl space-y-24 ${isModal ? "pt-10 md:pt-12" : "pt-16 md:pt-24"}`}>
                    {/* Project Info & Deliverables */}
                    <div className="max-w-4xl space-y-6">
                        <div className="space-y-6">
                            <span className="website-pill">Case Study</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white">
                                {TEMPLATE_DATA.projectName}<span className="text-[#7C3AED]">.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {TEMPLATE_DATA.description}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Project Deliverables</h2>
                            <ul className="flex flex-wrap gap-3">
                                {TEMPLATE_DATA.deliverables.map((item, index) => (
                                    <li
                                        key={index}
                                        className="rounded-full border border-[#7C3AED] bg-secondary/40 px-4 py-2 text-sm font-semibold text-foreground/80"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Problem, Solution, Result - Horizontal Subtle Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="p-6 md:p-8 rounded-[5px] bg-[#7C3AED]/10 border border-[#7C3AED]/20 shadow-sm flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#7C3AED]" /> The Problem
                            </h3>
                            <p className="text-base text-foreground/80 leading-relaxed font-medium">{TEMPLATE_DATA.theProblem}</p>
                        </div>
                        <div className="p-6 md:p-8 rounded-[5px] bg-[#7C3AED]/10 border border-[#7C3AED]/20 shadow-sm flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#7C3AED]" /> Our Solution
                            </h3>
                            <p className="text-base text-foreground/80 leading-relaxed font-medium">{TEMPLATE_DATA.ourSolution}</p>
                        </div>
                        <div className="p-6 md:p-8 rounded-[5px] bg-[#7C3AED]/10 border border-[#7C3AED]/20 shadow-sm flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#7C3AED]" /> The Result
                            </h3>
                            <p className="text-base text-foreground/80 leading-relaxed font-medium">{TEMPLATE_DATA.clientGain}</p>
                        </div>
                    </div>

                    {/* Full Width Numbers Pill */}
                    <div className="w-full bg-[#7C3AED] text-white py-10 px-6 md:px-12 rounded-[5px] shadow-lg shadow-violet-500/20">
                        <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                            {TEMPLATE_DATA.stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col items-center justify-center gap-2 pt-6 md:pt-0 w-full md:flex-1 first:pt-0">
                                    <span className="text-5xl md:text-6xl font-bold tracking-tighter drop-shadow-sm">{stat.value}</span>
                                    <span className="text-sm md:text-base font-semibold text-white/90 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ProjectProcess />

                    {/* Dynamic Image Gallery */}
                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Project Visuals</h2>
                            <p className="text-muted-foreground">A closer look at the work delivered.</p>
                        </div>

                        {/* Wide media stack full-width. Add portrait/square media in a separate 2- or 3-column grid block. */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                            {TEMPLATE_DATA.images.map((img, idx) => {
                                // 16:9, 4:3, 21:9, or wider media is always full-width.
                                const isFullWidth = img.aspectRatio === "16:9" || img.aspectRatio === "4:3";
                                
                                return (
                                    <div key={idx} className={`flex flex-col gap-4 ${isFullWidth ? "md:col-span-2" : "md:col-span-1"}`}>
                                        <div className="relative rounded-[5px] overflow-hidden border border-primary/10 shadow-sm bg-muted group">
                                            <img
                                                src={img.src}
                                                alt={`Artwork ${idx + 1}`}
                                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                                loading="lazy"
                                            />
                                        </div>
                                        {img.description && (
                                            <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-2 border-l-2 border-[#7C3AED]/30">
                                                {img.description}
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </main>

            {/* Post-Case Study Sections */}
            
            {/* Your Journey Section */}
            {!isModal && <JourneyTimeline />}

            {/* More Case Studies block */}
            {!isModal && (
                <div className="container mx-auto px-6 md:px-12 max-w-7xl py-24 border-t border-border/50 mt-12">
                <div className="flex flex-col items-center text-center gap-4 mb-12">
                    <span className="website-pill">More Work</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Keep Exploring.</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TEMPLATE_DATA.moreProjects.map((project, idx) => (
                        <Link key={project.href} to={project.href} className="flex flex-col gap-5 bg-primary/5 border border-primary/20 p-5 rounded-[5px] shadow-sm group cursor-pointer hover:bg-primary/10 transition-colors">
                            <div className={`relative aspect-[4/3] rounded-[5px] border border-primary/30 w-full overflow-hidden ${project.bgClass} flex items-center justify-center shadow-sm`}>
                                {project.image ? (
                                    <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
                                ) : (
                                    <span className="text-primary/40 font-semibold tracking-widest text-sm uppercase p-6">Artwork #{idx + 1}</span>
                                )}
                                
                                {/* "Read More" hover card */}
                                <div className="portfolio-card-reveal">
                                    <div className="bg-background/80 backdrop-blur-xl border border-primary/20 shadow-xl rounded-[5px] p-2.5 flex items-center justify-between">
                                        <span className="font-semibold text-sm pl-2 text-foreground">Read Case Study</span>
                                        <div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-sm">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 px-1">
                                <h3 className="font-bold text-lg leading-tight text-foreground">{project.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
                </div>
            )}

            {isModal && <ModalScrollTopButton />}

            <Footer />
        </div>
    );
};

export default FizzBlissProject;
