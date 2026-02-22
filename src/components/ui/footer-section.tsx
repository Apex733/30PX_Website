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
            text: "hello@thirtypixels.com",
            href: "mailto:hello@thirtypixels.com",
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
        const isAnchor = href.startsWith("#") && href !== "#"; // e.g. #services
        const isInternal = href.startsWith("/") && !href.startsWith("//"); // e.g. /privacy

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

        if (isAnchor) {
            // Smooth scroll to section
            return (
                <a
                    href={href}
                    className={className}
                    onClick={(e) => {
                        e.preventDefault();
                        const el = document.getElementById(href.slice(1));
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                        } else {
                            window.location.href = `/#/?scrollTo=${href.slice(1)}`;
                        }
                    }}
                    {...props}
                >
                    {children}
                </a>
            );
        }

        // Internal routes: use /#/path for HashRouter
        const resolvedHref = isInternal ? `/#${href}` : href;

        return (
            <a href={resolvedHref} className={className} {...props}>
                {children}
            </a>
        );
    };

    return (
        <footer className="bg-[#171717] relative h-fit overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 md:px-12 py-14 z-40 relative">
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
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-[22px] w-auto" fill="currentColor">
                                <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.466h-1.61v-3.558h-.684c-.547 0-.84.41-.84 1.092v2.466h-1.61v-4.874h1.61v.74c.264-.574.626-.74 1.163-.74h1.972v.74c.264-.574.625-.74 1.162-.74h.527v1.316zm-6.786 1.501h-3.359c.088.546.43.858 1.006.858.43 0 .732-.175.83-.487l1.425.4c-.351.848-1.22 1.364-2.255 1.364-1.748 0-2.549-1.355-2.549-2.515 0-1.14.703-2.505 2.45-2.505 1.856 0 2.471 1.384 2.471 2.408 0 .224-.01.37-.02.477zm-1.562-.945c-.04-.42-.342-.81-.889-.81-.508 0-.81.225-.908.81h1.797zM7.508 15.44h1.416l1.767-4.874h-1.62l-.86 2.837-.878-2.837H5.72l1.787 4.874zm-6.6 0H2.51v-3.558h1.524v3.558h1.591v-4.874H2.51v-.302c0-.332.235-.536.606-.536h.918V8.412H2.85c-1.162 0-1.943.712-1.943 1.755v.4H0v1.316h.908v3.558z" />
                            </svg>
                        </FooterLink>
                    </div>

                    {/* Copyright & Links */}
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-center md:text-left text-neutral-500">
                            &copy; {new Date().getFullYear()} 30Pixels. All rights reserved.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-neutral-500">
                            <FooterLink href="/privacy" className="hover:text-[#3ca2fa] transition-colors">Privacy Policy</FooterLink>
                            <span className="hidden sm:inline">•</span>
                            <FooterLink href="/terms" className="hover:text-[#3ca2fa] transition-colors">Terms of Use</FooterLink>
                            <span className="hidden sm:inline">•</span>
                            <FooterLink href="/cookies" className="hover:text-[#3ca2fa] transition-colors">Cookie Policy</FooterLink>
                            <span className="hidden sm:inline">•</span>
                            <FooterLink href="/dmca" className="hover:text-[#3ca2fa] transition-colors">DMCA</FooterLink>
                        </div>
                    </div>
                </div>
            </div>



            <FooterBackgroundGradient />
        </footer>
    );
}
