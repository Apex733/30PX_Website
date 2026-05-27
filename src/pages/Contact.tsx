import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/ui/footer-section";
import { FreePDFDownload } from "@/sections/FreePDFDownload";
import { Logos } from "@/sections/Logos";
import { JourneyTimeline } from "@/sections/JourneyTimeline";

export default function Contact() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <SEO
                title="Contact — Get in Touch with 30PX"
                description="Ready to start? Send us a message and we will get back to you within 24 hours. No pressure. No contracts."
                keywords="contact 30PX, hire design agency, design inquiry, get started"
            />
            <Header />

            <main className="flex-grow pt-32 pb-8">
                <h1 className="sr-only">Contact 30PX</h1>
                <FreePDFDownload
                    title="Send us a message."
                    subtitle="Tell us about your project, your timeline, and your budget. We will follow up with a clear plan."
                    submitLabel="Send message"
                    successTitle="Message sent."
                    successMessage="We will get back to you within 24 hours."
                    secondFieldLabel="Message"
                    secondFieldPlaceholder="Tell us about your project..."
                />

                <Logos />
                <JourneyTimeline />
            </main>

            <Footer />
        </div>
    );
}
