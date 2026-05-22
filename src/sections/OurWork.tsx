import { SectionHeading } from "@/components/ui/section-heading";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ButtonLabel } from "@/components/ui/button-label";

// Define categories with content
const categories = [
    { id: "3D", label: "3D" },
    { id: "AI", label: "AI" },
    { id: "Branding", label: "Branding" },
    { id: "Illustrations", label: "Illustrations" },
    { id: "Logo Design", label: "Logo Design" },
    { id: "Social Media Creatives", label: "Social Media" },
    { id: "Motion Design", label: "Motion Design" },
    { id: "UI:UX Design", label: "UI/UX Design" },
    { id: "Web Design", label: "Web Design" },
    { id: "Social Media Management", label: "Management" },
];

const workModules = import.meta.glob(
    "/Work/**/*.{jpg,jpeg,png,webp,mp4,webm}",
    { eager: true, query: "?url", import: "default" }
) as Record<string, string>;

// Group images by category with metadata
function getImagesByCategory(categoryId: string): { src: string; name: string; type: "image" | "video" }[] {
    return Object.entries(workModules)
        .filter(([path]) => {
            // Special Case: Motion Design aggregates ALL videos
            if (categoryId === "Motion Design") {
                return /\.(mp4|webm)$/i.test(path);
            }
            // Default: Match folder name
            return path.includes(`/Work/${categoryId}/`);
        })
        .map(([path, module]) => {
            // Extract filename without extension
            let fileName = path.split('/').pop()?.replace(/\.[^/.]+$/, "") || "";

            // Cleanup: user requested removing "2" or "3" from names
            // We'll remove trailing numbers 2 or 3, or " 2" / " 3"
            fileName = fileName.replace(/[\s-_]*[23]+$/, "").trim();

            const isVideo = /\.(mp4|webm)$/i.test(path);

            return {
                src: module, // explicitly resolved string via '?url'
                name: fileName,
                type: isVideo ? "video" : "image"
            };
        });
}

export function OurWork() {
    const [activeCategory, setActiveCategory] = useState<string>("3D");
    const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const images = getImagesByCategory(activeCategory);

    // Helper to check if a category has content
    const getCategoryCount = (categoryId: string) => {
        return getImagesByCategory(categoryId).length;
    };

    // Distribute images into 3 columns
    const cols: typeof images[] = [[], [], []];
    images.forEach((item, i) => {
        cols[i % 3].push(item);
    });
    
    // For mobile, all images go to col1. Desktop splits into 3 columns.
    const col1 = isMobile ? images : cols[0];
    const col2 = isMobile ? [] : cols[1];
    const col3 = isMobile ? [] : cols[2];

    // Internal component to render media correctly without duplicating code
    const MediaItem = ({ item }: { item: typeof images[0] }) => (
        <div className="w-full relative group rounded-[5px] overflow-hidden bg-neutral-100 mb-4 break-inside-avoid">
            {item.type === "video" ? (
                <video
                    src={item.src}
                    className="w-full h-auto object-cover pointer-events-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                />
            ) : (
                <img
                    src={item.src}
                    alt={`${activeCategory} work`}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                    draggable={false}
                />
            )}

            {(activeCategory === "3D" || activeCategory === "AI") && (
                <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-medium text-white tracking-wide">
                        {item.name}
                    </span>
                </div>
            )}
        </div>
    );

    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Heading */}
                <SectionHeading
                    badge="Portfolio"
                    title="Our Work"
                    align="center"
                />

                {/* Category Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-7xl mx-auto">
                    {categories.map((category) => {
                        const count = getCategoryCount(category.id);
                        const isEmpty = count === 0;

                        return (
                            <button
                                key={category.id}
                                onClick={() => !isEmpty && setActiveCategory(category.id)}
                                disabled={isEmpty}
                                className={cn(
                                    "group/button relative rounded-full px-2 py-2.5 text-xs font-medium transition-all duration-200 sm:text-sm",
                                    "w-[calc(50%-0.5rem)]",
                                    "md:w-[calc(33.333%-0.5rem)]",
                                    "lg:w-[calc(16.666%-0.65rem)]",

                                    isEmpty
                                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-transparent"
                                        : activeCategory === category.id
                                            ? "bg-neutral-900 text-white shadow-lg"
                                            : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:shadow-md"
                                )}
                            >
                                <span className="block truncate w-full">
                                    <ButtonLabel>{category.label}</ButtonLabel>
                                </span>
                                {isEmpty && (
                                    <span className="absolute -top-2 -right-1 bg-neutral-200 text-neutral-500 text-[10px] px-1.5 py-0.5 rounded-full font-bold shadow-sm z-10 whitespace-nowrap">
                                        Soon
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Static Multi-column Grid */}
            {images.length > 0 ? (
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="w-full">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                            {/* Column 1 */}
                            <div className="flex flex-col gap-4">
                                {col1.map((item, i) => <MediaItem key={`c1-${i}`} item={item} />)}
                            </div>

                            {/* Column 2 */}
                            <div className="hidden md:flex flex-col gap-4">
                                {col2.map((item, i) => <MediaItem key={`c2-${i}`} item={item} />)}
                            </div>

                            {/* Column 3 */}
                            <div className="hidden md:flex flex-col gap-4">
                                {col3.map((item, i) => <MediaItem key={`c3-${i}`} item={item} />)}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 text-neutral-500">
                    {/* This fallback should ideally not be reached if buttons are disabled, but keeping it for safety */}
                    Coming soon...
                </div>
            )}
        </section>
    );
}
