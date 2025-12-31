import React from "react";
import { Link } from "react-router-dom";
import BannerImage from "../assets/darkimg.jpg";

function Home() {
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex  flex-col items-center justify-center"
      style={{ backgroundImage: `url(${BannerImage})` }}
    >
      <div className="text-center px-4 sm:px-6 md:px-8 bg-black/40 rounded-xl py-8">
        <h1 className="text-white font-serif text-3xl sm:text-4xl md:text-5xl font-bold">
          LIU RESTAURANT
        </h1>

        <p className="text-white mt-2 text-sm sm:text-base md:text-lg"></p>

        <Link to="/menu">
          <button className="mt-4 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition">
            ORDER NOW
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
