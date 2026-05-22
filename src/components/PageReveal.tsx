import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
const REVEAL_BASE =
    "linear-gradient(90deg, rgba(224, 198, 255, 0.96) 0%, rgba(196, 223, 255, 0.9) 32%, rgba(147, 197, 253, 0.72) 58%, rgba(15, 23, 42, 0.16) 88%, rgba(15, 23, 42, 0) 100%)";
const REVEAL_HIGHLIGHT =
    "radial-gradient(circle at 18% 50%, rgba(255, 255, 255, 0.28), transparent 34%), radial-gradient(circle at 72% 38%, rgba(191, 219, 254, 0.22), transparent 30%)";

export function PageReveal() {
    const shouldReduceMotion = useReducedMotion();

    if (shouldReduceMotion) {
        return null;
    }

    return (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[110] overflow-hidden">
            <motion.div
                className="absolute inset-0 will-change-transform"
                initial={{ x: 0, scaleX: 1.015 }}
                animate={{ x: "112%", scaleX: 1 }}
                transition={{
                    duration: 1.08,
                    ease: REVEAL_EASE,
                }}
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `${REVEAL_HIGHLIGHT}, ${REVEAL_BASE}`,
                    }}
                />
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-white/10 via-white/20 to-transparent blur-2xl" />
            </motion.div>
        </div>
    );
}
