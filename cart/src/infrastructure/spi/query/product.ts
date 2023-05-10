import { GetProductQuery, Product } from 'src/domain/product/features/get.js';
import { Connection } from '../database/connection.js';

type ProductRow = {
    quantity: number;
    amount: string;
    currency: string;
    created_at: string;
    updated_at: string | null;
};

export default class GetProductPostgresQuery implements GetProductQuery {
    constructor(readonly connection: Connection, readonly table: string) {}

    async execute(sku: string): Promise<Product> {
        return await this.connection.one(
            `SELECT * FROM ${this.table} WHERE sku = $1`,
            sku,
            (product: ProductRow): Product => ({
                sku: sku,
                quantity: product.quantity,
                price: { amount: product.amount, currency: product.currency },
                createdAt: product.created_at,
                updatedAt: product.updated_at,
            }),
        );
    }
}
