import { ImmutableDateTime, Price, Quantity, Sku } from '../shared.js';
import { AggregateRoot } from '../aggregate.js';
import { Clock } from '../spi.js';
import { ProductCreated, PriceUpdated, QuantityUpdated } from './events.js';

export interface ProductRepository {
    add(product: Product): Promise<void>;

    get(sku: Sku): Promise<Product>;
}

export class Product extends AggregateRoot {
    constructor(
        readonly sku: Sku,
        private quantity: Quantity,
        private price: Price,
        readonly createdAt: ImmutableDateTime,
        private updatedAt: ImmutableDateTime | null,
    ) {
        super();
    }

    static create(
        sku: Sku,
        quantity: Quantity,
        price: Price,
        createdAt: ImmutableDateTime,
        clock: Clock,
    ): Product {
        const now = clock.now();

        const instance = new this(sku, quantity, price, createdAt, null);
        instance.recordThat(
            new ProductCreated(
                sku.id,
                quantity.value,
                price.serialize(),
                createdAt,
                now,
            ),
        );

        return instance;
    }

    updateQuantity(
        quantity: Quantity,
        updatedAt: ImmutableDateTime,
        clock: Clock,
    ): void {
        if (updatedAt.equalOrLowerThan(this.updatedAt)) {
            return;
        }
        if (this.quantity.equals(quantity)) {
            return;
        }

        const oldQuantity = this.quantity;
        this.quantity = quantity;
        this.updatedAt = updatedAt;

        this.recordThat(
            new QuantityUpdated(
                this.sku.id,
                oldQuantity.value,
                this.quantity.value,
                this.updatedAt,
                clock.now(),
            ),
        );
    }

    updatePrice(
        price: Price,
        updatedAt: ImmutableDateTime,
        clock: Clock,
    ): void {
        if (updatedAt.equalOrLowerThan(this.updatedAt)) {
            return;
        }
        if (this.price.equals(price)) {
            return;
        }

        const oldPrice = this.price;
        this.price = price;
        this.updatedAt = updatedAt;

        this.recordThat(
            new PriceUpdated(
                this.sku.id,
                oldPrice.serialize(),
                this.price.serialize(),
                this.updatedAt,
                clock.now(),
            ),
        );
    }

    id(): Sku {
        return this.sku;
    }

    getPrice(): Price {
        return this.price;
    }

    getQuantity(): Quantity {
        return this.quantity;
    }

    getUpdatedAt(): ImmutableDateTime | null {
        return this.updatedAt;
    }
}
