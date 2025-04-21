import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Add product to cart.
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body; // product Id and quantity to store in db.

    const product = await Product.findById(productId); // found the product details using its id.
    if (!product) return res.status(404).json({ message: "Product not found" }); // returned a message if product is not found.

    let cart = await Cart.findOne({ userId: req.user.id }); // found the cart of authenticated user if there is cart.

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [{ productId, quantity }],
      }); // creating cart object and storing the details in db.
    }

    await cart.save();
    res.status(201).json({ message: "Product added to cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update Cart Quantity
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body; // new quantity to store in db.
    const { productId } = req.params; // product id for which we want to update the quantity

    const cart = await Cart.findOne({ userId: req.user.id }); // cart of authenticated user using userId
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId // checking the foundCart item productId for which we want to update the quantity.
    );
    if (!item)
      return res.status(404).json({ message: "Product not found in cart" });

    item.quantity = quantity; // updating the quantity
    await cart.save();

    res.json({ message: "Cart item updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete cart item
export const deleteCartItem = async (req, res) => {
  try {
    const { productId } = req.params; // product Id that we want to remove from cart

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    cart.items.splice(itemIndex, 1); // removing the product from the cart
    await cart.save();

    res.json({ message: "Cart item deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
