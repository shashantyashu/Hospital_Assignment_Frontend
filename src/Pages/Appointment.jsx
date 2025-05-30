import Hero from "../components/Hero";
import AppointmentForm from "../components/AppointmentForm";
import { useContext } from "react";
import { Context } from "../main";

const Appointment = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <>
      <Hero
        title={"Schedule Your Appointment | NovaCare Hospital"}
        imageUrl={"/img3.jpg"}
      />
      {isAuthenticated && <AppointmentForm/>}
    </>
  );
};

export default Appointment;
