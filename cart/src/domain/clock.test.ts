import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { given, when } from '../../tests/helpers';
import { StubbedClock } from '../../tests/stub/clock';

dayjs.extend(utc);

describe('StubbedClock', () => {
    test('now() returns an UTC DateTime', () => {
        const sut = given(new StubbedClock());

        const actual = when(sut.now());

        expect(actual.wrapped.isUTC()).toBeTruthy();
        expect(actual.wrapped.toISOString()).toStrictEqual(
            '2023-06-23T15:00:00.100Z',
        );
    });

    test('fromString() returns an UTC DateTime', () => {
        const sut = given(new StubbedClock());

        const actual = when(sut.fromString('2020-02-02T00:00:00.000+0100'));

        expect(actual!.wrapped.toISOString()).toStrictEqual(
            '2020-02-01T23:00:00.000Z',
        );
    });

    test('fromNullableString() returns a null value given null', () => {
        const sut = given(new StubbedClock());

        const actual = when(sut.fromNullableString(null));

        expect(actual).toBeNull();
    });

    test('addHours(2) returns an UTC DateTime with 2 more hours', () => {
        const sut = given(new StubbedClock());

        const actual = when(
            sut.addHours(sut.fromString('2020-02-02T01:00:00.000+0100'), 2),
        );

        expect(actual.wrapped.toISOString()).toStrictEqual(
            '2020-02-02T02:00:00.000Z',
        );
    });
});
