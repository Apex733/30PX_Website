export const ORDER_STATUSES = [
    "received",
    "reviewing",
    "quoted",
    "in_progress",
    "completed",
    "archived",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface UploadedAttachmentInput {
    key: string;
    originalName: string;
    size: number;
    mimeType: string;
}

export interface OrderSubmissionPayload {
    project: {
        title: string;
        service: string;
        goal: string;
        description: string;
        references: string;
    };
    budget: {
        type: "slider" | "custom";
        amount: number;
        currency: "USD";
        discountApplied: boolean;
        discountPercent: number;
        finalEstimatedAmount: number;
    };
    schedule: {
        timeline: string;
        deadline: string;
        deadlineNote: string;
    };
    attachments: UploadedAttachmentInput[];
    client: {
        name: string;
        email: string;
        whatsapp: string;
        country: string;
        company: string;
        preferredContactMethod: string;
        bestTime: string;
    };
    referral: {
        code: string;
        shared: boolean;
        source: string;
        shareLink: string;
    };
    clientProfile: {
        username: string | null;
    };
}

export interface OrderSubmissionResponse {
    orderId: string;
    orderRef: string;
    status: OrderStatus;
    confirmationEmailQueued: boolean;
}

export interface UploadAttachmentResponse extends UploadedAttachmentInput {
    uploadedAt: string;
}

export interface SaveClientProfileRequest {
    username: string;
    pin: string;
    profile: {
        name: string;
        email: string;
        whatsapp: string;
        country: string;
        company: string;
        contactMethod: string;
        bestTime: string;
    };
}

export interface LookupClientProfileRequest {
    username: string;
    pin: string;
}

export interface ClientProfileResponse {
    profile: {
        username: string;
        name: string;
        email: string;
        whatsapp: string;
        country: string;
        company: string;
        contactMethod: string;
        bestTime: string;
        lastUsedAt: string | null;
    };
}

export interface AdminOrderListItem {
    id: string;
    orderRef: string;
    status: OrderStatus;
    projectTitle: string;
    service: string;
    goal: string;
    description: string;
    referenceLinks: string;
    budgetAmount: number;
    finalEstimatedAmount: number;
    createdAt: string;
    clientName: string;
    clientEmail: string;
    clientWhatsapp: string;
    clientCountry: string;
    clientCompany: string;
    preferredContactMethod: string;
    clientBestTime: string;
    clientUsername: string | null;
    timeline: string;
    deadline: string;
    deadlineNote: string;
    emailStatus: string | null;
    attachmentCount: number;
    attachmentNames: string | null;
}

export interface AdminOrderSearchResponse {
    results: AdminOrderListItem[];
}

export interface UpdateOrderStatusRequest {
    status: OrderStatus;
}

export interface ApiErrorResponse {
    error: string;
}
