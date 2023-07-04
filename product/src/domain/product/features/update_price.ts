import { Amount, Command, Currency, Sku, Price } from '../../shared';
import { Product, ProductRepository } from '../product';
import { Clock } from '../../spi';
import process from 'process';

type PriceType = { amount: string; currency: Currency };

class UpdatePrice implements Command {
    constructor(readonly sku: string, readonly price: PriceType) {}

    name(): string {
        return 'update_product_price';
    }

    serialize(): Readonly<{
        sku: string;
        price: PriceType;
    }> {
        return {
            sku: this.sku,
            price: { amount: this.price.amount, currency: this.price.currency },
        };
    }
}

export const updatePrice = async (
    command: UpdatePrice,
    repository: ProductRepository,
    clock: Clock,
): Promise<void> => {
    await repository
        .get(new Sku(command.sku))
        .then(product => {
            product.updatePrice(
                new Price(
                    new Amount(command.price.amount),
                    command.price.currency,
                ),
                clock,
            );

            return product;
        })
        .then(async product => await repository.update(product));
};
