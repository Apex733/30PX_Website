import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                destructive:
                    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                outline:
                    "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md px-8",
                icon: "h-10 w-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
    /** Set to false to disable the liquid ripple hover effect */
    ripple?: boolean
}

// Liquid ripple effect hook
function useRipple(enabled: boolean) {
    const containerRef = React.useRef<HTMLElement>(null);

    const handlePointerDown = React.useCallback(
        (e: React.PointerEvent) => {
            if (!enabled) return;
            const el = containerRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height) * 2.5;

            const ripple = document.createElement("span");
            ripple.className = "btn-ripple";
            ripple.style.cssText = `
                position: absolute;
                left: ${x - size / 2}px;
                top: ${y - size / 2}px;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: currentColor;
                opacity: 0.12;
                transform: scale(0);
                pointer-events: none;
                animation: btn-ripple-expand 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
            `;
            el.appendChild(ripple);

            ripple.addEventListener("animationend", () => {
                ripple.remove();
            });
        },
        [enabled],
    );

    return { containerRef, handlePointerDown };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ripple = true, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        const { containerRef, handlePointerDown } = useRipple(ripple && variant !== "link" && variant !== "ghost");

        // Merge refs
        const mergedRef = React.useCallback(
            (node: HTMLButtonElement | null) => {
                (containerRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
                if (typeof ref === "function") ref(node);
                else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
            },
            [ref, containerRef],
        );

        return (
            <Comp
                className={cn(
                    buttonVariants({ variant, size, className }),
                    ripple && variant !== "link" && variant !== "ghost" && "relative overflow-hidden",
                )}
                ref={mergedRef}
                onPointerDown={(e: React.PointerEvent<HTMLButtonElement>) => {
                    handlePointerDown(e);
                    props.onPointerDown?.(e);
                }}
                {...props}
            />
        )
    },
)
Button.displayName = "Button"

export { Button, buttonVariants }
