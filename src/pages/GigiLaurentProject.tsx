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

const ACCENT = "#E11D48";
const VIDEO_PLAYBACK_PROPS = {
    autoPlay: true,
    controls: true,
    loop: true,
    muted: true,
    playsInline: true,
    preload: "metadata" as const
};

const TEMPLATE_DATA = {
    seoTitle: "GIGI Laurent | AI Campaign Imagery",
    seoDescription: "A full AI campaign system for GIGI Laurent, from product-only imagery to model visuals and video ads.",
    heroImage: "/portfolio/gigi-laurent/hero.webp",
    projectName: "GIGI Laurent",
    description: "GIGI Laurent had strong product imagery. They needed the rest of the campaign: models, ad visuals, motion, and social-ready creative that felt polished enough to sell the brand at first glance.",
    deliverables: [
        "AI model imagery",
        "Product-to-model scenes",
        "Social media ads",
        "AI video ads",
        "Campaign creative direction"
    ],
    theProblem: "The brand had product shots, but no full campaign world around them. No models. No lifestyle scenes. No motion assets ready for paid social.",
    ourSolution: "We built a complete AI campaign pipeline. Product imagery became model-led visuals, then those visuals became AI video ads for feeds, reels, and launch campaigns.",
    clientGain: "GIGI Laurent walked away with a campaign library instead of a few static product shots. More formats, more stories, more ways to sell without booking a traditional shoot.",
    stats: [
        { value: "3", label: "Ad Concepts" },
        { value: "6", label: "Model Visuals" },
        { value: "6", label: "AI Videos" }
    ],
    modelImages: [
        {
            src: "/portfolio/gigi-laurent/models/model-01.avif",
            aspectRatio: "4:5",
            description: "AI model imagery built from the product story."
        },
        {
            src: "/portfolio/gigi-laurent/models/model-02.avif",
            aspectRatio: "4:5",
            description: "Lifestyle composition designed for premium social ads."
        },
        {
            src: "/portfolio/gigi-laurent/models/model-03.avif",
            aspectRatio: "4:5",
            description: "Product-led model scene with campaign-ready framing."
        },
        {
            src: "/portfolio/gigi-laurent/models/model-04.avif",
            aspectRatio: "4:5",
            description: "Beauty-focused visual made for launch storytelling."
        },
        {
            src: "/portfolio/gigi-laurent/models/model-05.avif",
            aspectRatio: "2:3",
            description: "Scroll-stopping product and model direction."
        },
        {
            src: "/portfolio/gigi-laurent/models/model-06.avif",
            aspectRatio: "9:16",
            description: "Pose variation for campaign flexibility."
        }
    ],
    adImages: [
        {
            src: "/portfolio/gigi-laurent/ads/ad-01.webp",
            aspectRatio: "4:5",
            description: "Social ad creative built for fast recognition."
        },
        {
            src: "/portfolio/gigi-laurent/ads/ad-02.webp",
            aspectRatio: "4:5",
            description: "Campaign artwork with product and model focus."
        },
        {
            src: "/portfolio/gigi-laurent/ads/ad-03.webp",
            aspectRatio: "4:5",
            description: "Feed-ready ad visual for brand awareness."
        }
    ],
    wideVideos: [
        {
            src: "/portfolio/gigi-laurent/videos/wide/wide-01.mp4",
            poster: "/portfolio/gigi-laurent/hero.webp"
        },
        {
            src: "/portfolio/gigi-laurent/videos/wide/wide-02.mp4",
            poster: "/portfolio/gigi-laurent/ads/ad-01.webp"
        },
        {
            src: "/portfolio/gigi-laurent/videos/wide/wide-03.mp4",
            poster: "/portfolio/gigi-laurent/ads/ad-02.webp"
        }
    ],
    reelVideos: [
        {
            src: "/portfolio/gigi-laurent/videos/reel/reel-01.mp4",
            poster: "/portfolio/gigi-laurent/models/model-01.avif"
        },
        {
            src: "/portfolio/gigi-laurent/videos/reel/reel-02.mp4",
            poster: "/portfolio/gigi-laurent/models/model-02.avif"
        },
        {
            src: "/portfolio/gigi-laurent/videos/reel/reel-03.mp4",
            poster: "/portfolio/gigi-laurent/models/model-03.avif"
        }
    ],
    moreProjects: [
        {
            name: "Fizz Bliss | Product Imagery",
            description: "AI product photography for a vibrant beverage launch.",
            bgClass: "bg-gradient-to-br from-rose-100 to-cyan-100 dark:from-rose-950 dark:to-cyan-950",
            image: "/portfolio/fizzbliss/dynamic-studio-pro_2760836823.avif",
            href: "/portfolio/fizzbliss"
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

const GigiLaurentProject = () => {
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
                <div className={`container mx-auto max-w-7xl px-4 md:px-6 ${isModal ? "pt-4 md:pt-6" : "pt-24 md:pt-28"}`}>
                    <div className="rounded-[5px] border p-3 md:p-5 shadow-sm bg-rose-500/10 border-rose-500/20">
                        <div className="relative h-[58vh] min-h-[360px] w-full overflow-hidden rounded-[5px] shadow-sm border border-rose-500/30">
                            <img
                                src={TEMPLATE_DATA.heroImage}
                                alt={TEMPLATE_DATA.projectName}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>

                <div className={`container mx-auto px-4 max-w-7xl space-y-24 ${isModal ? "pt-10 md:pt-12" : "pt-16 md:pt-24"}`}>
                    <div className="max-w-4xl space-y-6">
                        <div className="space-y-6">
                            <span className="website-pill">Case Study</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white">
                                {TEMPLATE_DATA.projectName}<span style={{ color: ACCENT }}>.</span>
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
                                        className="rounded-full border bg-secondary/40 px-4 py-2 text-sm font-semibold text-foreground/80"
                                        style={{ borderColor: ACCENT }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {[
                            ["The Problem", TEMPLATE_DATA.theProblem],
                            ["Our Solution", TEMPLATE_DATA.ourSolution],
                            ["The Result", TEMPLATE_DATA.clientGain]
                        ].map(([title, copy]) => (
                            <div key={title} className="p-6 md:p-8 rounded-[5px] bg-rose-500/10 border border-rose-500/20 shadow-sm flex flex-col gap-3">
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: ACCENT }} /> {title}
                                </h3>
                                <p className="text-base text-foreground/80 leading-relaxed font-medium">{copy}</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full text-white py-10 px-6 md:px-12 rounded-[5px] shadow-lg shadow-rose-500/20" style={{ backgroundColor: ACCENT }}>
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

                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Product imagery, now with people</h2>
                            <p className="text-muted-foreground">A closer look at the AI model visuals delivered.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {TEMPLATE_DATA.modelImages.map((img, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <div className="relative rounded-[5px] overflow-hidden border border-primary/10 shadow-sm bg-muted group">
                                        <img
                                            src={img.src}
                                            alt={`GIGI Laurent model artwork ${idx + 1}`}
                                            className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed pl-2 border-l-2 border-rose-500/30">
                                        {img.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Ad visuals for the feed</h2>
                            <p className="text-muted-foreground">Campaign assets ready for paid and organic social.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {TEMPLATE_DATA.adImages.map((img, idx) => (
                                <div key={idx} className="flex flex-col gap-4">
                                    <div className="relative rounded-[5px] overflow-hidden border border-primary/10 shadow-sm bg-muted group">
                                        <img
                                            src={img.src}
                                            alt={`GIGI Laurent ad artwork ${idx + 1}`}
                                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                            loading="lazy"
                                        />
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed pl-2 border-l-2 border-rose-500/30">
                                        {img.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Motion for campaign launch</h2>
                            <p className="text-muted-foreground">Wide videos for campaign moments. Reel cuts for social speed.</p>
                        </div>

                        <div className="space-y-8">
                            {TEMPLATE_DATA.wideVideos.map((video, idx) => (
                                <div key={video.src} className="rounded-[5px] overflow-hidden border border-primary/10 shadow-sm bg-muted">
                                    <video
                                        {...VIDEO_PLAYBACK_PROPS}
                                        src={video.src}
                                        poster={video.poster}
                                        className="w-full aspect-video object-cover"
                                        aria-label={`GIGI Laurent wide campaign video ${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {TEMPLATE_DATA.reelVideos.map((video, idx) => (
                                <div key={video.src} className="rounded-[5px] overflow-hidden border border-primary/10 shadow-sm bg-muted">
                                    <video
                                        {...VIDEO_PLAYBACK_PROPS}
                                        src={video.src}
                                        poster={video.poster}
                                        className="w-full aspect-[9/16] object-cover"
                                        aria-label={`GIGI Laurent reel video ${idx + 1}`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {!isModal && <JourneyTimeline />}

            {!isModal && (
                <div className="container mx-auto px-6 md:px-12 max-w-7xl py-24 border-t border-border/50 mt-12">
                <div className="flex flex-col items-center text-center gap-4 mb-12">
                    <span className="website-pill">More Work</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Keep Exploring.</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TEMPLATE_DATA.moreProjects.map((project) => (
                        <Link key={project.href} to={project.href} className="flex flex-col gap-5 bg-primary/5 border border-primary/20 p-5 rounded-[5px] shadow-sm group cursor-pointer hover:bg-primary/10 transition-colors">
                            <div className={`relative aspect-[4/3] rounded-[5px] border border-primary/30 w-full overflow-hidden ${project.bgClass} flex items-center justify-center shadow-sm`}>
                                <img src={project.image} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />

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

export default GigiLaurentProject;
