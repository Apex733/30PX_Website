
import React from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { CTASection } from "@/components/ui/cta-section";

const IMAGES = [
    "/portfolio/loudminds/projects-mokcup.jpg", // Hero/Main
    "/portfolio/loudminds/1.jpg",
    "/portfolio/loudminds/2.jpg",
    "/portfolio/loudminds/4.jpg",
    "/portfolio/loudminds/6.jpg",
    "/portfolio/loudminds/7.jpg",
    "/portfolio/loudminds/8.jpg",
    "/portfolio/loudminds/11.jpg",
    "/portfolio/loudminds/22.jpg",
    "/portfolio/loudminds/33.jpg",
    "/portfolio/loudminds/44.jpg",
];

const LoudMindsPortfolio = () => {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-16">
                <div className="container mx-auto px-4 max-w-7xl space-y-24">
                    {/* Hero Section */}
                    <div className="text-center space-y-6 max-w-4xl mx-auto">
                        <span className="website-pill">Portfolio</span>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-950 dark:text-white">
                            LoudMinds<span className="text-[#7C3AED]">.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                            A complete rebrand and digital transformation for a cutting-edge creative agency.
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="grid md:grid-cols-2 gap-12 md:gap-24">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">About the Project</h2>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                LoudMinds approached us with a challenge: their visual identity felt outdated and didn't reflect the rebellious, innovative spirit of their team. They needed a brand that could speak louder than words.
                            </p>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                We stripped everything back to the core message and built a visual language that is bold, unapologetic, and impossible to ignore. From the logo to the web experience, every touchpoint screams creativity.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold border-l-4 border-[#7C3AED] pl-4">Project Deliverables</h2>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Brand Identity System",
                                    "Logo Design & Usage",
                                    "Website Design & Dev",
                                    "Social Media Assets",
                                    "Brand Guidelines",
                                    "Pitch Deck Templates",
                                    "Business Cards",
                                    "Merchandise Design"
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

                        {/* Dynamic Masonry Layout */}
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                            {IMAGES.map((src, index) => (
                                <div key={index} className="break-inside-avoid relative overflow-hidden rounded-2xl group mb-6">
                                    <img
                                        src={src}
                                        alt={`LoudMinds Work ${index + 1}`}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* CTA Section */}
            <CTASection />

            <Footer />
        </div>
    );
};

export default LoudMindsPortfolio;
