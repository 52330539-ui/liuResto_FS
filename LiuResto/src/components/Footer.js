import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Footer() {
  return (
    <div className="w-full bg-black text-white py-8 mt-0 text-center">
      
      {/* Social Icons */}
      <div className="flex justify-center gap-6 mb-4 text-3xl">
        <InstagramIcon className="hover:text-yellow-400 transition" />
        <TwitterIcon className="hover:text-yellow-400 transition" />
        <FacebookIcon className="hover:text-yellow-400 transition" />
        <LinkedInIcon className="hover:text-yellow-400 transition" />
      </div>

      {/* Text */}
      <p className="text-sm sm:text-base tracking-wide">
        &copy; 2025 LIU RESTAURANT
      </p>
    </div>
  );
}

export default Footer;
