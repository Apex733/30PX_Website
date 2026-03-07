import { SectionHeading } from "@/components/ui/section-heading"
import { useState } from "react";
import { cn } from "@/lib/utils";

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

// Import all work images and videos dynamically
const workModules = import.meta.glob<{ default: string }>(
    "/Work/**/*.{jpg,jpeg,png,webp,mp4,webm}",
    { eager: true }
);

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
                src: module.default,
                name: fileName,
                type: isVideo ? "video" : "image"
            };
        });
}

export function OurWork() {
    const [activeCategory, setActiveCategory] = useState<string>("3D");
    const images = getImagesByCategory(activeCategory);

    // Helper to check if a category has content
    const getCategoryCount = (categoryId: string) => {
        return getImagesByCategory(categoryId).length;
    };

    return (
        <section className="py-12 md:py-16 bg-[#FAFAFA]">
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
                                    "relative px-2 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200",
                                    // Layout widths to mimic grid:
                                    // Mobile: 2 per row (~50%)
                                    "w-[calc(50%-0.5rem)]",
                                    // Tablet: 3 per row (~33%)
                                    "md:w-[calc(33.333%-0.5rem)]",
                                    // Desktop: 6 per row (~16.6%)
                                    "lg:w-[calc(16.666%-0.65rem)]",

                                    isEmpty
                                        ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-transparent"
                                        : activeCategory === category.id
                                            ? "bg-neutral-900 text-white shadow-lg"
                                            : "bg-white text-neutral-700 border border-neutral-200 hover:border-neutral-400 hover:shadow-md"
                                )}
                            >
                                <span className="block truncate w-full">
                                    {category.label}
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

            {/* Horizontal Scroll Carousel - FULL WIDTH */}
            {images.length > 0 ? (
                <div className="relative w-full overflow-hidden">
                    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className="flex items-center w-max pb-4 pr-4">
                            {images.map((item, index) => {
                                return (
                                    <div
                                        key={`${activeCategory}-${index}`}
                                        className="pl-4 shrink-0"
                                    >
                                        <div
                                            className="h-[36rem] md:h-[40rem] overflow-hidden rounded-[5px] bg-neutral-100 relative group"
                                        >
                                            {item.type === "video" ? (
                                                <video
                                                    src={item.src}
                                                    className="h-full w-auto object-contain pointer-events-none"
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={item.src}
                                                    alt={`${activeCategory} work ${index + 1}`}
                                                    className="h-full w-auto object-contain transition-transform duration-500 hover:scale-105"
                                                    loading="lazy"
                                                    draggable={false}
                                                />
                                            )}

                                            {/* Image Name Label (Only for 3D and AI) */}
                                            {(activeCategory === "3D" || activeCategory === "AI") && (
                                                <div className="absolute top-3 right-3 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full shadow-sm z-10">
                                                    <span className="text-xs font-medium text-white tracking-wide">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
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
