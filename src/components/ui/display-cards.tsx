"use client";

import { cn } from "@/lib/utils";
import { Sparkles, Users, Globe, TrendingUp } from "lucide-react";

interface DisplayCardProps {
    className?: string;
    cardClassName?: string;
    icon?: React.ReactNode;
    title?: string;
    description?: string;
    date?: string;
    iconClassName?: string;
    titleClassName?: string;
}

function DisplayCard({
    className,
    cardClassName,
    icon = <Sparkles className="size-4 text-primary" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "",
    iconClassName = "text-primary",
    titleClassName = "text-primary",
}: DisplayCardProps) {
    return (
        <div className={cn("group", className)}>
            <div
                className={cn(
                    "relative flex h-36 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between rounded-lg border-2 bg-muted/70 backdrop-blur-sm px-4 py-3 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[20rem] after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] group-hover:border-white/20 group-hover:bg-muted [&>*]:flex [&>*]:items-center [&>*]:gap-2",
                    cardClassName
                )}
            >
                <div>
                    <span className="relative inline-block rounded-full bg-primary/10 p-2">
                        {icon}
                    </span>
                    <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
                </div>
                <p className="whitespace-nowrap text-lg font-bold">{description}</p>
                <p className="text-muted-foreground">{date}</p>
            </div>
        </div>
    );
}

interface DisplayCardsProps {
    cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
    const defaultCards = [
        {
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-lg before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
            title: "Cost & Time Saved",
            description: "70%",
            icon: <TrendingUp className="size-4 text-green-500" />
        },
        {
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-lg before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
            title: "Brands Transformed",
            description: "110+",
            icon: <Users className="size-4 text-blue-500" />
        },
        {
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
            title: "Globally Ranked Talent",
            description: "Top 3%",
            icon: <Globe className="size-4 text-purple-500" />
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}
