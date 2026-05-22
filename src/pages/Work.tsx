import { Header } from "@/components/ui/header";
import { SEO } from "@/components/SEO";
import { Footer } from "@/components/ui/footer-section";
import { LatestWork, portfolioProjects } from "@/sections/LatestWork";
import Testimonials from "@/components/ui/testimonials";

const workPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "30PX Work Portfolio",
    description: "Branding, web design, product design, SaaS UI/UX, product imagery, and AI-assisted campaign case studies from 30PX.",
    url: "https://thirtypixels.com/work",
    about: [
        "Brand identity design",
        "Website design",
        "Product design",
        "SaaS UI/UX",
        "AI-assisted campaigns",
        "Social media creative"
    ],
    mainEntity: {
        "@type": "ItemList",
        itemListElement: portfolioProjects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `https://thirtypixels.com${project.href}`,
            name: project.name,
            description: project.description
        }))
    }
};

export default function Work() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground antialiased selection:bg-primary/10 flex flex-col">
            <SEO
                title="Our Work - 30PX Portfolio | Branding, Web Design, Product Design, AI Campaigns"
                description="Explore 30PX case studies in branding, web design, product design, SaaS UI/UX, AI product imagery, social campaigns, and launch creative for real client projects."
                keywords="design portfolio, branding case studies, web design portfolio, product design portfolio, AI campaign examples, SaaS UI UX case study, social media campaign design, product imagery, creative agency portfolio"
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(workPageSchema) }}
            />
            <Header />

            <main className="flex-grow pt-24 pb-8">
                <LatestWork layout="wide" />
                <Testimonials />
            </main>

            <Footer />
        </div>
    );
}
