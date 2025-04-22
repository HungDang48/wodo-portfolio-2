import { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="main-content">
      <video 
        className="background-video"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/video/wodo video 3 .mp4" type="video/mp4" />

      </video>

      <div className="center-content">
        <h1 className={`title ${isVisible ? 'visible' : ''}`}>WODO</h1>
        <div className={`sub-title ${isVisible ? 'visible' : ''}`}>
          <p className="item">WOULD THINKS</p>
          <p className="item">
          WOULD DO</p>
        </div>
      </div>

      <div className={`left-footer-group ${isVisible ? 'visible' : ''}`}>
        <p className="footer-text">PATHFINDER SCOUTS VIETNAM </p>
        <p className="footer-subtext"></p>
      </div>

      <div className={`right-footer-group ${isVisible ? 'visible' : ''}`}>
        <p className="side-text">BETTER WORLD CAMP 2025</p>
        <p className="footer-subtext">vì tha nhân, vì một xã hội tốt đẹp</p>
      </div>
    </div>
  );
};

export default Home;
