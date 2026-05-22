import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { ModalScrollTopButton } from "@/components/ModalScrollTopButton";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";
import { ProjectProcess } from "@/sections/ProjectProcess";

/*
CASE STUDY MEDIA LAYOUT CONTRACT

Use these rules for every case-study page and every future duplicate of this
template. The data should describe the media; the template handles the layout.

Hero:
- heroImage must always be wide or landscape media, preferably 16:9 or 4:3.
- Never use portrait, story, reel, or vertical media in the hero.
- The hero is displayed inside a rounded media card on both page and modal views.

Body media:
- Wide media: 16:9, 4:3, 21:9, panoramic, or "wide".
  Render full-width, one item per row. Multiple wide items stack vertically.
- Portrait media: 9:16, 4:5, 2:3, or "portrait".
  2 items use a 2-column grid.
  3-4 items use a 2-column grid.
  5+ items use a 3-column grid and add rows as needed.
- Square media uses the same grid behavior as portrait media.
- Mixed sets must not share a row. Keep the intended order in data.images;
  the template will split wide items into full-width rows and group adjacent
  portrait/square items into grids.

Video:
- Videos use the same aspect-ratio rules as images.
- Portrait videos belong in portrait grids. Landscape videos are full-width.
- Add a poster thumbnail for every video and keep preload lazy-friendly.
*/

type CaseStudyAspectRatio =
    | "21:9"
    | "16:9"
    | "4:3"
    | "wide"
    | "1:1"
    | "4:5"
    | "2:3"
    | "9:16"
    | "portrait";

type CaseStudyBaseMedia = {
    src: string;
    description: string;
    aspectRatio?: CaseStudyAspectRatio;
    objectFit?: "cover" | "contain";
};

type CaseStudyImage =
    | (CaseStudyBaseMedia & { type?: "image"; poster?: never })
    | (CaseStudyBaseMedia & { type: "video"; poster: string });

type RelatedProject = {
    name: string;
    description: string;
    image: string;
    href: string;
    bgClass: string;
};

export type CaseStudyData = {
    seoTitle: string;
    seoDescription: string;
    seoImage: string;
    // Must be landscape/wide. Do not use portrait, story, or reel media here.
    heroImage: string;
    heroObjectFit?: "cover" | "contain";
    projectName: string;
    description: string;
    deliverables: string[];
    theProblem: string;
    ourSolution: string;
    clientGain: string;
    stats: Array<{ value: string; label: string }>;
    images: CaseStudyImage[];
    moreProjects: RelatedProject[];
    accent?: string;
    accentClass?: string;
    cardClass?: string;
    statShadowClass?: string;
    visualsTitle?: string;
    visualsDescription?: string;
};

type CaseStudyTemplateProps = {
    data: CaseStudyData;
};

type MediaBlock =
    | { type: "wide"; item: CaseStudyImage }
    | { type: "grid"; items: CaseStudyImage[] };

const WIDE_ASPECT_RATIOS = new Set<CaseStudyAspectRatio>(["21:9", "16:9", "4:3", "wide"]);

const isWideMedia = (item: CaseStudyImage) => WIDE_ASPECT_RATIOS.has(item.aspectRatio ?? "1:1");

const getGridColumns = (count: number) => {
    if (count === 3 || count >= 5) {
        return "md:grid-cols-3";
    }

    return "md:grid-cols-2";
};

const buildMediaBlocks = (items: CaseStudyImage[]): MediaBlock[] => {
    const blocks: MediaBlock[] = [];
    let gridItems: CaseStudyImage[] = [];

    items.forEach((item) => {
        if (isWideMedia(item)) {
            if (gridItems.length > 0) {
                blocks.push({ type: "grid", items: gridItems });
                gridItems = [];
            }

            blocks.push({ type: "wide", item });
            return;
        }

        gridItems.push(item);
    });

    if (gridItems.length > 0) {
        blocks.push({ type: "grid", items: gridItems });
    }

    return blocks;
};

