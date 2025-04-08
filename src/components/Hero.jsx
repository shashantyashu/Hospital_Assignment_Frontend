import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Hero = ({ title, imageUrl }) => {
  const [isApproved, setIsApproved] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://hospital-assignment-backend.onrender.com/api/v1/user/patient/me",
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       const { data } = await axios.get(
  //         "https://hospital-assignment-backend.onrender.com/api/v1/appointment/getall",
  //         { withCredentials: true }
  //       );
  //       console.log(data);
  //       setAppointments(data.appointments);
  //       // console.log(response);
  //       setIsApproved(response.data.user);
  //     } catch (error) {
  //       setIsApproved([]);
  //       setAppointments([]);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("patientToken");
  
        const response = await axios.get(
          "https://hospital-assignment-backend.onrender.com/api/v1/user/patient/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        const { data } = await axios.get(
          "https://hospital-assignment-backend.onrender.com/api/v1/appointment/getall",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        // console.log(data);
        setAppointments(data.appointments);
        setIsApproved(response.data.user);
      } catch (error) {
        console.error(error);
        setIsApproved([]);
        setAppointments([]);
      }
    };
  
    fetchUser();
  }, []);
  

  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <h2>
            Hello{" "}
            {isApproved && isApproved.firstName
              ? `${isApproved.firstName} ${isApproved.lastName} (${isApproved.role})`
              : "..."}
          </h2>
          <div>
            <h4>Your Appointments:</h4><br />
            {appointments
              .filter((appointment) => appointment.patientId === isApproved._id)
              .map((appointment, index) => {
                let statusClass = "";

                switch (appointment.status) {
                  case "Pending":
                    statusClass = "value-pending";
                    break;
                  case "Accepted":
                    statusClass = "value-accepted";
                    break;
                  case "Rejected":
                    statusClass = "value-rejected";
                    break;
                  default:
                    statusClass = "";
                }

                return (
                  <div key={index} style={{ marginBottom: "10px" }}>
                    <h6 className={statusClass}>{appointment.status}</h6>
                    <p>
                      On {appointment.appointment_date} with{" "}
                      {appointment.doctor.firstName}{" "}
                      {appointment.doctor.lastName}
                    </p>
                  </div>
                );
              })}

            {/* Show this if there are no appointments */}
            {appointments.filter((a) => a.patientId === isApproved._id)
              .length === 0 && <p>No Appointments</p>}
          </div>

          <p>Pleace Login to book or see an appointment with us.</p>
          <p>
            ZeeCare Medical Institute is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            ZeeCare, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
