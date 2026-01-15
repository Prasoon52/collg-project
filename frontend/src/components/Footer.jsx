import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg"; 

const Footer = () => {
  let navigate = useNavigate();
  return (
    // Changed bg-black to a Blue Gradient to match your new theme
    <footer className="bg-gradient-to-r from-blue-900 to-slate-900 text-blue-100 py-10 px-6 border-t-4 border-blue-600">
      <div className="max-w-7xl mx-auto flex lg:items-start items-start justify-between gap-[40px] lg:gap-[100px] flex-col lg:flex-row">

        {/* Logo + Description */}
        <div className="lg:w-[40%] md:w-[50%] w-[100%]">
          <div className="flex items-center gap-3 mb-3">
             <img src={logo} alt="Logo" className="h-12 w-12 rounded-full border-2 border-blue-400" />
             <h2 className="text-2xl font-bold text-white">TLE Terminators</h2>
          </div>
          <p className="text-sm leading-relaxed text-blue-200">
            A Gamified STEM Learning Platform designed to master Science and Mathematics through interactive challenges. Level up your career with AI guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div className="lg:w-[30%] md:w-[50%]">
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/")}>Home</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/allcourses")}>All Courses</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/login")}>Login</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer" onClick={() => navigate("/profile")}>My Profile</li>
          </ul>
        </div>

        {/* Explore Categories */}
        <div className="lg:w-[30%] md:w-[50%]">
          <h3 className="text-white font-bold text-lg mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">STEM Challenges</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">AI Career Guidance</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Mathematics & Science</li>
            <li className="hover:text-white hover:translate-x-1 transition-all cursor-pointer">Coding & Logic</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-800 mt-10 pt-5 text-sm text-center text-blue-400">
        © {new Date().getFullYear()} TLE Terminators. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;