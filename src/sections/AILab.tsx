import React from 'react';
import {
    ArrowRight,
    FileText,
    Image,
    Link2,
    MessageSquare,
    Mic,
    Video,
    type LucideIcon,
} from 'lucide-react';
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type IncomingItem = {
    id: string;
    label: string;
    meta: string;
    icon: LucideIcon;
    widthClass: string;
};

type IncomingFlowStep = {
    itemId: IncomingItem['id'];
    top: string;
    travel: string;
};

type ActiveIncomingCard = {
    instanceId: number;
    item: IncomingItem;
    top: string;
    travel: string;
};

type OutgoingItem = {
    id: string;
    description: string;
    owner: string;
    surfaceClass: string;
    top: string;
    delay: string;
    travel: string;
    widthClass: string;
};

const incomingItems: IncomingItem[] = [
    {
        id: 'links',
        label: 'Link dump',
        meta: 'Drive, Loom, Pinterest, old site, one broken URL',
        icon: Link2,
        widthClass: 'w-[244px]',
    },
    {
        id: 'voice-note',
        label: 'Audio note 2:13',
        meta: 'Rushed feedback, context jumps, "maybe like this"',
        icon: Mic,
        widthClass: 'w-[252px]',
    },
    {
        id: 'video',
        label: 'Video walkthrough',
        meta: 'Screen recording, loose examples, changing ideas',
        icon: Video,
        widthClass: 'w-[256px]',
    },
    {
        id: 'screens',
        label: 'Image folder',
        meta: 'Screenshots, inspo refs, marked-up scraps, duplicates',
        icon: Image,
        widthClass: 'w-[256px]',
    },
    {
        id: 'notes',
        label: 'Text doc + PDF',
        meta: 'Half brief, pasted copy, edits, unfinished lines',
        icon: FileText,
        widthClass: 'w-[250px]',
    },
    {
        id: 'messages',
        label: 'Client messages',
        meta: 'Late replies, new asks, shifting priorities',
        icon: MessageSquare,
        widthClass: 'w-[258px]',
    },
];

const incomingFlowSequence: IncomingFlowStep[] = [
    {
        itemId: 'links',
        top: '14%',
        travel: 'clamp(185px, 20vw, 320px)',
    },
    {
        itemId: 'voice-note',
        top: '42%',
        travel: 'clamp(205px, 22vw, 340px)',
    },
    {
        itemId: 'video',
        top: '70%',
        travel: 'clamp(220px, 23vw, 360px)',
    },
    {
        itemId: 'screens',
        top: '14%',
        travel: 'clamp(195px, 21vw, 330px)',
    },
    {
        itemId: 'notes',
        top: '42%',
        travel: 'clamp(225px, 24vw, 370px)',
    },
    {
        itemId: 'messages',
        top: '70%',
        travel: 'clamp(180px, 19vw, 305px)',
    },
];

const incomingFlowDurationMs = 4000;
const incomingFlowCadenceMs = 1400;

const outgoingItems: OutgoingItem[] = [
    {
        id: 'brand-card',
        description: 'Brand notes become a clear creative direction.',
        owner: 'Designer',
        surfaceClass: 'bg-[#edf3ff] border-[#c8d7ff]',
        top: '50%',
        delay: '0s',
        travel: 'clamp(170px, 18vw, 280px)',
        widthClass: 'w-[250px]',
    },
    {
        id: 'landing-card',
        description: 'Landing notes become a ready-to-build block.',
        owner: 'Developer',
        surfaceClass: 'bg-[#f4efff] border-[#ddd1ff]',
        top: '50%',
        delay: '3s',
        travel: 'clamp(170px, 18vw, 280px)',
        widthClass: 'w-[252px]',
    },
    {
        id: 'social-pack',
        description: 'Mixed campaign files become a clean social pack.',
        owner: 'Marketer',
        surfaceClass: 'bg-[#edf8ff] border-[#c9e8ff]',
        top: '50%',
        delay: '6s',
        travel: 'clamp(170px, 18vw, 280px)',
        widthClass: 'w-[252px]',
    },
    {
        id: 'motion-ready',
        description: 'Visual references become a motion-ready handoff.',
        owner: 'Editor',
        surfaceClass: 'bg-[#eff6ff] border-[#d4e2ff]',
        top: '50%',
        delay: '9s',
        travel: 'clamp(170px, 18vw, 280px)',
        widthClass: 'w-[252px]',
    },
];

