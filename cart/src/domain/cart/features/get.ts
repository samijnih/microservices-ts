export type CartId = NonNullable<string>;
export type CartLine = {
    sku: string;
    quantity: number;
    price: { amount: string; currency: string };
    createdAt: string;
    updatedAt: string | null;
};
type Lines = Array<CartLine>;

export type Cart = {
    id: string;
    customerId: string | null;
    lines: Lines;
    expiresAt: string;
    createdAt: string;
    updatedAt: string | null;
};

export interface GetCartQuery {
    execute(id: CartId): Promise<Cart>;
}

export class CartNotFound extends Error {}

export const getCart = async (
    id: CartId,
    getCartQuery: GetCartQuery,
): Promise<Cart> => await getCartQuery.execute(id);
