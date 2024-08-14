import express from 'express';
import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import { addItemToBasket, getAllProducts } from './controllers/app.controller';
const app = express();

interface DatabaseError extends ErrorRequestHandler {
    code?: string;
    status?: number;
}

app.get('/api/products', getAllProducts);
app.post('/api/basket/items', addItemToBasket);
app.use(
    (err: DatabaseError, req: Request, res: Response, next: NextFunction) => {
        if (
            err.code === '22P02' ||
            err.code === '23502' ||
            err.code === '22007'
        ) {
            res.status(400).send({ message: 'Invalid request' });
        }
        if (err.code === '23505') {
            res.status(400).send({ message: 'Bad request: duplicate entry' });
        }
        if (err.status) {
            res.status(err.status).send(err);
        }
        // catch any others
        res.status(500).send({ message: 'Internal Server Error' });
    }
);

export default app;
