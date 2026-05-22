import { Check, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    FileItem,
    MIN_BUDGET,
    OrderDraft,
    StepId,
    formatCurrency,
    selectedServiceLabel,
    steps,
} from "./config";

export function StepHeader({
    currentStep,
    currentIndex,
    onJump,
}: {
    currentStep: StepId;
    currentIndex: number;
    onJump: (index: number) => void;
}) {
    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-violet-700">
                        Step {currentIndex + 1} of {steps.length}
                    </p>
                    <h1 className="mt-1 text-2xl font-bold text-neutral-950 md:text-4xl">
                        Start your project
                    </h1>
                </div>
                <div className="hidden rounded-[5px] border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800 md:block">
                    Min order {formatCurrency(MIN_BUDGET)}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                {steps.map((step, index) => {
                    const isActive = step.id === currentStep;
                    const isDone = index < currentIndex;

                    return (
                        <button
                            key={step.id}
                            type="button"
                            onClick={() => index <= currentIndex && onJump(index)}
                            disabled={index > currentIndex}
                            className={cn(
                                "min-h-[46px] rounded-[5px] border px-2 text-xs font-semibold transition-colors",
                                isActive && "border-violet-500 bg-violet-600 text-white",
                                isDone && !isActive && "border-emerald-200 bg-emerald-50 text-emerald-800",
                                !isActive && !isDone && "border-neutral-200 bg-white text-neutral-500",
                                index > currentIndex && "cursor-not-allowed opacity-70",
                            )}
                        >
                            <span className="flex items-center justify-center gap-1">
                                {isDone && <Check className="h-3.5 w-3.5" />}
                                {step.shortLabel}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export function SummaryPanel({
    budget,
    finalAmount,
    draft,
    files,
}: {
    budget: number;
    finalAmount: number;
    draft: OrderDraft;
    files: FileItem[];
}) {
    return (
        <aside className="rounded-[5px] border border-neutral-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
            <div className="flex items-center gap-3 border-b border-neutral-100 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-[5px] bg-neutral-950 text-white">
                    <LayoutDashboard className="h-5 w-5" />
                </div>
                <div>
                    <h2 className="font-bold text-neutral-950">Request summary</h2>
                    <p className="text-sm text-neutral-500">Saved on this device</p>
                </div>
            </div>

            <dl className="mt-5 space-y-4 text-sm">
                <div className="flex items-start justify-between gap-4">
                    <dt className="text-neutral-500">Service</dt>
                    <dd className="max-w-[160px] text-right font-semibold text-neutral-950">
                        {selectedServiceLabel(draft.service)}
                    </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                    <dt className="text-neutral-500">Timeline</dt>
                    <dd className="max-w-[160px] text-right font-semibold text-neutral-950">
                        {draft.timeline}
                    </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                    <dt className="text-neutral-500">Files</dt>
                    <dd className="text-right font-semibold text-neutral-950">
                        {files.length} attached
                    </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                    <dt className="text-neutral-500">Budget</dt>
                    <dd className="text-right font-semibold text-neutral-950">
                        {formatCurrency(budget)}
                    </dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                    <dt className="text-neutral-500">Referral</dt>
                    <dd className={cn("text-right font-semibold", draft.referralUnlocked ? "text-emerald-700" : "text-neutral-950")}>
                        {draft.referralUnlocked ? "-5%" : "Not unlocked"}
                    </dd>
                </div>
            </dl>

            <div className="mt-5 rounded-[5px] border border-neutral-200 bg-neutral-50 p-4">
                <p className="text-sm text-neutral-500">Estimated total</p>
                <p className="mt-1 text-3xl font-bold text-neutral-950">{formatCurrency(finalAmount)}</p>
                <p className="mt-2 text-xs leading-5 text-neutral-500">
                    Final pricing is confirmed after we review the scope.
                </p>
            </div>
        </aside>
    );
}
