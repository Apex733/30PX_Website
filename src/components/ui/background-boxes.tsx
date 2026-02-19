"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
            }}
            className={cn(
                "absolute left-1/4 p-4 -top-1/4 w-full h-full z-0",
                className
            )}
            {...rest}
        >
            {/* CSS Grid Pattern - No DOM elements needed */}
            <div
                className="w-full h-full relative"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgb(51 65 85 / 0.4) 1px, transparent 1px),
                        linear-gradient(to bottom, rgb(51 65 85 / 0.4) 1px, transparent 1px)
                    `,
                    backgroundSize: '64px 32px',
                }}
            >
                {/* Hover glow effect */}
                <div
                    className="absolute pointer-events-none transition-opacity duration-300"
                    style={{
                        left: mousePosition.x - 100,
                        top: mousePosition.y - 100,
                        width: 200,
                        height: 200,
                        background: 'radial-gradient(circle, rgba(125, 211, 252, 0.15) 0%, transparent 70%)',
                        opacity: mousePosition.x && mousePosition.y ? 1 : 0,
                    }}
                />
                {/* Plus signs pattern using CSS */}
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='64' viewBox='0 0 128 64'%3E%3Cpath d='M64 20v24M76 32H52' stroke='rgb(51,65,85)' stroke-width='1' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                        backgroundSize: '128px 64px',
                    }}
                />
            </div>
        </div>
    );
};

export const Boxes = React.memo(BoxesCore);
