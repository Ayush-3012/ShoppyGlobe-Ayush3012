import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      className="h-screen flex flex-col justify-center items-center bg-gray-900"
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <h1 className="text-6xl font-extrabold text-green-400">404</h1>
      <p className="text-2xl font-semibold mt-4 text-gray-200">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <Link
        to={"/"}
        className="mt-6 px-6 py-3 bg-green-400 text-gray-900 font-semibold rounded-lg shadow-lg hover:bg-green-300 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </motion.div>
  );
};

export default NotFound;
