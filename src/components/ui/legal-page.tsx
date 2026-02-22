import React from 'react';
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

interface LegalPageProps {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <Header />
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="mb-12">
                        <span className="website-pill mb-4 inline-block">Legal</span>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{title}</h1>
                        <p className="text-muted-foreground text-sm">Last updated: {lastUpdated}</p>
                    </div>
                    <div className="prose prose-neutral max-w-none
                        [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-10 [&_h2]:mb-4
                        [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3
                        [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
                        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ul]:mb-6
                        [&_li]:text-muted-foreground [&_li]:leading-relaxed
                        [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary/80
                    ">
                        {children}
                    </div>
                </div>
            </main>
            <JourneyTimeline />
            <Footer />
        </div>
    );
}
