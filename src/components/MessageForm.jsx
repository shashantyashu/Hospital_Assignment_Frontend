import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://hospital-assignment-backend.onrender.com/api/v1/message/send",
        { firstName, lastName, email, phone, message },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container my-5 p-4">
      <div className="row bg-white shadow-lg rounded overflow-hidden">
        {/* Left: Optional Vector or Image */}
        <div className="col-md-4 p-0 d-none d-md-block">
          <img
            src="/Vector.png"
            alt="vector"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Right: Form */}
        <div className="col-md-8 px-5 py-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Send Us A Message
          </h2>
          <p className="text-gray-600 mb-4">
            We'd love to hear from you! Please fill out the form below.
          </p>

          <form onSubmit={handleMessage}>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
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
                  style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
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
                  style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
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
                  style={{  width: window.innerWidth < 500 ? "300px" : "350px", }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <textarea
                className="form-control"
                rows={6}
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-primary bg-blue-600 hover:bg-blue-500 border-0"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessageForm;
