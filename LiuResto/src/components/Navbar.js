import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="w-full bg-black text-white py-4 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
      
        <Link to="/" className="text-xl font-bold tracking-wide">
          LIU RESTAURANT
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/menu" className="hover:text-yellow-400 transition">Menu</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/login" className="hover:text-yellow-400 transition">Login</Link>

          {/* Cart icon only */}
          <Link to="/cart" className="relative">
            <ShoppingCartIcon style={{ fontSize: 30, color: "white" }} />
          </Link>
        </div>

        <button
          className="md:hidden px-3 py-2 border border-gray-400 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black flex flex-col items-center gap-4 py-4 z-50">
          <Link to="/" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/menu" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Menu</Link>
          <Link to="/about" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>About</Link>
          <Link to="/login" className="hover:text-yellow-400 transition" onClick={() => setIsOpen(false)}>Login</Link>

          {/* Cart icon only for mobile */}
          <Link to="/cart" className="relative" onClick={() => setIsOpen(false)}>
            <ShoppingCartIcon style={{ fontSize: 30, color: "white" }} />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
