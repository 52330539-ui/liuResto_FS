import cors from "cors";
import mysql from "mysql2"; // modern MySQL
import express from "express";
import bcrypt from "bcrypt";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "liurest0",
});

// Test DB connection
db.getConnection((err) => {
  if (err) console.error("Database connection failed:", err);
  else console.log("Connected to MySQL database");
});



// ------------------- REGISTER USER ------------------- //
app.post("/user/register", async (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "ID and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const q = "INSERT INTO user (id, password) VALUES (?, ?)";

    db.query(q, [id, hashedPassword], (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "User already exists" });
        }
        return res.status(500).json({ message: "Database error" });
      }

      return res.status(201).json({ message: "User registered successfully" });
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
});

// ------------------- LOGIN USER ------------------- //
app.post("/user/login", (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ message: "ID and password are required" });
  }

  const q = "SELECT password FROM user WHERE id = ?";

  db.query(q, [id], async (err, data) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (data.length === 0) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, data[0].password);

    if (!match) return res.status(401).json({ message: "Invalid password" });

    return res.status(200).json({
      message: "Login successful",
      userId: id
    });
  });
});

// ------------------- GET USER BY ID ------------------- //
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ message: "User ID is required" });

  const q = "SELECT id FROM user WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (data.length === 0) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ id: data[0].id });
  });
});

// ------------------- PRODUCT ROUTES ------------------- //

// GET all products
app.get("/products", (req, res) => {
  const q = "SELECT name, price FROM productt"; // 'name' column in productt table

  db.query(q, (err, data) => {
    if (err) {
      console.error("DB error:", err); // log the exact error
      return res.status(500).json({ message: "Database error", error: err });
    }
    return res.status(200).json(data);
  });
});


// GET product by name
app.get("/products/:pname", (req, res) => {
  const { pname } = req.params;
  const q = "SELECT pname, price FROM productt WHERE pname = ?";

  db.query(q, [pname], (err, data) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (data.length === 0) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(data[0]);
  });
});

// ------------------- CART ROUTES ------------------- //

// ADD product to cart
app.post("/cart/add", (req, res) => {
  const { pname, price } = req.body;
  if (!pname || !price) return res.status(400).json({ message: "Product name and price required" });

  const q = "INSERT INTO cart (pname, price, quantity) VALUES (?, ?, 1)";
  db.query(q, [pname, price], (err) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.status(201).json({ message: "Product added to cart" });
  });
});

// REMOVE single product from cart
app.delete("/cart/remove/:pname", (req, res) => {
  const { pname } = req.params;
  const q = "DELETE FROM cart WHERE pname = ? LIMIT 1";

  db.query(q, [pname], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Product not found in cart" });
    return res.status(200).json({ message: "Product removed from cart" });
  });
});

// CLEAR cart
app.delete("/cart/clear", (req, res) => {
  const q = "DELETE FROM cart";
  db.query(q, (err) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.status(200).json({ message: "Cart cleared" });
  });
});
// ------------------- CART ROUTES ------------------- //

// GET all items in cart
app.get("/cart", (req, res) => {
  const q = "SELECT * FROM cart"; // your table name

  db.query(q, (err, data) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    return res.status(200).json(data);
  });
});

// ------------------- START SERVER ------------------- //
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

