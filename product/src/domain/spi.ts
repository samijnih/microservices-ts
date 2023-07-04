import { ImmutableDateTime } from './shared.js';
import { Envelope, Envelopes } from './envelope.js';

export interface Clock {
    now(): ImmutableDateTime;

    addHours(dateTime: ImmutableDateTime, hours: number): ImmutableDateTime;

    fromString(dateTime: string): ImmutableDateTime;

    fromNullableString(dateTime: string | null): ImmutableDateTime | null;
}

export interface OutboxRepository {
    add(envelope: Envelope): Promise<void>;

    add(envelopes: Envelopes): Promise<void>;

    get(): Promise<Envelopes>;
}
