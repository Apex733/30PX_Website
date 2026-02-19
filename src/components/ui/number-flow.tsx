"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";

interface NumberFlowProps {
    value: number | string;
    format?: Intl.NumberFormatOptions;
    className?: string;
}

export default function NumberFlow({ value, format, className }: NumberFlowProps) {
    const formatted = useMemo(() => {
        if (typeof value === 'number') {
            return new Intl.NumberFormat('en-US', format).format(value);
        }
        return value;
    }, [value, format]);

    return (
        <span className={className} style={{ display: 'inline-block', position: 'relative' }}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={formatted}
                    initial={{ filter: "blur(10px)", opacity: 0, y: -10 }}
                    animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                    exit={{ filter: "blur(10px)", opacity: 0, y: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ display: 'inline-block' }}
                >
                    {formatted}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}
