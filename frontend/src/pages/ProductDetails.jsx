/* eslint-disable react-hooks/exhaustive-deps */
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useProducts } from "../Hooks/useProducts";
import Loader from "../partials/Loader";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices";

const ProductDetails = () => {
  const { getProductDetails } = useProducts();
  const { productId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState("");

  const dispatch = useDispatch();

  const updateMyCart = async (product) => {
    try {
      dispatch(addToCart(product));
      enqueueSnackbar("Cart Updated", { variant: "success" });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getProductDetails(productId);
        res.status === 200
          ? (enqueueSnackbar("Product Found", { variant: "success" }),
            setProductDetails(res.data))
          : enqueueSnackbar(res.response.data.message, { variant: "error" });
      } catch (error) {
        enqueueSnackbar("Error fetching product details:", {
          variant: "error",
        });
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [productId]);

  const dateFormatter = (timestamp) => {
    const myDate = new Date(timestamp);

    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };

    return myDate.toLocaleString("en-GB", options).replace(",", "");
  };

  if (loading) {
    return <Loader />;
  }

  if (!productDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
          alt="Not Found"
          className="w-32 h-32 mb-5 animate-bounce"
        />
        <h1 className="text-3xl font-bold text-red-500">
          Oops! Product Not Found
        </h1>
        <p className="text-gray-400 mt-2">
          The product you are looking for doesn&apos;t exist or has been
          removed.
        </p>
        <button
          onClick={() => window.history.back()}
          className="mt-5 px-5 py-2 cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="mx-2 sm:mx-4 md:mx-10 p-4 sm:p-6 bg-gray-900 text-white rounded-lg"
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-2 sm:px-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl py-2 underline font-bold text-green-400">
              {productDetails.title}
            </h1>
            <p className="text-gray-200 py-1 mx-1 sm:mx-4 text-lg sm:text-xl">
              {productDetails.category.toUpperCase()}
            </p>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-green-500 text-xl sm:text-2xl cursor-pointer hover:scale-x-110 hover:bg-green-600 text-white px-4 sm:px-5 py-2 rounded-lg font-semibold transition"
              onClick={() => updateMyCart(productDetails)}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Image Section */}
        <div className="flex flex-col lg:flex-row gap-6 mt-5 hover:shadow-[1px_1px_10px] group duration-200 transition-all rounded-xl p-4 hover:shadow-green-500">
          <img
            src={currentImage || productDetails.thumbnail}
            alt={productDetails.title}
            className="rounded-xl shadow-green-400 w-full sm:w-72 h-auto sm:h-72 object-cover hover:scale-105 transition-all duration-200 ease-in-out shadow-[1px_1px_10px]"
          />
          <div className="flex flex-wrap justify-start gap-3 sm:gap-5">
            {productDetails.images.map((img, index) => (
              <motion.img
                key={index}
                src={img}
                alt={`Image ${index}`}
                className="w-24 h-28 sm:w-32 sm:h-40 cursor-pointer rounded-lg hover:shadow-green-500 shadow-[1px_1px_10px]"
                onClick={(e) => setCurrentImage(e.target.src)}
                whileHover={{ translateY: "-10px" }}
              />
            ))}
          </div>
        </div>

        {/* Price & Stock */}
        <div className="mt-4 px-2 flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <p className="text-xl sm:text-2xl font-bold text-green-300">
              Price: ${productDetails.price}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-red-300">
              Discount: -{productDetails.discountPercentage}% off
            </p>
          </div>
          {productDetails.tags.length > 0 && (
            <div className="text-xl sm:text-2xl flex flex-wrap gap-2 items-center">
              Tags:
              <div className="flex flex-wrap gap-2">
                {productDetails.tags.map((tag, index) => (
                  <p
                    key={index}
                    className="px-2 rounded-xl text-sm sm:text-lg bg-green-400 text-slate-800 font-bold font-mono hover:-translate-y-1.5 transition duration-150"
                  >
                    {tag.toUpperCase()}
                  </p>
                ))}
              </div>
            </div>
          )}
          <div>
            <p className="text-xl sm:text-2xl font-bold text-yellow-400">
              Rating: ⭐{productDetails.rating}/5
            </p>
            <p
              className={`text-base font-semibold ${
                productDetails.stock > 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {productDetails.availabilityStatus}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-5">
          <h2 className="text-xl sm:text-2xl mb-1 font-semibold text-green-300">
            Product Details
          </h2>
          <div className=" bg-slate-950 p-4 rounded-lg">
            <div className="py-2 grid hover:translate-x-2 duration-200 transition-all hover:shadow-green-400 hover:shadow-[1px_1px_10px] rounded-lg px-4 grid-cols-2 max-sm:grid-cols-1 gap-4">
              <p>
                <span className="font-semibold">Brand:</span>{" "}
                {productDetails.brand}
              </p>
              <p>
                <span className="font-semibold">SKU:</span> {productDetails.sku}
              </p>
              <p>
                <span className="font-semibold">Weight:</span>{" "}
                {productDetails.weight} kg
              </p>
              <p>
                <span className="font-semibold">Warranty:</span>{" "}
                {productDetails.warrantyInformation}
              </p>
              <p>
                <span className="font-semibold">Shipping:</span>{" "}
                {productDetails.shippingInformation}
              </p>
              <p>
                <span className="font-semibold">Return Policy:</span>{" "}
                {productDetails.returnPolicy}
              </p>
            </div>
            <p className="mt-5 hover:translate-x-2 duration-200 transition-all hover:shadow-green-400 hover:shadow-[1px_1px_10px] rounded-lg p-4 text-xl max-sm:text-lg text-gray-100">
              Description: {productDetails.description}
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-5">
          <h2 className="text-xl sm:text-2xl font-semibold text-green-300">
            Customer Reviews
          </h2>
          <div className="px-2 sm:px-4 flex flex-col gap-3 py-2">
            {productDetails?.reviews?.length > 0 ? (
              productDetails?.reviews?.map((review, index) => (
                <div
                  key={index}
                  className="p-2 sm:p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-950 rounded-lg hover:shadow-[1px_1px_10px] shadow-green-400 duration-200 transition-all"
                >
                  <div>
                    <p className="text-yellow-400 text-base sm:text-lg">
                      ⭐ {review.rating} / 5
                    </p>
                    <p className="italic text-sm sm:text-base">
                      &quot;{review.comment}&quot;
                    </p>
                    <p className="text-xs text-gray-400">
                      - {review.reviewerName}
                    </p>
                  </div>
                  <p className="italic text-sm mt-2 sm:mt-0 sm:text-base">
                    {dateFormatter(review.date)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 mt-2">No reviews yet.</p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProductDetails;
