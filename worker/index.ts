import { Webhook } from "svix";
import type {
    AdminOrderListItem,
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
} from "../src/lib/order-contract";

type QueueMessage =
    | { type: "send-order-confirmation"; orderId: string }
    | { type: "send-order-status-update"; orderId: string; emailMessageId: string; previousStatus: OrderStatus; nextStatus: OrderStatus }
    | { type: "dispatch-order-webhook"; orderId: string; eventType: "order.created" | "order.status_updated" };

interface Env {
    ASSETS: Fetcher;
    ORDERS_DB: D1Database;
    ORDER_ASSETS: R2Bucket;
    EMAIL_QUEUE: Queue<QueueMessage>;
    RESEND_API_KEY?: string;
    RESEND_WEBHOOK_SECRET?: string;
    CLIENT_PROFILE_PEPPER?: string;
    ADMIN_API_TOKEN?: string;
    APP_BASE_URL?: string;
    ORDER_SENDER_EMAIL?: string;
    ORDER_SENDER_NAME?: string;
    ORDER_REPLY_TO?: string;
    ORDER_WEBHOOK_URL?: string;
    ORDER_WEBHOOK_SECRET?: string;
}

type RouteSeo = {
    title: string;
    description: string;
    image?: string;
    robots?: string;
    schemaType?: "WebPage" | "AboutPage" | "ContactPage" | "FAQPage" | "CollectionPage" | "Service" | "Article";
};

const SITE_URL = "https://thirtypixels.com";
const DEFAULT_SOCIAL_IMAGE = `${SITE_URL}/30px-logo.webp`;
const INDEXABLE_ROBOTS = "index, follow, max-image-preview:large";
const NOINDEX_ROBOTS = "noindex, nofollow";

const ROUTE_SEO: Record<string, RouteSeo> = {
    "/": {
        title: "30PX - AI-Powered Design Agency & Unlimited Design Subscription",
        description: "30PX pairs veteran designers with AI to deliver branding, web design, social content, motion, and product visuals with flat monthly pricing from $24/mo.",
        schemaType: "Service",
    },
    "/about": {
        title: "About 30PX - Veteran Designers and AI Creative Specialists",
        description: "Meet 30PX, the AI-enhanced creative agency helping growing brands ship branding, web design, social content, motion, and campaign assets faster.",
        schemaType: "AboutPage",
    },
    "/services": {
        title: "Design Services - Branding, Web Design, Social, Motion and AI Creative",
        description: "Explore 30PX design services: social media creative, branding, logo design, web design, UI/UX, video editing, motion graphics, and AI-powered visuals.",
        schemaType: "Service",
    },
    "/pricing": {
        title: "30PX Pricing - Flat-Fee Design Subscription Plans",
        description: "Compare 30PX pricing for social content, unlimited design requests, dedicated designers, motion, UI, web design, and enterprise creative support.",
        schemaType: "Service",
    },
    "/work": {
        title: "30PX Portfolio - Branding, Web Design, Product Design and AI Campaigns",
        description: "Browse 30PX case studies covering brand identity, SaaS UI/UX, product visuals, AI campaign imagery, social media creative, and launch design systems.",
        schemaType: "CollectionPage",
    },
    "/contact": {
        title: "Contact 30PX - Start a Design Project",
        description: "Contact 30PX to discuss your branding, web design, social media, motion, or AI creative project. Share your scope and get a clear next step.",
        schemaType: "ContactPage",
    },
    "/faqs": {
        title: "30PX FAQs - Design Subscription Questions",
        description: "Answers to common questions about 30PX design subscription plans, turnaround times, revisions, billing, pause features, and how requests work.",
    },
    "/portfolio/gigi-laurent": {
        title: "GIGI Laurent Case Study - AI Campaign Imagery by 30PX",
        description: "See how 30PX transformed product-only assets into AI model visuals, social ads, campaign imagery, and motion assets for GIGI Laurent.",
        image: `${SITE_URL}/portfolio/gigi-laurent/hero.webp`,
        schemaType: "Article",
    },
    "/portfolio/mondly-saas": {
        title: "Mondly SaaS Case Study - AI-Assisted Product Design and Development",
        description: "A 30PX case study covering SaaS UI/UX, dashboard design, backend implementation, database setup, and launch-ready product delivery.",
        image: `${SITE_URL}/portfolio/mondly-saas/hero.avif`,
        schemaType: "Article",
    },
    "/portfolio/loudminds": {
        title: "LoudMinds Case Study - Complete Branding System by 30PX",
        description: "A 30PX branding case study for LoudMinds, including identity design, visual direction, brand assets, presentation templates, and campaign-ready collateral.",
        image: `${SITE_URL}/portfolio/loudminds/2.webp`,
        schemaType: "Article",
    },
    "/portfolio/ghosttongue": {
        title: "GhostTongue Case Study - Visual Identity and Brand Applications",
        description: "Explore the 30PX GhostTongue brand identity system across logo variations, packaging, posters, stickers, merchandise assets, and dark tactile visuals.",
        image: `${SITE_URL}/portfolio/ghosttongue/hero.avif`,
        schemaType: "Article",
    },
    "/portfolio/fizzbliss": {
        title: "Fizz Bliss Case Study - AI Product Photography by 30PX",
        description: "A 30PX case study showing AI-generated beverage product photography, vibrant studio mockups, lifestyle imagery, and social campaign assets.",
        image: `${SITE_URL}/portfolio/fizzbliss/dynamic-studio-pro_2760836823.avif`,
        schemaType: "Article",
    },
    "/portfolio/vitavibe": {
        title: "VitaVibe Case Study - Wellness Packaging and Product Visuals",
        description: "See the 30PX VitaVibe campaign system, including supplement packaging direction, product mockups, social visuals, and wellness eCommerce art direction.",
        image: `${SITE_URL}/portfolio/vitavibe/mockup.webp`,
        schemaType: "Article",
    },
    "/privacy": {
        title: "Privacy Policy - 30PX",
        description: "Read the 30PX privacy policy covering information collection, data use, sharing, retention, security, rights, third-party links, and contact details.",
        robots: NOINDEX_ROBOTS,
    },
    "/terms": {
        title: "Terms of Use - 30PX",
        description: "Read the 30PX terms of use for subscriptions, billing, intellectual property, acceptable use, revisions, liability, termination, and contact details.",
        robots: NOINDEX_ROBOTS,
    },
    "/cookies": {
        title: "Cookie Policy - 30PX",
        description: "Read the 30PX cookie policy covering how cookies are used, third-party cookies, managing cookie preferences, updates, and contact details.",
        robots: NOINDEX_ROBOTS,
    },
    "/dmca": {
        title: "DMCA Policy - 30PX",
        description: "Read the 30PX DMCA policy covering copyright notices, counter-notifications, repeat infringers, good faith claims, and contact details.",
        robots: NOINDEX_ROBOTS,
    },
    "/blog": {
        title: "30PX Blog - AI Design Thinking, Process and Strategy",
        description: "Practical 30PX writing on AI-powered design, creative strategy, design systems, brand building, and faster creative workflows.",
        robots: "noindex, follow",
    },
    "/order": {
        title: "Start a 30PX Design Request",
        description: "Submit a private 30PX design request with your project details, files, timeline, and budget so the team can review the scope.",
        robots: NOINDEX_ROBOTS,
    },
    "/admin/orders": {
        title: "30PX Admin Orders",
        description: "Private 30PX order management.",
        robots: NOINDEX_ROBOTS,
    },
};

