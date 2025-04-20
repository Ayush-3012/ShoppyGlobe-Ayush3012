import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.route("/").post(verifyToken, addToCart);
cartRouter.route("/:productId").put(verifyToken, updateCartItem);
cartRouter.route("/:productId").delete(verifyToken, deleteCartItem);

export default cartRouter;
