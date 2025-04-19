import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { clearCart } from "../redux/slices";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return cartItems
      ?.reduce((total, item) => total + item.product.price * item.quantity, 0)
      ?.toFixed(2);
  };

  return (
    <motion.div
      className="bg-slate-800 rounded-lg p-4 md:p-6 mx-4"
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <h2 className="text-2xl md:text-3xl font-mono font-bold mb-4 text-slate-50 text-center md:text-left">
        Shopping Cart
      </h2>

      {cartItems?.length === 0 ? (
        <p className="text-center text-slate-50 font-bold text-xl md:text-2xl font-mono">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems?.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <h3 className="text-xl md:text-2xl font-bold text-green-400">
              Total:{" "}
              <span className="text-teal-400 font-medium">
                ${getTotalPrice()}
              </span>
            </h3>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/checkout"
                className="px-4 py-2 font-mono text-center bg-green-400 text-slate-900 rounded-md hover:bg-green-600 hover:scale-105 transition-all duration-150 ease-in-out"
              >
                Checkout
              </Link>

              <button
                onClick={() => {
                  if (
                    window.confirm("Are you sure you want to empty the cart?")
                  ) {
                    dispatch(clearCart());
                  }
                }}
                className="px-4 py-2 font-mono text-center bg-red-400 text-slate-900 rounded-md hover:bg-red-600 hover:scale-105 transition-all duration-150 ease-in-out"
              >
                Empty Cart
              </button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Cart;