function normalizeRoutePath(pathname: string): string {
    if (pathname.length > 1 && pathname.endsWith("/")) {
        return pathname.slice(0, -1);
    }

    return pathname;
}

function hasFileExtension(pathname: string): boolean {
    return /\/[^/]+\.[A-Za-z0-9]+$/.test(pathname);
}

function isHtmlNavigationRequest(request: Request, pathname: string): boolean {
    if (hasFileExtension(pathname)) return false;

    const accept = request.headers.get("accept") || "";
    return accept.includes("text/html") || accept.includes("*/*") || accept === "";
}

function getCanonicalRedirectUrl(request: Request): string | null {
    const url = new URL(request.url);
    if (!url.hostname.endsWith("thirtypixels.com")) {
        return null;
    }

    let shouldRedirect = false;

    if (url.hostname !== "thirtypixels.com") {
        url.hostname = "thirtypixels.com";
        shouldRedirect = true;
    }

    if (url.protocol !== "https:") {
        url.protocol = "https:";
        shouldRedirect = true;
    }

    return shouldRedirect ? url.toString() : null;
}

function createIndexAssetRequest(request: Request): Request {
    const indexUrl = new URL(request.url);
    indexUrl.pathname = "/";
    indexUrl.search = "";
    return new Request(indexUrl.toString(), request);
}

async function injectRouteSeo(
    request: Request,
    response: Response,
    pathname: string,
    routeSeo: RouteSeo,
    statusOverride?: number,
): Promise<Response> {
    const headers = new Headers(response.headers);
    const robots = routeSeo.robots || INDEXABLE_ROBOTS;
    headers.set("X-Robots-Tag", robots);

    if (request.method === "HEAD") {
        return new Response(null, {
            status: statusOverride || response.status,
            statusText: response.statusText,
            headers,
        });
    }

    const contentType = headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
        return response;
    }

    const html = await response.text();
    const canonical = `${SITE_URL}${pathname === "/" ? "/" : pathname}`;
    const image = routeSeo.image || DEFAULT_SOCIAL_IMAGE;
    const enrichedHtml = injectHeadTags(html, pathname, {
        ...routeSeo,
        image,
        robots,
    }, canonical);

    headers.set("content-type", "text/html; charset=utf-8");
    headers.delete("content-length");
    headers.delete("content-encoding");
    headers.delete("etag");

    return new Response(enrichedHtml, {
        status: statusOverride || response.status,
        statusText: response.statusText,
        headers,
    });
}

function injectHeadTags(html: string, pathname: string, routeSeo: RouteSeo, canonical: string): string {
    const image = routeSeo.image || DEFAULT_SOCIAL_IMAGE;
    const headTags = [
        `<meta property="og:image:alt" content="${escapeHtmlAttr(routeSeo.title)}" data-rh="true" />`,
        `<meta name="twitter:image:alt" content="${escapeHtmlAttr(routeSeo.title)}" data-rh="true" />`,
        `<script type="application/ld+json" data-route-seo="true">${safeJson(buildRouteSchema(pathname, routeSeo, canonical))}</script>`,
    ].join("\n  ");

    let nextHtml = html;
    nextHtml = upsertHeadTag(nextHtml, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtmlText(routeSeo.title)}</title>`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+name=["']description["'][^>]*>/i, `<meta name="description" content="${escapeHtmlAttr(routeSeo.description)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+name=["']robots["'][^>]*>/i, `<meta name="robots" content="${escapeHtmlAttr(routeSeo.robots || INDEXABLE_ROBOTS)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<link\s+rel=["']canonical["'][^>]*>/i, `<link rel="canonical" href="${escapeHtmlAttr(canonical)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+property=["']og:type["'][^>]*>/i, `<meta property="og:type" content="${routeSeo.schemaType === "Article" ? "article" : "website"}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+property=["']og:title["'][^>]*>/i, `<meta property="og:title" content="${escapeHtmlAttr(routeSeo.title)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+property=["']og:description["'][^>]*>/i, `<meta property="og:description" content="${escapeHtmlAttr(routeSeo.description)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+property=["']og:image["'][^>]*>/i, `<meta property="og:image" content="${escapeHtmlAttr(image)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+property=["']og:url["'][^>]*>/i, `<meta property="og:url" content="${escapeHtmlAttr(canonical)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+name=["']twitter:title["'][^>]*>/i, `<meta name="twitter:title" content="${escapeHtmlAttr(routeSeo.title)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+name=["']twitter:description["'][^>]*>/i, `<meta name="twitter:description" content="${escapeHtmlAttr(routeSeo.description)}" data-rh="true" />`);
    nextHtml = upsertHeadTag(nextHtml, /<meta\s+name=["']twitter:image["'][^>]*>/i, `<meta name="twitter:image" content="${escapeHtmlAttr(image)}" data-rh="true" />`);

    if (nextHtml.includes("</head>")) {
        return nextHtml.replace("</head>", `  ${headTags}\n</head>`);
    }

    return nextHtml;
}

function upsertHeadTag(html: string, pattern: RegExp, replacement: string): string {
    if (pattern.test(html)) {
        return html.replace(pattern, replacement);
    }

    if (html.includes("</head>")) {
        return html.replace("</head>", `  ${replacement}\n</head>`);
    }

    return html;
}

function buildRouteSchema(pathname: string, routeSeo: RouteSeo, canonical: string): unknown[] {
    const type = routeSeo.schemaType || "WebPage";
    const organization = {
        "@type": "Organization",
        name: "30PX",
        alternateName: "Thirty Pixels Agency",
        url: SITE_URL,
        logo: DEFAULT_SOCIAL_IMAGE,
    };

    const baseSchema: Record<string, unknown> = {
        "@context": "https://schema.org",
        "@type": type,
        name: routeSeo.title,
        description: routeSeo.description,
        url: canonical,
        isPartOf: {
            "@type": "WebSite",
            name: "30PX",
            url: SITE_URL,
        },
    };

    if (type === "Service") {
        baseSchema.provider = organization;
        baseSchema.areaServed = "Worldwide";
        baseSchema.serviceType = [
            "Graphic Design",
            "Branding",
            "Web Design",
            "UI/UX Design",
            "Motion Graphics",
            "AI Creative",
            "Social Media Design",
        ];
    }

    if (type === "Article") {
        baseSchema.headline = routeSeo.title;
        baseSchema.image = routeSeo.image || DEFAULT_SOCIAL_IMAGE;
        baseSchema.author = organization;
        baseSchema.publisher = organization;
        baseSchema.mainEntityOfPage = canonical;
    }

    const schemas: unknown[] = [baseSchema];
    const breadcrumb = buildBreadcrumbSchema(pathname);
    if (breadcrumb) schemas.push(breadcrumb);

    return schemas;
}

function buildBreadcrumbSchema(pathname: string): unknown | null {
    if (pathname === "/") return null;

    const segments = pathname.split("/").filter(Boolean);
    const itemListElement = [
        {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
        },
        ...segments.map((segment, index) => {
            const path = `/${segments.slice(0, index + 1).join("/")}`;
            return {
                "@type": "ListItem",
                position: index + 2,
                name: toTitleCase(segment),
                item: `${SITE_URL}${path}`,
            };
        }),
    ];

    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement,
    };
}

