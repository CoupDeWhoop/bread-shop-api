CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"price_in_pence" integer NOT NULL,
	"stock" integer NOT NULL,
	"image_url" varchar(2048)
);
