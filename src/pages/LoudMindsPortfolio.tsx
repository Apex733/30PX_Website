
import React from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

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
                </div>
            </main>

            {/* Your Journey Section */}
            <JourneyTimeline />

            <Footer />
        </div>
    );
};

export default LoudMindsPortfolio;
