import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { FaPlus } from "react-icons/fa";
import "../styles/Menu.css";

function MenuItem({ name, price }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="menuItem">
      <h1>{name}</h1>
      <p>${price}</p>
      <button className="plusButton" onClick={() => addToCart({ pname: name, price })}>
        <FaPlus />
      </button>
    </div>
  );
}

export default MenuItem;
