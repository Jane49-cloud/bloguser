import avatar from "../../assets/computer.jpg";
import { useNavigate } from "react-router-dom";

const HeroPage = () => {
  const navigate = useNavigate()
  return (
    <div className="hero-page">
      <div className="spider-web">
        <div className="web"></div>
      </div>
      <div className="overlay">
        <div className="message">
          <div className="spider-webs">
            <div className="web"></div>
            <div className="web"></div>
            <div className="web"></div>
            <div className="web"></div>
          </div>
          <h1 className="heading">Join Our Blogging Platform</h1>
          <p className="paragraph">
            Start sharing your thoughts and ideas with the world.
          </p>
          <div className="spider-webs">
            <div className="web"></div>
            <div className="web"></div>
            <div className="web"></div>
            <div className="web"></div>
          </div>
          <button className="button" onClick={()=>navigate("/")}>Get Started</button>
        </div>
        <div className="image-container">
          <img className="image" src={avatar} alt="Dummy" />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
