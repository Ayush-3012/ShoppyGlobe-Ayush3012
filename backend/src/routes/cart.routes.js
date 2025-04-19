import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const cartRouter = Router();

cartRouter.route("/cart").post(verifyToken, addToCart);
cartRouter.route("/cart/:id").put(verifyToken, updateCartItem);
cartRouter.route("/cart/:id").delete(verifyToken, deleteCartItem);

export default cartRouter;
