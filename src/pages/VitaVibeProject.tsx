
import React from 'react';
import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

const IMAGES = [
    "/portfolio/vitavibe/projects-mokcup.webp",
    "/portfolio/vitavibe/ezgif-4cd46d9da4202e.gif",
    "/portfolio/vitavibe/1.webp",
    "/portfolio/vitavibe/DUCT-TAPE-FILE.webp",
    "/portfolio/vitavibe/PILLS-BOTTLE_mockup_v.webp",
    "/portfolio/vitavibe/TWO-PILLS-BOTTLE-MOCKUP_(v.webp",
    "/portfolio/vitavibe/mockup.webp",
];

const VitaVibeProject = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-neutral-950 antialiased selection:bg-[#7C3AED]/10 flex flex-col">
            <SEO
                title="VitaVibe Portfolio"
                description="A fresh take on daily wellness supplements for the modern lifestyle. Explore our work for VitaVibe."
                image="https://thirtypixels.com/portfolio/vitavibe/projects-mokcup.webp"
            />
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container mx-auto px-4 max-w-7xl space-y-24">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 max-w-4xl mx-auto">
                        <span className="website-pill">Portfolio</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-950">
                            VitaVibe<span className="text-[#7C3AED]">.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A fresh take on daily wellness supplements for the modern lifestyle.
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">About the Project</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                VitaVibe wanted to break away from the clinical, sterile look of traditional supplements. They needed a brand that felt energetic, accessible, and part of a daily routine.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We created a vibrant packaging system and digital experience that emphasizes vitality and simplicity. The use of bold typography and clean product photography helps the brand stand out on crowded shelves and feeds alike.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">Project Deliverables</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Brand Strategy & Naming",
                                    "Visual Identity System",
                                    "Packaging Design",
                                    "3D Product Rendering",
                                    "Social Media Content",
                                    "eCommerce Website",
                                    "Email Marketing Templates",
                                    "Unboxing Experience"
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
                                        alt={`VitaVibe Work ${index + 1}`}
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

export default VitaVibeProject;
