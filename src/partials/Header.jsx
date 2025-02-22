import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaCartArrowDown,
  FaHome,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  const [showSearchBar, setshowSearchBar] = useState(false);
  return (
    <motion.header
      className="sticky mb-2 top-0 z-50 bg-gradient-to-r from-gray-950 via-gray-700 to-gray-900 shadow-lg"
      initial={{ x: -500 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <div className="px-6 py-3 flex  max-sm:flex-col max-sm:py-0.5 justify-between items-center">
        <Link
          to={"/"}
          className="text-2xl font-bold text-green-400 hover:text-green-200 transition duration-300"
        >
          ShoppyGlobe
        </Link>

        <div className="flex font-mono max-sm:my-0.5 justify-between items-center space-x-6">
          <Link
            to={"/"}
            className="text-slate-200 flex items-center justify-center gap-2 hover:text-green-400 transition duration-300"
          >
            <span className="max-sm:hidden">Home</span>{" "}
            <FaHome className="text-2xl sm:hidden" />
          </Link>
          <Link
            to={"/cart"}
            className="text-slate-200 hover:text-green-400 transition duration-300"
          >
            <span className="max-sm:hidden">Cart</span>
            <FaCartArrowDown className="text-2xl sm:hidden" />
          </Link>
          <Link
            to={"/contact"}
            className="text-slate-200 hover:text-green-400 transition duration-300"
          >
            <span className="max-sm:hidden">Contact</span>
            <IoCall className="text-2xl sm:hidden" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {showSearchBar && (
            <>
              <input
                type="text"
                placeholder="Search products..."
                className="px-4 py-1 rounded-lg bg-gray-700 text-green-400 placeholder-green-400 font-mono outline-none focus:ring-2 focus:ring-green-400"
              />
            </>
          )}
          <button
            className="cursor-pointer text-slate-200 hover:text-green-400 transition duration-300"
            onClick={() => setshowSearchBar(true)}
          >
            <FaSearch className="text-2xl" />
          </button>
          <button className="cursor-pointer text-slate-200 hover:text-green-400 transition duration-300">
            <FaUserCircle className="text-2xl" />
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
