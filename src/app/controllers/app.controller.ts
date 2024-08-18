import { Request, Response, NextFunction } from 'express';
import { fetchAllProducts, insertItemInBasket } from '../models/app.model';

export async function getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const products = await fetchAllProducts();
        res.status(200).send({ products });
    } catch (error) {
        next(error);
    }
}

export async function addItemToBasket(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { productId, quantity } = req.body;
    const { basketId } = req.cookies;
    try {
        const [item] = await insertItemInBasket({
            productId,
            quantity,
            basketId,
        });

        res.status(201).send({ item });
    } catch (error) {
        next(error);
    }
}
