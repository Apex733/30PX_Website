import * as React from "react";
import { cn } from "@/lib/utils";

export function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="mt-2 text-sm font-medium text-red-600">{message}</p>;
}

export function Label({
    children,
    optional,
}: {
    children: React.ReactNode;
    optional?: boolean;
}) {
    return (
        <label className="mb-2 block text-sm font-semibold text-neutral-900">
            {children}
            {optional && <span className="font-normal text-neutral-500"> Optional</span>}
        </label>
    );
}

export function TextInput({
    error,
    className,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: string }) {
    return (
        <input
            {...props}
            className={cn(
                "h-12 w-full rounded-[5px] border bg-white px-4 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
                error ? "border-red-300" : "border-neutral-200",
                className,
            )}
        />
    );
}

export function TextArea({
    error,
    className,
    ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }) {
    return (
        <textarea
            {...props}
            className={cn(
                "min-h-[138px] w-full resize-y rounded-[5px] border bg-white px-4 py-3 text-base text-neutral-950 outline-none transition-colors placeholder:text-neutral-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20",
                error ? "border-red-300" : "border-neutral-200",
                className,
            )}
        />
    );
}
