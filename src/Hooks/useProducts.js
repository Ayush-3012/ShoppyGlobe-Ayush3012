import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        if (res.status === 200) setProducts(res.data.products);
      } catch (error) {
        return error;
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    cartItems.length > 0 &&
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getProductDetails = async (productId) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${productId}`
      );
      return res;
    } catch (error) {
      return error;
    }
  };

  const updateCart = async (product) => {};

  const onUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const onRemove = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  return {
    products,
    cartItems,
    getProductDetails,
    updateCart,
    onUpdateQuantity,
    onRemove,
  };
};
