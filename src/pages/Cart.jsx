import { motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useProducts } from "../Hooks/useProducts";
import { enqueueSnackbar } from "notistack";

const Cart = () => {
  const { cartItems, onUpdateQuantity, onRemove } = useProducts();

  const getTotalPrice = () => {
    return cartItems
      ?.reduce((total, item) => total + item.product.price * item.quantity, 0)
      ?.toFixed(2);
  };

  return (
    <motion.div
      className="mx-2 bg-slate-800 rounded-lg p-6"
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <h2 className="text-3xl font-mono font-bold mb-4 text-slate-50">
        Shopping Cart
      </h2>
      {cartItems?.length === 0 ? (
        <p className="text-center text-slate-50 font-bold text-2xl font-mono">
          Your cart is empty.
        </p>
      ) : (
        <>
          {cartItems?.map((item) => (
            <div
              key={item.product.id}
              className="flex border-green-400 border-b-2 items-center justify-between p-2 my-2"
            >
              <img
                src={item.product.thumbnail}
                alt={item.product.title}
                className="w-32 h-32 object-cover bg-slate-300 rounded shadow-green-400 shadow-[1px_1px_10px]"
              />
              <div className="flex-1 ml-4  p-2">
                <h3 className="text-2xl text-green-400 font-mono font-semibold">
                  {item.product.title}
                </h3>
                <p className="text-teal-400 text-lg">
                  ${item?.product.price?.toFixed(2)}
                </p>
                <div className="flex items-center mt-2 px-2">
                  <button
                    onClick={() => {
                      onUpdateQuantity(item.product.id, item.quantity - 1);
                    }}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    <FaMinus />
                  </button>
                  <span className="mx-2 text-xl text-slate-50 font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      onUpdateQuantity(item.product.id, item.quantity + 1);
                    }}
                    className="px-2 py-1 bg-gray-200 rounded-md"
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                onClick={() => {
                  onRemove(item.product.id);
                  enqueueSnackbar("Item Removed From Cart", {
                    variant: "error",
                  });
                }}
                className="px-3 py-1 text-lg bg-red-400 font-mono hover:bg-red-600 hover:scale-x-110 transition-all duration-150 ease-in-out text-white rounded-md"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-2xl font-bold text-green-400">
              Total:{" "}
              <span className="text-teal-400 font-medium">
                ${getTotalPrice()}
              </span>
            </h3>
            <button className="px-4 py-2 font-mono bg-green-400 text-slate-900 rounded-md hover:bg-green-600 hover:scale-x-110 transition-all duration-150 ease-in-out">
              Checkout
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
