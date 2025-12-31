import React, { useEffect, useState } from "react";
import MenuItem from "../components/MenuItem";
import axios from "axios";
import "../styles/Menu.css";

function Menu() {
  const [menuList, setMenuList] = useState([]);

  useEffect(() => {
    // Fetch products from backend
    axios.get("http://localhost:5000/products")
      .then(res => {
        console.log("Fetched products:", res.data); // Debug: check the data
        setMenuList(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="menu">
      <h1 className="menuTitle">Our Menu</h1>
      <div className="menuList">
        {menuList.length === 0 ? (
          <p>No products available.</p>
        ) : (
          menuList.map((menuItem, key) => (
            <MenuItem
              key={key}
              name={menuItem.name} // <-- must match productt.name from backend
              price={menuItem.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Menu;
