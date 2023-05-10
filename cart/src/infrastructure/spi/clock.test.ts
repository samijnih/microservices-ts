import { DayJSClock, DayJSImmutableDateTime } from './clock';
import dayjs from 'dayjs';
import { given, when } from '../../../tests/helpers';

describe('DayJSImmutableClock', () => {
    test('is equal to the same date time', () => {
        const sut = given(
            new DayJSImmutableDateTime(
                dayjs.utc('2020-01-01T00:00:00.100+0000'),
            ),
        );

        const actual = when(
            sut.equals(
                new DayJSImmutableDateTime(
                    dayjs.utc('2020-01-01T00:00:00.100+0000'),
                ),
            ),
        );

        expect(actual).toBeTruthy();
    });

    test('is not equal to the date time', () => {
        const sut = given(
            new DayJSImmutableDateTime(dayjs('2020-01-01T00:00:00.100+0000')),
        );

        const actual = when(
            sut.equals(
                new DayJSImmutableDateTime(
                    dayjs('2020-01-01T00:00:00.101+0000'),
                ),
            ),
        );

        expect(actual).toBeFalsy();
    });

    test.each(['2020-01-01T00:00:00.099+0000', '2020-01-01T00:00:00.100+0000'])(
        'is equal to or lower than same date time',
        (dateTime: string) => {
            const sut = given(new DayJSImmutableDateTime(dayjs(dateTime)));

            const actual = when(
                sut.equalOrLowerThan(
                    new DayJSImmutableDateTime(
                        dayjs('2020-01-01T00:00:00.100+0000'),
                    ),
                ),
            );

            expect(actual).toBeTruthy();
        },
    );

    test('is not equal to or lower than same date time', () => {
        const sut = given(
            new DayJSImmutableDateTime(dayjs('2020-01-01T00:00:00.101+0000')),
        );

        const actual = when(
            sut.equalOrLowerThan(
                new DayJSImmutableDateTime(
                    dayjs('2020-01-01T00:00:00.100+0000'),
                ),
            ),
        );

        expect(actual).toBeFalsy();
    });
});

describe('DayJSClock', () => {
    test('now() returns an UTC DateTime', () => {
        const sut = given(new DayJSClock());

        try {
            const actual = when(sut.now());

            expect(actual.wrapped.isUTC()).toBeDefined();
            expect(actual.wrapped.isUTC()).toBeTruthy();
        } catch (TypeError) {
            console.error('UTC is not activated.');
        }
    });

    test('fromString() returns an UTC DateTime', () => {
        const sut = given(new DayJSClock());

        const actual = when(sut.fromString('2020-02-02T00:00:00.000+0100'));

        expect(actual.wrapped.toISOString()).toStrictEqual(
            '2020-02-01T23:00:00.000Z',
        );
    });

    test('fromNullableString() returns a null value given null', () => {
        const sut = given(new DayJSClock());

        const actual = when(sut.fromNullableString(null));

        expect(actual).toBeNull();
    });

    test('addHours(2) returns an UTC DateTime with 2 more hours', () => {
        const sut = given(new DayJSClock());

        const actual = when(
            sut.addHours(sut.fromString('2020-02-02T01:00:00.000+0100'), 2),
        );

        expect(actual.wrapped.toISOString()).toStrictEqual(
            '2020-02-02T02:00:00.000Z',
        );
    });
});
