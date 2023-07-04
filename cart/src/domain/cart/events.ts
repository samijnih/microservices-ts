import { DomainEvent } from '../aggregate.js';
import { ImmutableDateTime } from '../shared.js';

export class CartCreated extends DomainEvent {
    constructor(
        readonly id: string,
        readonly customerId: string | null,
        readonly expiresAt: ImmutableDateTime,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'cart.created';
    }

    serialize(): Readonly<{
        id: string;
        customerId: string | null;
        expiresAt: string;
        occurredAt: string;
    }> {
        return {
            id: this.id,
            customerId: this.customerId,
            expiresAt: this.expiresAt.toString(),
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class ProductAdded extends DomainEvent {
    constructor(
        readonly cartId: string,
        readonly customerId: string | null,
        readonly sku: string,
        readonly quantity: number,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'cart.product_added';
    }

    serialize(): Readonly<{
        cartId: string;
        customerId: string | null;
        sku: string;
        quantity: number;
        occurredAt: string;
    }> {
        return {
            cartId: this.cartId,
            customerId: this.customerId,
            sku: this.sku,
            quantity: this.quantity,
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class ProductRemoved extends DomainEvent {
    constructor(
        readonly cartId: string,
        readonly customerId: string | null,
        readonly sku: string,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'cart.product_removed';
    }

    serialize(): Readonly<{
        cartId: string;
        customerId: string | null;
        sku: string;
        occurredAt: string;
    }> {
        return {
            cartId: this.cartId,
            customerId: this.customerId,
            sku: this.sku,
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class QuantityIncreased extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly quantity: number,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'cart.quantity_increased';
    }

    serialize(): Readonly<{
        sku: string;
        quantity: number;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            quantity: this.quantity,
            occurredAt: this.occurredAt().toString(),
        };
    }
}

export class QuantityDecreased extends DomainEvent {
    constructor(
        readonly sku: string,
        readonly quantity: number,
        occurredAt: ImmutableDateTime,
    ) {
        super(occurredAt);
    }

    name(): string {
        return 'cart.quantity_decreased';
    }

    serialize(): Readonly<{
        sku: string;
        quantity: number;
        occurredAt: string;
    }> {
        return {
            sku: this.sku,
            quantity: this.quantity,
            occurredAt: this.occurredAt().toString(),
        };
    }
}
