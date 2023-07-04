import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import { Clock } from '../../domain/spi.js';
import { ImmutableDateTime } from '../../domain/shared.js';

dayjs.extend(utc);

export class DayJSImmutableDateTime extends ImmutableDateTime {
    constructor(readonly wrapped: Dayjs) {
        super(wrapped);
    }

    equalOrLowerThan(other: this | null): boolean {
        return (
            null !== other &&
            (this.wrapped.isBefore(other.wrapped) ||
                this.wrapped.isSame(other.wrapped))
        );
    }

    equals(other: this | null): boolean {
        return null !== other && this.wrapped.isSame(other.wrapped);
    }

    toString(): string {
        return this.wrapped.toISOString();
    }
}

export class DayJSClock implements Clock {
    now(): DayJSImmutableDateTime {
        return new DayJSImmutableDateTime(dayjs.utc());
    }

    addHours(
        dateTime: DayJSImmutableDateTime,
        hours: number,
    ): DayJSImmutableDateTime {
        return new DayJSImmutableDateTime(
            dateTime.wrapped.utc(false).add(hours, 'hours'),
        );
    }

    fromString(dateTime: string): DayJSImmutableDateTime {
        return new DayJSImmutableDateTime(dayjs.utc(dateTime));
    }

    fromNullableString(dateTime: string | null): DayJSImmutableDateTime | null {
        if (null === dateTime) {
            return null;
        }

        return this.fromString(dateTime);
    }
}

const clock = new DayJSClock();

export default clock;
