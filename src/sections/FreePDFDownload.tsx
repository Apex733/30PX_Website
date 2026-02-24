import React, { useState } from "react";
import { Button } from "@/components/ui/button";

export function FreePDFDownload() {
    const [email, setEmail] = useState("");
    const [occupation, setOccupation] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !occupation) return;

        setStatus("submitting");

        try {
            const response = await fetch("https://hook.eu1.make.com/uz2lup28vd8xawp5ca9r757kjc2xp9xu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, occupation }),
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
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    Get Your Free Digital Guide
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
                    Discover the secrets to scaling your agency with our exclusive PDF. Enter your details below to download it instantly.
                </p>

                {status === "success" ? (
                    <div className="bg-primary/10 text-primary p-6 rounded-2xl border border-primary/20 max-w-md mx-auto">
                        <h3 className="text-xl font-semibold mb-2">Success!</h3>
                        <p>Check your email for your free PDF.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-card w-full max-w-md mx-auto p-8 rounded-3xl shadow-xl border border-border/50 text-left relative overflow-hidden">
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
                                    className="block w-full rounded-xl border-border bg-background focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                    placeholder="you@company.com"
                                    disabled={status === "submitting"}
                                />
                            </div>

                            <div>
                                <label htmlFor="occupation" className="block text-sm font-medium text-foreground mb-1.5">
                                    Occupation
                                </label>
                                <input
                                    type="text"
                                    id="occupation"
                                    value={occupation}
                                    onChange={(e) => setOccupation(e.target.value)}
                                    required
                                    className="block w-full rounded-xl border-border bg-background focus:border-primary focus:ring-primary h-12 px-4 shadow-sm"
                                    placeholder="e.g. Agency Owner"
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
                                className="w-full h-12 text-base font-semibold rounded-xl mt-4"
                                disabled={status === "submitting"}
                            >
                                {status === "submitting" ? "Sending..." : "Download Now"}
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </section>
    );
}
