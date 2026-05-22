# Order System Setup

## Cloudflare resources

Create these resources before deployment:

1. D1 database: `30px-orders`
2. R2 bucket: `30px-order-assets`
3. Queue: `30px-order-events`
4. Dead-letter queue: `30px-order-events-dlq`

After creating the D1 database, replace `REPLACE_WITH_D1_DATABASE_ID` in [wrangler.jsonc](/E:/30PX-Website-Main-Files/30PX/Website/wrangler.jsonc).

## Secrets

Copy [.dev.vars.example](/E:/30PX-Website-Main-Files/30PX/Website/.dev.vars.example) to `.dev.vars` for local development, then set the same values in Cloudflare for production:

- `RESEND_API_KEY`
- `RESEND_WEBHOOK_SECRET`
- `CLIENT_PROFILE_PEPPER`
- `ADMIN_API_TOKEN`
- `ORDER_WEBHOOK_URL` optional
- `ORDER_WEBHOOK_SECRET` optional

## Migrations

Run the D1 migration:

```powershell
npm run db:migrate:local
```

For production:

```powershell
npm run db:migrate:remote
```

## Local development

Run the worker and frontend in two terminals:

```powershell
npm run dev:worker
```

```powershell
npm run dev
```

The Vite dev server proxies `/api/*` to the worker on `http://127.0.0.1:8787`.

## Resend webhook

Create a Resend webhook that points to:

```text
https://your-domain.com/api/webhooks/resend
```

Subscribe to at least:

- `email.sent`
- `email.delivered`
- `email.delivery_delayed`
- `email.failed`
- `email.bounced`
- `email.complained`

## Admin search

Use the internal page at:

```text
/admin/orders
```

For production, protect it with Cloudflare Access and keep `ADMIN_API_TOKEN` as a fallback.
