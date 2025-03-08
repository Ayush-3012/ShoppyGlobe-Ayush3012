import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = () => {
  const savedCart = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  const [products, setProducts] = useState(null);
  const [cartItems, setCartItems] = useState(savedCart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const getSearchedProduct = async (searchText) => {
    try {
      const allProducts = await axios.get("https://dummyjson.com/products");
      const foundProduct = allProducts.data.products.filter((item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase())
      );
      return foundProduct;
    } catch (error) {
      return error;
    }
  };

  const updateCart = (product) => {
    setCartItems((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product.id === product.id
      );

      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...prevCart, { product, quantity: 1 }];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  const onUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const onRemove = (productId) => {
    setCartItems((prevCart) =>
      prevCart.filter((item) => {
        return item.product.id !== productId;
      })
    );
  };

  return {
    products,
    cartItems,
    getProductDetails,
    getSearchedProduct,
    updateCart,
    onUpdateQuantity,
    onRemove,
  };
};
