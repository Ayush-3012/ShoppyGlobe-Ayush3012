import { useState, useEffect } from "react";
import axios from "axios";

export const useProducts = () => {
  const [products, setProducts] = useState(null);

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

  return {
    products,
    getProductDetails,
  };
};
