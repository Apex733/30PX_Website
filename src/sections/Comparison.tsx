import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";

const images = import.meta.glob<{ default: string }>(
    "/Hero Carousel/untitled folder/*.{jpg,png}",
    { eager: true }
);

const beforeSrc = Object.entries(images).find(([path]) => path.includes("before.webp"))?.[1].default;
const afterSrc = Object.entries(images).find(([path]) => path.includes("After.webp"))?.[1].default;

export function Comparison() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-12">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold">Make a lasting impression.</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">See the difference 30PX makes for your brand visuals.</p>
                </div>
                <div className="w-full max-w-7xl mx-auto">
                    <div className="rounded-lg border-2 overflow-hidden aspect-[16/9] shadow-2xl">
                        <ImageComparisonSlider
                            leftImage={beforeSrc || ""} // Before
                            rightImage={afterSrc || ""} // After
                            altLeft="Before 30PX"
                            altRight="After 30PX"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
