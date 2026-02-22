
import React from 'react';
import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

const IMAGES = [
    "/portfolio/ghosttongue/ghost-tongue-logo3.webp",
    "/portfolio/ghosttongue/dsc04992.webp",
    "/portfolio/ghosttongue/mockupp.webp",
    "/portfolio/ghosttongue/post.webp",
    "/portfolio/ghosttongue/wall-sticker.webp",
    "/portfolio/ghosttongue/2b9b2cfb-2e46-4091-b84a-48c2920446e5.webp",
    "/portfolio/ghosttongue/ghost-tongue-packing.webp",
    "/portfolio/ghosttongue/ghost-tongue-sticker-var.webp",
    "/portfolio/ghosttongue/ghost-tongue-logovar.webp",
];

const GhostTongueProject = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-neutral-950 antialiased selection:bg-[#7C3AED]/10 flex flex-col">
            <SEO
                title="GhostTongue Portfolio"
                description="Discover the sonic branding and visual identity we created for the next-gen audio production house, GhostTongue."
                image="https://thirtypixels.com/portfolio/ghosttongue/ghost-tongue-logo3.webp"
            />
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container mx-auto px-4 max-w-7xl space-y-24">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 max-w-4xl mx-auto">
                        <span className="website-pill">Portfolio</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-950">
                            GhostTongue<span className="text-[#7C3AED]">.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            Sonic branding and visual identity for a next-gen audio production house.
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">About the Project</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                GhostTongue needed a visual identity that matched their sonic signature: mysterious, impactful, and unforgettable. They wanted a brand that could visualize sound and resonate with a global audience of creators.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We developed a dynamic visual system inspired by waveforms and frequency spectrums, creating a look that feels as immersive as their audio productions.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">Project Deliverables</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Sonic Branding Strategy",
                                    "Visual Identity System",
                                    "Website Design & Dev",
                                    "Album Art Direction",
                                    "Social Media Kit",
                                    "Merch Design",
                                    "Motion Graphics",
                                    "Event Visuals"
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center gap-3 text-lg text-muted-foreground bg-secondary/30 p-3 rounded-lg">
                                        <div className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Bento Grid Gallery */}
                    <div className="space-y-12">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Visual Gallery</h2>
                            <p className="text-muted-foreground">A curated selection of the work we produced.</p>
                        </div>

                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {IMAGES.map((src, index) => (
                                <div key={index} className="break-inside-avoid relative overflow-hidden rounded-[14px] group mb-6">
                                    <img
                                        src={src}
                                        alt={`GhostTongue Work ${index + 1}`}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Your Journey Section */}
            <JourneyTimeline />

            <Footer />
        </div>
    );
};

export default GhostTongueProject;
