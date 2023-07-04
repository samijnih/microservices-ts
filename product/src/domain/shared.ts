import { AggregateRootId, DomainError } from './aggregate.js';

export class ImmutableDateTime {
    constructor(readonly wrapped: object) {}

    toString(): string {
        return this.wrapped.toString();
    }

    equalOrLowerThan(other: this | null): boolean {
        return null !== other && this.wrapped <= other.wrapped;
    }

    equals(other: this | null): boolean {
        return null !== other && this.wrapped == other.wrapped;
    }
}

export interface Serializable {
    serialize: () => Readonly<{ [key: string]: any }>;
}

export interface NamedMessage {
    name: () => string;
}
export interface Command extends Serializable, NamedMessage {}

export class InvalidSku extends Error implements DomainError {
    constructor(value: NonNullable<string>) {
        super(`Sku "${value}" is not valid.`);
    }
}

export class Sku extends AggregateRootId {
    constructor(readonly id: NonNullable<string>) {
        if (!(id.length >= 1 && id.length <= 64)) {
            throw new InvalidSku(id);
        }

        super(id);
    }
}

export class InvalidAmount extends Error implements DomainError {
    constructor(value: NonNullable<string>) {
        super(`Amount "${value}" is invalid.`);
    }
}

export class Amount {
    constructor(readonly value: NonNullable<string>) {
        if (!(value.trim().length >= 1)) {
            throw new InvalidAmount(value);
        }
    }

    equals(other: this): boolean {
        return this.value === other.value;
    }

    toString(): string {
        return this.value;
    }
}

export type Currency = 'EUR' | 'USD';

export class Price implements Serializable {
    constructor(readonly amount: Amount, readonly currency: Currency) {}

    equals(other: this): boolean {
        return (
            this.amount.equals(other.amount) && this.currency === other.currency
        );
    }

    toString(): string {
        return `${this.amount.toString()}-${this.currency}`;
    }

    serialize(): { amount: string; currency: string } {
        return {
            amount: this.amount.value,
            currency: this.currency,
        };
    }
}
