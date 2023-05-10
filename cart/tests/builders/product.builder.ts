import {
    Amount,
    Currency,
    Price,
    Quantity,
    Sku,
} from '../../src/domain/shared';
import { Product } from '../../src/domain/product/product';
import {
    PriceUpdated,
    ProductCreated,
    QuantityUpdated,
} from '../../src/domain/product/events';
import { clock } from '../helpers';

export const buildProduct = (
    sku: string,
    quantity: number,
    price: { amount: string; currency: Currency },
    createdAt: string,
    updatedAt: string | null,
) =>
    new Product(
        new Sku(sku),
        new Quantity(quantity),
        new Price(new Amount(price.amount), price.currency),
        clock.fromString(createdAt),
        updatedAt ? clock.fromString(updatedAt) : null,
    );

export const buildProductCreated = (
    sku: string,
    quantity: number,
    price: { amount: string; currency: Currency },
    createdAt: string,
    occurredAt: string,
) =>
    new ProductCreated(
        sku,
        quantity,
        price,
        clock.fromString(createdAt),
        clock.fromString(occurredAt),
    );

export const buildProductPriceUpdated = (
    sku: string,
    oldPrice: { amount: string; currency: Currency },
    newPrice: { amount: string; currency: Currency },
    updatedAt: string,
    occurredAt: string,
) =>
    new PriceUpdated(
        sku,
        oldPrice,
        newPrice,
        clock.fromString(updatedAt),
        clock.fromString(occurredAt),
    );

export const buildProductQuantityUpdated = (
    sku: string,
    oldQuantity: number,
    newQuantity: number,
    updatedAt: string,
    occurredAt: string,
) =>
    new QuantityUpdated(
        sku,
        oldQuantity,
        newQuantity,
        clock.fromString(updatedAt),
        clock.fromString(occurredAt),
    );
