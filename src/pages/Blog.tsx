import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/ui/footer-section";
import { FreePDFDownload } from "@/sections/FreePDFDownload";
import { AIDesignPerformance } from "@/sections/AIDesignPerformance";

export default function Blog() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <SEO
                title="Blog — 30PX | AI Design Thinking, Process, and Strategy"
                description="Practical insights on AI-powered design, creative strategy, and building brands that ship. Written by the 30PX team."
                keywords="AI design blog, creative agency insights, design process, AI workflow tips"
                noindex
            />
            <Header />

            <main className="flex-grow pt-32 pb-8">
                {/* Page Header */}
                <div className="container mx-auto px-4 max-w-4xl text-center space-y-6 mb-8">
                    <span className="website-pill">Blog</span>
                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
                        Thinking, shipped.
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Practical insights on AI-powered design, creative strategy, and what it actually takes to build brands that move fast.
                    </p>
                </div>

                {/* Coming Soon State */}
                <div className="container mx-auto px-4 max-w-3xl text-center py-16">
                    <div className="bg-card border border-border/50 rounded-[5px] p-12 space-y-4">
                        <div className="text-5xl mb-4">📝</div>
                        <h2 className="text-2xl font-bold tracking-tight">Posts are on the way.</h2>
                        <p className="text-muted-foreground max-w-lg mx-auto">
                            We are writing about the AI tools we use, the design decisions we make, and the results we see. Sign up below to get the first posts delivered to your inbox.
                        </p>
                    </div>
                </div>

                <FreePDFDownload
                    title="Get early access to our writing."
                    subtitle="We will send you new posts as they go live. No spam. No fluff. Just practical AI design thinking."
                    submitLabel="Subscribe"
                    successTitle="You are in."
                    successMessage="We will send new posts to your inbox as they go live."
                    secondFieldLabel="Role"
                    secondFieldPlaceholder="e.g. Founder, Designer, Marketer"
                />

                <AIDesignPerformance />
            </main>

            <Footer />
        </div>
    );
}
