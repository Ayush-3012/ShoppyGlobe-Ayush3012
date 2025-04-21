import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/login").post(loginUser); // post route to login the registered user
userRouter.route("/register").post(registerUser); // post route to register new users

export default userRouter;
