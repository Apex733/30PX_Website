"use client";
import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
    text: string;
    image: string;
    name: string;
    role: string;
    isPro?: boolean;
}

export const TestimonialsColumn = (props: {
    className?: string;
    testimonials: Testimonial[];
    duration?: number;
}) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: props.duration || 10,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-background"
            >
                {[
                    ...new Array(2).fill(0).map((_, index) => (
                        <React.Fragment key={index}>
                            {props.testimonials.map(({ text, image, name, role, isPro }, i) => (
                                <div
                                    className={`p-10 rounded-[5px] border shadow-lg max-w-xs w-full bg-card relative ${isPro ? "border-yellow-500 shadow-yellow-500/10" : "shadow-primary/10"
                                        }`}
                                    key={i}
                                >
                                    {isPro && (
                                        <div className="absolute -top-3 -right-3 bg-yellow-500 text-black p-1.5 rounded-full shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                        </div>
                                    )}
                                    <div>{text}</div>
                                    <div className="flex items-center gap-2 mt-5">
                                        <img
                                            width={40}
                                            height={40}
                                            src={image}
                                            alt={name}
                                            loading="lazy"
                                            className={`h-10 w-10 rounded-full ${isPro ? "ring-2 ring-yellow-500 ring-offset-2 ring-offset-card" : ""}`}
                                        />
                                        <div className="flex flex-col">
                                            <div className="font-medium tracking-tight leading-5 flex items-center gap-1">
                                                {name}
                                            </div>
                                            <div className="leading-5 opacity-60 tracking-tight">{role}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </React.Fragment>
                    )),
                ]}
            </motion.div>
        </div>
    );
};