function IncomingChip({
    item,
    className,
    style,
}: {
    item: IncomingItem;
    className?: string;
    style?: React.CSSProperties;
}) {
    const Icon = item.icon;

    return (
        <div
            className={cn(
                "flex items-center gap-3 rounded-[5px] border border-slate-200/80 bg-white px-4 py-3",
                item.widthClass,
                className
            )}
            style={style}
        >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#1f3a8a]/8 text-[#1f3a8a]">
                <Icon size={18} />
            </div>
            <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-900">{item.label}</p>
                <p className="text-xs text-slate-500">{item.meta}</p>
            </div>
        </div>
    );
}

function OutgoingChip({
    item,
    className,
    animated = false,
}: {
    item: OutgoingItem;
    className?: string;
    animated?: boolean;
}) {
    return (
        <div
            className={cn(
                "relative",
                item.widthClass,
                animated && "ai-flow-item ai-flow-item-out absolute left-0",
                className
            )}
            style={
                animated
                    ? ({
                        top: item.top,
                        '--delay': item.delay,
                        '--travel': item.travel,
                        '--flow-y': '-50%',
                    } as React.CSSProperties)
                    : undefined
            }
        >
            <div
                className={cn(
                    "rounded-[5px] border px-4 py-3",
                    item.surfaceClass
                )}
            >
                <p className="text-[11px] font-semibold text-[#1f3a8a]">Task Created</p>
                <p className="mt-2 text-sm leading-5 text-slate-700">{item.description}</p>
                <span className="mt-3 inline-flex rounded-full bg-[#1f3a8a] px-3 py-1.5 text-[10px] font-semibold text-white">
                    {item.owner} Hand Off Document
                </span>
            </div>
        </div>
    );
}

