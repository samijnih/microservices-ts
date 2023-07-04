import { ImmutableDateTime, Quantity, Sku } from '../shared';
import { CustomerId } from '../customer/customer';
import { AggregateRoot, AggregateRootId } from '../aggregate';
import { Clock } from '../spi';
import {
    CartCreated,
    ProductAdded,
    ProductRemoved,
    QuantityDecreased,
    QuantityIncreased,
} from './events.js';

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

        const instance = new this(
            id,
            customerId,
            new Map(),
            expiresAt,
            now,
            now,
        );
        instance.recordThat(
            new CartCreated(
                id.toString(),
                customerId ? customerId.toString() : null,
                expiresAt,
                now,
            ),
        );

        return instance;
    }

    addProduct(sku: Sku, quantity: Quantity, clock: Clock): void {
        if (this.lines.has(sku)) {
            return;
        }

        const now = clock.now();

        this.recordThat(
            new ProductAdded(
                this.cartId.toString(),
                this.customerId ? this.customerId.toString() : null,
                sku.toString(),
                quantity.value,
                now,
            ),
        );
    }

    removeProduct(sku: Sku, clock: Clock): void {
        if (!this.lines.has(sku)) {
            return;
        }

        const now = clock.now();

        this.recordThat(
            new ProductRemoved(
                this.cartId.toString(),
                this.customerId ? this.customerId.toString() : null,
                sku.toString(),
                now,
            ),
        );
    }

    changeQuantity(sku: Sku, quantity: Quantity, clock: Clock): void {
        if (!this.lines.has(sku)) {
            return;
        }

        const line = this.lines.get(sku)!;
        const oldQuantity = line.quantity;
        const now = clock.now();

        if (oldQuantity.equals(quantity)) {
            return;
        }
        if (oldQuantity.lowerThan(quantity)) {
            this.recordThat(
                new QuantityIncreased(
                    this.cartId.toString(),
                    quantity.value,
                    now,
                ),
            );
        } else {
            this.recordThat(
                new QuantityDecreased(
                    this.cartId.toString(),
                    quantity.value,
                    now,
                ),
            );
        }

        this.lines.set(sku, line.changeQuantity(quantity, clock));
        this.updatedAt = now;
    }

    id(): CartId {
        return this.cartId;
    }
}
