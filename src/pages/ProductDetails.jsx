/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { useProducts } from "../Hooks/useProducts";
import Loader from "../partials/Loader";

const ProductDetails = () => {
  const { productId } = useParams();
  const { getProductDetails } = useProducts();

  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await getProductDetails(productId);
        res.status === 200
          ? (enqueueSnackbar("Product Found", { variant: "success" }),
            setProductDetails(res.data))
          : enqueueSnackbar(res.response.data.message, { variant: "error" });
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [productId]);

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
          className="mt-5 px-5 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mx-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-400">
          {productDetails.title}
        </h1>
        <p className="text-gray-400 text-lg">{productDetails.category}</p>

        {/* Product Image Section */}
        <div className="flex flex-col md:flex-row gap-4 mt-5">
          <img
            src={productDetails.thumbnail}
            alt={productDetails.title}
            className="rounded-lg shadow-lg w-full md:w-1/3"
          />
          <div className="flex flex-wrap gap-2">
            {productDetails.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Image ${index}`}
                className="w-20 h-20 rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Price & Stock */}
        <div className="mt-4 flex justify-between items-center">
          <p className="text-2xl font-bold text-green-300">
            ${productDetails.price}
          </p>
          <p
            className={`text-lg font-semibold ${
              productDetails.stock > 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            {productDetails.availabilityStatus}
          </p>
        </div>

        {/* Description */}
        <p className="mt-3 text-gray-300">{productDetails.description}</p>

        {/* Details Table */}
        <div className="mt-5 bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2 text-green-300">
            Product Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
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
        </div>

        {/* Customer Reviews */}
        <div className="mt-5">
          <h2 className="text-xl font-semibold text-green-300">
            Customer Reviews
          </h2>
          {productDetails?.reviews?.length > 0 ? (
            productDetails?.reviews?.map((review, index) => (
              <div key={index} className="bg-gray-800 p-3 mt-3 rounded-lg">
                <p className="text-lg text-yellow-400">
                  ⭐ {review.rating} / 5
                </p>
                <p className="italic">&quot;{review.comment}&quot;</p>
                <p className="text-sm text-gray-400">- {review.reviewerName}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 mt-2">No reviews yet.</p>
          )}
        </div>

        {/* Buy Now Button */}
        <div className="mt-5 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-semibold transition">
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
