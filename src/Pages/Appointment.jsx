import React from "react";
import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import { useContext } from "react";
import { Context } from "../main";

const Appointment = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | ZeeCare Medical Institute"}
        imageUrl={"/signin.png"}
      />
      {isAuthenticated && <AppointmentForm/>}
    </>
  );
};

export default Appointment;
