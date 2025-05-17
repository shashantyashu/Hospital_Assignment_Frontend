import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("patientToken");
      const res = await axios.get("https://hospital-assignment-backend.onrender.com/api/v1/user/patient/logout", {
        // withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("patientToken");
      toast.success(res.data.message);
      setIsAuthenticated(false);
      navigateTo("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Logout failed");
    }
  };

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md h-[80px] px-6 w-full">
  <div className="container mx-auto flex items-center justify-between h-full">
    {/* Logo */}
    <div className="flex items-center h-full">
      <img src="/Hos_logo.png" alt="logo" className="h-full w-auto object-contain" />
    </div>

    {/* Hamburger menu */}
    <div className="md:hidden text-xl text-gray-700 cursor-pointer" onClick={() => setShow(!show)}>
      <GiHamburgerMenu />
    </div>

    {/* Links */}
    <div
      className={`${
        show ? "block" : "hidden"
      } md:flex md:items-center md:space-x-6 space-y-4 md:space-y-0 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent p-4 md:p-0 z-50 border-t md:border-none`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:space-x-6 text-lg font-medium">
        <Link to="/" onClick={() => setShow(false)} className="hover:text-blue-600">
          Home
        </Link>
        <Link to="/appointment" onClick={() => setShow(false)} className="hover:text-blue-600">
          Appointment
        </Link>
        <Link to="/about" onClick={() => setShow(false)} className="hover:text-blue-600">
          About Us
        </Link>
      </div>

      <div className="mt-1 md:mt-0">
        {isAuthenticated ? (
          <button
            className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        ) : (
          <button
            className="px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
            onClick={goToLogin}
          >
            LOGIN
          </button>
        )}
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;

