import * as React from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer-section";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { searchOrders, updateOrderStatus } from "@/lib/order-api";
import { ORDER_STATUSES, type AdminOrderListItem, type OrderStatus } from "@/lib/order-contract";
import { Label, TextInput } from "./order-request/FormPrimitives";

const ADMIN_TOKEN_KEY = "30px-admin-api-token";

function AdminOrders() {
    const [adminToken, setAdminToken] = React.useState("");
    const [query, setQuery] = React.useState("");
    const [statusFilter, setStatusFilter] = React.useState<OrderStatus | "">("");
    const [results, setResults] = React.useState<AdminOrderListItem[]>([]);
    const [draftStatuses, setDraftStatuses] = React.useState<Record<string, OrderStatus>>({});
    const [isSearching, setIsSearching] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        setAdminToken(window.sessionStorage.getItem(ADMIN_TOKEN_KEY) || "");
    }, []);

    const runSearch = React.useCallback(async () => {
        try {
            setIsSearching(true);
            setError("");
            const response = await searchOrders(adminToken, {
                query,
                status: statusFilter,
                limit: 50,
            });
            setResults(response.results);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not load orders.");
        } finally {
            setIsSearching(false);
        }
    }, [adminToken, query, statusFilter]);

    const handleRememberToken = () => {
        if (adminToken.trim()) {
            window.sessionStorage.setItem(ADMIN_TOKEN_KEY, adminToken.trim());
        } else {
            window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        }
    };

    const handleStatusUpdate = async (order: AdminOrderListItem) => {
        const nextStatus = draftStatuses[order.id] || order.status;
        try {
            setError("");
            await updateOrderStatus(adminToken, order.id, nextStatus);
            await runSearch();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not update status.");
        }
    };

    return (
        <div className="min-h-screen bg-[#FAFAFA] font-sans text-neutral-950 antialiased">
            <SEO title="Admin orders" description="Search and manage 30PX order requests." noindex />
            <Header />

            <main className="px-4 pb-20 pt-28 md:px-12">
                <section className="mx-auto max-w-6xl space-y-6">
                    <div className="rounded-[5px] border border-neutral-200 bg-white p-6 shadow-sm">
                        <h1 className="text-3xl font-bold text-neutral-950">Order search</h1>
                        <p className="mt-2 max-w-2xl text-neutral-600">
                            Search by order reference, client name, email, username, or project title. You can also update the order status here.
                        </p>

                        <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_180px_auto]">
                            <div>
                                <Label optional>Admin token</Label>
                                <TextInput
                                    type="password"
                                    value={adminToken}
                                    onChange={(event) => setAdminToken(event.target.value)}
                                    placeholder="Optional if Cloudflare Access is protecting this page"
                                />
                            </div>
                            <div>
                                <Label optional>Status</Label>
                                <select
                                    value={statusFilter}
                                    onChange={(event) => setStatusFilter(event.target.value as OrderStatus | "")}
                                    className="h-12 w-full rounded-[5px] border border-neutral-200 bg-white px-4 text-base text-neutral-950 outline-none transition-colors focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                                >
                                    <option value="">All statuses</option>
                                    {ORDER_STATUSES.map((status) => (
                                        <option key={status} value={status}>
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-end gap-2">
                                <Button type="button" variant="outline" className="h-12 rounded-[5px]" onClick={handleRememberToken}>
                                    Save token
                                </Button>
                                <Button type="button" className="h-12 rounded-[5px] bg-neutral-950 px-6 text-white hover:bg-neutral-800" onClick={() => void runSearch()}>
                                    {isSearching ? "Searching..." : "Search"}
                                </Button>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Label optional>Search</Label>
                            <TextInput
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyDown={(event) => event.key === "Enter" && void runSearch()}
                                placeholder="30PX-20260411-AB12, client@email.com, john_studio, or project title"
                            />
                        </div>

                        {error && (
                            <div className="mt-4 rounded-[5px] border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                                {error}
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        {results.length === 0 ? (
                            <div className="rounded-[5px] border border-neutral-200 bg-white p-6 text-neutral-500 shadow-sm">
                                Run a search to view saved orders.
                            </div>
                        ) : (
                            results.map((order) => (
                                <article key={order.id} className="rounded-[5px] border border-neutral-200 bg-white p-6 shadow-sm">
                                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold text-violet-700">{order.orderRef}</p>
                                            <h2 className="mt-1 text-2xl font-bold text-neutral-950">{order.projectTitle}</h2>
                                            <p className="mt-2 text-neutral-600">
                                                {order.clientName} • {order.clientEmail}
                                                {order.clientUsername ? ` • @${order.clientUsername}` : ""}
                                            </p>
                                        </div>

                                        <div className="grid gap-2 sm:grid-cols-[180px_auto]">
                                            <select
                                                value={draftStatuses[order.id] || order.status}
                                                onChange={(event) =>
                                                    setDraftStatuses((prev) => ({
                                                        ...prev,
                                                        [order.id]: event.target.value as OrderStatus,
                                                    }))
                                                }
                                                className="h-12 rounded-[5px] border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-950 outline-none transition-colors focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                                            >
                                                {ORDER_STATUSES.map((status) => (
                                                    <option key={status} value={status}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                            <Button
                                                type="button"
                                                className="h-12 rounded-[5px] bg-violet-600 px-5 text-white hover:bg-violet-700"
                                                onClick={() => void handleStatusUpdate(order)}
                                            >
                                                Update status
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                                        <SummaryStat label="Service" value={order.service} />
                                        <SummaryStat label="Goal" value={order.goal} />
                                        <SummaryStat label="Budget" value={`$${order.finalEstimatedAmount}`} />
                                        <SummaryStat label="Status" value={order.status} />
                                        <SummaryStat label="Email" value={order.emailStatus || "queued"} />
                                        <SummaryStat label="Files" value={`${order.attachmentCount}`} />
                                    </div>

                                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                                        <SummaryStat label="WhatsApp" value={order.clientWhatsapp || "Not provided"} />
                                        <SummaryStat label="Country" value={order.clientCountry || "Not provided"} />
                                        <SummaryStat label="Company" value={order.clientCompany || "Not provided"} />
                                        <SummaryStat label="Contact method" value={order.preferredContactMethod || "Not provided"} />
                                        <SummaryStat label="Timeline" value={order.timeline || "Not provided"} />
                                        <SummaryStat label="Deadline" value={order.deadline || "Not provided"} />
                                    </div>

                                    {(order.deadlineNote || order.clientBestTime) && (
                                        <div className="mt-6 grid gap-3 md:grid-cols-2">
                                            <LongField label="Deadline note" value={order.deadlineNote} empty="No deadline note" />
                                            <LongField label="Best time to contact" value={order.clientBestTime} empty="Not provided" />
                                        </div>
                                    )}

                                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                                        <LongField label="Project details" value={order.description} empty="No project details" />
                                        <LongField label="Reference links" value={order.referenceLinks} empty="No references" />
                                    </div>

                                    <div className="mt-6 rounded-[5px] border border-neutral-200 bg-neutral-50 p-4">
                                        <p className="text-sm text-neutral-500">Attached files</p>
                                        {parseAttachmentNames(order.attachmentNames).length === 0 ? (
                                            <p className="mt-2 text-sm text-neutral-700">No files attached.</p>
                                        ) : (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {parseAttachmentNames(order.attachmentNames).map((name) => (
                                                    <span key={name} className="rounded-[5px] border border-neutral-200 bg-white px-3 py-1.5 text-sm font-medium text-neutral-800">
                                                        {name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    <p className="mt-4 text-sm text-neutral-500">Created {new Date(order.createdAt).toLocaleString()}</p>
                                </article>
                            ))
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

function SummaryStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-[5px] border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm text-neutral-500">{label}</p>
            <p className="mt-1 break-words font-bold text-neutral-950">{value}</p>
        </div>
    );
}

function LongField({ label, value, empty }: { label: string; value: string; empty: string }) {
    return (
        <div className="rounded-[5px] border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm text-neutral-500">{label}</p>
            <p className="mt-2 whitespace-pre-line break-words text-neutral-900">{value?.trim() || empty}</p>
        </div>
    );
}

function parseAttachmentNames(value: string | null) {
    if (!value) return [];
    return value.split("||").map((item) => item.trim()).filter(Boolean);
}

export default AdminOrders;
