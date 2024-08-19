class Stripe {
    checkout = {
        sessions: {
            create: () => ({
                url: 'https://checkout.stripe.com/test_eVa5mb3n821W9tC4gr',
                object: 'checkout.session',
            }),
        },
    };
}

const stripe = jest.fn(() => new Stripe());

export default stripe;
export { Stripe };
