import { useContext } from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import { Context } from "../main";

const Home = () => {
  const { isAuthenticated } = useContext(Context);
  return (
    <div className="space-y-8">
      <Hero
        title="Welcome to NovaCare Hospital | Your Trusted Healthcare Provider"
        imageUrl="/img2.jpg"
      />
      <Biography imageUrl="/img_bio1.jpg" />
      <Departments />
      {isAuthenticated && <MessageForm />}
    </div>
  );
};

export default Home;
