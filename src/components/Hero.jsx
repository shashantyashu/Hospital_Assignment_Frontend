import React, { useState, useEffect } from "react";
import axios from "axios";

const Hero = ({ title, imageUrl }) => {
  const [isApproved, setIsApproved] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("patientToken");
        const response = await axios.get(
          "https://hospital-assignment-backend.onrender.com/api/v1/user/patient/me",
          // { withCredentials: true }
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const { data } = await axios.get(
          "https://hospital-assignment-backend.onrender.com/api/v1/appointment/getall",
          // { withCredentials: true }
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(data.appointments);
        setIsApproved(response.data.user);
      } catch (error) {
        setIsApproved([]);
        setAppointments([]);
      }
    };
    fetchUser();
  }, []);

  return (
    <section className="container mx-auto py-12 px-4 grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800">{title}</h1>
        <h2 className="text-xl font-semibold text-blue-600">
          Hello{" "}
          {isApproved?.firstName
            ? `${isApproved.firstName} ${isApproved.lastName} (${isApproved.role})`
            : "..."}
        </h2>

        <div className="mt-4">
          <h4 className="text-lg font-medium mb-2">Your Appointments:</h4>
          {appointments.filter((a) => a.patientId === isApproved._id).length > 0 ? (
            appointments
              .filter((a) => a.patientId === isApproved._id)
              .map((appointment, index) => {
                let statusClass = "";

                switch (appointment.status) {
                  case "Pending":
                    statusClass = "text-yellow-500";
                    break;
                  case "Accepted":
                    statusClass = "text-green-500";
                    break;
                  case "Rejected":
                    statusClass = "text-red-500";
                    break;
                  default:
                    statusClass = "text-gray-500";
                }

                return (
                  <div key={index} className="mb-3">
                    <h6 className={`font-semibold ${statusClass}`}>{appointment.status}</h6>
                    <p className="text-sm text-gray-700">
                      On {appointment.appointment_date} with{" "}
                      {appointment.doctor.firstName} {appointment.doctor.lastName}
                    </p>
                  </div>
                );
              })
          ) : (
            <p className="text-sm text-gray-600">No Appointments</p>
          )}
        </div>

        <p className="mt-4 text-gray-700">
          Please login to book or see an appointment with us.
        </p>
        <p className="text-gray-600">
          ZeeCare Medical Institute is a state-of-the-art facility dedicated to providing
          comprehensive healthcare services with compassion and expertise. Our team of
          skilled professionals is committed to delivering personalized care tailored to
          each patient's needs.
        </p>
      </div>

      <div className="relative">
        <img src={imageUrl} alt="hero" className="rounded-xl shadow-md animate-fadeIn w-full" />
        <img
          src="/Vector.png"
          alt="vector"
          className="absolute bottom-0 right-0 w-20 h-20 opacity-70"
        />
      </div>
    </section>
  );
};

export default Hero;
