import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSearchItem } from "../redux/slices";

const SearchBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const { searchItem } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="flex max-sm:my-2">
      {showSearchBar && (
        <motion.input
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "250px", opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          type="text"
          placeholder="Search products..."
          value={searchItem}
          onChange={(e) => dispatch(setSearchItem(e.target.value))}
          className="px-4 py-2 w-[300px] rounded-lg bg-gray-700 text-green-400 placeholder-green-400 font-mono outline-none focus:ring-2 focus:ring-green-400"
        />
      )}

      {!showSearchBar && (
        <button
          className="cursor-pointer hover:shadow-green-400 hover:scale-110 rounded-full hover:shadow-[1px_1px_15px] p-2 text-slate-200 hover:text-green-400 transition duration-300"
          onClick={() => setShowSearchBar(true)}
        >
          <FaSearchPlus className="text-2xl" />
        </button>
      )}

      {showSearchBar && (
        <button
          className="cursor-pointer hover:shadow-green-400 hover:scale-110 rounded-full hover:shadow-[1px_1px_15px] p-2 text-slate-200 hover:text-green-400 transition duration-300"
          onClick={() => setShowSearchBar(false)}
        >
          <FaSearchMinus className="text-2xl" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
