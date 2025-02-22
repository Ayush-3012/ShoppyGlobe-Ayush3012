/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
const ProductItem = ({ product }) => {
  const updateCart = () => {
    console.log("cart updated");
  };
  
  return (
    <div className="bg-slate-700 font-mono text-slate-200 rounded-tr-xl rounded-bl-xl p-4 group hover:shadow-[1px_1px_15px] shadow-green-400 hover:-translate-y-3 transition-all ease-in-out duration-300 hover:rounded-tl-xl hover:rounded-br-xl hover:rounded-tr-none hover:rounded-bl-none">
      <div className="flex justify-center mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="rounded-lg w-52 h-52 bg-slate-400 group-hover:shadow-[1px_1px_15px] shadow-white group-hover:scale-110 transition-all ease-in-out duration-300"
        />
      </div>

      <h3 className="text-2xl font-bold text-center">{product.title}</h3>
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

        <div className="mt-4 flex justify-between ">
          <Link
            to={`/product/${product.id}`}
            className="bg-green-400 cursor-pointer hover:bg-green-500 text-slate-800 px-4 py-2 rounded-lg font-semibold transition"
          >
            More Details
          </Link>
          <button
            className="bg-green-400 cursor-pointer hover:bg-green-500 text-slate-800 px-4 py-2 rounded-lg font-semibold transition"
            onClick={updateCart}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
