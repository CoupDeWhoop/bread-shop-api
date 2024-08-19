import dotenv from 'dotenv';
dotenv.config();

import { cleanEnv, str } from 'envalid';
if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Stripe key not set');
}

const env = cleanEnv(process.env, {
    STRIPE_SECRET_KEY: str(),
});

export default env;
