import express, { Request } from 'express';
import connection from '../spi/database/connection.js';
import { getProduct } from '../../domain/product/features/get.js';
import ProductRepository from '../spi/persistence/product_repository.js';
import { CaseType, serialize } from 'jsonapi-fractal';

const router = express.Router();

router.get('/:sku', async (request: Request<{ sku: string }>, response) => {
    await getProduct(
        request.params.sku,
        new ProductRepository(connection, 'product'),
    )
        .then(product => {
            response.status(200).json(
                serialize(product, 'product', {
                    idKey: 'sku',
                    changeCase: CaseType.snakeCase,
                }),
            );
        })
        .catch(_ => {
            console.error(_);

            response.status(404);
        });
});

export default router;