function toTitleCase(value: string): string {
    return value
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

function safeJson(value: unknown): string {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}

function escapeHtmlAttr(value: string): string {
    return escapeHtmlText(value).replace(/"/g, "&quot;");
}

function escapeHtmlText(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

interface ClientRow {
    id: string;
    username: string;
    email: string;
    pin_hash: string;
    pin_salt: string;
    name: string;
    whatsapp: string;
    country: string;
    company: string;
    contact_method: string;
    best_time: string;
    last_used_at: string | null;
}

interface OrderRow {
    id: string;
    order_ref: string;
    status: OrderStatus;
    project_title: string;
    service: string;
    goal: string;
    description: string;
    references_text: string;
    budget_mode: string;
    budget_amount_usd: number;
    final_estimated_amount_usd: number;
    discount_percent: number;
    referral_code: string;
    referral_unlocked: number;
    referral_source: string;
    referral_link: string;
    timeline: string;
    deadline: string;
    deadline_note: string;
    client_id: string | null;
    client_name_snapshot: string;
    client_email_snapshot: string;
    client_whatsapp_snapshot: string;
    client_country_snapshot: string;
    client_company_snapshot: string;
    preferred_contact_method: string;
    client_best_time_snapshot: string;
    attachment_count: number;
    created_at: string;
}

interface EmailMessageRow {
    id: string;
    resend_email_id: string | null;
    status: string;
}

const encoder = new TextEncoder();
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "pdf", "doc", "docx", "xls", "xlsx", "csv", "zip", "rar"]);
const STATUS_VALUES = new Set<OrderStatus>(["received", "reviewing", "quoted", "in_progress", "completed", "archived"]);

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        try {
            const url = new URL(request.url);

            if (request.method === "OPTIONS" && url.pathname.startsWith("/api/")) {
                return withCors(new Response(null, { status: 204 }), request);
            }

            if (request.method === "GET" || request.method === "HEAD") {
                const canonicalRedirect = getCanonicalRedirectUrl(request);
                if (canonicalRedirect) {
                    return Response.redirect(canonicalRedirect, 301);
                }
            }

            if (url.pathname === "/api/health") {
                return withCors(json({ ok: true }), request);
            }

            if (url.pathname === "/api/uploads" && request.method === "POST") {
                return withCors(await handleUpload(request, env), request);
            }

            if (url.pathname === "/api/client-profiles" && request.method === "POST") {
                return withCors(await handleSaveClientProfile(request, env), request);
            }

            if (url.pathname === "/api/client-profiles/lookup" && request.method === "POST") {
                return withCors(await handleLookupClientProfile(request, env), request);
            }

            if (url.pathname === "/api/orders" && request.method === "POST") {
                return withCors(await handleCreateOrder(request, env, ctx), request);
            }

            if (url.pathname === "/api/webhooks/resend" && request.method === "POST") {
                return await handleResendWebhook(request, env);
            }

            if (url.pathname === "/api/admin/orders" && request.method === "GET") {
                return withCors(await handleAdminSearch(request, env), request);
            }

            const statusMatch = url.pathname.match(/^\/api\/admin\/orders\/([^/]+)\/status$/);
            if (statusMatch && request.method === "PATCH") {
                return withCors(await handleAdminStatusUpdate(request, env, statusMatch[1], ctx), request);
            }

            if (url.pathname.startsWith("/api/")) {
                return withCors(errorResponse("Not found", 404), request);
            }

            if (request.method === "GET" || request.method === "HEAD") {
                const normalizedPath = normalizeRoutePath(url.pathname);
                if (normalizedPath !== url.pathname && ROUTE_SEO[normalizedPath]) {
                    url.pathname = normalizedPath;
                    return Response.redirect(url.toString(), 301);
                }

                const routeSeo = ROUTE_SEO[normalizedPath];

                if (routeSeo) {
                    const response = await env.ASSETS.fetch(createIndexAssetRequest(request));
                    return injectRouteSeo(request, response, normalizedPath, routeSeo);
                }

                if (isHtmlNavigationRequest(request, normalizedPath)) {
                    const response = await env.ASSETS.fetch(createIndexAssetRequest(request));
                    return injectRouteSeo(request, response, normalizedPath, {
                        title: "Page Not Found - 30PX",
                        description: "This 30PX page could not be found.",
                        robots: NOINDEX_ROBOTS,
                    }, 404);
                }

                const response = await env.ASSETS.fetch(request);
                return response;
            }

            return env.ASSETS.fetch(request);
        } catch (error) {
            console.error("Unhandled worker error", error);
            if (error instanceof HttpError) {
                return withCors(errorResponse(error.message, error.status), request);
            }
            return withCors(errorResponse("Internal server error", 500), request);
        }
    },

    async queue(batch: MessageBatch<QueueMessage>, env: Env, ctx: ExecutionContext): Promise<void> {
        for (const message of batch.messages) {
            try {
                if (message.body.type === "send-order-confirmation") {
                    await sendOrderConfirmation(env, message.body.orderId);
                } else if (message.body.type === "send-order-status-update") {
                    await sendOrderStatusUpdateEmail(env, message.body.orderId, message.body.emailMessageId, message.body.previousStatus, message.body.nextStatus);
                } else if (message.body.type === "dispatch-order-webhook") {
                    await dispatchOrderWebhook(env, message.body.orderId, message.body.eventType);
                }
                message.ack();
            } catch (error) {
                console.error("Queue message failed", message.body, error);
                message.retry();
            }
        }
        ctx.waitUntil(Promise.resolve());
    },
};

async function handleUpload(request: Request, env: Env): Promise<Response> {
    const fileName = request.headers.get("x-file-name")?.trim();
    const contentType = request.headers.get("content-type")?.trim() || "application/octet-stream";
    const body = await request.arrayBuffer();

    if (!fileName) return errorResponse("Missing file name", 400);
    if (body.byteLength === 0) return errorResponse("File is empty", 400);
    if (body.byteLength > MAX_FILE_SIZE) return errorResponse("File exceeds 25 MB limit", 413);

    const extension = getExtension(fileName);
    if (!ACCEPTED_EXTENSIONS.has(extension)) {
        return errorResponse("Unsupported file type", 400);
    }

    const key = `uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}-${sanitizeFileName(fileName)}`;
    const uploadedAt = nowIso();

    await env.ORDER_ASSETS.put(key, body, {
        httpMetadata: { contentType },
        customMetadata: {
            originalName: fileName,
            uploadedAt,
        },
    });

    const response: UploadAttachmentResponse = {
        key,
        originalName: fileName,
        size: body.byteLength,
        mimeType: contentType,
        uploadedAt,
    };

    return json(response, 201);
}

