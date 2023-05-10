INSERT INTO product (sku, amount, currency, quantity, created_at, updated_at)
VALUES ('P1', 2999, 'EUR', 4, current_timestamp, null),
       ('P2', 1099, 'EUR', 2, current_timestamp, null),
       ('P3', 9950, 'EUR', 1, current_timestamp, null),
       ('P4', 39900, 'EUR', 0, current_timestamp, null);

INSERT INTO cart (id, customer_id, expires_at, created_at, updated_at)
VALUES ('526d43c9-9862-44b0-bff8-86334d03987e', null, current_timestamp + '15 days', current_timestamp, null),
       ('57ce2ceb-0029-42c8-8b3f-8fb6b867bfeb', '3f2326b8-3696-4ede-b62a-fc6f3a4f6818', current_timestamp + '15 days',
        current_timestamp, null),
       ('b09bccf2-9593-44ae-9581-ba5c711542a3', 'ce9f03ba-1a3b-43a8-945a-ea2c9707faf8', current_timestamp + '15 days',
        current_timestamp, null),
       ('5bcb0a57-3959-49db-b7c1-4fa191a294dd', null, current_timestamp + '15 days', current_timestamp, null);

INSERT INTO cart_line (sku, cart_id, quantity, created_at, updated_at)
VALUES ('P1', '526d43c9-9862-44b0-bff8-86334d03987e', 2, current_timestamp, null),
       ('P3', '526d43c9-9862-44b0-bff8-86334d03987e', 1, current_timestamp, null),

       ('P2', '57ce2ceb-0029-42c8-8b3f-8fb6b867bfeb', 1, current_timestamp, null),
       ('P3', '57ce2ceb-0029-42c8-8b3f-8fb6b867bfeb', 1, current_timestamp, null),

       ('P4', 'b09bccf2-9593-44ae-9581-ba5c711542a3', 1, current_timestamp, null)
;
