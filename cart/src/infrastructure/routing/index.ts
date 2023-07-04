import express, { Request } from 'express';
import connection from '../spi/database/connection.js';
import GetCartQuery from '../spi/query/cart/pg_get_cart.js';
import { getCart } from '../../domain/cart/features/get.js';
import { CaseType, serialize } from 'jsonapi-fractal';

const router = express.Router();

router.get('/:id', async (request: Request<{ id: string }>, response) => {
    await getCart(request.params.id, new GetCartQuery(connection))
        .then(cart => {
            response.status(200).json(
                serialize(cart, 'cart', {
                    idKey: 'sku',
                    relationships: ['lines'],
                    changeCase: CaseType.snakeCase,
                    changeCaseDeep: true,
                    included: true,
                }),
            );
        })
        .catch(_ => {
            console.error(_);

            response.status(404);
        });
});

export default router;