async function handleSaveClientProfile(request: Request, env: Env): Promise<Response> {
    ensureConfigured(env.CLIENT_PROFILE_PEPPER, "CLIENT_PROFILE_PEPPER");
    const payload = await readJson<SaveClientProfileRequest>(request);
    const username = normalizeUsername(payload.username);
    const pin = payload.pin?.trim() || "";

    if (!username) return errorResponse("Username is required", 400);
    if (!/^[a-z0-9_][a-z0-9_.-]{2,31}$/.test(username)) {
        return errorResponse("Username must be 3-32 characters and use letters, numbers, underscores, dots, or dashes", 400);
    }
    if (pin.length < 4 || pin.length > 32) {
        return errorResponse("PIN must be between 4 and 32 characters", 400);
    }
    validateClientFields(payload.profile);

    const existing = await env.ORDERS_DB.prepare("SELECT * FROM clients WHERE username = ?1").bind(username).first<ClientRow>();
    const pinSalt = existing?.pin_salt ?? crypto.randomUUID();
    const pinHash = await hashPin(pin, pinSalt, env.CLIENT_PROFILE_PEPPER!);
    const timestamp = nowIso();

    if (existing) {
        const isValid = await verifyPin(pin, existing.pin_salt, existing.pin_hash, env.CLIENT_PROFILE_PEPPER!);
        if (!isValid) return errorResponse("That username is already taken", 409);

        await env.ORDERS_DB.prepare(`
            UPDATE clients
            SET email = ?2,
                name = ?3,
                whatsapp = ?4,
                country = ?5,
                company = ?6,
                contact_method = ?7,
                best_time = ?8,
                pin_hash = ?9,
                updated_at = ?10,
                last_used_at = ?10
            WHERE id = ?1
        `).bind(
            existing.id,
            normalizeEmail(payload.profile.email),
            payload.profile.name.trim(),
            payload.profile.whatsapp.trim(),
            payload.profile.country.trim(),
            payload.profile.company.trim(),
            payload.profile.contactMethod.trim(),
            payload.profile.bestTime.trim(),
            pinHash,
            timestamp,
        ).run();

        await logClientUse(env, existing.id, timestamp);
    } else {
        const clientId = crypto.randomUUID();
        await env.ORDERS_DB.prepare(`
            INSERT INTO clients (
                id, username, email, pin_hash, pin_salt, name, whatsapp, country, company,
                contact_method, best_time, created_at, updated_at, last_used_at
            )
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?12, ?12)
        `).bind(
            clientId,
            username,
            normalizeEmail(payload.profile.email),
            pinHash,
            pinSalt,
            payload.profile.name.trim(),
            payload.profile.whatsapp.trim(),
            payload.profile.country.trim(),
            payload.profile.company.trim(),
            payload.profile.contactMethod.trim(),
            payload.profile.bestTime.trim(),
            timestamp,
        ).run();
    }

    const profile: ClientProfileResponse = {
        profile: {
            username,
            name: payload.profile.name.trim(),
            email: normalizeEmail(payload.profile.email),
            whatsapp: payload.profile.whatsapp.trim(),
            country: payload.profile.country.trim(),
            company: payload.profile.company.trim(),
            contactMethod: payload.profile.contactMethod.trim(),
            bestTime: payload.profile.bestTime.trim(),
            lastUsedAt: timestamp,
        },
    };

    return json(profile, 201);
}

async function handleLookupClientProfile(request: Request, env: Env): Promise<Response> {
    ensureConfigured(env.CLIENT_PROFILE_PEPPER, "CLIENT_PROFILE_PEPPER");
    const payload = await readJson<LookupClientProfileRequest>(request);
    const username = normalizeUsername(payload.username);
    const pin = payload.pin?.trim() || "";

    if (!username || !pin) return errorResponse("Username and PIN are required", 400);

    const row = await env.ORDERS_DB.prepare("SELECT * FROM clients WHERE username = ?1").bind(username).first<ClientRow>();
    if (!row) return errorResponse("Profile not found", 404);

    const isValid = await verifyPin(pin, row.pin_salt, row.pin_hash, env.CLIENT_PROFILE_PEPPER!);
    if (!isValid) return errorResponse("Invalid username or PIN", 403);

    const timestamp = nowIso();
    await logClientUse(env, row.id, timestamp);

    const response: ClientProfileResponse = {
        profile: {
            username: row.username,
            name: row.name,
            email: row.email,
            whatsapp: row.whatsapp,
            country: row.country,
            company: row.company,
            contactMethod: row.contact_method,
            bestTime: row.best_time,
            lastUsedAt: timestamp,
        },
    };

    return json(response);
}

async function handleCreateOrder(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const payload = await readJson<OrderSubmissionPayload>(request);
    validateOrderPayload(payload);

    const orderId = crypto.randomUUID();
    const orderRef = await createUniqueOrderRef(env);
    const createdAt = nowIso();
    const username = payload.clientProfile.username ? normalizeUsername(payload.clientProfile.username) : null;
    const client = await resolveClient(env, username, payload.client.email);
    const status: OrderStatus = "received";

    await env.ORDERS_DB.prepare(`
        INSERT INTO orders (
            id, order_ref, status, project_title, service, goal, description, references_text,
            budget_mode, budget_amount_usd, final_estimated_amount_usd, discount_percent,
            referral_code, referral_unlocked, referral_source, referral_link,
            timeline, deadline, deadline_note, client_id,
            client_name_snapshot, client_email_snapshot, client_whatsapp_snapshot, client_country_snapshot,
            client_company_snapshot, preferred_contact_method, client_best_time_snapshot,
            attachment_count, created_at, updated_at
        )
        VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18, ?19, ?20, ?21, ?22, ?23, ?24, ?25, ?26, ?27, ?28, ?29, ?29)
    `).bind(
        orderId,
        orderRef,
        status,
        payload.project.title.trim(),
        payload.project.service.trim(),
        payload.project.goal.trim(),
        payload.project.description.trim(),
        payload.project.references.trim(),
        payload.budget.type,
        Math.round(payload.budget.amount),
        Math.round(payload.budget.finalEstimatedAmount),
        payload.budget.discountApplied ? payload.budget.discountPercent : 0,
        payload.referral.code.trim(),
        payload.referral.shared ? 1 : 0,
        payload.referral.source.trim(),
        payload.referral.shareLink.trim(),
        payload.schedule.timeline.trim(),
        payload.schedule.deadline.trim(),
        payload.schedule.deadlineNote.trim(),
        client?.id ?? null,
        payload.client.name.trim(),
        normalizeEmail(payload.client.email),
        payload.client.whatsapp.trim(),
        payload.client.country.trim(),
        payload.client.company.trim(),
        payload.client.preferredContactMethod.trim(),
        payload.client.bestTime.trim(),
        payload.attachments.length,
        createdAt,
    ).run();

    for (const attachment of payload.attachments) {
        await env.ORDERS_DB.prepare(`
            INSERT INTO order_attachments (
                id, order_id, storage_key, original_name, mime_type, size_bytes, created_at
            )
            VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)
        `).bind(
            crypto.randomUUID(),
            orderId,
            attachment.key,
            attachment.originalName.trim(),
            attachment.mimeType.trim(),
            attachment.size,
            createdAt,
        ).run();
    }

    const emailMessageId = crypto.randomUUID();
    await env.ORDERS_DB.prepare(`
        INSERT INTO email_messages (
            id, order_id, email_type, recipient_email, subject, status, created_at, updated_at
        )
        VALUES (?1, ?2, 'order_confirmation', ?3, ?4, 'queued', ?5, ?5)
    `).bind(
        emailMessageId,
        orderId,
        normalizeEmail(payload.client.email),
        `We received your order ${orderRef}`,
        createdAt,
    ).run();

    await logOrderEvent(env, orderId, "order.created", {
        orderRef,
        attachmentCount: payload.attachments.length,
        clientUsername: username,
    });

    if (client?.id) {
        await logClientUse(env, client.id, createdAt);
    }

    const queueMessages: QueueMessage[] = [{ type: "send-order-confirmation", orderId }];
    if (env.ORDER_WEBHOOK_URL) {
        queueMessages.push({ type: "dispatch-order-webhook", orderId, eventType: "order.created" });
    }

    ctx.waitUntil(env.EMAIL_QUEUE.sendBatch(queueMessages.map((message) => ({ body: message }))));

    const response: OrderSubmissionResponse = {
        orderId,
        orderRef,
        status,
        confirmationEmailQueued: true,
    };

    return json(response, 201);
}

