import { ImmutableDateTime } from './shared.js';

export interface Clock {
    now(): ImmutableDateTime;

    addHours(dateTime: ImmutableDateTime, hours: number): ImmutableDateTime;

    fromString(dateTime: string): ImmutableDateTime;

    fromNullableString(dateTime: string | null): ImmutableDateTime | null;
}
