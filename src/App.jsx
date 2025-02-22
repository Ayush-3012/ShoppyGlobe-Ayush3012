import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./partials/Header";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NotFound from "./partials/NotFound";
import Footer from "./partials/Footer";
import ProductList from "./components/ProductList";
import { useProducts } from "./Hooks/useProducts";

const App = () => {
  const { products } = useProducts();
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList products={products} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
