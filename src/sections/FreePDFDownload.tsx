import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface FreePDFDownloadProps {
    title?: string;
    subtitle?: string;
    submitLabel?: string;
    successTitle?: string;
    successMessage?: string;
    secondFieldLabel?: string;
    secondFieldPlaceholder?: string;
    webhookUrl?: string;
}

export function FreePDFDownload({
    title = "How top agencies use AI to ship faster.",
    subtitle = "A practical guide for founders and creative leads. Enter your details and we will send it over.",
    submitLabel = "Download Now",
    successTitle = "Done.",
    successMessage = "Check your email. The guide is on its way.",
    secondFieldLabel = "Occupation",
    secondFieldPlaceholder = "e.g. Agency Owner",
    webhookUrl = "https://hook.eu1.make.com/uz2lup28vd8xawp5ca9r757kjc2xp9xu",
}: FreePDFDownloadProps) {
    const [email, setEmail] = useState("");
    const [secondField, setSecondField] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !secondField) return;

        setStatus("submitting");

        try {
            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, [secondFieldLabel.toLowerCase()]: secondField }),
            });

            if (response.ok) {
                setStatus("success");
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setStatus("error");
        }
    };

    return (
        <section className="py-24 bg-background border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Text Content */}
                    <div className="text-left">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                            {title}
                        </h2>
                        <p className="mt-6 text-lg text-muted-foreground">
                            {subtitle}
                        </p>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full max-w-md mx-auto md:ml-auto md:mr-0">
                        {status === "success" ? (
                            <div className="bg-primary/10 text-primary p-6 rounded-[5px] border border-primary/20">
                                <h3 className="text-xl font-semibold mb-2">{successTitle}</h3>
                                <p>{successMessage}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-card w-full p-8 rounded-[5px] border border-border/50 text-left relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10"></div>

                                <div className="space-y-6 relative z-10">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="block w-full rounded-[5px] border border-border bg-background focus:border-primary focus:ring-primary h-12 px-4 outline-none"
                                            placeholder="you@company.com"
                                            disabled={status === "submitting"}
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="secondField" className="block text-sm font-medium text-foreground mb-1.5">
                                            {secondFieldLabel}
                                        </label>
                                        <input
                                            type="text"
                                            id="secondField"
                                            value={secondField}
                                            onChange={(e) => setSecondField(e.target.value)}
                                            required
                                            className="block w-full rounded-[5px] border border-border bg-background focus:border-primary focus:ring-primary h-12 px-4 outline-none"
                                            placeholder={secondFieldPlaceholder}
                                            disabled={status === "submitting"}
                                        />
                                    </div>

                                    {status === "error" && (
                                        <p className="text-destructive text-sm font-medium">
                                            Something went wrong. Please try again.
                                        </p>
                                    )}

                                    <Button
                                        type="submit"
                                        className="w-full h-12 text-base font-semibold rounded-full mt-4"
                                        disabled={status === "submitting"}
                                    >
                                        {status === "submitting" ? "Sending..." : submitLabel}
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
