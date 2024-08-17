import { Request, Response, NextFunction } from 'express';

export function validateAddItemToBasket(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { productId, quantity, userId } = req.body;

    if (!productId || typeof productId !== 'number' || productId <= 0) {
        return res.status(400).send({ error: 'Invalid or missing product ID' });
    }

    if (!quantity || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).send({ error: 'Invalid or missing quantity' });
    }

    if (!userId) {
        return res.status(400).send({ error: 'Invalid or missing user ID' });
    }

    next();
}
