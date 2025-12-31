import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";

function Cart() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  // Combine items with quantity
  const cartMap = {};
  cartItems.forEach((item) => {
    if (cartMap[item.name]) {
      cartMap[item.name].quantity += 1;
    } else {
      cartMap[item.name] = { ...item, quantity: 1 };
    }
  });
  const combinedItems = Object.values(cartMap);

  const totalPrice = combinedItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <div className="cartPage">
      <h1>My Cart</h1>

      {combinedItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cartTable">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price ($)</th>
                <th>Quantity</th>
                <th>Total ($)</th>
                <th>Action</th>
              </tr>
            </thead>
           <tbody>
  {cartItems.map((item, index) => (
    <tr key={index}>
      <td>{item.name}</td>      {/* product name */}
      <td>{item.price.toFixed(2)}</td>
      <td>1</td>                {/* quantity is always 1 */}
      <td>{item.price.toFixed(2)}</td>
      <td>
        <button
          className="removeButton"
          onClick={() => removeFromCart(item.name)}
        >
          Remove
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>

          <h2 className="cartTotal">Total: ${totalPrice}</h2>
        </>
      )}
    </div>
  );
}

export default Cart;
