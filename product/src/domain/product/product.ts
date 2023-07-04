import { ImmutableDateTime, Price, Sku } from '../shared.js';
import { AggregateRoot } from '../aggregate.js';
import { Clock } from '../spi.js';
import { ProductCreated, PriceUpdated, ProductRemoved } from './events.js';

export interface ProductRepository {
    add(product: Product): Promise<void>;

    update(product: Product): Promise<void>;

    get(sku: Sku): Promise<Product>;

    remove(product: Product): Promise<void>;
}

export class Product extends AggregateRoot {
    constructor(
        readonly sku: Sku,
        private price: Price,
        readonly createdAt: ImmutableDateTime,
        private updatedAt: ImmutableDateTime | null,
    ) {
        super();
    }

    static create(sku: Sku, price: Price, clock: Clock): Product {
        const instance = new this(sku, price, clock.now(), null);
        instance.recordThat(
            new ProductCreated(sku.id, price.serialize(), instance.createdAt),
        );

        return instance;
    }

    updatePrice(price: Price, clock: Clock): void {
        if (this.price.equals(price)) {
            return;
        }

        const oldPrice = this.price;
        this.price = price;
        this.updatedAt = clock.now();

        this.recordThat(
            new PriceUpdated(
                this.sku.id,
                oldPrice.serialize(),
                this.price.serialize(),
                this.updatedAt,
            ),
        );
    }

    remove(clock: Clock): void {
        this.recordThat(
            new ProductRemoved(
                this.sku.id,
                this.price.serialize(),
                this.createdAt,
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

    getCreatedAt(): ImmutableDateTime {
        return this.createdAt;
    }

    getUpdatedAt(): ImmutableDateTime | null {
        return this.updatedAt;
    }
}
