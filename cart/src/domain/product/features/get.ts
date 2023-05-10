export type Product = {
    sku: string;
    quantity: number;
    price: { amount: string; currency: string };
    createdAt: string;
    updatedAt: string | null;
};

export interface GetProductQuery {
    execute(sku: string): Promise<Product>;
}

export const getProduct = async (
    sku: string,
    getProductQuery: GetProductQuery,
): Promise<Product> => await getProductQuery.execute(sku);
