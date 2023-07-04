import { ImmutableDateTime } from '../shared.js';
import { DomainEvent } from '../aggregate.js';

type Price = { amount: string; currency: string };

export class ProductCreated extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly price: Price,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'product.created';
    }

    serialize(): Readonly<{
        sku: string;
        price: Price;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            price: this.price,
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class PriceUpdated extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly oldPrice: Price,
        readonly newPrice: Price,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'product.price_updated';
    }

    serialize(): Readonly<{
        sku: string;
        oldPrice: Price;
        newPrice: Price;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            oldPrice: this.oldPrice,
            newPrice: this.newPrice,
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class ProductRemoved extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly price: Price,
        readonly createdAt: ImmutableDateTime,
        readonly updatedAt: ImmutableDateTime | null,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'product.removed';
    }

    serialize(): Readonly<{
        sku: string;
        price: Price;
        createdAt: string;
        updatedAt: string | null;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            price: this.price,
            createdAt: this.createdAt.toString(),
            updatedAt: this.updatedAt ? this.updatedAt.toString() : null,
            occurredAt: this.occurredAt().toString(),
        };
    }
}
