import Stripe from 'stripe';
import env from '../lib/envHelper';

import { BasketItems } from '../../schema/product.schema';

export async function createCheckoutSession(basketItems: BasketItems[]) {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: '2024-06-20',
    });

    const lineItems = basketItems.map((item) => ({
        price_data: {
            currency: 'gbp',
            product_data: {
                name: item.name,
            },
            unit_amount: item.priceInPence,
        },
        quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: `http://www.example.com/success`,
        cancel_url: `http://www.example.com/cancel`,
    });

    return session;
}
