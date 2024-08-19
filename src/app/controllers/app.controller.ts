import { Request, Response, NextFunction } from 'express';
import {
    fetchAllProducts,
    fetchBasket,
    insertItemInBasket,
} from '../models/app.model';
import { createCheckoutSession } from '../services/stripe.service';

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

export async function getBasket(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { basketId } = req.cookies;
    try {
        const basket = await fetchBasket(basketId);
        res.status(200).send({ basket });
    } catch (error) {
        next(error);
    }
}
export async function postCheckout(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { basketId } = req.cookies;
    const basketItems = await fetchBasket(basketId);

    if (basketItems.length === 0) {
        return res.status(400).json({ error: 'Basket is empty' });
    }

    try {
        const checkoutSession = await createCheckoutSession(basketItems);

        res.status(200).send({ session: checkoutSession });
    } catch (error) {
        next(error);
    }
}
