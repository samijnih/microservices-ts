import { ImmutableDateTime, Quantity, Sku } from '../shared';
import { CustomerId } from '../customer/customer';
import { AggregateRoot, AggregateRootId } from '../aggregate';
import { Clock } from '../spi';

export class CartId extends AggregateRootId {}

class Line {
    constructor(
        readonly sku: Readonly<Sku>,
        readonly quantity: Readonly<Quantity>,
        readonly createdAt: ImmutableDateTime,
        private updatedAt: ImmutableDateTime,
    ) {}

    changeQuantity(quantity: Quantity, clock: Clock): Line {
        return new Line(this.sku, quantity, this.createdAt, clock.now());
    }
}

type Lines = Map<Sku, Line>;

export class Cart extends AggregateRoot {
    constructor(
        private cartId: CartId,
        private customerId: CustomerId,
        private lines: Lines,
        private expiresAt: ImmutableDateTime,
        readonly createdAt: ImmutableDateTime,
        private updatedAt: ImmutableDateTime,
    ) {
        super();
    }

    static create(id: CartId, customerId: CustomerId, clock: Clock): Cart {
        const now = clock.now();
        const expiresAt = clock.addHours(now, 1);

        return new this(id, customerId, new Map(), expiresAt, now, now);
    }

    changeQuantity(sku: Sku, quantity: Quantity, clock: Clock): void {
        if (!this.lines.has(sku)) {
            return;
        }

        this.lines.set(
            sku,
            this.lines.get(sku)!.changeQuantity(quantity, clock),
        );
        this.updatedAt = clock.now();
    }

    id(): CartId {
        return this.cartId;
    }
}
