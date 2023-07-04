import { Product, ProductRepository } from '../../../domain/product/product.js';
import { Amount, Currency, Price, Sku } from '../../../domain/shared.js';
import clock from '../clock.js';
import { Connection } from '../database/connection.js';

type ProductRow = {
    amount: string;
    currency: Currency;
    created_at: string;
    updated_at: string | null;
};

class PostgresProductRepository implements ProductRepository {
    constructor(readonly connection: Connection, readonly table: string) {}

    async add(product: Product): Promise<void> {
        const price = product.getPrice();

        const query = `INSERT INTO ${this.table} (sku, amount, currency, created_at) VALUES ($1, $2, $3, $4)`;
        await this.connection.none(query, [
            product.id().toString(),
            price.amount.value,
            price.currency,
            product.getCreatedAt().toString(),
        ]);
    }

    async update(product: Product): Promise<void> {
        const price = product.getPrice();

        const query = `UPDATE ${this.table} (amount, currency, updated_at) VALUES ($1, $2, $3) WHERE sku = $4`;
        await this.connection.none(query, [
            price.amount.value,
            price.currency,
            product.getUpdatedAt(),
            product.id().toString(),
        ]);
    }

    async get(sku: Sku): Promise<Product> {
        return await this.connection.one(
            `SELECT * FROM ${this.table} WHERE sku = $1`,
            sku.toString(),
            (product: ProductRow) =>
                new Product(
                    sku,
                    new Price(new Amount(product.amount), product.currency),
                    clock.fromString(product.created_at),
                    clock.fromNullableString(product.updated_at),
                ),
        );
    }

    async remove(product: Product): Promise<void> {
        await this.connection.none(
            `DELETE FROM ${this.table} WHERE sku = $1`,
            product.id().toString(),
        );
    }
}

export default PostgresProductRepository;
