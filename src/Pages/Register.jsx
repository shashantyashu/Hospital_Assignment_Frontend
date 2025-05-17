import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hospital-assignment-backend.onrender.com/api/v1/user/patient/register",
        { firstName, lastName, email, phone, nic, dob, gender, password },
        // {
        //   withCredentials: true,
        //   headers: { "Content-Type": "application/json" },
        // }
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = res.data;
      localStorage.setItem(data.tokenName, data.token);

      toast.success(res.data.message);
      setIsAuthenticated(true);
      navigateTo("/");

      // Clear form fields
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container my-5 p-5">
      <div className="row bg-white shadow rounded overflow-hidden">
        {/* Image: 1/3 Width */}
        <div className="col-md-4 p-0 d-none d-md-block">
          <img
            src="/img_register2.jpg" // update this path as needed
            alt="Register Visual"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Form: 2/3 Width */}
        <div className="col-md-8 p-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">Sign Up</h2>
          <p className="text-gray-600 mb-3">Please Sign Up To Continue</p>
          <p className="text-sm text-gray-500 mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            culpa voluptas expedita itaque ex, totam ad quod error?
          </p>

          <form onSubmit={handleRegistration}>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col">
                <input
                  type="number"
                  className="form-control"
                  placeholder="NIC"
                  value={nic}
                  onChange={(e) => setNic(e.target.value)}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <select
                  className="form-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="col">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="d-flex justify-content-end align-items-center gap-2 mb-3">
              <p className="mb-0 text-sm text-gray-600">Already Registered?</p>
              <Link
                to="/login"
                className="text-sm text-indigo-600 hover:underline"
              >
                Login Now
              </Link>
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 hover:bg-blue-700 border-0"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;





