import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices";
import { useDispatch } from "react-redux";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate("/");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required.";
    if (!formData.phone || formData.phone.length < 10)
      newErrors.phone = "Valid phone number required.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email required.";
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    if (!formData.postalCode) newErrors.postalCode = "Postal code required.";

    if (!formData.cardName.trim())
      newErrors.cardName = "Cardholder name required.";
    if (!formData.cardNumber || formData.cardNumber.length !== 12)
      newErrors.cardNumber = "Valid card number required.";
    if (!formData.expiry) newErrors.expiry = "Expiry date required.";
    if (!formData.cvv || formData.cvv.length !== 3)
      newErrors.cvv = "CVV must be 3 digits.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      enqueueSnackbar("Order Placed Successfully! 🎉", { variant: "success" });
      setErrors({});
      dispatch(clearCart());
      let countdown = 3;
      const intervalId = setInterval(() => {
        if (countdown > 0) {
          enqueueSnackbar(`Redirecting to HomePage in ${countdown}...`, {
            variant: "info",
          });
          countdown--;
        } else {
          clearInterval(intervalId);
          navigate("/");
        }
      }, 1000);
    } else {
      enqueueSnackbar("Something is holding us!!!", { variant: "error" });
      setErrors(validationErrors);
    }
  };

  const inputClass =
    "p-3 rounded-lg focus:shadow-[1px_1px_10px] shadow-green-400 outline-none border-b-2 text-green-400 duration-300 transition";

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-4xl underline font-bold text-green-400 mb-6 text-center">
          Checkout
        </h2>

        {/* Shipping Info */}
        <div className="mb-8 border-b-2 pb-8 ">
          <h3 className="text-2xl underline font-semibold mb-4 text-green-300">
            Shipping Information
          </h3>
          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.fullName && (
                <p className="text-red-400 text-sm">{errors.fullName}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.email && (
                <p className="text-red-400 text-sm">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="address"
                placeholder="Address Line"
                value={formData.address}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.address && (
                <p className="text-red-400 text-sm">{errors.address}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.city && (
                <p className="text-red-400 text-sm">{errors.city}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.state && (
                <p className="text-red-400 text-sm">{errors.state}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="postalCode"
                placeholder="Postal Code"
                value={formData.postalCode}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.postalCode && (
                <p className="text-red-400 text-sm">{errors.postalCode}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl underline font-semibold mb-4 text-green-300">
            Payment Details
          </h3>
          <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                name="cardName"
                placeholder="Cardholder Name"
                value={formData.cardName}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.cardName && (
                <p className="text-red-400 text-sm">{errors.cardName}</p>
              )}
            </div>
            <div>
              <input
                type="number"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.cardNumber && (
                <p className="text-red-400 text-sm">{errors.cardNumber}</p>
              )}
            </div>
            <div>
              <input
                type="month"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.expiry && (
                <p className="text-red-400 text-sm">{errors.expiry}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                className={inputClass}
              />
              {errors.cvv && (
                <p className="text-red-400 text-sm">{errors.cvv}</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-400 hover:scale-x-115 cursor-pointer hover:bg-green-600 text-gray-900 font-semibold py-3 px-8 rounded-xl transition-all duration-300"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
