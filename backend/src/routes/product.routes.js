import { Router } from "express";
import {
  getProductDetails,
  getProducts,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/products").get(getProducts);
productRouter.route("/products/:id").get(getProductDetails);

export default productRouter;
