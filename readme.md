# Bread Shop API

This is an API built for an e-commerce site specializing in selling bread. It allows for handling product listings, orders, payments, and more.

## Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/en/download/)
-   [PostgreSQL](https://www.postgresql.org/download/)

### Setup

1. **Clone the repository:**

```bash
    git clone https://github.com/CoupDeWhoop/bread-shop-api.git
```

2. **Navigate into the project directory:**

```bash
    cd bread-shop-api
```

3. **Install dependencies:**

```bash
    npm install
```

4. **Set up environment variables:**

You will need a stripe account and secret key. [Sign up for Stripe](https://dashboard.stripe.com/register?utm_campaign=EMEA_UK_en_Google_Search_Brand_SignUp_EXA_PHR-21593905364&utm_medium=cpc&utm_source=google&ad_content=676541250217&utm_term=stripe%20setup&utm_matchtype=e&utm_adposition=&utm_device=c&gad_source=1&gclid=Cj0KCQjw2ou2BhCCARIsANAwM2EofW_Gc7zFf_MoUbfnyYwa-raXxMDDNM8CEKnDkeRZ0ZFlxObOsbYaAu3mEALw_wcB)

Create a .env.test file in the root of the project and add the following:

```bash
DATABASE_URL=postgres://username@localhost:5432/bread_shop_test
STRIPE_SECRET_KEY=<your key>
```

5. **Database Setup**
   Run the database setup script:

This script will create the necessary database and tables.

```bash
npm run setup-db
```

6. **Generate Drizzle schema:**

Run this command to generate the schema for Drizzle, an ORM tool.

```bash
npm run drizzle:generate
```

7. **Run database migrations for the test environment:**

This command will apply the necessary database migrations for the test environment.

```bash
npm run drizzle:migrate:test
```

## Running the Application

To start the API server, run:

```bash
npm start
```

The server should now be running on http://localhost:3000.

Testing
To run tests, use:

```bash
npm test
```

### Features

Product Management: Create, read, update, and delete bread products.
Order Processing: Handle customer orders and inventory management.
Payment Integration: Secure payments using Stripe.
Technologies Used
Node.js
Express.js
PostgreSQL
Stripe API
Drizzle ORM

### Contributing

Feel free to submit issues or pull requests. All contributions are welcome!
