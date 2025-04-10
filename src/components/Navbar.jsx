import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);//Context

  // const handleLogout = async () => {
  //   await axios
  //     .get("https://hospital-assignment-backend.onrender.com/api/v1/user/patient/logout", {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       toast.success(res.data.message);
  //       setIsAuthenticated(false);
  //     })
  //     .catch((err) => {
  //       toast.error(err.response.data.message);
  //     });
  //     navigateTo("/");
  // };

  const handleLogout = async () => {
    try {

      // Identify which token is stored
    // const tokenNames = ["patientToken"];//"adminToken", "doctorToken",
    // let activeTokenName = null;

    // for (let name of tokenNames) {
    //   if (localStorage.getItem(name)) {
    //     activeTokenName = name;
    //     break;
    //   }
    // }

    // if (!activeTokenName) {
    //   toast.error("No active session found.");
    //   return;
    // }
    const token = localStorage.getItem("patientToken");

      await axios.get("https://hospital-assignment-backend.onrender.com/api/v1/user/patient/logout",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
       // ✅ Clear token from localStorage
      localStorage.removeItem("patientToken");

  
      toast.success("Logged out successfully!");
      setIsAuthenticated(false);
      navigateTo("/");
    } catch (error) {
      toast.error("Logout failed. Try again.");
    }
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
    
  };

  return (
    <>
      <nav className={"container"}>
        <div className="logo">
          <img src="/logo.png" alt="logo" className="logo-img" />
        </div>
        
        <div className={!show ? "navLinks showmenu" : "navLinks"}>
        
          <div className="links">
            <Link to={"/"} onClick={() => setShow(!show)}>
              Home
            </Link>
            <Link to={"/appointment"} onClick={() => setShow(!show)}>
              Appointment
            </Link>
            <Link to={"/about"} onClick={() => setShow(!show)}>
              About Us
            </Link>
          </div>
          {isAuthenticated ? (
            <button className="logoutBtn btn" onClick={() => {
              handleLogout();
              setShow(!show);
            }}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={() => {goToLogin(); setShow(!show);}}>
              LOGIN
            </button>
          )}
        </div>
        <div className="hamburger" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
