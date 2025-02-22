import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      className="bg-slate-800"
      initial={{ opacity: 0, y: -500 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
    >
      <div
        className="relative w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-slate-200"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-85"></div>

        <div className="relative text-center">
          <h1 className="text-5xl font-extrabold mb-4 max-md:text-4xl max-sm:text-3xl">
            Welcome to <span className="text-green-400">ShoppyGlobe</span>
          </h1>
          <p className="text-2xl font-mono max-w-5xl text-gray-200 max-md:text-xl">
            Discover the best deals and shop from a wide range of categories.{" "}
            <br />
            Elevate your shopping experience today!
          </p>

          <div className="mt-6 space-x-4">
            <Link
              to={"/products"}
              className="bg-teal-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-teal-600 transition"
            >
              Explore Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
