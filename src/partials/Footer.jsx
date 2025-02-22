import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { motion } from "framer-motion";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-900 text-white py-3 mt-2 max-md:mt-4 max-md:py-1.5"
      initial={{ x: 500 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <div className="mx-10 py-2 px-24 max-md:px-0">
        <div className="flex max-md:flex-col justify-between items-center">
          <div className="flex items-center gap-2">
            <img
              src="/shoppyGlobe-logo.jpg"
              alt="ShoppyGlobe Logo"
              className="w-12 h-12 rounded-full"
            />
            <h2 className="text-xl font-bold cursor-pointer hover:text-green-400">
              ShoppyGlobe
            </h2>
          </div>

          <div className="flex space-x-5 max-md:mt-4">
            <Link className="text-slate-200 hover:text-green-400">
              <FaInstagramSquare className="text-4xl" />
            </Link>
            <Link className="text-slate-200 hover:text-green-400">
              <FaFacebookSquare className="text-4xl" />
            </Link>
            <Link className="text-slate-200 hover:text-green-400">
              <FaSquareXTwitter className="text-4xl" />
            </Link>
          </div>
        </div>

        <div className="text-center text-green-400 w-full text-xl mt-6 max-md:mt-2">
          &copy; {new Date().getFullYear()} ShoppyGlobe. All Rights Reserved.
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
