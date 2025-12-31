import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import imageleft from "../assets/imageleft.jpg";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/user/login", {
        id,
        password,
      });

      alert(res.data.message); // "Login successful"
      navigate("/menu"); // or home page
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Server error");
      }
    }
  };

  return (
    <div className="Login">
      <div
        className="leftSide"
        style={{ backgroundImage: `url(${imageleft})` }}
      ></div>

      <div className="rightSide">
        <h1>NEW MEMBER?</h1>

        <p className="text-lg font-medium p-4 m-2">
          Join us to get student vouchers!
        </p>

        <button
          className="w-full bg-yellow-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition duration-200"
          onClick={() => navigate("/signup")}
          style={{ marginBottom: "20px" }}
        >
          Sign Up
        </button>

        <form onSubmit={handleLogin}>
          <p className="text-lg font-medium p-4 m-2">Already a Member?</p>

          <label>ID</label>
          <input
            type="text"
            placeholder="Enter ID..."
            value={id}
            onChange={(e) => setId(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-yellow-700 transition duration-200"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
