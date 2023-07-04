import { Connection } from '../../database/connection.js';
import {
    Cart,
    CartId,
    CartLine,
    CartNotFound,
    GetCartQuery,
} from '../../../../domain/cart/features/get.js';
import * as console from 'console';

type LineRow = {
    sku: string;
    quantity: number;
    amount: string;
    currency: string;
    created_at: string;
    updated_at: string | null;
};

type CartRow = {
    id: string;
    customer_id: string | null;
    lines: Array<LineRow>;
    expires_at: string;
    created_at: string;
    updated_at: string | null;
};

export default class GetCartPostgresQuery implements GetCartQuery {
    constructor(readonly connection: Connection) {}

    async execute(id: CartId): Promise<Cart> {
        const query = `
            SELECT c.customer_id,
                   c.expires_at,
                   c.created_at,
                   c.updated_at,
                   jsonb_agg(
                        jsonb_build_object(
                            'sku', cl.sku,
                            'quantity', cl.quantity,
                            'amount', p.amount,
                            'currency', p.currency,
                            'created_at', cl.created_at,
                            'updated_at', cl.updated_at
                        )
                   ) as lines
        FROM cart c
                 INNER JOIN cart_line cl ON cl.cart_id = c.id
                 INNER JOIN product p ON p.sku = cl.sku
        WHERE c.id = $1
        GROUP BY c.id`;

        return await this.connection
            .one(query, id, (cart: CartRow): Cart => {
                return {
                    id: id,
                    customerId: cart.customer_id,
                    lines: cart.lines.map((line: LineRow): CartLine => {
                        return {
                            sku: line.sku,
                            quantity: line.quantity,
                            price: {
                                amount: line.amount,
                                currency: line.currency,
                            },
                            createdAt: line.created_at,
                            updatedAt: line.updated_at,
                        };
                    }),
                    expiresAt: cart.expires_at,
                    createdAt: cart.created_at,
                    updatedAt: cart.updated_at,
                };
            })
            .catch(e => {
                console.error(e);

                throw new CartNotFound(e);
            });
    }
}
