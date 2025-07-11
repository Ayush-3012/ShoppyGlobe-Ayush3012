import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // finding all product details that are saved in db.
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id); // finding details of product whose id is passed in params

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
