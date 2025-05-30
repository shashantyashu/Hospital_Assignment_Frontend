import axios from "axios";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { user } = useContext(Context);

  const handleMessage = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://hospital-assignment-backend.onrender.com/api/v1/message/send",
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="container my-5 p-4">
      <div className="row bg-white shadow-lg rounded overflow-hidden">
        {/* Optional Vector */}
        <div className="col-md-4 p-0 d-none d-md-block">
          <img
            src="/Vector.png"
            alt="vector"
            className="w-100 h-100"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Message Form */}
        <div className="col-md-8 px-5 py-4">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            Send Us A Message
          </h2>
          <p className="text-gray-600 mb-4">
            We'd love to hear from you! Please type your message below.
          </p>

          <form onSubmit={handleMessage}>
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
