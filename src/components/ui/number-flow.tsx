"use client"

import NumberFlowReact, { continuous, type Format } from "@number-flow/react"

import { cn } from "@/lib/utils"

interface NumberFlowProps {
    value: number | string
    format?: Format
    className?: string
}

const TRANSFORM_TIMING: EffectTiming = {
    duration: 850,
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    fill: "both",
}

const SPIN_TIMING: EffectTiming = {
    duration: 950,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fill: "both",
}

const OPACITY_TIMING: EffectTiming = {
    duration: 220,
    easing: "ease-out",
    fill: "both",
}

export default function NumberFlow({ value, format, className }: NumberFlowProps) {
    const baseClassName = cn("inline-flex tabular-nums items-baseline", className)

    if (typeof value !== "number") {
        return <span className={baseClassName}>{value}</span>
    }

    return (
        <NumberFlowReact
            value={value}
            format={format}
            plugins={[continuous]}
            trend={(previous, next) => Math.sign(next - previous)}
            transformTiming={TRANSFORM_TIMING}
            spinTiming={SPIN_TIMING}
            opacityTiming={OPACITY_TIMING}
            willChange
            className={baseClassName}
        />
    )
}
