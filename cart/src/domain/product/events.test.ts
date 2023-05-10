import { ProductCreated } from './events';
import {
    CREATED_AT,
    given,
    NOW,
    UPDATED_AT,
    when,
} from '../../../tests/helpers';
import {
    buildProductCreated,
    buildProductPriceUpdated,
    buildProductQuantityUpdated,
} from '../../../tests/builders/product.builder';

describe('ProductCreated', () => {
    test('is serializable', () => {
        const sut = given(
            buildProductCreated(
                'H1',
                1,
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                CREATED_AT,
                NOW,
            ),
        );

        const actual = when(sut.serialize());

        expect(actual).toStrictEqual({
            sku: 'H1',
            quantity: 1,
            price: {
                amount: '1099',
                currency: 'EUR',
            },
            createdAt: '2020-05-01T00:00:00.200Z',
            occurredAt: '2023-06-23T15:00:00.100Z',
        });
    });
});

describe('QuantityUpdated', () => {
    test('is serializable', () => {
        const sut = given(
            buildProductQuantityUpdated('H1', 1, 0, UPDATED_AT, NOW),
        );

        const actual = when(sut.serialize());

        expect(actual).toStrictEqual({
            sku: 'H1',
            oldQuantity: 1,
            newQuantity: 0,
            updatedAt: '2022-12-05T10:30:04.400Z',
            occurredAt: '2023-06-23T15:00:00.100Z',
        });
    });
});

describe('PriceUpdated', () => {
    test('is serializable', () => {
        const sut = given(
            buildProductPriceUpdated(
                'H1',
                {
                    amount: '1099',
                    currency: 'EUR',
                },
                {
                    amount: '1299',
                    currency: 'EUR',
                },
                UPDATED_AT,
                NOW,
            ),
        );

        const actual = when(sut.serialize());

        expect(actual).toStrictEqual({
            sku: 'H1',
            oldPrice: {
                amount: '1099',
                currency: 'EUR',
            },
            newPrice: {
                amount: '1299',
                currency: 'EUR',
            },
            updatedAt: '2022-12-05T10:30:04.400Z',
            occurredAt: '2023-06-23T15:00:00.100Z',
        });
    });
});
