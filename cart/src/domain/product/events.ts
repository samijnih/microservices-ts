import { ImmutableDateTime } from '../shared.js';
import { DomainEvent } from '../aggregate.js';

type Price = { amount: string; currency: string };

export class ProductCreated extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly quantity: number,
        readonly price: Price,
        readonly createdAt: ImmutableDateTime,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'product.created';
    }

    serialize(): Readonly<{
        sku: string;
        quantity: number;
        price: Price;
        createdAt: string;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            quantity: this.quantity,
            price: this.price,
            createdAt: this.createdAt.toString(),
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class PriceUpdated extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly oldPrice: Price,
        readonly newPrice: Price,
        readonly updatedAt: ImmutableDateTime,
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
        updatedAt: string;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            oldPrice: this.oldPrice,
            newPrice: this.newPrice,
            updatedAt: this.updatedAt.toString(),
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class QuantityUpdated extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly oldQuantity: number,
        readonly newQuantity: number,
        readonly updatedAt: ImmutableDateTime,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'product.quantity_updated';
    }

    serialize(): Readonly<{
        sku: string;
        oldQuantity: number;
        newQuantity: number;
        updatedAt: string;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            oldQuantity: this.oldQuantity,
            newQuantity: this.newQuantity,
            updatedAt: this.updatedAt.toString(),
            occurredAt: this.occurredAt().toString(),
        };
    }
}