async function handleAdminSearch(request: Request, env: Env): Promise<Response> {
    if (!isAuthorizedAdmin(request, env)) return errorResponse("Unauthorized", 401);

    const url = new URL(request.url);
    const query = url.searchParams.get("query")?.trim() || "";
    const status = url.searchParams.get("status")?.trim() || "";
    const limit = clampNumber(Number(url.searchParams.get("limit") || 25), 1, 100);
    const ftsQuery = toFtsQuery(query);

    const sql = `
        SELECT
            o.id,
            o.order_ref AS orderRef,
            o.status,
            o.project_title AS projectTitle,
            o.service,
            o.goal,
            o.description,
            o.references_text AS referenceLinks,
            o.budget_amount_usd AS budgetAmount,
            o.final_estimated_amount_usd AS finalEstimatedAmount,
            o.created_at AS createdAt,
            o.client_name_snapshot AS clientName,
            o.client_email_snapshot AS clientEmail,
            o.client_whatsapp_snapshot AS clientWhatsapp,
            o.client_country_snapshot AS clientCountry,
            o.client_company_snapshot AS clientCompany,
            o.preferred_contact_method AS preferredContactMethod,
            o.client_best_time_snapshot AS clientBestTime,
            c.username AS clientUsername,
            o.timeline,
            o.deadline,
            o.deadline_note AS deadlineNote,
            o.attachment_count AS attachmentCount,
            (
                SELECT GROUP_CONCAT(oa.original_name, '||')
                FROM order_attachments oa
                WHERE oa.order_id = o.id
            ) AS attachmentNames,
            (
                SELECT em.status
                FROM email_messages em
                WHERE em.order_id = o.id
                ORDER BY em.updated_at DESC
                LIMIT 1
            ) AS emailStatus
        FROM orders o
        LEFT JOIN clients c ON c.id = o.client_id
        WHERE (?1 = '' OR o.status = ?1)
          AND (
            ?2 = ''
            OR o.order_ref = ?2
            OR lower(o.client_email_snapshot) = lower(?2)
            OR lower(COALESCE(c.username, '')) = lower(?2)
            OR lower(o.client_name_snapshot) LIKE '%' || lower(?2) || '%'
            OR lower(o.project_title) LIKE '%' || lower(?2) || '%'
            OR (
                ?3 != ''
                AND o.id IN (
                    SELECT order_id
                    FROM order_search
                    WHERE order_search MATCH ?3
                )
            )
          )
        ORDER BY o.created_at DESC
        LIMIT ?4
    `;

    const results = await env.ORDERS_DB.prepare(sql).bind(status, query, ftsQuery, limit).all<AdminOrderListItem>();
    const response: AdminOrderSearchResponse = {
        results: results.results ?? [],
    };

    return json(response);
}

async function handleAdminStatusUpdate(request: Request, env: Env, orderId: string, ctx: ExecutionContext): Promise<Response> {
    if (!isAuthorizedAdmin(request, env)) return errorResponse("Unauthorized", 401);

    const payload = await readJson<UpdateOrderStatusRequest>(request);
    if (!STATUS_VALUES.has(payload.status)) return errorResponse("Invalid status", 400);

    const order = await env.ORDERS_DB.prepare("SELECT id, order_ref, status FROM orders WHERE id = ?1").bind(orderId).first<{ id: string; order_ref: string; status: OrderStatus }>();
    if (!order) return errorResponse("Order not found", 404);
    if (order.status === payload.status) {
        return json({
            ok: true,
            orderId,
            orderRef: order.order_ref,
            status: payload.status,
            notificationEmailQueued: false,
        });
    }

    const timestamp = nowIso();
    await env.ORDERS_DB.prepare("UPDATE orders SET status = ?2, updated_at = ?3 WHERE id = ?1").bind(orderId, payload.status, timestamp).run();
    await logOrderEvent(env, orderId, "order.status_updated", {
        previousStatus: order.status,
        nextStatus: payload.status,
    });

    const statusEmailMessageId = crypto.randomUUID();
    const statusEmailType = `order_status_update:${timestamp}:${payload.status}`;
    await env.ORDERS_DB.prepare(`
        INSERT INTO email_messages (
            id, order_id, email_type, recipient_email, subject, status, metadata_json, created_at, updated_at
        )
        SELECT
            ?1,
            o.id,
            ?2,
            o.client_email_snapshot,
            ?3,
            'queued',
            ?4,
            ?5,
            ?5
        FROM orders o
        WHERE o.id = ?6
    `).bind(
        statusEmailMessageId,
        statusEmailType,
        createOrderStatusSubject(order.order_ref, payload.status),
        JSON.stringify({
            previousStatus: order.status,
            nextStatus: payload.status,
        }),
        timestamp,
        orderId,
    ).run();

    const queueMessages: QueueMessage[] = [{
        type: "send-order-status-update",
        orderId,
        emailMessageId: statusEmailMessageId,
        previousStatus: order.status,
        nextStatus: payload.status,
    }];

    if (env.ORDER_WEBHOOK_URL) {
        queueMessages.push({
            type: "dispatch-order-webhook",
            orderId,
            eventType: "order.status_updated",
        });
    }

    ctx.waitUntil(env.EMAIL_QUEUE.sendBatch(queueMessages.map((message) => ({ body: message }))));

    return json({
        ok: true,
        orderId,
        orderRef: order.order_ref,
        status: payload.status,
        notificationEmailQueued: true,
    });
}

