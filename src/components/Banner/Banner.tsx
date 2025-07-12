import React, { useState } from 'react';
import './Banner.css';

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className="banner">
      <img 
        src="/img/BWC2_LOGO.png" 
        alt="Better World Camp Banner" 
        className={`banner-image ${isLoaded ? 'loaded' : ''}`} 
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default Banner;