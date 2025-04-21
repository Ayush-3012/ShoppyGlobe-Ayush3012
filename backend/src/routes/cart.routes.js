import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  updateCartItem,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js"; // verify Token to allow only authenticated user to have access of these routes

const cartRouter = Router();

cartRouter.route("/").post(verifyToken, addToCart); // after verification user can add item to cart
cartRouter.route("/:productId").put(verifyToken, updateCartItem); // after verification user update item's quantity of cart
cartRouter.route("/:productId").delete(verifyToken, deleteCartItem); // after verification user can remove item from cart

export default cartRouter;