export function AILab() {
    const [isDesktopViewport, setIsDesktopViewport] = React.useState(() =>
        typeof window === 'undefined' ? false : window.innerWidth >= 1280
    );
    const [activeIncomingCards, setActiveIncomingCards] = React.useState<ActiveIncomingCard[]>([]);

    React.useEffect(() => {
        const handleResize = () => {
            setIsDesktopViewport(window.innerWidth >= 1280);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    React.useEffect(() => {
        if (!isDesktopViewport) {
            setActiveIncomingCards([]);
            return;
        }

        let isMounted = true;
        let instanceId = 0;
        let sequenceIndex = 0;
        const timeoutIds: number[] = [];

        const spawnIncomingCard = () => {
            const step = incomingFlowSequence[sequenceIndex % incomingFlowSequence.length];
            const item = incomingItems.find((entry) => entry.id === step.itemId);

            if (!item || !isMounted) {
                return;
            }

            const nextCard: ActiveIncomingCard = {
                instanceId,
                item,
                top: step.top,
                travel: step.travel,
            };

            instanceId += 1;
            sequenceIndex += 1;

            setActiveIncomingCards((current) => [...current, nextCard]);

            const timeoutId = window.setTimeout(() => {
                if (!isMounted) {
                    return;
                }

                setActiveIncomingCards((current) =>
                    current.filter((entry) => entry.instanceId !== nextCard.instanceId)
                );
            }, incomingFlowDurationMs);

            timeoutIds.push(timeoutId);
        };

        spawnIncomingCard();
        const intervalId = window.setInterval(spawnIncomingCard, incomingFlowCadenceMs);

        return () => {
            isMounted = false;
            window.clearInterval(intervalId);
            timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
        };
    }, [isDesktopViewport]);

    if (!isDesktopViewport) {
        return null;
    }

    const scrollToPricing = (event: React.MouseEvent<HTMLAnchorElement>) => {
        const pricingSection = document.getElementById('pricing');

        if (!pricingSection) {
            return;
        }

        event.preventDefault();
        pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <section className="overflow-hidden bg-background py-14 md:py-20" id="ai-lab">
            <div className="container mx-auto px-4 md:px-12">
                <div className="mx-auto max-w-3xl text-center">
                    <SectionHeading
                        badge="AI Workflow"
                        title="PDFs, videos, images, and text go in. Organized creative comes out."
                        description="The 30PX workflow pulls briefs, references, copy, footage, and feedback through one system, then reshapes them into clean cards, layouts, and deliverables."
                        align="center"
                        className="mb-0"
                    />
                </div>

                <div className="relative mt-10 overflow-hidden rounded-[5px] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#eef4ff_100%)] px-5 py-6 md:px-8 md:py-8 xl:px-10 xl:py-10">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    <div className="relative hidden min-h-[460px] items-center xl:flex">
                        <div className="relative min-h-[420px] flex-1">
                            <div className="absolute left-0 top-0">
                                <p className="text-[11px] font-semibold text-slate-500">
                                    Incoming info
                                </p>
                            </div>

                            {activeIncomingCards.map((card) => (
                                <IncomingChip
                                    key={card.instanceId}
                                    item={card.item}
                                    className="ai-flow-item ai-flow-item-in-once absolute left-0"
                                    style={
                                        {
                                            top: card.top,
                                            '--travel': card.travel,
                                            '--flow-y': '-50%',
                                        } as React.CSSProperties
                                    }
                                />
                            ))}
                        </div>

                        <div className="relative z-10 flex w-[240px] shrink-0 justify-center">
                            <div className="relative flex h-[152px] w-[204px] items-center justify-center rounded-[5px] border border-slate-200/80 bg-white">
                                <div className="relative z-10 flex items-center justify-center">
                                    <div className="ai-flow-logo-pop flex h-[78px] w-[78px] items-center justify-center rounded-[5px] bg-[#1f3a8a]">
                                        <img src="/favicon.svg" alt="30PX favicon" className="h-12 w-12" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative min-h-[420px] flex-1">
                            <div className="absolute right-0 top-0 text-right">
                                <p className="text-[11px] font-semibold text-slate-500">
                                    Outputs
                                </p>
                            </div>

                            {outgoingItems.map((item) => (
                                <OutgoingChip key={item.id} item={item} animated />
                            ))}
                        </div>
                    </div>

                    <div className="relative xl:hidden">
                        <div className="grid gap-5">
                            <div className="rounded-[5px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                                <p className="text-[11px] font-semibold text-slate-500">
                                    Incoming info
                                </p>
                                <div className="mt-4 flex flex-wrap gap-3">
                                    {incomingItems.map((item) => (
                                        <IncomingChip key={item.id} item={item} className="w-auto max-w-full" />
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-center">
                                <div className="relative flex h-[136px] w-[176px] items-center justify-center rounded-[5px] border border-slate-200/80 bg-white">
                                    <div className="relative z-10 flex items-center justify-center text-center">
                                        <div className="ai-flow-logo-pop flex h-[70px] w-[70px] items-center justify-center rounded-[5px] bg-[#1f3a8a]">
                                            <img src="/favicon.svg" alt="30PX favicon" className="h-11 w-11" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-[5px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
                                <p className="text-[11px] font-semibold text-slate-500">
                                    Outputs
                                </p>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {outgoingItems.map((item) => (
                                        <OutgoingChip key={item.id} item={item} className="w-full" />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center lg:flex-row lg:text-left">
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            Everything arrives messy. The handoff should not.
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            That is the whole point of the workflow: fewer scattered files, faster creative output.
                        </p>
                    </div>

                    <a
                        href="#pricing"
                        onClick={scrollToPricing}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1f3a8a] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
                    >
                        See Pricing
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
}
