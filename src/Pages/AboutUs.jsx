import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  
  return (
    <>
      <Hero
        title={"Learn More About Us | NovaCare Hospital"}
        imageUrl={"/img4.jpg"}
      />
      <Biography imageUrl={"/img_bio2.jpg"} />
    </>
  );
};

export default AboutUs;
