import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle2,
    Clipboard,
    Clock3,
    Facebook,
    Gift,
    Info,
    Linkedin,
    Loader2,
    Mail,
    MessageCircle,
    Paperclip,
    Phone,
    RefreshCw,
    Save,
    Send,
    Share2,
    Sparkles,
    Trash2,
    UploadCloud,
    User,
    X,
} from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { lookupClientProfile, saveClientProfile, submitOrder, uploadAttachment } from "@/lib/order-api";
import { cn } from "@/lib/utils";
import { FieldError, Label, TextArea, TextInput } from "./order-request/FormPrimitives";
import { StepHeader, SummaryPanel } from "./order-request/ShellPieces";
import {
    BUDGET_STEP,
    DISCOUNT_PERCENT,
    FieldErrors,
    FileItem,
    MAX_FILE_SIZE,
    MAX_SLIDER_BUDGET,
    MAX_TOTAL_FILE_SIZE,
    MIN_BUDGET,
    OrderDraft,
    STORAGE_KEY,
    StepId,
    acceptedExtensions,
    contactMethods,
    createReferralCode,
    defaultDraft,
    formatCurrency,
    formatFileSize,
    getFileExtension,
    getFileIcon,
    goalOptions,
    isImageFile,
    listClientUsernames,
    loadDraft,
    rememberClientUsername,
    selectedServiceLabel,
    serviceOptions,
    steps,
    timelineOptions,
} from "./order-request/config";

const showcaseImages = import.meta.glob<{ default: string }>(
    "/Hero Carousel/{A,B,C,D,E,F,G,H,I,J,L,M,UI-UX,phone-ui-ux}.webp",
    { eager: true },
);

const visualStack = Object.values(showcaseImages)
    .map((module) => module.default)
    .slice(0, 6);

