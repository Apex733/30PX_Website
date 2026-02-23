import { SectionHeading } from "@/components/ui/section-heading";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";

export function Industries() {
    return (
        <section className="py-12 md:py-16 bg-muted/30" id="industries">
            <div className="container mx-auto mb-12">
                <SectionHeading
                    badge="Industries"
                    title="Designed for every industry."
                    description="We've delivered 500+ projects across every sector."
                    align="center"
                />
            </div>

            <div className="w-full">
                <VelocityScroll
                    default_velocity={1}
                    className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black/5 dark:text-white/5 drop-shadow-sm md:text-7xl md:leading-[5rem]"
                >
                    Tech & AI • SaaS • Agencies • Ecommerce • Food & Bev • Real Estate •&nbsp;
                </VelocityScroll>
                <div className="h-4"></div>
                <VelocityScroll
                    default_velocity={-1}
                    className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-foreground/10 drop-shadow-sm md:text-7xl md:leading-[5rem]"
                >
                    Fashion • Education • Finance • Health • Wellness • Home Services •&nbsp;
                </VelocityScroll>
                <div className="h-4"></div>
                <VelocityScroll
                    default_velocity={1}
                    className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black/5 dark:text-white/5 drop-shadow-sm md:text-7xl md:leading-[5rem]"
                >
                    Hospitality • Startups • Mobile Apps • Consulting • Non-Profit • Entertainment •&nbsp;
                </VelocityScroll>
            </div>
        </section>
    );
}