async function handleResendWebhook(request: Request, env: Env): Promise<Response> {
    ensureConfigured(env.RESEND_WEBHOOK_SECRET, "RESEND_WEBHOOK_SECRET");

    const body = await request.text();
    const headers = {
        "svix-id": request.headers.get("svix-id") ?? "",
        "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
        "svix-signature": request.headers.get("svix-signature") ?? "",
    };

    if (!headers["svix-id"] || !headers["svix-timestamp"] || !headers["svix-signature"]) {
        return errorResponse("Missing webhook signature headers", 400);
    }

    let payload: Record<string, unknown>;
    try {
        payload = new Webhook(env.RESEND_WEBHOOK_SECRET!).verify(body, headers) as Record<string, unknown>;
    } catch (error) {
        console.error("Resend webhook verification failed", error);
        return errorResponse("Invalid webhook signature", 400);
    }

    const eventType = String(payload.type || "unknown");
    const data = (payload.data && typeof payload.data === "object" ? payload.data : {}) as Record<string, unknown>;
    const resendEmailId = String(data.email_id || data.id || "");
    const receiptId = crypto.randomUUID();

    try {
        await env.ORDERS_DB.prepare(`
            INSERT INTO webhook_receipts (
                id, provider, external_id, event_type, signature_id, payload_json, received_at
            )
            VALUES (?1, 'resend', ?2, ?3, ?4, ?5, ?6)
        `).bind(
            receiptId,
            resendEmailId,
            eventType,
            headers["svix-id"],
            body,
            nowIso(),
        ).run();
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (message.toLowerCase().includes("unique")) {
            return new Response(null, { status: 204 });
        }
        throw error;
    }

    if (resendEmailId) {
        const emailRow = await env.ORDERS_DB.prepare("SELECT id, order_id FROM email_messages WHERE resend_email_id = ?1").bind(resendEmailId).first<{ id: string; order_id: string }>();
        if (emailRow) {
            const mappedStatus = mapEmailStatus(eventType);
            await env.ORDERS_DB.prepare(`
                UPDATE email_messages
                SET status = ?2, metadata_json = ?3, updated_at = ?4
                WHERE id = ?1
            `).bind(
                emailRow.id,
                mappedStatus,
                body,
                nowIso(),
            ).run();

            await logOrderEvent(env, emailRow.order_id, `email.${mappedStatus}`, {
                resendEmailId,
                webhookEvent: eventType,
            });
        }
    }

    return new Response(null, { status: 204 });
}

async function sendOrderConfirmation(env: Env, orderId: string): Promise<void> {
    ensureConfigured(env.RESEND_API_KEY, "RESEND_API_KEY");
    ensureConfigured(env.ORDER_SENDER_EMAIL, "ORDER_SENDER_EMAIL");

    const order = await env.ORDERS_DB.prepare("SELECT * FROM orders WHERE id = ?1").bind(orderId).first<OrderRow>();
    if (!order) throw new Error(`Order ${orderId} not found`);

    const emailRow = await env.ORDERS_DB.prepare(`
        SELECT id, resend_email_id, status
        FROM email_messages
        WHERE order_id = ?1 AND email_type = 'order_confirmation'
        LIMIT 1
    `).bind(orderId).first<EmailMessageRow>();

    if (!emailRow?.id) throw new Error(`Confirmation email row missing for ${orderId}`);
    if (emailRow.resend_email_id && ["sent", "delivered"].includes(emailRow.status)) {
        return;
    }

    const subject = `Thank you for your order ${order.order_ref}`;
    const idempotencyKey = `order-confirmation-${order.id}`;
    const emailPayload = createOrderConfirmationEmail(order, env);

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
            from: formatFromAddress(env),
            to: [order.client_email_snapshot],
            reply_to: env.ORDER_REPLY_TO || env.ORDER_SENDER_EMAIL,
            subject,
            html: emailPayload.html,
            text: emailPayload.text,
            tags: [
                { name: "order_ref", value: toTagValue(order.order_ref) },
                { name: "email_type", value: "order_confirmation" },
            ],
        }),
    });

    const result = await response.json<Record<string, unknown>>();
    if (!response.ok) {
        await env.ORDERS_DB.prepare(`
            UPDATE email_messages
            SET status = 'failed', metadata_json = ?2, updated_at = ?3
            WHERE id = ?1
        `).bind(emailRow.id, JSON.stringify(result), nowIso()).run();
        throw new Error(`Resend error: ${JSON.stringify(result)}`);
    }

    await env.ORDERS_DB.prepare(`
        UPDATE email_messages
        SET resend_email_id = ?2, status = 'sent', subject = ?3, metadata_json = ?4, updated_at = ?5
        WHERE id = ?1
    `).bind(
        emailRow.id,
        String(result.id || ""),
        subject,
        JSON.stringify(result),
        nowIso(),
    ).run();

    await logOrderEvent(env, orderId, "email.sent", {
        resendEmailId: String(result.id || ""),
        type: "order_confirmation",
    });
}

async function sendOrderStatusUpdateEmail(
    env: Env,
    orderId: string,
    emailMessageId: string,
    previousStatus: OrderStatus,
    nextStatus: OrderStatus,
): Promise<void> {
    ensureConfigured(env.RESEND_API_KEY, "RESEND_API_KEY");
    ensureConfigured(env.ORDER_SENDER_EMAIL, "ORDER_SENDER_EMAIL");

    const order = await env.ORDERS_DB.prepare("SELECT * FROM orders WHERE id = ?1").bind(orderId).first<OrderRow>();
    if (!order) throw new Error(`Order ${orderId} not found`);

    const emailRow = await env.ORDERS_DB.prepare(`
        SELECT id, resend_email_id, status
        FROM email_messages
        WHERE id = ?1 AND order_id = ?2
        LIMIT 1
    `).bind(emailMessageId, orderId).first<EmailMessageRow>();

    if (!emailRow?.id) throw new Error(`Status update email row missing for ${orderId}`);
    if (emailRow.resend_email_id && ["sent", "delivered"].includes(emailRow.status)) {
        return;
    }

    const subject = createOrderStatusSubject(order.order_ref, nextStatus);
    const idempotencyKey = `order-status-update-${emailMessageId}`;
    const emailPayload = createOrderStatusUpdateEmail(order, env, previousStatus, nextStatus);

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
        },
        body: JSON.stringify({
            from: formatFromAddress(env),
            to: [order.client_email_snapshot],
            reply_to: env.ORDER_REPLY_TO || env.ORDER_SENDER_EMAIL,
            subject,
            html: emailPayload.html,
            text: emailPayload.text,
            tags: [
                { name: "order_ref", value: toTagValue(order.order_ref) },
                { name: "email_type", value: "order_status_update" },
                { name: "order_status", value: toTagValue(nextStatus) },
            ],
        }),
    });

    const result = await response.json<Record<string, unknown>>();
    if (!response.ok) {
        await env.ORDERS_DB.prepare(`
            UPDATE email_messages
            SET status = 'failed', metadata_json = ?2, updated_at = ?3
            WHERE id = ?1
        `).bind(emailRow.id, JSON.stringify(result), nowIso()).run();
        throw new Error(`Resend error: ${JSON.stringify(result)}`);
    }

    await env.ORDERS_DB.prepare(`
        UPDATE email_messages
        SET resend_email_id = ?2, status = 'sent', subject = ?3, metadata_json = ?4, updated_at = ?5
        WHERE id = ?1
    `).bind(
        emailRow.id,
        String(result.id || ""),
        subject,
        JSON.stringify({
            resend: result,
            previousStatus,
            nextStatus,
        }),
        nowIso(),
    ).run();

    await logOrderEvent(env, orderId, "email.sent", {
        resendEmailId: String(result.id || ""),
        type: "order_status_update",
        previousStatus,
        nextStatus,
    });
}