function OrderRequest() {
    const navigate = useNavigate();
    const [draft, setDraft] = React.useState<OrderDraft>(() => loadDraft());
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [files, setFiles] = React.useState<FileItem[]>([]);
    const [errors, setErrors] = React.useState<FieldErrors>({});
    const [fileErrors, setFileErrors] = React.useState<string[]>([]);
    const [isDragging, setIsDragging] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [requestId, setRequestId] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const filesRef = React.useRef<FileItem[]>([]);

    // Client username system state
    const [lookupUsername, setLookupUsername] = React.useState("");
    const [lookupPin, setLookupPin] = React.useState("");
    const [savedUsernames, setSavedUsernames] = React.useState<string[]>([]);
    const [profileLoaded, setProfileLoaded] = React.useState<string | null>(null);
    const [saveUsername, setSaveUsername] = React.useState("");
    const [savePin, setSavePin] = React.useState("");
    const [saveSuccess, setSaveSuccess] = React.useState(false);
    const [isLookingUpProfile, setIsLookingUpProfile] = React.useState(false);
    const [isSavingProfile, setIsSavingProfile] = React.useState(false);
    const [isSubmittingRequest, setIsSubmittingRequest] = React.useState(false);
    const [submitError, setSubmitError] = React.useState("");

    // Referral verification state
    const [referralPending, setReferralPending] = React.useState(false);

    const currentStep = steps[currentIndex].id;
    const rawBudget = draft.budgetMode === "custom" ? Number(draft.customBudget) : draft.sliderBudget;
    const budget = Number.isFinite(rawBudget) ? rawBudget : 0;
    const discountAmount = draft.referralUnlocked ? Math.round(budget * (DISCOUNT_PERCENT / 100)) : 0;
    const finalAmount = Math.max(0, budget - discountAmount);
    const totalFileSize = files.reduce((total, item) => total + item.file.size, 0);
    const shareLink = `https://thirtypixels.com/?ref=${encodeURIComponent(draft.referralCode)}`;
    const shareText = `Need a designer, a brand identity, or a website that actually converts? Check out 30PX — they deliver premium creative work at surprisingly fair prices. Worth a look 👇\n\n${shareLink}`;

    React.useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    }, [draft]);

    React.useEffect(() => {
        filesRef.current = files;
    }, [files]);

    // Load saved usernames on mount
    React.useEffect(() => {
        setSavedUsernames(listClientUsernames());
    }, []);

    // Referral: listen for tab visibility to confirm sharing
    React.useEffect(() => {
        if (!referralPending || draft.referralUnlocked) return;

        const handleVisibility = () => {
            if (document.visibilityState === "visible" && referralPending) {
                setDraft((prev) => ({ ...prev, referralUnlocked: true }));
                setReferralPending(false);
            }
        };

        document.addEventListener("visibilitychange", handleVisibility);
        return () => document.removeEventListener("visibilitychange", handleVisibility);
    }, [referralPending, draft.referralUnlocked]);

    React.useEffect(() => {
        return () => {
            filesRef.current.forEach((item) => {
                if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
            });
        };
    }, []);

    const updateDraft = <K extends keyof OrderDraft>(key: K, value: OrderDraft[K]) => {
        setDraft((prev) => ({ ...prev, [key]: value }));
        setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

    const validateStep = (stepId: StepId) => {
        const nextErrors: FieldErrors = {};

        if (stepId === "project") {
            if (!draft.projectTitle.trim()) nextErrors.projectTitle = "Add a short project title.";
            if (!draft.service) nextErrors.service = "Choose the service you need.";
            if (!draft.goal) nextErrors.goal = "Choose the main goal.";
            if (!draft.description.trim() || draft.description.trim().length < 20) {
                nextErrors.description = "Share at least a few details so we can understand the work.";
            }
        }

        if (stepId === "budget") {
            if (budget < MIN_BUDGET) nextErrors.customBudget = `Minimum order value is ${formatCurrency(MIN_BUDGET)}.`;
            if (draft.budgetMode === "custom" && !draft.customBudget.trim()) nextErrors.customBudget = "Add your custom budget.";
        }

        if (stepId === "contact") {
            if (!draft.name.trim()) nextErrors.name = "Add your name.";
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) nextErrors.email = "Add a valid email address.";
            if (!draft.whatsapp.trim()) nextErrors.whatsapp = "Add your WhatsApp number.";
            if (!draft.country.trim()) nextErrors.country = "Add your country.";
        }

        if (stepId === "review" && !draft.acceptedPrivacy) {
            nextErrors.acceptedPrivacy = "Please confirm before submitting.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const nextStep = () => {
        if (!validateStep(currentStep)) return;

        // If leaving the referral step without completing the share, revoke the pending discount
        if (currentStep === "referral" && !draft.referralUnlocked) {
            setDraft((prev) => ({ ...prev, referralCopied: false, referralSource: "" }));
            setReferralPending(false);
        }

        setCurrentIndex((index) => Math.min(index + 1, steps.length - 1));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const previousStep = () => {
        setCurrentIndex((index) => Math.max(index - 1, 0));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const validateFiles = (incomingFiles: File[]) => {
        const nextFileErrors: string[] = [];
        const acceptedFiles: FileItem[] = [];
        let runningTotal = totalFileSize;

        incomingFiles.forEach((file) => {
            const extension = getFileExtension(file.name);

            if (!acceptedExtensions.includes(extension)) {
                nextFileErrors.push(`${file.name} is not a supported file type.`);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                nextFileErrors.push(`${file.name} is larger than ${formatFileSize(MAX_FILE_SIZE)}.`);
                return;
            }

            if (runningTotal + file.size > MAX_TOTAL_FILE_SIZE) {
                nextFileErrors.push(`Total attachments cannot exceed ${formatFileSize(MAX_TOTAL_FILE_SIZE)}.`);
                return;
            }

            runningTotal += file.size;
            const randomId = globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2);
            acceptedFiles.push({
                id: `${file.name}-${file.lastModified}-${randomId}`,
                file,
                previewUrl: isImageFile(file) ? URL.createObjectURL(file) : undefined,
            });
        });

        if (acceptedFiles.length) setFiles((prev) => [...prev, ...acceptedFiles]);
        setFileErrors(nextFileErrors);
    };

    const removeFile = (fileId: string) => {
        setFiles((prev) => {
            const fileToRemove = prev.find((item) => item.id === fileId);
            if (fileToRemove?.previewUrl) URL.revokeObjectURL(fileToRemove.previewUrl);
            return prev.filter((item) => item.id !== fileId);
        });
    };

    const startReferralShare = (source: string) => {
        setDraft((prev) => ({ ...prev, referralCopied: true, referralSource: source }));
        setReferralPending(true);
    };

    const copyReferralLink = async () => {
        try {
            await navigator.clipboard.writeText(shareLink);
            startReferralShare("copy-link");
        } catch {
            setFileErrors(["Could not copy the link. You can still share it manually."]);
        }
    };

    const nativeShare = async () => {
        if (!navigator.share) {
            await copyReferralLink();
            return;
        }

        try {
            await navigator.share({
                title: "30PX",
                text: "Premium design without the agency invoice.",
                url: shareLink,
            });
            // Native share resolves only on success — unlock immediately
            setDraft((prev) => ({ ...prev, referralUnlocked: true, referralCopied: true, referralSource: "native-share" }));
            setReferralPending(false);
        } catch {
            return;
        }
    };

    const lookupSavedProfile = async () => {
        const username = lookupUsername.trim();
        if (!username || !lookupPin.trim()) return;

        try {
            setIsLookingUpProfile(true);
            setSubmitError("");
            const { profile } = await lookupClientProfile({
                username,
                pin: lookupPin,
            });

            setDraft((prev) => ({
                ...prev,
                name: profile.name,
                email: profile.email,
                whatsapp: profile.whatsapp,
                country: profile.country,
                company: profile.company,
                contactMethod: profile.contactMethod || "WhatsApp",
                bestTime: profile.bestTime,
            }));
            setProfileLoaded(profile.username);
            rememberClientUsername(profile.username);
            setSavedUsernames(listClientUsernames());
            setErrors({});
            setFileErrors([]);
        } catch (error) {
            setProfileLoaded(null);
            setFileErrors([error instanceof Error ? error.message : "Could not load that client profile."]);
            setTimeout(() => setFileErrors([]), 4000);
        } finally {
            setIsLookingUpProfile(false);
        }
    };

    const handleSaveProfile = async () => {
        const username = saveUsername.trim();
        if (!username) return;
        if (username.length < 3) {
            setFileErrors(["Username must be at least 3 characters."]);
            setTimeout(() => setFileErrors([]), 3000);
            return;
        }
        if (savePin.trim().length < 4) {
            setFileErrors(["PIN must be at least 4 characters."]);
            setTimeout(() => setFileErrors([]), 3000);
            return;
        }
        if (!draft.name.trim() || !draft.email.trim() || !draft.whatsapp.trim() || !draft.country.trim()) {
            validateStep("contact");
            return;
        }

        try {
            setIsSavingProfile(true);
            setSubmitError("");
            const { profile } = await saveClientProfile({
                username,
                pin: savePin,
                profile: {
                    name: draft.name,
                    email: draft.email,
                    whatsapp: draft.whatsapp,
                    country: draft.country,
                    company: draft.company,
                    contactMethod: draft.contactMethod,
                    bestTime: draft.bestTime,
                },
            });

            rememberClientUsername(profile.username);
            setSavedUsernames(listClientUsernames());
            setProfileLoaded(profile.username);
            setSaveSuccess(true);
            setLookupUsername(profile.username);
            setLookupPin("");
            setSavePin("");
            setTimeout(() => setSaveSuccess(false), 4000);
        } catch (error) {
            setFileErrors([error instanceof Error ? error.message : "Could not save your profile."]);
            setTimeout(() => setFileErrors([]), 4000);
        } finally {
            setIsSavingProfile(false);
        }
    };

    const ensureUploadedFiles = async () => {
        const uploaded = [];

        for (const item of filesRef.current) {
            if (item.upload) {
                uploaded.push(item.upload);
                continue;
            }

            const result = await uploadAttachment(item.file);
            uploaded.push(result);
            setFiles((prev) => prev.map((entry) => (entry.id === item.id ? { ...entry, upload: result } : entry)));
        }

        return uploaded;
    };

    const submitRequest = async () => {
        const invalidStep = (["project", "budget", "contact", "review"] as StepId[]).find((stepId) => !validateStep(stepId));

        if (invalidStep) {
            setCurrentIndex(steps.findIndex((step) => step.id === invalidStep));
            return;
        }

        try {
            setIsSubmittingRequest(true);
            setSubmitError("");
            setFileErrors([]);

            const attachments = await ensureUploadedFiles();
            const response = await submitOrder({
                project: {
                    title: draft.projectTitle,
                    service: selectedServiceLabel(draft.service),
                    goal: draft.goal,
                    description: draft.description,
                    references: draft.references,
                },
                budget: {
                    type: draft.budgetMode,
                    amount: budget,
                    currency: "USD",
                    discountApplied: draft.referralUnlocked,
                    discountPercent: draft.referralUnlocked ? DISCOUNT_PERCENT : 0,
                    finalEstimatedAmount: finalAmount,
                },
                schedule: {
                    timeline: draft.timeline,
                    deadline: draft.deadline,
                    deadlineNote: draft.deadlineNote,
                },
                attachments,
                client: {
                    name: draft.name,
                    email: draft.email,
                    whatsapp: draft.whatsapp,
                    country: draft.country,
                    company: draft.company,
                    preferredContactMethod: draft.contactMethod,
                    bestTime: draft.bestTime,
                },
                referral: {
                    code: draft.referralCode,
                    shared: draft.referralUnlocked,
                    source: draft.referralSource,
                    shareLink,
                },
                clientProfile: {
                    username: profileLoaded || (saveSuccess ? saveUsername.trim() : null),
                },
            });

            setRequestId(response.orderRef);
            setIsSubmitted(true);
            window.localStorage.removeItem(STORAGE_KEY);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : "Could not submit your request.");
        } finally {
            setIsSubmittingRequest(false);
        }
    };

    const renderProjectStep = () => (
        <div className="space-y-8">
            <div>
                <Label>Project title</Label>
                <TextInput
                    value={draft.projectTitle}
                    error={errors.projectTitle}
                    onChange={(event) => updateDraft("projectTitle", event.target.value)}
                    placeholder="New website for my studio"
                />
                <FieldError message={errors.projectTitle} />
            </div>

            <div>
                <Label>What do you need?</Label>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {serviceOptions.map((option) => {
                        const Icon = option.icon;
                        const isSelected = draft.service === option.id;

                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => updateDraft("service", option.id)}
                                className={cn(
                                    "min-h-[112px] rounded-[5px] border bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md",
                                    isSelected ? "border-violet-500 ring-2 ring-violet-500/20" : "border-neutral-200",
                                )}
                            >
                                <span className={cn("mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[5px] border", option.color)}>
                                    <Icon className="h-5 w-5" />
                                </span>
                                <span className="block font-semibold text-neutral-950">{option.label}</span>
                            </button>
                        );
                    })}
                </div>
                <FieldError message={errors.service} />
            </div>

            <div>
                <Label>Main goal</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {goalOptions.map((goal) => (
                        <button
                            key={goal}
                            type="button"
                            onClick={() => updateDraft("goal", goal)}
                            className={cn(
                                "min-h-[48px] rounded-[5px] border px-4 text-left text-sm font-semibold transition-colors",
                                draft.goal === goal
                                    ? "border-neutral-950 bg-neutral-950 text-white"
                                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400",
                            )}
                        >
                            {goal}
                        </button>
                    ))}
                </div>
                <FieldError message={errors.goal} />
            </div>

            <div>
                <Label>Project details</Label>
                <TextArea
                    value={draft.description}
                    error={errors.description}
                    onChange={(event) => updateDraft("description", event.target.value)}
                    placeholder="Tell us what you need, what exists now, and what should change. Rough notes are fine."
                />
                <FieldError message={errors.description} />
            </div>

            <div>
                <Label optional>Reference links</Label>
                <TextArea
                    value={draft.references}
                    onChange={(event) => updateDraft("references", event.target.value)}
                    placeholder="Websites, moodboards, competitor pages, or examples you like."
                    className="min-h-[96px]"
                />
            </div>
        </div>
    );
    const renderBudgetStep = () => (
        <div className="space-y-8">
            <div className="rounded-[5px] border border-neutral-200 bg-white p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-violet-700">Fixed budget</p>
                        <h2 className="mt-1 text-2xl font-bold text-neutral-950">Pick the closest estimate</h2>
                    </div>
                    <div className="rounded-[5px] border border-neutral-200 bg-neutral-50 px-4 py-3">
                        <p className="text-sm text-neutral-500">Selected budget</p>
                        <p className="text-2xl font-bold text-neutral-950">{formatCurrency(budget)}</p>
                    </div>
                </div>

                <div className="mt-8 space-y-5">
                    <div className="flex items-center justify-between gap-4 text-sm font-semibold text-neutral-600">
                        <span>{formatCurrency(MIN_BUDGET)}</span>
                        <span>{formatCurrency(MAX_SLIDER_BUDGET)}</span>
                    </div>
                    <input
                        type="range"
                        min={MIN_BUDGET}
                        max={MAX_SLIDER_BUDGET}
                        step={BUDGET_STEP}
                        value={draft.sliderBudget}
                        disabled={draft.budgetMode === "custom"}
                        onChange={(event) => updateDraft("sliderBudget", Number(event.target.value))}
                        className={cn(
                            "h-2 w-full cursor-pointer appearance-none rounded-[5px] bg-neutral-200 accent-violet-600",
                            draft.budgetMode === "custom" && "cursor-not-allowed opacity-40",
                        )}
                    />

                    <button
                        type="button"
                        onClick={() => updateDraft("budgetMode", draft.budgetMode === "custom" ? "slider" : "custom")}
                        className={cn(
                            "flex w-full items-center justify-between gap-4 rounded-[5px] border p-4 text-left transition-colors",
                            draft.budgetMode === "custom"
                                ? "border-violet-500 bg-violet-50 text-violet-950"
                                : "border-neutral-200 bg-neutral-50 text-neutral-800 hover:border-neutral-400",
                        )}
                    >
                        <span>
                            <span className="block font-semibold">My budget is above {formatCurrency(MAX_SLIDER_BUDGET)}</span>
                            <span className="mt-1 block text-sm text-neutral-500">Use a custom value. Minimum still applies.</span>
                        </span>
                        <span className={cn("flex h-6 w-6 items-center justify-center rounded-[5px] border", draft.budgetMode === "custom" ? "border-violet-600 bg-violet-600 text-white" : "border-neutral-300 bg-white")}>
                            {draft.budgetMode === "custom" && <Check className="h-4 w-4" />}
                        </span>
                    </button>

                    {draft.budgetMode === "custom" && (
                        <div>
                            <Label>Custom budget</Label>
                            <TextInput
                                type="number"
                                min={MIN_BUDGET}
                                value={draft.customBudget}
                                error={errors.customBudget}
                                onChange={(event) => updateDraft("customBudget", event.target.value)}
                                placeholder="2500"
                            />
                            <FieldError message={errors.customBudget} />
                        </div>
                    )}
                </div>
            </div>

            <div>
                <Label>Timeline</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
                    {timelineOptions.map((timeline) => (
                        <button
                            key={timeline}
                            type="button"
                            onClick={() => updateDraft("timeline", timeline)}
                            className={cn(
                                "min-h-[48px] rounded-[5px] border px-3 text-sm font-semibold transition-colors",
                                draft.timeline === timeline
                                    ? "border-neutral-950 bg-neutral-950 text-white"
                                    : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400",
                            )}
                        >
                            {timeline}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <Label optional>Preferred date</Label>
                    <TextInput type="date" value={draft.deadline} onChange={(event) => updateDraft("deadline", event.target.value)} />
                </div>
                <div>
                    <Label optional>Deadline note</Label>
                    <TextInput
                        value={draft.deadlineNote}
                        onChange={(event) => updateDraft("deadlineNote", event.target.value)}
                        placeholder="Launch before the campaign starts"
                    />
                </div>
            </div>

            {draft.timeline === "Urgent" && (
                <div className="flex gap-3 rounded-[5px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <Clock3 className="mt-0.5 h-5 w-5 shrink-0" />
                    <p>Urgent projects may need priority pricing depending on scope. We will keep it clear before work begins.</p>
                </div>
            )}
        </div>
    );
    const renderFilesStep = () => (
        <div className="space-y-6">
            <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(event) => {
                    validateFiles(Array.from(event.target.files || []));
                    event.target.value = "";
                }}
                accept={acceptedExtensions.map((ext) => `.${ext}`).join(",")}
            />

            <div
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(event) => {
                    event.preventDefault();
                    setIsDragging(false);
                    validateFiles(Array.from(event.dataTransfer.files));
                }}
                className={cn(
                    "rounded-[5px] border border-dashed bg-white p-8 text-center transition-colors",
                    isDragging ? "border-violet-500 bg-violet-50" : "border-neutral-300",
                )}
            >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-[5px] bg-neutral-950 text-white">
                    <UploadCloud className="h-7 w-7" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-neutral-950">Attach anything useful</h2>
                <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
                    Brand files, screenshots, documents, examples, notes, or a zipped folder. Multiple files are welcome.
                </p>
                <Button
                    type="button"
                    className="mt-6 h-12 rounded-[5px] bg-violet-600 px-6 text-white hover:bg-violet-700"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Paperclip className="mr-2 h-4 w-4" />
                    Choose files
                </Button>
                <p className="mt-4 text-xs text-neutral-500">
                    JPG, PNG, WEBP, PDF, DOC, XLS, CSV, ZIP, or RAR. {formatFileSize(MAX_FILE_SIZE)} per file, {formatFileSize(MAX_TOTAL_FILE_SIZE)} total.
                </p>
            </div>

            {fileErrors.length > 0 && (
                <div className="rounded-[5px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {fileErrors.map((message) => (
                        <p key={message}>{message}</p>
                    ))}
                </div>
            )}

            <div className="rounded-[5px] border border-neutral-200 bg-white">
                <div className="flex flex-col gap-2 border-b border-neutral-100 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="font-bold text-neutral-950">Attached files</h3>
                        <p className="text-sm text-neutral-500">{formatFileSize(totalFileSize)} used</p>
                    </div>
                    {files.length > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                files.forEach((item) => item.previewUrl && URL.revokeObjectURL(item.previewUrl));
                                setFiles([]);
                            }}
                            className="text-sm font-semibold text-neutral-500 hover:text-red-600"
                        >
                            Remove all
                        </button>
                    )}
                </div>

                <div className="divide-y divide-neutral-100">
                    {files.length === 0 ? (
                        <div className="p-5 text-sm text-neutral-500">No files attached yet. You can skip this step.</div>
                    ) : (
                        files.map((item) => {
                            const Icon = getFileIcon(item.file);
                            return (
                                <div key={item.id} className="flex items-center gap-4 p-4">
                                    <div className="h-14 w-14 overflow-hidden rounded-[5px] border border-neutral-200 bg-neutral-50">
                                        {item.previewUrl ? (
                                            <img src={item.previewUrl} alt="" className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-neutral-500">
                                                <Icon className="h-6 w-6" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-semibold text-neutral-950">{item.file.name}</p>
                                        <p className="text-sm text-neutral-500">{formatFileSize(item.file.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeFile(item.id)}
                                        className="flex h-9 w-9 items-center justify-center rounded-[5px] border border-neutral-200 text-neutral-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                        aria-label={`Remove ${item.file.name}`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
    const renderContactStep = () => (
        <div className="space-y-6">
            {/* ── Returning client lookup ── */}
            <div className="rounded-[5px] border border-violet-200 bg-violet-50/50 p-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-violet-600 text-white">
                        <RefreshCw className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-950">Returning client?</h3>
                        <p className="text-sm text-neutral-600">Enter your username and PIN to auto-fill your details securely.</p>
                    </div>
                </div>
                <div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_220px_auto]">
                    <TextInput
                        value={lookupUsername}
                        onChange={(event) => setLookupUsername(event.target.value)}
                        onKeyDown={(event) => event.key === "Enter" && void lookupSavedProfile()}
                        placeholder="e.g. john_studio"
                    />
                    <TextInput
                        type="password"
                        value={lookupPin}
                        onChange={(event) => setLookupPin(event.target.value)}
                        onKeyDown={(event) => event.key === "Enter" && void lookupSavedProfile()}
                        placeholder="PIN"
                    />
                    <Button
                        type="button"
                        className="h-12 shrink-0 rounded-[5px] bg-violet-600 px-5 text-white hover:bg-violet-700"
                        onClick={() => void lookupSavedProfile()}
                        disabled={!lookupUsername.trim() || !lookupPin.trim() || isLookingUpProfile}
                    >
                        {isLookingUpProfile ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <User className="mr-2 h-4 w-4" />}
                        Look up
                    </Button>
                </div>
                {savedUsernames.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {savedUsernames.map((uname) => (
                            <button
                                key={uname}
                                type="button"
                                onClick={() => {
                                    setLookupUsername(uname);
                                }}
                                className={cn(
                                    "rounded-[5px] border px-3 py-1.5 text-sm font-semibold transition-colors",
                                    profileLoaded === uname
                                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                                        : "border-violet-200 bg-white text-violet-700 hover:border-violet-400 hover:bg-violet-50",
                                )}
                            >
                                {uname}
                            </button>
                        ))}
                    </div>
                )}
                {profileLoaded && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex items-center gap-2 rounded-[5px] border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Loaded info for <span className="font-bold">{profileLoaded}</span>
                    </motion.div>
                )}
            </div>

            {/* ── Contact fields ── */}
            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <Label>Full name</Label>
                    <TextInput
                        value={draft.name}
                        error={errors.name}
                        onChange={(event) => updateDraft("name", event.target.value)}
                        placeholder="Your name"
                    />
                    <FieldError message={errors.name} />
                </div>
                <div>
                    <Label>Email address</Label>
                    <TextInput
                        type="email"
                        value={draft.email}
                        error={errors.email}
                        onChange={(event) => updateDraft("email", event.target.value)}
                        placeholder="you@company.com"
                    />
                    <FieldError message={errors.email} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <Label>WhatsApp number</Label>
                    <TextInput
                        value={draft.whatsapp}
                        error={errors.whatsapp}
                        onChange={(event) => updateDraft("whatsapp", event.target.value)}
                        placeholder="+1 555 000 0000"
                    />
                    <FieldError message={errors.whatsapp} />
                </div>
                <div>
                    <Label>Country</Label>
                    <TextInput
                        value={draft.country}
                        error={errors.country}
                        onChange={(event) => updateDraft("country", event.target.value)}
                        placeholder="United States"
                    />
                    <FieldError message={errors.country} />
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <div>
                    <Label optional>Company or business</Label>
                    <TextInput value={draft.company} onChange={(event) => updateDraft("company", event.target.value)} placeholder="Company name" />
                </div>
                <div>
                    <Label optional>Best time to contact</Label>
                    <TextInput value={draft.bestTime} onChange={(event) => updateDraft("bestTime", event.target.value)} placeholder="Weekdays after 2 PM" />
                </div>
            </div>

            <div>
                <Label>Preferred contact method</Label>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {contactMethods.map((method) => {
                        const Icon = method === "Email" ? Mail : method === "WhatsApp" ? MessageCircle : Phone;
                        return (
                            <button
                                key={method}
                                type="button"
                                onClick={() => updateDraft("contactMethod", method)}
                                className={cn(
                                    "flex min-h-[54px] items-center gap-3 rounded-[5px] border px-4 text-sm font-semibold transition-colors",
                                    draft.contactMethod === method
                                        ? "border-neutral-950 bg-neutral-950 text-white"
                                        : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400",
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {method}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Save profile for next time ── */}
            <div className="rounded-[5px] border border-neutral-200 bg-white p-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] bg-neutral-950 text-white">
                        <Save className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-neutral-950">Save my info for next time</h3>
                        <p className="text-sm text-neutral-500">Pick a username and PIN. Your profile will be stored securely for future orders.</p>
                    </div>
                </div>
                <div className="mt-4 grid gap-2 md:grid-cols-[minmax(0,1fr)_220px_auto]">
                    <TextInput
                        value={saveUsername}
                        onChange={(event) => setSaveUsername(event.target.value.replace(/\s/g, "_").toLowerCase())}
                        onKeyDown={(event) => event.key === "Enter" && void handleSaveProfile()}
                        placeholder="choose_a_username"
                    />
                    <TextInput
                        type="password"
                        value={savePin}
                        onChange={(event) => setSavePin(event.target.value)}
                        onKeyDown={(event) => event.key === "Enter" && void handleSaveProfile()}
                        placeholder="Create a PIN"
                    />
                    <Button
                        type="button"
                        className="h-12 shrink-0 rounded-[5px] bg-neutral-950 px-5 text-white hover:bg-neutral-800"
                        onClick={() => void handleSaveProfile()}
                        disabled={!saveUsername.trim() || !savePin.trim() || !draft.name.trim() || isSavingProfile}
                    >
                        {isSavingProfile ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Save
                    </Button>
                </div>
                {saveSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex items-center gap-2 rounded-[5px] border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800"
                    >
                        <CheckCircle2 className="h-4 w-4" />
                        Saved! Use <span className="font-bold">{saveUsername}</span> with your PIN next time to skip this step.
                    </motion.div>
                )}
            </div>
        </div>
    );
    const renderReferralStep = () => (
        <div className="space-y-6">
            <div className="rounded-[5px] border border-neutral-200 bg-white p-6">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                        <div className={cn(
                            "inline-flex items-center gap-2 rounded-[5px] border px-3 py-2 text-sm font-semibold",
                            draft.referralUnlocked
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : referralPending
                                    ? "border-amber-200 bg-amber-50 text-amber-800"
                                    : "border-emerald-200 bg-emerald-50 text-emerald-800",
                        )}>
                            {draft.referralUnlocked ? (
                                <><CheckCircle2 className="h-4 w-4" /> 5% discount active</>
                            ) : referralPending ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> Verifying share…</>
                            ) : (
                                <><Gift className="h-4 w-4" /> 5% referral discount</>
                            )}
                        </div>
                        <h2 className="mt-5 text-3xl font-bold text-neutral-950">Share 30PX. Save on this order.</h2>
                        <p className="mt-3 text-neutral-600">
                            {draft.referralUnlocked
                                ? "Your discount is applied. Thanks for spreading the word!"
                                : referralPending
                                    ? "Share or paste the link somewhere, then come back to this tab. We will verify and apply the discount automatically."
                                    : "Send the link to someone who may need design, branding, or web work. Share it, come back here, and we will apply 5% off."}
                        </p>
                        {!draft.referralUnlocked && (
                            <p className="mt-2 text-sm font-medium text-red-600">
                                This discount is only applied if you actually share the link. If you skip this step, the original price will be used.
                            </p>
                        )}
                    </div>

                    <div className={cn(
                        "rounded-[5px] border p-5",
                        draft.referralUnlocked ? "border-emerald-200 bg-emerald-50" : "border-neutral-200 bg-neutral-50",
                    )}>
                        {draft.referralUnlocked ? (
                            <>
                                <p className="text-sm text-emerald-700 font-semibold">Discount applied</p>
                                <p className="mt-1 text-3xl font-bold text-neutral-950">{formatCurrency(finalAmount)}</p>
                                <p className="mt-1 text-sm font-semibold text-emerald-700">{formatCurrency(discountAmount)} saved</p>
                            </>
                        ) : (
                            <>
                                <p className="text-sm text-neutral-500">Current price</p>
                                <p className="mt-1 text-3xl font-bold text-neutral-950">{formatCurrency(budget)}</p>
                                <p className="mt-1 text-sm text-neutral-500">Potential price with 5% off: <span className="font-semibold text-emerald-700">{formatCurrency(Math.max(0, budget - Math.round(budget * (DISCOUNT_PERCENT / 100))))}</span></p>
                            </>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 rounded-[5px] border border-neutral-200 bg-white p-3 md:flex-row md:items-center">
                    <code className="min-w-0 flex-1 truncate rounded-[5px] bg-neutral-100 px-3 py-3 text-sm text-neutral-700">{shareLink}</code>
                    <Button
                        type="button"
                        variant="outline"
                        className={cn(
                            "h-11 rounded-[5px]",
                            draft.referralCopied && !draft.referralUnlocked && "border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100",
                            draft.referralUnlocked && "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100",
                        )}
                        onClick={copyReferralLink}
                    >
                        {draft.referralUnlocked ? (
                            <><CheckCircle2 className="mr-2 h-4 w-4" /> Copied</>
                        ) : draft.referralCopied ? (
                            <><Check className="mr-2 h-4 w-4" /> Copied — now share it</>
                        ) : (
                            <><Clipboard className="mr-2 h-4 w-4" /> Copy link</>
                        )}
                    </Button>
                </div>
            </div>

            {/* Pending state: prompt user to leave and come back */}
            {referralPending && !draft.referralUnlocked && (
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 rounded-[5px] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"
                >
                    <Loader2 className="mt-0.5 h-5 w-5 shrink-0 animate-spin" />
                    <p>
                        <span className="font-semibold">Almost there.</span> Paste or share the link somewhere (WhatsApp, social media, email) then switch back to this tab.
                        The discount will apply automatically when you return.
                    </p>
                </motion.div>
            )}

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                <a
                    href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => startReferralShare("whatsapp")}
                    className="flex min-h-[58px] items-center justify-center gap-3 rounded-[5px] border border-emerald-200 bg-emerald-50 px-4 font-semibold text-emerald-800 transition-colors hover:bg-emerald-100"
                >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                </a>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => startReferralShare("facebook")}
                    className="flex min-h-[58px] items-center justify-center gap-3 rounded-[5px] border border-blue-200 bg-blue-50 px-4 font-semibold text-blue-800 transition-colors hover:bg-blue-100"
                >
                    <Facebook className="h-5 w-5" />
                    Facebook
                </a>
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareLink)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => startReferralShare("linkedin")}
                    className="flex min-h-[58px] items-center justify-center gap-3 rounded-[5px] border border-cyan-200 bg-cyan-50 px-4 font-semibold text-cyan-800 transition-colors hover:bg-cyan-100"
                >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => startReferralShare("x")}
                    className="flex min-h-[58px] items-center justify-center gap-3 rounded-[5px] border border-neutral-300 bg-neutral-950 px-4 font-semibold text-white transition-colors hover:bg-neutral-800"
                >
                    <X className="h-5 w-5" />
                    X
                </a>
                <button
                    type="button"
                    onClick={nativeShare}
                    className="flex min-h-[58px] items-center justify-center gap-3 rounded-[5px] border border-violet-200 bg-violet-50 px-4 font-semibold text-violet-800 transition-colors hover:bg-violet-100"
                >
                    <Share2 className="h-5 w-5" />
                    More
                </button>
            </div>

            {draft.referralUnlocked && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex gap-3 rounded-[5px] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"
                >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                    <p><span className="font-semibold">Nice!</span> Your 5% discount is unlocked and applied to this request.</p>
                </motion.div>
            )}
        </div>
    );
    const renderReviewStep = () => {
        const reviewItems = [
            ["Project", draft.projectTitle || "Not added"],
            ["Service", selectedServiceLabel(draft.service)],
            ["Goal", draft.goal || "Not selected"],
            ["Budget", formatCurrency(budget)],
            ["Discount", draft.referralUnlocked ? `-${DISCOUNT_PERCENT}%` : "None"],
            ["Estimated total", formatCurrency(finalAmount)],
            ["Timeline", draft.timeline],
            ["Files", `${files.length} attached`],
            ["Name", draft.name || "Not added"],
            ["Email", draft.email || "Not added"],
            ["WhatsApp", draft.whatsapp || "Not added"],
            ["Contact", draft.contactMethod],
        ];

        return (
            <div className="space-y-6">
                <div className="rounded-[5px] border border-neutral-200 bg-white">
                    <div className="border-b border-neutral-100 p-5">
                        <h2 className="text-2xl font-bold text-neutral-950">Review your request</h2>
                        <p className="mt-2 text-neutral-600">One quick check before it goes to the team.</p>
                    </div>
                    <dl className="grid grid-cols-1 divide-y divide-neutral-100 md:grid-cols-2 md:divide-x md:divide-y-0">
                        {reviewItems.map(([label, value]) => (
                            <div key={label} className="border-b border-neutral-100 p-5 last:border-b-0 md:last:border-b">
                                <dt className="text-sm font-semibold text-neutral-500">{label}</dt>
                                <dd className="mt-1 break-words text-base font-bold text-neutral-950">{value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {draft.description && (
                    <div className="rounded-[5px] border border-neutral-200 bg-white p-5">
                        <h3 className="font-bold text-neutral-950">Project notes</h3>
                        <p className="mt-3 whitespace-pre-line text-neutral-700">{draft.description}</p>
                    </div>
                )}

                <label className="flex gap-3 rounded-[5px] border border-neutral-200 bg-white p-4 text-sm text-neutral-700">
                    <input
                        type="checkbox"
                        checked={draft.acceptedPrivacy}
                        onChange={(event) => updateDraft("acceptedPrivacy", event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-neutral-300 accent-violet-600"
                    />
                    <span>
                        I confirm the details are correct and agree to be contacted about this project.
                        <FieldError message={errors.acceptedPrivacy} />
                    </span>
                </label>
            </div>
        );
    };

    const renderCurrentStep = () => {
        if (currentStep === "project") return renderProjectStep();
        if (currentStep === "budget") return renderBudgetStep();
        if (currentStep === "files") return renderFilesStep();
        if (currentStep === "contact") return renderContactStep();
        if (currentStep === "referral") return renderReferralStep();
        return renderReviewStep();
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-[#FAFAFA] font-sans text-neutral-950 antialiased">
                <SEO title="Project request sent" description="Your project request has been sent to 30PX for review." noindex />
                <Header />
                <main className="px-4 pb-20 pt-32 md:px-12">
                    <section className="mx-auto max-w-3xl rounded-[5px] border border-neutral-200 bg-white p-8 text-center shadow-sm md:p-12">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[5px] bg-emerald-50 text-emerald-700">
                            <CheckCircle2 className="h-9 w-9" />
                        </div>
                        <p className="mt-6 text-sm font-semibold text-violet-700">{requestId}</p>
                        <h1 className="mt-2 text-3xl font-bold text-neutral-950 md:text-5xl">Request received</h1>
                        <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-neutral-600">
                            A confirmation email is on its way to {draft.email}. We will review the details and contact you with the next step.
                        </p>
                        <div className="mt-8 grid gap-3 text-left md:grid-cols-3">
                            {[
                                ["Budget", formatCurrency(finalAmount)],
                                ["Service", selectedServiceLabel(draft.service)],
                                ["Files", `${files.length} attached`],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded-[5px] border border-neutral-200 bg-neutral-50 p-4">
                                    <p className="text-sm text-neutral-500">{label}</p>
                                    <p className="mt-1 font-bold text-neutral-950">{value}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button
                                type="button"
                                className="h-12 rounded-[5px] bg-neutral-950 px-6 text-white hover:bg-neutral-800"
                                onClick={() => {
                                    setDraft({ ...defaultDraft, referralCode: createReferralCode() });
                                    setFiles([]);
                                    setCurrentIndex(0);
                                    setIsSubmitted(false);
                                }}
                            >
                                Start another request
                            </Button>
                            <Button type="button" variant="outline" className="h-12 rounded-[5px]" onClick={() => navigate("/")}>
                                Back to home
                            </Button>
                        </div>
                    </section>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-neutral-950 antialiased">
            <SEO
                title="Start a project"
                description="Tell 30PX what you need, set a budget, attach files, and unlock a referral discount."
                keywords="project request form, design order form, website design quote, 30PX order"
                noindex
            />
            <Header />

            <main className="pb-20 pt-28">
                <section className="border-b border-neutral-200 bg-white px-4 pb-10 pt-8 md:px-12 md:pb-14">
                    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-[5px] border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-700">
                                <Sparkles className="h-4 w-4 text-violet-600" />
                                Tell us what you need. We will shape the rest.
                            </div>
                            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight text-neutral-950 md:text-6xl">
                                Project details in. Guesswork out.
                            </h1>
                            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600 md:text-xl">
                                Share the brief, budget, timeline, and files in one place. We will review it and come back with a clear next step.
                            </p>
                            <div className="mt-6 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                                {[
                                    ["Minimum order", formatCurrency(MIN_BUDGET)],
                                    ["Budget slider", `${formatCurrency(MIN_BUDGET)}-${formatCurrency(MAX_SLIDER_BUDGET)}`],
                                    ["Referral reward", "5% off"],
                                ].map(([label, value]) => (
                                    <div key={label} className="rounded-[5px] border border-neutral-200 bg-neutral-50 p-4">
                                        <p className="text-sm text-neutral-500">{label}</p>
                                        <p className="mt-1 font-bold text-neutral-950">{value}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="hidden h-[360px] overflow-hidden rounded-[5px] border border-neutral-200 bg-neutral-950 p-3 lg:grid lg:grid-cols-3 lg:gap-3">
                            {visualStack.map((src, index) => (
                                <div key={src} className={cn("overflow-hidden rounded-[5px] border border-white/10 bg-white/5", index % 2 === 0 ? "translate-y-4" : "-translate-y-4")}>
                                    <img src={src} alt="" className="h-full w-full object-cover" loading="eager" />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="px-4 py-10 md:px-12 md:py-12">
                    <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="rounded-[5px] border border-neutral-200 bg-white p-5 shadow-sm md:p-8">
                            <StepHeader currentStep={currentStep} currentIndex={currentIndex} onJump={(index) => setCurrentIndex(index)} />

                            <div className="mt-8 rounded-[5px] border border-neutral-100 bg-[#FAFAFA] p-4 md:p-6">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentStep}
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        transition={{ duration: 0.18 }}
                                    >
                                        {renderCurrentStep()}
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {submitError && (
                                <div className="mt-6 rounded-[5px] border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                                    {submitError}
                                </div>
                            )}

                            <div className="mt-6 flex flex-col-reverse gap-3 border-t border-neutral-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                                <Button type="button" variant="outline" className="h-12 rounded-[5px]" onClick={previousStep} disabled={currentIndex === 0}>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back
                                </Button>

                                {currentStep === "review" ? (
                                    <Button
                                        type="button"
                                        className="h-12 rounded-[5px] bg-violet-600 px-6 text-white hover:bg-violet-700"
                                        onClick={() => void submitRequest()}
                                        disabled={isSubmittingRequest}
                                    >
                                        {isSubmittingRequest ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                                        {isSubmittingRequest ? "Submitting..." : "Submit request"}
                                    </Button>
                                ) : (
                                    <Button type="button" className="h-12 rounded-[5px] bg-neutral-950 px-6 text-white hover:bg-neutral-800" onClick={nextStep}>
                                        Continue
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <SummaryPanel budget={budget} finalAmount={finalAmount} draft={draft} files={files} />
                            <div className="flex gap-3 rounded-[5px] border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900">
                                <Info className="mt-0.5 h-5 w-5 shrink-0" />
                                <p>Not sure about the details? Share what you know. We will help tighten the brief.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default OrderRequest;
