import { Router } from "express";
import {
  getProductDetails,
  getProducts,
} from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.route("/").get(getProducts); // get route to get all products stored in db
productRouter.route("/:id").get(getProductDetails); // get route to get details fo product whose id passed in param

export default productRouter;
