import { Amount, Command, Currency, Sku, Price } from '../../shared';
import { Product, ProductRepository } from '../product';
import { Clock } from '../../spi';

type PriceType = { amount: string; currency: Currency };

class CreateProduct implements Command {
    constructor(
        readonly sku: string,
        readonly price: PriceType,
        readonly createdAt: string,
    ) {}

    name(): string {
        return 'create_product';
    }

    serialize(): Readonly<{
        sku: string;
        price: PriceType;
        createdAt: string;
    }> {
        return {
            sku: this.sku,
            price: { amount: this.price.amount, currency: this.price.currency },
            createdAt: this.createdAt,
        };
    }
}

export const createProduct = async (
    command: CreateProduct,
    repository: ProductRepository,
    clock: Clock,
): Promise<void> => {
    const product = Product.create(
        new Sku(command.sku),
        new Price(new Amount(command.price.amount), command.price.currency),
        clock,
    );

    await repository.add(product);
};
