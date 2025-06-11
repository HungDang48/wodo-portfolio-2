import { useEffect, useState } from 'react';
import './Home.css';
import Banner from '../components/Banner/Banner';
import HomeInfo from '../components/HomeInfo/HomeInfo';
import AboutUs from './about us/AboutUs';
import ScoutPicture from '../components/picture scouts/ScoutPicture';
import Benefit from '../components/Benefit/Benefit';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="main-content">
      <Banner/>
      <HomeInfo/>
      {/* <AboutUs/> */}
      <ScoutPicture/>
      <Benefit/>
  
    </div>
  );
};

export default Home;
