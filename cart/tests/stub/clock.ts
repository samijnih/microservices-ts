import { Clock } from '../../src/domain/spi';
import { DayJSImmutableDateTime } from '../../src/infrastructure/spi/clock';
import dayjs from 'dayjs';
import { NOW } from '../helpers';

export class StubbedClock implements Clock {
    now(): DayJSImmutableDateTime {
        return new DayJSImmutableDateTime(dayjs.utc(NOW));
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
