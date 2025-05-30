import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://hospital-assignment-backend.onrender.com/api/v1/user/login",
        { email, password, role: "Patient" },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // ✅ Save the token in localStorage
      console.log(data);
      localStorage.setItem(data.tokenName, data.token);

      toast.success(data.message);
      setIsAuthenticated(true);
      navigateTo("/");

      // Clear form fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Login failed");
      } else {
        toast.error("Server not responding");
      }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container my-5 p-5">
      <div className="row bg-white shadow rounded overflow-hidden">
        {/* Image: 1/3 of the width */}
        <div className="col-md-4 p-0 d-none d-md-block">
          <img
            src="/img_login1.jpg" // Adjust path as needed
            alt="Login Visual"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Form: 2/3 of the width */}
        <div
          className="col-md-8"
          style={{
            paddingLeft: window.innerWidth < 500 ? "20px" : "5rem",
            paddingRight: window.innerWidth < 500 ? "60px" : "1.5rem",
          }}
        >
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Sign In</h2>
          <p className="text-gray-600 mb-3">Please Login To Continue</p>
          <p className="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            culpa voluptas expedita itaque ex, totam ad quod error?
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                style={{ width: window.innerWidth < 500 ? "300px" : "400px" }}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                style={{ width: window.innerWidth < 500 ? "300px" : "400px" }}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-start align-items-center gap-2 mb-3">
              <p className="mb-0 text-sm text-gray-600">Not Registered?</p>
              <Link
                to="/register"
                className="text-sm text-indigo-600 hover:underline"
              >
                Register Now
              </Link>
            </div>

            <div className="d-flex justify-content-left mb-3">
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-0"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
