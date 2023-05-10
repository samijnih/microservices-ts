CREATE EXTENSION "uuid-ossp";

CREATE TABLE product (
    sku VARCHAR(64) PRIMARY KEY,
    amount TEXT NOT NULL,
    currency CHAR(3) NOT NULL,
    quantity INT NOT NULl,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NULL
);

CREATE TABLE cart (
    id UUID PRIMARY KEY,
    customer_id UUID NULL,
    expires_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NULL
);

CREATE TABLE cart_line (
    cart_id UUID NOT NULL,
    sku VARCHAR(64),
    quantity INT NOT NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NULL,
    PRIMARY KEY (cart_id, sku)
);
