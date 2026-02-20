"use client";
import React from "react";
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Instagram,
    Twitter,
    Dribbble,
    Globe,
    Youtube,
    Linkedin
} from "lucide-react";
import { cn } from "@/lib/utils";
import { FooterBackgroundGradient } from "@/components/ui/hover-footer";
import { TextHoverEffect } from "@/components/ui/hover-footer";

export function Footer() {
    // Footer link data
    const footerLinks = [
        {
            title: "Product",
            links: [
                { label: "Features", href: "#services" },
                { label: "Pricing", href: "#pricing" },
                { label: "Testimonials", href: "#reviews" },
                { label: "Integration", href: "/" },
            ],
        },
        {
            title: "Company",
            links: [
                { label: "FAQs", href: "/faqs" },
                { label: "About Us", href: "/about" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Services", href: "/terms" },
            ],
        },
    ];

    // Contact info data
    const contactInfo = [
        {
            icon: <Mail size={18} className="text-[#3ca2fa]" />,
            text: "hello@30pixels.com",
            href: "mailto:hello@30pixels.com",
        },
        {
            icon: <Phone size={18} className="text-[#3ca2fa]" />,
            text: "+1 (555) 000-0000",
            href: "#",
        },
        {
            icon: <MapPin size={18} className="text-[#3ca2fa]" />,
            text: "New York, NY",
        },
    ];

    // Social media icons
    const socialLinks = [
        { icon: <Twitter size={20} />, label: "Twitter", href: "#" },
        { icon: <Instagram size={20} />, label: "Instagram", href: "#" },
        { icon: <Youtube size={20} />, label: "Youtube", href: "#" },
        { icon: <Linkedin size={20} />, label: "LinkedIn", href: "#" },
    ];

    // Helper component for links with "Coming Soon" support
    const FooterLink = ({ href, children, className, isIcon = false, ...props }: any) => {
        const isPlaceholder = href === "#";

        if (isPlaceholder) {
            return (
                <div className={cn("relative group flex items-center", isIcon && "justify-center")}>
                    <a
                        href={href}
                        className={cn(
                            className,
                            "cursor-not-allowed opacity-70"
                        )}
                        onClick={(e) => e.preventDefault()}
                        {...props}
                    >
                        {children}
                    </a>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none shadow-lg border border-white/10 z-50">
                        Coming Soon
                    </span>
                </div>
            );
        }

        return (
            <a href={href} className={className} {...props}>
                {children}
            </a>
        );
    };

    return (
        <footer className="bg-[#171717] relative h-fit overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-12 py-14 z-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 lg:gap-16 pb-12">
                    {/* Brand section */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center space-x-2">
                            <span className="text-[#3ca2fa] text-3xl font-extrabold">
                                &hearts;
                            </span>
                            <span className="text-white text-3xl font-bold">30PX</span>
                        </div>
                        <p className="text-sm leading-relaxed text-neutral-400">
                            Unlimited design subscription service. Replace your expensive agency with a dedicated design team for a flat monthly fee.
                        </p>
                    </div>

                    {/* Footer link sections */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="text-white text-lg font-semibold mb-6">
                                {section.title}
                            </h4>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label} className="relative">
                                        <FooterLink
                                            href={link.href}
                                            className="text-neutral-400 hover:text-[#3ca2fa] transition-colors"
                                        >
                                            {link.label}
                                        </FooterLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact section */}
                    <div>
                        <h4 className="text-white text-lg font-semibold mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            {contactInfo.map((item, i) => (
                                <li key={i} className="flex items-center space-x-3 text-neutral-400">
                                    {item.icon}
                                    {item.href ? (
                                        <FooterLink href={item.href} className="hover:text-[#3ca2fa] transition-colors">
                                            {item.text}
                                        </FooterLink>
                                    ) : (
                                        <span className="hover:text-[#3ca2fa] transition-colors">
                                            {item.text}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <hr className="border-t border-white/10 my-8" />

                {/* Footer bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0 relative z-50">
                    {/* Social icons */}
                    <div className="flex space-x-6 text-gray-400 items-center">
                        {socialLinks.map(({ icon, label, href }) => (
                            <FooterLink
                                key={label}
                                href={href}
                                aria-label={label}
                                className="hover:text-[#3ca2fa] transition-colors"
                                isIcon={true}
                            >
                                {icon}
                            </FooterLink>
                        ))}
                        {/* Fiverr Icon (Official) */}
                        <FooterLink
                            href="#"
                            aria-label="Fiverr"
                            className="text-gray-400 hover:text-[#1dbf73] transition-colors"
                            isIcon={true}
                        >
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
                                <circle cx="12" cy="12" r="12" fill="none" />
                                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm3.25 10.15h-1.5v5.8h-2.3v-5.8h-1.3v-1.8h1.3V6.95c0-1.85 1.15-2.6 2.6-2.6.45 0 .9.05 1.25.15v2.05c-.25-.05-.5-.1-.75-.1-.85 0-1.1.45-1.1 1.2v.7h2v1.8h-.2z m-5.1-1.7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1.1 7.5h2.2v-7.6h-2.2v7.6z" />
                            </svg>
                        </FooterLink>
                    </div>

                    {/* Copyright & Links */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-center md:text-left text-neutral-500">
                            &copy; {new Date().getFullYear()} 30Pixels. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-neutral-500">
                            <FooterLink href="#" className="hover:text-[#3ca2fa] transition-colors">Privacy Policy</FooterLink>
                            <span className="hidden sm:inline">•</span>
                            <FooterLink href="#" className="hover:text-[#3ca2fa] transition-colors">Terms of Use</FooterLink>
                            <span className="hidden sm:inline">•</span>
                            <FooterLink href="#" className="hover:text-[#3ca2fa] transition-colors">Cookie Policy</FooterLink>
                            <span className="hidden sm:inline">•</span>
                            <FooterLink href="#" className="hover:text-[#3ca2fa] transition-colors">DMCA</FooterLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Text hover effect */}
            <div className="lg:flex hidden w-full px-0 mt-10 h-[22vw] relative z-10 pointer-events-auto">
                <TextHoverEffect text="30 PIXELS" className="z-50" />
            </div>

            <FooterBackgroundGradient />
        </footer>
    );
}
