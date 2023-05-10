import { Product } from './product';
import { Amount, Price, Quantity, Sku } from '../shared';
import { ProductCreated } from './events';
import {
    buildProduct,
    buildProductPriceUpdated,
    buildProductQuantityUpdated,
} from '../../../tests/builders/product.builder';
import {
    clock,
    CREATED_AT,
    given,
    NOW,
    UPDATED_AT,
    when,
} from '../../../tests/helpers';

describe('Product', () => {
    test('is created', () => {
        const actualAggregate = when(
            Product.create(
                new Sku('H1'),
                new Quantity(1),
                new Price(new Amount('1099'), 'EUR'),
                clock.fromString(CREATED_AT),
                clock,
            ),
        );
        const actualEvents = when(actualAggregate.releaseEvents());

        const expected = buildProduct(
            'H1',
            1,
            {
                amount: '1099',
                currency: 'EUR',
            },
            CREATED_AT,
            null,
        );
        expect(actualAggregate).toStrictEqual(expected);
        expect(actualEvents).toContainEqual(
            new ProductCreated(
                expected.sku.id,
                expected.getQuantity().value,
                expected.getPrice().serialize(),
                expected.createdAt,
                clock.fromString(NOW),
            ),
        );
    });

    test.each([
        '2023-06-23T15:00:00.100000+00:00',
        '2023-06-23T16:00:00.100000+01:00',
    ])('updates the price given %s', (updatedAt: string) => {
        const actualAggregate = given(
            buildProduct(
                'H1',
                1,
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                CREATED_AT,
                UPDATED_AT,
            ),
        );

        when(() =>
            actualAggregate.updatePrice(
                new Price(new Amount('1098'), 'EUR'),
                clock.fromString(updatedAt),
                clock,
            ),
        );
        const actualEvents = when(actualAggregate.releaseEvents());

        const expected = buildProduct(
            'H1',
            1,
            {
                amount: '1098',
                currency: 'EUR',
            },
            CREATED_AT,
            '2023-06-23T15:00:00.100000+00:00',
        );
        expect(actualAggregate).toStrictEqual(expected);
        expect(actualEvents).toContainEqual(
            buildProductPriceUpdated(
                'H1',
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                {
                    amount: '1098',
                    currency: 'EUR',
                },
                '2023-06-23T15:00:00.100000+00:00',
                NOW,
            ),
        );
    });

    test.each([
        '2023-06-23T15:00:00.100000+00:00',
        '2023-06-23T16:00:00.100000+01:00',
    ])('updates the quantity given %s', (updatedAt: string) => {
        const actualAggregate = given(
            buildProduct(
                'H1',
                1,
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                CREATED_AT,
                UPDATED_AT,
            ),
        );

        when(() =>
            actualAggregate.updateQuantity(
                new Quantity(2),
                clock.fromString(updatedAt),
                clock,
            ),
        );
        const actualEvents = when(actualAggregate.releaseEvents());

        const expected = buildProduct(
            'H1',
            2,
            {
                amount: '1099',
                currency: 'EUR',
            },
            CREATED_AT,
            '2023-06-23T15:00:00.100000+00:00',
        );
        expect(actualAggregate).toStrictEqual(expected);
        expect(actualEvents).toContainEqual(
            buildProductQuantityUpdated(
                'H1',
                1,
                2,
                '2023-06-23T15:00:00.100Z',
                NOW,
            ),
        );
    });

    test('does not update the price if it has not changed', () => {
        const actualAggregate = given(
            buildProduct(
                'H1',
                1,
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                CREATED_AT,
                CREATED_AT,
            ),
        );

        when(() =>
            actualAggregate.updatePrice(
                actualAggregate.getPrice(),
                clock.fromString(UPDATED_AT),
                clock,
            ),
        );
        const actualEvents = when(actualAggregate.releaseEvents());

        const expected = buildProduct(
            'H1',
            1,
            {
                amount: '1099',
                currency: 'EUR',
            },
            CREATED_AT,
            CREATED_AT,
        );
        expect(actualAggregate).toStrictEqual(expected);
        expect(actualEvents).toHaveLength(0);
    });

    test('does not update the quantity if it has not changed', () => {
        const actualAggregate = given(
            buildProduct(
                'H1',
                1,
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                CREATED_AT,
                CREATED_AT,
            ),
        );

        when(() =>
            actualAggregate.updateQuantity(
                actualAggregate.getQuantity(),
                clock.fromString(UPDATED_AT),
                clock,
            ),
        );
        const actualEvents = when(actualAggregate.releaseEvents());

        const expected = buildProduct(
            'H1',
            1,
            {
                amount: '1099',
                currency: 'EUR',
            },
            CREATED_AT,
            CREATED_AT,
        );
        expect(actualAggregate).toStrictEqual(expected);
        expect(actualEvents).toHaveLength(0);
    });

    test.each([
        '2022-12-05T10:30:03.400000+00:00',
        '2022-12-05T10:30:04.400000+00:00',
        '2022-12-05T11:30:04.400000+01:00',
    ])('does not update the price given %s', (updatedAt: string) => {
        const actualAggregate = buildProduct(
            'H1',
            1,
            {
                amount: '1099',
                currency: 'EUR',
            },
            CREATED_AT,
            UPDATED_AT,
        );

        when(() =>
            actualAggregate.updatePrice(
                new Price(new Amount('2999'), 'EUR'),
                clock.fromString(updatedAt),
                clock,
            ),
        );
        const actualEvents = when(actualAggregate.releaseEvents());

        const expected = buildProduct(
            'H1',
            1,
            {
                amount: '1099',
                currency: 'EUR',
            },
            CREATED_AT,
            UPDATED_AT,
        );
        expect(actualAggregate).toStrictEqual(expected);
        expect(actualEvents).toHaveLength(0);
    });

    test.each([
        '2022-12-05T10:30:03.400000+00:00',
        '2022-12-05T10:30:04.400000+00:00',
        '2022-12-05T11:30:04.400000+01:00',
    ])('does not update the quantity given %s', (updatedAt: string) => {
        const actualAggregate = given(
            buildProduct(
                'H1',
                1,
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                CREATED_AT,
                UPDATED_AT,
            ),
        );

        when(() =>
            actualAggregate.updateQuantity(
                new Quantity(2),
                clock.fromString(updatedAt),
                clock,
            ),
        );
        const actualEvents = when(actualAggregate.releaseEvents());

        const expected = buildProduct(
            'H1',
            1,
            {
                amount: '1099',
                currency: 'EUR',
            },
            CREATED_AT,
            UPDATED_AT,
        );
        expect(actualAggregate).toStrictEqual(expected);
        expect(actualEvents).toHaveLength(0);
    });
});
