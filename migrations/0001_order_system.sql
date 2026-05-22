PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS clients (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    pin_hash TEXT NOT NULL,
    pin_salt TEXT NOT NULL,
    name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    country TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT '',
    contact_method TEXT NOT NULL DEFAULT 'WhatsApp',
    best_time TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    last_used_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_last_used ON clients(last_used_at);

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    order_ref TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    project_title TEXT NOT NULL,
    service TEXT NOT NULL,
    goal TEXT NOT NULL,
    description TEXT NOT NULL,
    references_text TEXT NOT NULL DEFAULT '',
    budget_mode TEXT NOT NULL,
    budget_amount_usd INTEGER NOT NULL,
    final_estimated_amount_usd INTEGER NOT NULL,
    discount_percent INTEGER NOT NULL DEFAULT 0,
    referral_code TEXT NOT NULL DEFAULT '',
    referral_unlocked INTEGER NOT NULL DEFAULT 0,
    referral_source TEXT NOT NULL DEFAULT '',
    referral_link TEXT NOT NULL DEFAULT '',
    timeline TEXT NOT NULL,
    deadline TEXT NOT NULL DEFAULT '',
    deadline_note TEXT NOT NULL DEFAULT '',
    client_id TEXT,
    client_name_snapshot TEXT NOT NULL,
    client_email_snapshot TEXT NOT NULL,
    client_whatsapp_snapshot TEXT NOT NULL,
    client_country_snapshot TEXT NOT NULL,
    client_company_snapshot TEXT NOT NULL DEFAULT '',
    preferred_contact_method TEXT NOT NULL DEFAULT 'WhatsApp',
    client_best_time_snapshot TEXT NOT NULL DEFAULT '',
    attachment_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_client_email ON orders(client_email_snapshot);
CREATE INDEX IF NOT EXISTS idx_orders_client_name ON orders(client_name_snapshot);

CREATE TABLE IF NOT EXISTS order_attachments (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    storage_key TEXT NOT NULL,
    original_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_order_attachments_order_id ON order_attachments(order_id);

CREATE TABLE IF NOT EXISTS order_events (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    event_type TEXT NOT NULL,
    payload_json TEXT NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_order_events_order_id ON order_events(order_id, created_at DESC);

CREATE TABLE IF NOT EXISTS email_messages (
    id TEXT PRIMARY KEY,
    order_id TEXT NOT NULL,
    email_type TEXT NOT NULL,
    resend_email_id TEXT,
    recipient_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    status TEXT NOT NULL,
    metadata_json TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_email_messages_order_type ON email_messages(order_id, email_type);
CREATE INDEX IF NOT EXISTS idx_email_messages_resend_id ON email_messages(resend_email_id);
CREATE INDEX IF NOT EXISTS idx_email_messages_status ON email_messages(status);

CREATE TABLE IF NOT EXISTS webhook_receipts (
    id TEXT PRIMARY KEY,
    provider TEXT NOT NULL,
    external_id TEXT,
    event_type TEXT NOT NULL,
    signature_id TEXT NOT NULL UNIQUE,
    payload_json TEXT NOT NULL,
    received_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_webhook_receipts_provider ON webhook_receipts(provider, received_at DESC);

CREATE VIRTUAL TABLE IF NOT EXISTS order_search USING fts5(
    order_id UNINDEXED,
    order_ref,
    project_title,
    service,
    goal,
    description,
    references_text,
    client_name,
    client_email,
    client_company,
    tokenize = 'unicode61'
);

CREATE TRIGGER IF NOT EXISTS orders_ai AFTER INSERT ON orders BEGIN
    INSERT INTO order_search (
        order_id,
        order_ref,
        project_title,
        service,
        goal,
        description,
        references_text,
        client_name,
        client_email,
        client_company
    )
    VALUES (
        new.id,
        new.order_ref,
        new.project_title,
        new.service,
        new.goal,
        new.description,
        new.references_text,
        new.client_name_snapshot,
        new.client_email_snapshot,
        new.client_company_snapshot
    );
END;

CREATE TRIGGER IF NOT EXISTS orders_au AFTER UPDATE ON orders BEGIN
    DELETE FROM order_search WHERE order_id = old.id;
    INSERT INTO order_search (
        order_id,
        order_ref,
        project_title,
        service,
        goal,
        description,
        references_text,
        client_name,
        client_email,
        client_company
    )
    VALUES (
        new.id,
        new.order_ref,
        new.project_title,
        new.service,
        new.goal,
        new.description,
        new.references_text,
        new.client_name_snapshot,
        new.client_email_snapshot,
        new.client_company_snapshot
    );
END;

CREATE TRIGGER IF NOT EXISTS orders_ad AFTER DELETE ON orders BEGIN
    DELETE FROM order_search WHERE order_id = old.id;
END;
