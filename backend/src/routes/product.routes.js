import { Router } from "express";
import {
  getProductDetails,
  getProducts,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/").get(getProducts);
productRouter.route("/:id").get(getProductDetails);

export default productRouter;
