"use client";

import { SectionHeading } from "@/components/ui/section-heading"
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ArrowRight } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function Featured_05() {
    return (
        <section className="relative w-full mx-auto overflow-hidden bg-[#FAFAFA] px-6 py-16 md:px-16 md:py-24">
            <div className="container mx-auto flex flex-col-reverse items-center justify-between gap-24 md:flex-row md:gap-12">
                <div className="z-20 max-w-xl text-center md:text-left">
                    <SectionHeading
                        badge="Global Network"
                        title={<>Your creative team, <span className="text-[#7C3AED]">assembled.</span></>}
                        description="We're not an agency. We're a curated network of veteran freelance designers from six continents—united by craft, driven by deadlines."
                        align="left"
                    />
                    <div className="flex justify-center md:justify-start">
                        <ShimmerButton background="#7C3AED" className="shadow-2xl">
                            <span className="flex items-center gap-2 font-semibold">
                                Start for $24 <ArrowRight className="h-4 w-4" />
                            </span>
                        </ShimmerButton>
                    </div>
                </div>
                <div
                    className="relative h-[350px] w-full max-w-xl flex items-center justify-center md:h-[400px]"
                    style={{ clipPath: "inset(-100% -100% 0 -100%)" }}
                >
                    <Globe className="scale-[1.35] md:scale-[1.6] translate-y-4 md:translate-y-10" />
                </div>
            </div>
            {/* White gradient fade at the bottom of the section */}
            <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-[#FAFAFA] via-[#FAFAFA]/90 to-transparent pointer-events-none z-10" />
        </section>
    );
}

const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => { },
    devicePixelRatio: Math.min(window.devicePixelRatio, 1.5),
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 4000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [124 / 255, 58 / 255, 237 / 255], // #7C3AED (Violet)
    glowColor: [1, 1, 1],
    markers: [
        { location: [14.5995, 120.9842], size: 0.03 },
        { location: [19.076, 72.8777], size: 0.1 },
        { location: [23.8103, 90.4125], size: 0.05 },
        { location: [30.0444, 31.2357], size: 0.07 },
        { location: [39.9042, 116.4074], size: 0.08 },
        { location: [-23.5505, -46.6333], size: 0.1 },
        { location: [19.4326, -99.1332], size: 0.1 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [34.6937, 135.5022], size: 0.05 },
        { location: [41.0082, 28.9784], size: 0.06 },
    ],
}

export function Globe({
    className,
    config = GLOBE_CONFIG,
}: {
    className?: string
    config?: COBEOptions
}) {
    let phi = 0
    let width = 0
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pointerInteracting = useRef(null)
    const pointerInteractionMovement = useRef(0)
    const [r, setR] = useState(0)

    const updatePointerInteraction = (value: any) => {
        pointerInteracting.current = value
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value ? "grabbing" : "grab"
        }
    }

    const updateMovement = (clientX: any) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            setR(delta / 200)
        }
    }

    const isVisibleRef = useRef(false)
    const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null)

    const onRender = useCallback(
        (state: Record<string, any>) => {
            if (!isVisibleRef.current) return // Skip rendering when off-screen
            if (!pointerInteracting.current) phi += 0.003
            state.phi = phi + r
            state.width = width * 2
            state.height = width * 2
        },
        [r],
    )

    const onResize = () => {
        if (canvasRef.current) {
            width = canvasRef.current.offsetWidth
        }
    }

    useEffect(() => {
        window.addEventListener("resize", onResize)
        onResize()

        const globe = createGlobe(canvasRef.current!, {
            ...config,
            width: width * 2,
            height: width * 2,
            onRender,
        })
        globeRef.current = globe

        setTimeout(() => (canvasRef.current!.style.opacity = "1"))

        // Visibility observer — skip rendering when off-screen
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting
            },
            { rootMargin: "200px" }
        )
        if (canvasRef.current) {
            observer.observe(canvasRef.current)
        }

        return () => {
            globe.destroy()
            observer.disconnect()
            window.removeEventListener("resize", onResize)
        }
    }, [])

    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
                className,
            )}
        >
            <canvas
                className={cn(
                    "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
                )}
                ref={canvasRef}
                onPointerDown={(e) =>
                    updatePointerInteraction(
                        e.clientX - pointerInteractionMovement.current,
                    )
                }
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updateMovement(e.clientX)}
                onTouchMove={(e) =>
                    e.touches[0] && updateMovement(e.touches[0].clientX)
                }
            />
        </div>
    )
}
