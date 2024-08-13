import express from "express";
import { getAllProducts } from "./controllers/app.controller";
const app = express();

app.get("/api/products", getAllProducts);

export default app;
