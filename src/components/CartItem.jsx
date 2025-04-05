import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { updateQuantity, removeFromCart } from "../redux/slices";
import { enqueueSnackbar } from "notistack";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

/* eslint-disable react/prop-types */
const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div
      key={item.product.id}
      className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-green-400 p-3 my-2 gap-4 bg-slate-700 rounded-lg"
    >
      {/* Product Image */}
      <div className="flex-shrink-0 self-center sm:self-auto">
        <img
          src={item.product.thumbnail}
          alt={item.product.title}
          className="w-28 h-28 sm:w-32 sm:h-32 object-cover bg-slate-300 rounded shadow-green-400 shadow-[1px_1px_10px]"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 sm:ml-4">
        <Link
          to={`/product/${item.product.id}`}
          className="text-lg sm:text-2xl hover:text-green-500 transition duration-150 text-green-400 font-mono font-semibold"
        >
          {item.product.title}
        </Link>
        <p className="text-teal-400 text-base sm:text-lg">
          ${item?.product.price?.toFixed(2)}
        </p>

        {/* Quantity Controls */}
        <div className="flex items-center mt-2 px-2 space-x-3">
          <button
            onClick={() => {
              dispatch(
                updateQuantity({
                  productId: item.product.id,
                  newQuantity: item.quantity - 1,
                })
              );
            }}
            disabled={item.quantity <= 1}
            className="px-2 py-1 bg-gray-200 rounded-md disabled:opacity-50"
          >
            <FaMinus />
          </button>

          <span className="text-xl text-slate-50 font-mono">
            {item.quantity}
          </span>

          <button
            onClick={() => {
              dispatch(
                updateQuantity({
                  productId: item.product.id,
                  newQuantity: item.quantity + 1,
                })
              );
            }}
            className="px-2 py-1 bg-gray-200 rounded-md"
          >
            <FaPlus />
          </button>
        </div>
      </div>

      {/* Remove Button */}
      <div className="self-end sm:self-center">
        <button
          onClick={() => {
            dispatch(removeFromCart(item.product.id));
            enqueueSnackbar("Item Removed From Cart", {
              variant: "error",
            });
          }}
          className="flex items-center gap-2 px-3 py-2 text-white bg-red-400 hover:bg-red-600 hover:scale-105 transition duration-150 rounded-md"
        >
          <span className="hidden sm:inline font-mono">Remove</span>
          <MdDeleteForever className="text-xl sm:text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
