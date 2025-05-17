import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="bg-gray-100 py-8 mt-12">
      <hr className="border-gray-300 mb-8" />
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        {/* Logo */}
        <div>
          <img src="/Hos_logo.png" alt="logo" className="h-16 mb-4" />
          <p className="text-sm">NovaCare Hospital</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
          <ul className="flex flex-col gap-2">
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
            <Link to="/appointment" className="hover:text-blue-600 transition">Appointment</Link>
            <Link to="/about" className="hover:text-blue-600 transition">About</Link>
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Hours</h4>
          <ul className="space-y-1 text-sm">
            {hours.map((element) => (
              <li key={element.id} className="flex justify-between">
                <span>{element.day}</span>
                <span>{element.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Contact</h4>
          <div className="flex items-center gap-2 mb-2">
            <FaPhone className="text-blue-600" />
            <span className="text-sm">999-999-9999</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <MdEmail className="text-blue-600" />
            <span className="text-sm">Novalab@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaLocationArrow className="text-blue-600" />
            <span className="text-sm">Hyderabad, India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
