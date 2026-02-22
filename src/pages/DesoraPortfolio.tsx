
import React from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

const IMAGES = [
    "/portfolio/desora/freepik__-id-1-title-browser-dashboard-hero-blue-sphere-com__69589.webp",
    "/portfolio/desora/freepik__-id-2-title-ai-search-bar-with-playful-teal-3d-obj__69593.webp",
    "/portfolio/desora/freepik__-id-3-title-smartphone-on-editorial-desk-flatlay-w__69594.webp",
    "/portfolio/desora/freepik__-id-3-title-smartphone-on-editorial-desk-flatlay-w__69595.webp",
    "/portfolio/desora/freepik__-id-4-title-layered-crm-glass-cards-with-purple-3d__69590.webp",
    "/portfolio/desora/freepik__-id-5-title-analytics-dashboard-atom-orbiting-ribb__69591.webp",
    "/portfolio/desora/freepik__-id-6-title-multiapp-workspace-with-floating-glass__69592.webp",
];

const DesoraPortfolio = () => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container mx-auto px-4 max-w-7xl space-y-24">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 max-w-4xl mx-auto">
                        <span className="website-pill">Portfolio</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white">
                            Desora<span className="text-[#7C3AED]">.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            AI-powered glass morphism creatives inspired by Microsoft.
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">About the Project</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Desora came to us saying that their budget was not huge like Microsoft, but they liked Microsoft's glass morph designs. So we used AI and designed them these creatives inspired by Microsoft.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">Project Deliverables</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "AI-Generated Creatives",
                                    "Glass Morphism Design",
                                    "Brand Visual Identity",
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
                                        alt={`Desora Work ${index + 1}`}
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

export default DesoraPortfolio;