async function dispatchOrderWebhook(env: Env, orderId: string, eventType: "order.created" | "order.status_updated"): Promise<void> {
    if (!env.ORDER_WEBHOOK_URL) return;

    const order = await env.ORDERS_DB.prepare(`
        SELECT o.*, c.username AS client_username
        FROM orders o
        LEFT JOIN clients c ON c.id = o.client_id
        WHERE o.id = ?1
    `).bind(orderId).first<Record<string, unknown>>();
    if (!order) throw new Error(`Order ${orderId} not found`);

    const payload = JSON.stringify({
        event: eventType,
        occurredAt: nowIso(),
        order,
    });

    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (env.ORDER_WEBHOOK_SECRET) {
        headers["x-30px-signature"] = await signPayload(payload, env.ORDER_WEBHOOK_SECRET);
    }

    const response = await fetch(env.ORDER_WEBHOOK_URL, {
        method: "POST",
        headers,
        body: payload,
    });

    if (!response.ok) {
        throw new Error(`Outbound webhook failed with ${response.status}`);
    }

    await logOrderEvent(env, orderId, "webhook.dispatched", {
        eventType,
        destination: env.ORDER_WEBHOOK_URL,
    });
}

async function resolveClient(env: Env, username: string | null, email: string): Promise<ClientRow | null> {
    if (username) {
        const byUsername = await env.ORDERS_DB.prepare("SELECT * FROM clients WHERE username = ?1").bind(username).first<ClientRow>();
        if (byUsername) return byUsername;
    }

    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail) return null;

    return env.ORDERS_DB.prepare("SELECT * FROM clients WHERE email = ?1").bind(normalizedEmail).first<ClientRow>();
}

async function createUniqueOrderRef(env: Env): Promise<string> {
    for (let attempt = 0; attempt < 5; attempt += 1) {
        const orderRef = buildOrderRef();
        const existing = await env.ORDERS_DB.prepare("SELECT id FROM orders WHERE order_ref = ?1").bind(orderRef).first();
        if (!existing) return orderRef;
    }
    throw new Error("Could not generate unique order reference");
}

function buildOrderRef(): string {
    const date = new Date();
    const yyyymmdd = `${date.getUTCFullYear()}${String(date.getUTCMonth() + 1).padStart(2, "0")}${String(date.getUTCDate()).padStart(2, "0")}`;
    const random = crypto.randomUUID().replace(/-/g, "").slice(0, 6).toUpperCase();
    return `30PX-${yyyymmdd}-${random}`;
}

async function logOrderEvent(env: Env, orderId: string, eventType: string, payload: unknown): Promise<void> {
    await env.ORDERS_DB.prepare(`
        INSERT INTO order_events (id, order_id, event_type, payload_json, created_at)
        VALUES (?1, ?2, ?3, ?4, ?5)
    `).bind(
        crypto.randomUUID(),
        orderId,
        eventType,
        JSON.stringify(payload),
        nowIso(),
    ).run();
}

async function logClientUse(env: Env, clientId: string, timestamp: string): Promise<void> {
    await env.ORDERS_DB.prepare("UPDATE clients SET last_used_at = ?2, updated_at = ?2 WHERE id = ?1").bind(clientId, timestamp).run();
}

function validateOrderPayload(payload: OrderSubmissionPayload): void {
    if (!payload.project.title.trim()) throw new HttpError("Project title is required", 400);
    if (!payload.project.service.trim()) throw new HttpError("Service is required", 400);
    if (!payload.project.goal.trim()) throw new HttpError("Goal is required", 400);
    if (payload.project.description.trim().length < 20) throw new HttpError("Project description is too short", 400);
    if (!Number.isFinite(payload.budget.amount) || payload.budget.amount < 50) throw new HttpError("Budget is invalid", 400);
    validateClientFields({
        name: payload.client.name,
        email: payload.client.email,
        whatsapp: payload.client.whatsapp,
        country: payload.client.country,
        company: payload.client.company,
        contactMethod: payload.client.preferredContactMethod,
        bestTime: payload.client.bestTime,
    });

    for (const attachment of payload.attachments) {
        if (!attachment.key.trim()) throw new HttpError("Attachment key is required", 400);
        if (!attachment.originalName.trim()) throw new HttpError("Attachment filename is required", 400);
        if (!Number.isFinite(attachment.size) || attachment.size <= 0 || attachment.size > MAX_FILE_SIZE) {
            throw new HttpError("Attachment size is invalid", 400);
        }
    }
}

function validateClientFields(profile: {
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    company: string;
    contactMethod: string;
    bestTime: string;
}): void {
    if (!profile.name.trim()) throw new HttpError("Name is required", 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) throw new HttpError("A valid email is required", 400);
    if (!profile.whatsapp.trim()) throw new HttpError("WhatsApp number is required", 400);
    if (!profile.country.trim()) throw new HttpError("Country is required", 400);
}

function createOrderConfirmationEmail(order: OrderRow, env: Env): { html: string; text: string } {
    const homepage = env.APP_BASE_URL || "https://thirtypixels.com";
    const html = `
        <div style="font-family:Arial,sans-serif;background:#f6f6f6;padding:32px;color:#111827;">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:#7c3aed;">${escapeHtml(order.order_ref)}</p>
                <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;">Thank you for your order</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#4b5563;">
                    Hi ${escapeHtml(order.client_name_snapshot)}, we received your order and we are reviewing the details now.
                </p>
                <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:18px 20px;margin:24px 0;">
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Project</p>
                    <p style="margin:0 0 16px;font-size:18px;font-weight:700;">${escapeHtml(order.project_title)}</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Service</p>
                    <p style="margin:0 0 16px;font-size:16px;font-weight:600;">${escapeHtml(order.service)}</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Estimated total</p>
                    <p style="margin:0;font-size:16px;font-weight:600;">$${order.final_estimated_amount_usd}</p>
                </div>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
                    We will check the scope, files, and timeline, then follow up with the next step.
                </p>
                <p style="margin:24px 0 0;font-size:14px;color:#6b7280;">
                    Need to add something? Reply to this email or visit
                    <a href="${homepage}" style="color:#7c3aed;text-decoration:none;"> thirtypixels.com</a>.
                </p>
            </div>
        </div>
    `.trim();

    const text = [
        `Thank you for your order ${order.order_ref}`,
        "",
        `Hi ${order.client_name_snapshot}, we received your order and we are reviewing the details now.`,
        "",
        `Project: ${order.project_title}`,
        `Service: ${order.service}`,
        `Estimated total: $${order.final_estimated_amount_usd}`,
        "",
        "We will check the scope, files, and timeline, then follow up with the next step.",
    ].join("\n");

    return { html, text };
}

