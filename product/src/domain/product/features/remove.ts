import { Sku } from '../../shared';
import { ProductRepository } from '../product';
import { Clock } from '../../spi';

export const removeProduct = async (
    sku: NonNullable<string>,
    repository: ProductRepository,
    clock: Clock,
): Promise<void> => {
    await repository
        .get(new Sku(sku))
        .then(async product => await repository.remove(product));
};
