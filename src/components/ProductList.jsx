import { motion } from "framer-motion";
import ProductItem from "./ProductItem";
import { useLocation } from "react-router-dom";

const ProductList = () => {
  const location = useLocation();
  const { products } = location.state || {};

  return (
    <motion.div
      className="py-8  bg-gray-950 mx-0.5 rounded-xl"
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <div className=" grid sm:grid-cols-2 px-4 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center items-center">
        {products?.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductList;
