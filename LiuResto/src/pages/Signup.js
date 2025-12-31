import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const API_URL = "http://localhost:5000";

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // Call your backend register API
      const res = await axios.post(`${API_URL}/user/register`, { id, password });
      
      if (res.status === 201) {
        alert("User registered successfully!");
        navigate("/login"); // go to login page
      }
    } catch (err) {
      console.error("Signup error:", err);
      if (err.response) {
        alert(err.response.data.message); // show backend error message
      } else {
        alert("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-gray-200 shadow-xl rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
          Create Account
        </h1>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">ID</label>
            <input
              type="text"
              placeholder="Enter your ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-400 rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
