import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./partials/Loader";
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./partials/Header"));
const Footer = lazy(() => import("./partials/Footer"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./partials/NotFound"));
const ProductList = lazy(() => import("./components/ProductList"));

const App = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className="text-center text-white text-xl p-8">
            <Loader />
          </div>
        }
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Suspense>
    </>
  );
};

export default App;
