import { Product, ProductRepository } from '../product.js';
import { Sku } from '../../shared.js';

export const getProduct = async (
    sku: string,
    productRepository: ProductRepository,
): Promise<Product> => await productRepository.get(new Sku(sku));
