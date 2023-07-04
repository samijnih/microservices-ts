CREATE EXTENSION "uuid-ossp";

CREATE TABLE product (
    sku VARCHAR(64) PRIMARY KEY,
    amount TEXT NOT NULL,
    currency CHAR(3) NOT NULL,
    created_at timestamptz NOT NULL,
    updated_at timestamptz NULL
);
