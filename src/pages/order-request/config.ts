import {
    Briefcase,
    Code2,
    FileArchive,
    FileText,
    Image as ImageIcon,
    Megaphone,
    MonitorSmartphone,
    Palette,
    Sparkles,
} from "lucide-react";
import type { UploadAttachmentResponse } from "@/lib/order-contract";

export const MIN_BUDGET = 50;
export const MAX_SLIDER_BUDGET = 1500;
export const BUDGET_STEP = 25;
export const DISCOUNT_PERCENT = 5;
export const MAX_FILE_SIZE = 25 * 1024 * 1024;
export const MAX_TOTAL_FILE_SIZE = 100 * 1024 * 1024;
export const STORAGE_KEY = "30px-order-request-draft";

export const serviceOptions = [
    { id: "website-design", label: "Website design", icon: MonitorSmartphone, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "web-development", label: "Web development", icon: Code2, color: "text-cyan-700 bg-cyan-50 border-cyan-200" },
    { id: "branding", label: "Logo and branding", icon: Palette, color: "text-rose-600 bg-rose-50 border-rose-200" },
    { id: "social-media", label: "Social media design", icon: Megaphone, color: "text-amber-700 bg-amber-50 border-amber-200" },
    { id: "ecommerce", label: "Ecommerce store", icon: Briefcase, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    { id: "custom", label: "Custom project", icon: Sparkles, color: "text-violet-700 bg-violet-50 border-violet-200" },
];

export const goalOptions = [
    "Get more leads",
    "Sell products",
    "Improve the design",
    "Build a new brand",
    "Fix technical issues",
    "Launch something new",
];

export const timelineOptions = [
    "Flexible",
    "Within 1 week",
    "Within 2 weeks",
    "This month",
    "Urgent",
];

export const contactMethods = ["Email", "WhatsApp", "Phone call"];

export const acceptedExtensions = [
    "jpg",
    "jpeg",
    "png",
    "webp",
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "csv",
    "zip",
    "rar",
];

export const steps = [
    { id: "project", shortLabel: "Project" },
    { id: "budget", shortLabel: "Budget" },
    { id: "files", shortLabel: "Files" },
    { id: "contact", shortLabel: "Contact" },
    { id: "referral", shortLabel: "5% off" },
    { id: "review", shortLabel: "Review" },
] as const;

export type StepId = (typeof steps)[number]["id"];
export type BudgetMode = "slider" | "custom";

export interface OrderDraft {
    projectTitle: string;
    service: string;
    goal: string;
    description: string;
    references: string;
    budgetMode: BudgetMode;
    sliderBudget: number;
    customBudget: string;
    timeline: string;
    deadline: string;
    deadlineNote: string;
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    company: string;
    contactMethod: string;
    bestTime: string;
    referralCode: string;
    referralUnlocked: boolean;
    referralCopied: boolean;
    referralSource: string;
    acceptedPrivacy: boolean;
}

export interface FileItem {
    id: string;
    file: File;
    previewUrl?: string;
    upload?: UploadAttachmentResponse;
}

export type FieldErrors = Partial<Record<keyof OrderDraft, string>>;

/* ── Client profile system (returning clients) ── */

export const RECENT_CLIENTS_STORAGE_KEY = "30px-recent-client-usernames";

function readRecentUsernames(): string[] {
    try {
        const raw = window.localStorage.getItem(RECENT_CLIENTS_STORAGE_KEY);
        return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
        return [];
    }
}

export function listClientUsernames(): string[] {
    return readRecentUsernames().slice(0, 8);
}

export function rememberClientUsername(username: string): void {
    const normalized = username.trim().toLowerCase();
    if (!normalized) return;

    const recent = readRecentUsernames().filter((entry) => entry.toLowerCase() !== normalized);
    recent.unshift(normalized);
    window.localStorage.setItem(RECENT_CLIENTS_STORAGE_KEY, JSON.stringify(recent.slice(0, 8)));
}

/* ── Defaults ── */

export const defaultDraft: OrderDraft = {
    projectTitle: "",
    service: "",
    goal: "",
    description: "",
    references: "",
    budgetMode: "slider",
    sliderBudget: 300,
    customBudget: "",
    timeline: "Flexible",
    deadline: "",
    deadlineNote: "",
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    company: "",
    contactMethod: "WhatsApp",
    bestTime: "",
    referralCode: "",
    referralUnlocked: false,
    referralCopied: false,
    referralSource: "",
    acceptedPrivacy: false,
};

export function createReferralCode() {
    return `30PX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function loadDraft(): OrderDraft {
    if (typeof window === "undefined") {
        return { ...defaultDraft, referralCode: createReferralCode() };
    }

    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        const parsed = saved ? (JSON.parse(saved) as Partial<OrderDraft>) : {};
        return {
            ...defaultDraft,
            ...parsed,
            referralCode: parsed.referralCode || createReferralCode(),
        };
    } catch {
        return { ...defaultDraft, referralCode: createReferralCode() };
    }
}

export function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);
}

export function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function getFileExtension(fileName: string) {
    return fileName.split(".").pop()?.toLowerCase() || "";
}

export function isImageFile(file: File) {
    return file.type.startsWith("image/");
}

export function getFileIcon(file: File) {
    const ext = getFileExtension(file.name);
    if (isImageFile(file)) return ImageIcon;
    if (["zip", "rar"].includes(ext)) return FileArchive;
    return FileText;
}

export function selectedServiceLabel(serviceId: string) {
    return serviceOptions.find((option) => option.id === serviceId)?.label || "Not selected";
}
