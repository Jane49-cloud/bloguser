import avatar from "../../assets/computer.jpg";

const HeroPage = () => {
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
          <button className="button">Get Started</button>
        </div>
        <div className="image-container">
          <img className="image" src={avatar} alt="Dummy" />
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