function createOrderStatusUpdateEmail(
    order: OrderRow,
    env: Env,
    previousStatus: OrderStatus,
    nextStatus: OrderStatus,
): { html: string; text: string } {
    const homepage = env.APP_BASE_URL || "https://thirtypixels.com";
    const previousLabel = formatOrderStatus(previousStatus);
    const nextLabel = formatOrderStatus(nextStatus);
    const headline = getStatusEmailHeadline(nextStatus);
    const detail = getStatusEmailDetail(nextStatus);

    const html = `
        <div style="font-family:Arial,sans-serif;background:#f6f6f6;padding:32px;color:#111827;">
            <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px;">
                <p style="margin:0 0 12px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:#7c3aed;">${escapeHtml(order.order_ref)}</p>
                <h1 style="margin:0 0 16px;font-size:28px;line-height:1.2;">${escapeHtml(headline)}</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#4b5563;">
                    Hi ${escapeHtml(order.client_name_snapshot)}, your order status has been updated from
                    <strong>${escapeHtml(previousLabel)}</strong> to <strong>${escapeHtml(nextLabel)}</strong>.
                </p>
                <div style="background:#faf5ff;border:1px solid #e9d5ff;border-radius:10px;padding:18px 20px;margin:24px 0;">
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Project</p>
                    <p style="margin:0 0 16px;font-size:18px;font-weight:700;">${escapeHtml(order.project_title)}</p>
                    <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Current status</p>
                    <p style="margin:0;font-size:16px;font-weight:600;">${escapeHtml(nextLabel)}</p>
                </div>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#4b5563;">
                    ${escapeHtml(detail)}
                </p>
                <p style="margin:24px 0 0;font-size:14px;color:#6b7280;">
                    Questions or new files to share? Reply to this email or visit
                    <a href="${homepage}" style="color:#7c3aed;text-decoration:none;"> thirtypixels.com</a>.
                </p>
            </div>
        </div>
    `.trim();

    const text = [
        createOrderStatusSubject(order.order_ref, nextStatus),
        "",
        `Hi ${order.client_name_snapshot}, your order status has been updated from ${previousLabel} to ${nextLabel}.`,
        "",
        `Project: ${order.project_title}`,
        `Current status: ${nextLabel}`,
        "",
        detail,
        "",
        "Questions or new files to share? Reply to this email or visit thirtypixels.com.",
    ].join("\n");

    return { html, text };
}

async function readJson<T>(request: Request): Promise<T> {
    try {
        return await request.json<T>();
    } catch {
        throw new HttpError("Invalid JSON body", 400);
    }
}

function json(data: unknown, status = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
        },
    });
}

function errorResponse(message: string, status: number): Response {
    const body: ApiErrorResponse = { error: message };
    return json(body, status);
}

function withCors(response: Response, request: Request): Response {
    const headers = new Headers(response.headers);
    const origin = request.headers.get("origin");
    if (origin) headers.set("Access-Control-Allow-Origin", origin);
    headers.set("Access-Control-Allow-Methods", "GET,POST,PATCH,OPTIONS");
    headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-File-Name");
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
    });
}

function isAuthorizedAdmin(request: Request, env: Env): boolean {
    const accessEmail = request.headers.get("cf-access-authenticated-user-email");
    if (accessEmail) return true;

    if (!env.ADMIN_API_TOKEN) return false;
    const authHeader = request.headers.get("authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
    return token === env.ADMIN_API_TOKEN;
}

function clampNumber(value: number, min: number, max: number): number {
    if (!Number.isFinite(value)) return min;
    return Math.min(max, Math.max(min, value));
}

function normalizeUsername(value: string): string {
    return value.trim().toLowerCase();
}

function normalizeEmail(value: string): string {
    return value.trim().toLowerCase();
}

function sanitizeFileName(value: string): string {
    return value.replace(/[^A-Za-z0-9._-]/g, "-").slice(0, 120);
}

function getExtension(fileName: string): string {
    const last = fileName.split(".").pop();
    return last ? last.toLowerCase() : "";
}

function formatFromAddress(env: Env): string {
    const senderName = env.ORDER_SENDER_NAME?.trim() || "Project";
    return `${senderName} <${env.ORDER_SENDER_EMAIL}>`;
}

function toTagValue(value: string): string {
    return value.replace(/[^A-Za-z0-9_-]/g, "_").slice(0, 256);
}

function escapeHtml(value: string): string {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function createOrderStatusSubject(orderRef: string, status: OrderStatus): string {
    return `Update on your order ${orderRef}: ${formatOrderStatus(status)}`;
}

function formatOrderStatus(status: OrderStatus): string {
    return status.replaceAll("_", " ").replace(/\b\w/g, (char) => char.toUpperCase());
}

function getStatusEmailHeadline(status: OrderStatus): string {
    switch (status) {
        case "received":
            return "Your order has been received";
        case "reviewing":
            return "Your order is now under review";
        case "quoted":
            return "Your quote is ready";
        case "in_progress":
            return "Your project is now in progress";
        case "completed":
            return "Your order has been completed";
        case "archived":
            return "Your order has been archived";
        default:
            return "Your order status has been updated";
    }
}

function getStatusEmailDetail(status: OrderStatus): string {
    switch (status) {
        case "received":
            return "We have safely logged your request and will review the details shortly.";
        case "reviewing":
            return "We are checking your files, scope, and requirements so we can move this forward properly.";
        case "quoted":
            return "We have prepared the quote stage for your order and will follow up with pricing or next-step details.";
        case "in_progress":
            return "Work has started on your project and we will keep things moving based on the approved scope.";
        case "completed":
            return "Your requested work has been marked as completed. If you need revisions or final handoff support, just reply to this email.";
        case "archived":
            return "This order has been archived on our side. If you would like to reopen it, reply and we can help.";
        default:
            return "We wanted to keep you updated as your order moves through our process.";
    }
}

function mapEmailStatus(eventType: string): string {
    if (eventType.includes("delivered")) return "delivered";
    if (eventType.includes("bounced")) return "bounced";
    if (eventType.includes("complained")) return "complained";
    if (eventType.includes("failed")) return "failed";
    if (eventType.includes("sent")) return "sent";
    if (eventType.includes("opened")) return "opened";
    if (eventType.includes("clicked")) return "clicked";
    return eventType.replace(/[^a-z0-9_]+/gi, "_").toLowerCase();
}

function toFtsQuery(input: string): string {
    const tokens = input
        .split(/\s+/)
        .map((token) => token.replace(/[^A-Za-z0-9]/g, "").trim())
        .filter(Boolean)
        .slice(0, 8);

    if (tokens.length === 0) return "";
    return tokens.map((token) => `${token}*`).join(" AND ");
}

function nowIso(): string {
    return new Date().toISOString();
}

function ensureConfigured(value: string | undefined, key: string): asserts value is string {
    if (!value) throw new Error(`Missing required secret: ${key}`);
}

async function hashPin(pin: string, salt: string, pepper: string): Promise<string> {
    const key = await crypto.subtle.importKey("raw", encoder.encode(`${pin}:${pepper}`), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            hash: "SHA-256",
            salt: encoder.encode(salt),
            iterations: 120_000,
        },
        key,
        256,
    );

    return bufferToBase64(bits);
}

async function verifyPin(pin: string, salt: string, expectedHash: string, pepper: string): Promise<boolean> {
    const actualHash = await hashPin(pin, salt, pepper);
    return timingSafeEqual(actualHash, expectedHash);
}

function bufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    return btoa(binary);
}

function timingSafeEqual(a: string, b: string): boolean {
    if (a.length !== b.length) return false;
    let mismatch = 0;
    for (let index = 0; index < a.length; index += 1) {
        mismatch |= a.charCodeAt(index) ^ b.charCodeAt(index);
    }
    return mismatch === 0;
}

async function signPayload(payload: string, secret: string): Promise<string> {
    const key = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["sign"],
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
    return bufferToBase64(signature);
}

class HttpError extends Error {
    status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
    }
}
