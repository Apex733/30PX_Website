import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import React from "react"

interface SectionHeadingProps {
    title: React.ReactNode
    description?: React.ReactNode
    badge?: string
    align?: "left" | "center" | "right"
    className?: string
}

export function SectionHeading({
    title,
    description,
    badge,
    align = "left",
    className,
}: SectionHeadingProps) {
    return (
        <div className={cn("flex flex-col gap-4 mb-12", {
            "items-start text-left": align === "left",
            "items-center text-center": align === "center",
            "items-end text-right": align === "right",
        }, className)}>
            {badge && (
                <Badge variant="secondary" className="text-primary bg-primary/10 hover:bg-primary/20 rounded-md mb-2">
                    {badge}
                </Badge>
            )}
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight">
                {title}
            </h2>
            {description && (
                <p className="text-lg text-muted-foreground max-w-2xl">
                    {description}
                </p>
            )}
        </div>
    )
}
