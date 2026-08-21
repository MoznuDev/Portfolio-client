import Blog from "../blog/Blog";
import Client from "../client/Client";
import Contact from "../contact/Contact";
import Projects from "../projects/Projects";
import Services from "../service/Services";
import Skill from "../skill/Skill";
import HeroBanner from "./HeroBanner";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <div>
      <HeroBanner />
      <Services />
      <Projects />
      <Skill />
      <Testimonials />
      <Client />
      <Blog />
      <Contact />
    </div>
  );
};

export default Home;
