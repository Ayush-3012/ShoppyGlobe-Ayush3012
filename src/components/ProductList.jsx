import { motion } from "framer-motion";
import ProductItem from "./ProductItem";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductList = () => {
  const location = useLocation();
  const { products } = location.state || {};
  const { searchItem } = useSelector((state) => state.cart);

  const filteredProducts = products?.filter((product) =>
    product.title.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <motion.div
      className="p-4 min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 rounded-xl"
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      {filteredProducts?.length === 0 && (
        <div className="text-gray-200 flex justify-center items-center flex-col my-16 text-center">
          <h1 className="text-4xl font-extrabold text-red-500 tracking-wide">
            Oops! Product Not Found
          </h1>
          <p className="text-gray-300 mt-3 text-lg">
            The product you&apos;re looking for doesn&apos;t exist or has been
            removed.
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 px-4 py-8">
        {filteredProducts?.map((item) => (
          <ProductItem key={item.id} product={item} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProductList;
