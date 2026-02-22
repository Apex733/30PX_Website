
import {
    SliderBtnGroup,
    ProgressSlider,
    SliderBtn,
    SliderContent,
    SliderWrapper,
} from '@/components/ui/progressive-carousel';

const result = import.meta.glob<{ default: string }>(
    "/Hero Carousel/untitled folder/*.mp4",
    { eager: true }
);

// Helper to find video by filename (since import.meta.glob keys are full paths)
const findVideo = (filename: string) => {
    const entry = Object.entries(result).find(([path]) => path.includes(filename));
    return entry ? entry[1].default : "";
};

const showreelSrc = findVideo("Showreel.mp4");
const websiteShowSrc = findVideo("Website-Show.mp4");
const logoAnimationSrc = findVideo("logo-animation.mp4");
const adsDesignSrc = findVideo("Ads-Design.mp4");

const items = [
    {
        type: 'video',
        src: showreelSrc,
        title: 'High-End Design',
        desc: 'Premium visuals that elevate your brand perception instantly.',
        sliderName: 'design',
    },
    {
        type: 'video',
        src: websiteShowSrc,
        title: 'Strategic Branding',
        desc: 'Cohesive identity systems that tell your unique story.',
        sliderName: 'branding',
    },
    {
        type: 'video',
        src: logoAnimationSrc,
        title: 'Social Media',
        desc: 'Engaging content designed to stop the scroll and drive action.',
        sliderName: 'social',
    },
    {
        type: 'video',
        src: adsDesignSrc,
        title: 'Future Tech',
        sliderName: 'tech',
        desc: 'Cutting-edge styles incorporating the latest in design trends.',
    },
];

export function Showcase() {
    return (
        <section className="py-16 bg-background border-t">
            <div className="container mx-auto px-4 md:px-12 max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl font-bold">Our Work Speaks for Itself.</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">See what's possible with a dedicated design team.</p>
                </div>
            </div>

            <div className="w-full">
                <ProgressSlider vertical={false} activeSlider='design'>
                    <SliderContent>
                        {items.map((item, index) => (
                            <SliderWrapper key={index} value={item?.sliderName}>
                                {item.type === 'video' ? (
                                    <video
                                        className='w-full h-[550px] md:h-[700px] object-cover'
                                        src={item.src}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload='metadata'
                                    />
                                ) : (
                                    <img
                                        className='w-full h-[550px] md:h-[700px] object-cover'
                                        src={item.src}
                                        alt={item.desc}
                                        width="1200"
                                        height="700"
                                        loading="lazy"
                                    />
                                )}
                            </SliderWrapper>
                        ))}
                    </SliderContent>

                    <SliderBtnGroup className='container mx-auto px-4 md:px-12 max-w-6xl mt-6 h-fit text-black/80 dark:text-white/80 bg-muted/50 backdrop-blur-md overflow-hidden grid grid-cols-2 md:grid-cols-4 rounded-lg border border-muted-foreground/10'>
                        {items.map((item, index) => (
                            <SliderBtn
                                key={index}
                                value={item?.sliderName}
                                className='text-left cursor-pointer p-6 border-r border-muted-foreground/10 last:border-r-0 transition-colors hover:bg-muted/30'
                                progressBarClass='bg-primary h-[2px] top-0'
                            >
                                <h3 className='font-bold text-lg mb-2 text-foreground'>
                                    {item.title}
                                </h3>
                                <p className='text-sm text-muted-foreground line-clamp-2'>{item.desc}</p>
                            </SliderBtn>
                        ))}
                    </SliderBtnGroup>
                </ProgressSlider>
            </div>
        </section>
    );
}