export const CaseStudyTemplate = ({ data }: CaseStudyTemplateProps) => {
    const location = useLocation();
    const isModal = location.search.includes("modal=true");
    const accent = data.accent ?? "#7C3AED";
    const accentClass = data.accentClass ?? "border-[#7C3AED]/30";
    const cardClass = data.cardClass ?? "bg-[#7C3AED]/10 border-[#7C3AED]/20";
    const statShadowClass = data.statShadowClass ?? "shadow-violet-500/20";
    const mediaBlocks = buildMediaBlocks(data.images);
    let mediaIndex = 0;

    const renderMediaItem = (item: CaseStudyImage) => {
        const currentIndex = mediaIndex;
        mediaIndex += 1;

        return (
            <div key={item.src} className="flex flex-col gap-4">
                <div className="relative rounded-[5px] overflow-hidden border border-primary/10 shadow-sm bg-muted group">
                    {item.type === "video" ? (
                        <video
                            src={item.src}
                            poster={item.poster}
                            className={`w-full h-auto ${item.objectFit === "contain" ? "object-contain" : "object-cover"}`}
                            controls
                            muted
                            playsInline
                            preload="none"
                            aria-label={`${data.projectName} video ${currentIndex + 1}`}
                        />
                    ) : (
                        <img
                            src={item.src}
                            alt={`${data.projectName} artwork ${currentIndex + 1}`}
                            className={`w-full h-auto ${item.objectFit === "contain" ? "object-contain" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.02]`}
                            loading="lazy"
                            decoding="async"
                        />
                    )}
                </div>
                <p className={`text-sm md:text-base text-muted-foreground leading-relaxed pl-2 border-l-2 ${accentClass}`}>
                    {item.description}
                </p>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <SEO
                title={data.seoTitle}
                description={data.seoDescription}
                image={data.seoImage}
            />
            <Header />

            <main className={`flex-grow ${isModal ? "pb-10 pt-0" : "pb-16"}`}>
                <div className={`container mx-auto max-w-7xl px-4 md:px-6 ${isModal ? "pt-4 md:pt-6" : "pt-24 md:pt-28"}`}>
                    <div className={`rounded-[5px] border p-3 md:p-5 shadow-sm ${cardClass}`}>
                        <div className={`relative h-[58vh] min-h-[360px] w-full overflow-hidden rounded-[5px] shadow-sm border ${accentClass}`}>
                            <img
                                src={data.heroImage}
                                alt={data.projectName}
                                className={`h-full w-full ${data.heroObjectFit === "contain" ? "object-contain" : "object-cover"}`}
                            />
                        </div>
                    </div>
                </div>

                <div className={`container mx-auto px-4 max-w-7xl space-y-24 ${isModal ? "pt-10 md:pt-12" : "pt-16 md:pt-24"}`}>
                    <div className="max-w-4xl space-y-6">
                        <div className="space-y-6">
                            <span className="website-pill">Case Study</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 dark:text-white">
                                {data.projectName}<span style={{ color: accent }}>.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                {data.description}
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                                Project Deliverables
                            </h2>
                            <ul className="flex flex-wrap gap-3">
                                {data.deliverables.map((item) => (
                                    <li
                                        key={item}
                                        className="rounded-full border bg-secondary/40 px-4 py-2 text-sm font-semibold text-foreground/80"
                                        style={{ borderColor: accent }}
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {[
                            ["The Problem", data.theProblem],
                            ["Our Solution", data.ourSolution],
                            ["The Result", data.clientGain]
                        ].map(([title, copy]) => (
                            <div key={title} className={`p-6 md:p-8 rounded-[5px] border shadow-sm flex flex-col gap-3 ${cardClass}`}>
                                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} /> {title}
                                </h3>
                                <p className="text-base text-foreground/80 leading-relaxed font-medium">{copy}</p>
                            </div>
                        ))}
                    </div>

                    <div className={`w-full text-white py-10 px-6 md:px-12 rounded-[5px] shadow-lg ${statShadowClass}`} style={{ backgroundColor: accent }}>
                        <div className="flex flex-col md:flex-row items-center justify-around gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
                            {data.stats.map((stat) => (
                                <div key={stat.label} className="flex flex-col items-center justify-center gap-2 pt-6 md:pt-0 w-full md:flex-1 first:pt-0">
                                    <span className="text-5xl md:text-6xl font-bold tracking-tighter drop-shadow-sm">{stat.value}</span>
                                    <span className="text-sm md:text-base font-semibold text-white/90 uppercase tracking-widest">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ProjectProcess />

                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">
                                {data.visualsTitle ?? "Project Visuals"}
                            </h2>
                            <p className="text-muted-foreground">
                                {data.visualsDescription ?? "A closer look at the work delivered."}
                            </p>
                        </div>

                        <div className="space-y-10">
                            {mediaBlocks.map((block, blockIndex) => {
                                if (block.type === "wide") {
                                    return renderMediaItem(block.item);
                                }

                                return (
                                    <div key={`grid-${blockIndex}`} className={`grid grid-cols-1 ${getGridColumns(block.items.length)} gap-8 md:gap-12`}>
                                        {block.items.map((item) => renderMediaItem(item))}
                                    </div>
                                );
                            })}
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
                    {data.moreProjects.map((project) => (
                        <Link
                            key={project.href}
                            to={project.href}
                            className="flex flex-col gap-5 bg-primary/5 border border-primary/20 p-5 rounded-[5px] shadow-sm group hover:bg-primary/10 transition-colors"
                        >
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
