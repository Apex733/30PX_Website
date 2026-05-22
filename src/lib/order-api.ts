import type {
    AdminOrderSearchResponse,
    ApiErrorResponse,
    ClientProfileResponse,
    LookupClientProfileRequest,
    OrderStatus,
    OrderSubmissionPayload,
    OrderSubmissionResponse,
    SaveClientProfileRequest,
    UpdateOrderStatusRequest,
    UploadAttachmentResponse,
} from "./order-contract";

const API_BASE = (import.meta.env.VITE_ORDER_API_BASE_URL || "").replace(/\/$/, "");

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers || {}),
        },
    });

    if (!response.ok) {
        let message = `Request failed with ${response.status}`;
        try {
            const error = (await response.json()) as ApiErrorResponse;
            if (error?.error) message = error.error;
        } catch {
            // Ignore JSON parse failure and keep generic message.
        }
        throw new Error(message);
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
}

export async function uploadAttachment(file: File): Promise<UploadAttachmentResponse> {
    const response = await fetch(`${API_BASE}/api/uploads`, {
        method: "POST",
        headers: {
            "Content-Type": file.type || "application/octet-stream",
            "X-File-Name": file.name,
        },
        body: file,
    });

    if (!response.ok) {
        let message = `Upload failed with ${response.status}`;
        try {
            const error = (await response.json()) as ApiErrorResponse;
            if (error?.error) message = error.error;
        } catch {
            // Ignore JSON parse failure and keep generic message.
        }
        throw new Error(message);
    }

    return (await response.json()) as UploadAttachmentResponse;
}

export function saveClientProfile(payload: SaveClientProfileRequest) {
    return apiFetch<ClientProfileResponse>("/api/client-profiles", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function lookupClientProfile(payload: LookupClientProfileRequest) {
    return apiFetch<ClientProfileResponse>("/api/client-profiles/lookup", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function submitOrder(payload: OrderSubmissionPayload) {
    return apiFetch<OrderSubmissionResponse>("/api/orders", {
        method: "POST",
        body: JSON.stringify(payload),
    });
}

export function searchOrders(adminToken: string, params: { query?: string; status?: OrderStatus | ""; limit?: number }) {
    const search = new URLSearchParams();
    if (params.query) search.set("query", params.query);
    if (params.status) search.set("status", params.status);
    if (params.limit) search.set("limit", String(params.limit));

    return apiFetch<AdminOrderSearchResponse>(`/api/admin/orders?${search.toString()}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${adminToken}`,
        },
    });
}

export function updateOrderStatus(adminToken: string, orderId: string, status: OrderStatus) {
    const payload: UpdateOrderStatusRequest = { status };
    return apiFetch<{ ok: true; orderId: string; orderRef: string; status: OrderStatus }>(
        `/api/admin/orders/${orderId}/status`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${adminToken}`,
            },
            body: JSON.stringify(payload),
        },
    );
}
