import { Product, ProductRepository } from '../../../domain/product/product.js';
import {
    Amount,
    Currency,
    Price,
    Quantity,
    Sku,
} from '../../../domain/shared.js';
import clock from '../clock.js';
import { Connection } from '../database/connection.js';

type ProductRow = {
    quantity: number;
    amount: string;
    currency: Currency;
    created_at: string;
    updated_at: string | null;
};

class PostgresProductRepository implements ProductRepository {
    constructor(readonly connection: Connection, readonly table: string) {}

    async add(product: Product): Promise<void> {
        return new Promise(() => {});
    }

    async get(sku: Sku): Promise<Product> {
        return await this.connection.one(
            `SELECT * FROM ${this.table} WHERE sku = $1`,
            sku.toString(),
            (product: ProductRow) =>
                new Product(
                    sku,
                    new Quantity(product.quantity),
                    new Price(new Amount(product.amount), product.currency),
                    clock.fromString(product.created_at),
                    clock.fromNullableString(product.updated_at),
                ),
        );
    }
}

export default PostgresProductRepository;
