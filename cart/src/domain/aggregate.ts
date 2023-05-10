import { v4 } from 'uuid';
import { ImmutableDateTime, NamedMessage, Serializable } from './shared.js';

export abstract class DomainEvent implements Serializable, NamedMessage {
    readonly #occurredAt: ImmutableDateTime;

    protected constructor(occurredAt: ImmutableDateTime) {
        this.#occurredAt = occurredAt;
    }

    abstract name(): string;
    abstract serialize(): Readonly<{ [p: string]: any }>;

    occurredAt(): ImmutableDateTime {
        return this.#occurredAt;
    }
}

export abstract class AggregateRoot {
    events: DomainEvent[] = [];

    abstract id(): AggregateRootId;

    recordThat(event: DomainEvent): void {
        this.events.push(event);
    }

    releaseEvents(): DomainEvent[] {
        const events = this.events;

        this.events = [];

        return events;
    }
}

export class AggregateRootId {
    constructor(readonly id: string | typeof v4) {}

    static fromString(id: NonNullable<string>): AggregateRootId {
        return new this(id);
    }

    static fromUuid(id: typeof v4): AggregateRootId {
        return new this(id);
    }

    equals(other: this): boolean {
        return this.id.toString() === other.id.toString();
    }

    toString(): string {
        return this.id.toString();
    }
}

export interface DomainError {}
