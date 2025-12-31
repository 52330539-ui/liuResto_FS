import "./App.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer/>
      </CartProvider>
    </>
  );
}

export default App;
