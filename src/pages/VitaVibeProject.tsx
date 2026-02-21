
import React from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

const VitaVibeProject = () => {
    return (
        <div className="min-h-screen bg-white font-sans text-neutral-950 antialiased selection:bg-[#7C3AED]/10 flex flex-col">
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
                </div>
            </main>

            {/* Your Journey Section */}
            <JourneyTimeline />

            <Footer />
        </div>
    );
};

export default VitaVibeProject;
