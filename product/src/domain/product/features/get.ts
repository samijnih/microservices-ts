import { ProductRepository } from '../product.js';
import { Sku } from '../../shared.js';

export type Product = Readonly<{
    sku: string;
    price: { amount: string; currency: string };
    createdAt: string;
    updatedAt: string | null;
}>;

export const getProduct = async (
    sku: string,
    productRepository: ProductRepository,
): Promise<Product> => {
    return await productRepository.get(new Sku(sku)).then(product => ({
        sku: product.sku.toString(),
        price: product.getPrice().serialize(),
        createdAt: product.getCreatedAt().toString(),
        updatedAt: product.getUpdatedAt()
            ? product.getUpdatedAt()!.toString()
            : null,
    }));
};
