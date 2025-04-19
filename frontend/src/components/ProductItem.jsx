/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/slices";
import { enqueueSnackbar } from "notistack";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const updateMyCart = async (product) => {
    try {
      dispatch(addToCart(product));
      enqueueSnackbar("Cart Updated", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="font-mono text-slate-200 rounded-tr-xl rounded-bl-xl p-4 group shadow-[1px_1px_15px] shadow-green-900 hover:shadow-gray-200 hover:-translate-y-3 transition-all ease-in-out duration-300 hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none"
    >
      <div className="flex justify-center mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-32 h-32 rounded-sm group-hover:shadow-[1px_1px_15px]  group-hover:scale-120 transition-all ease-in-out duration-300"
        />
      </div>

      <h3 className="text-2xl mt-1 font-bold text-center">{product.title}</h3>
      <p className="text-sm text-gray-300 text-center italic">
        {product.category}
      </p>

      <div className="mt-3">
        <div className="mt-3 flex justify-between items-center">
          <p className="text-lg font-bold text-green-400">${product.price}</p>
          <p className="text-sm text-red-400">
            -{product.discountPercentage}% Off
          </p>
        </div>

        <p className="mt-2 text-yellow-400">⭐ {product.rating} / 5</p>
        <p className="mt-2 text-gray-400 text-sm">
          <span className="font-semibold text-white">Brand:</span>{" "}
          {product.brand}
        </p>
      </div>
      <div className="flex mt-2 justify-center">
        <button
          className="bg-green-500 text-lg cursor-pointer hover:scale-x-110 hover:bg-green-600 text-white px-3 py-1 rounded-lg font-semibold transition"
          onClick={(e) => {
            e.preventDefault();
            updateMyCart(product);
          }}
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductItem;
