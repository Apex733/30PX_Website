import AutoScroll from "embla-carousel-auto-scroll";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

export function Logos() {
    const logoModules = import.meta.glob<{ default: string }>(
        "/Hero Carousel/svg logos/*.svg",
        { eager: true }
    );

    const allModules = Object.entries(logoModules).map(([path, module]) => {
        const name = path.split("/").pop()?.replace(".svg", "") || "logo";
        return {
            id: name,
            description: name.replace(/-/g, " "),
            image: module.default,
            className: "h-8 w-auto", // Increased 1x from h-4
            width: 200,
            height: 64,
        };
    });

    // Duplicate logos for smooth scrolling
    const allLogos = [...allModules, ...allModules, ...allModules, ...allModules];

    return (
        <section className="py-16 md:py-24 bg-[#FAFAFA]">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-bold tracking-tight text-neutral-950">
                        Our Clients
                    </h3>
                </div>

                <div className="relative w-full overflow-hidden mask-linear-fade">
                    <div className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                        <Carousel
                            opts={{ loop: true }}
                            plugins={[
                                AutoScroll({
                                    playOnInit: true,
                                    speed: 0.8,
                                    stopOnInteraction: false,
                                }),
                            ]}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-16 select-none">
                                {allLogos.map((logo, index) => (
                                    <CarouselItem key={`logo-${index}`} className="basis-auto pl-16">
                                        <div className="flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                            <img
                                                src={logo.image}
                                                alt={`Logo of ${logo.description}`}
                                                className={logo.className}
                                                width={logo.width}
                                                height={logo.height}
                                                loading="lazy"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}
