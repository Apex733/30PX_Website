"use client";

import React, { createContext, useContext } from "react";
import {
    useScroll,
    useVelocity,
    useSpring,
    type MotionValue,
} from "framer-motion";

interface SharedScrollContextValue {
    scrollY: MotionValue<number>;
    scrollVelocity: MotionValue<number>;
    smoothVelocity: MotionValue<number>;
}

const SharedScrollContext = createContext<SharedScrollContextValue | null>(null);

/**
 * Single scroll provider for the entire app.
 * Calls useScroll(), useVelocity(), and useSpring() exactly ONCE,
 * instead of once per VelocityScroll instance + Header.
 */
export function SharedScrollProvider({ children }: { children: React.ReactNode }) {
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 120,
        stiffness: 200,
    });

    return (
        <SharedScrollContext.Provider value={{ scrollY, scrollVelocity, smoothVelocity }}>
            {children}
        </SharedScrollContext.Provider>
    );
}

/**
 * Hook to consume the shared scroll values.
 * Must be used within a SharedScrollProvider.
 */
export function useSharedScroll(): SharedScrollContextValue {
    const ctx = useContext(SharedScrollContext);
    if (!ctx) {
        throw new Error("useSharedScroll must be used within a SharedScrollProvider");
    }
    return ctx;
}
