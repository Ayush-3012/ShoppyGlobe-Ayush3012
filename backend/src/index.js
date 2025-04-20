import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./db/connect.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// app.get("/", (req, res) => res.send("Hello, Welcome!"));

app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/users", userRouter);

connectDb()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(` Server is listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDb Connection failed: ", err);
  });
