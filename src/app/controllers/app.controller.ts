import { Request, Response, NextFunction } from "express";
import { fetchAllProducts } from "../models/app.model";

export async function getAllProducts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await fetchAllProducts();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
