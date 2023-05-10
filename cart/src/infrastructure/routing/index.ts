import express, { Request } from 'express';
import connection from '../spi/database/connection.js';
import GetCartQuery from '../spi/query/cart.js';
import { getCart } from '../../domain/cart/features/get.js';

const router = express.Router();

router.get('/:id', async (request: Request<{ id: string }>, response) => {
    response.status(200).json(
        await getCart(request.params.id, new GetCartQuery(connection)).catch(
            _ => {
                response.status(404);
            },
        ),
    );
});

export default router;
