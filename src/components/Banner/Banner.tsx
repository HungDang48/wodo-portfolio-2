import React, { useState, useEffect } from 'react';
import './Banner.css';

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    // Add a slight delay for better visual effect
    setTimeout(() => setIsVisible(true), 100);
  };

  // Add intersection observer for better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const bannerElement = document.querySelector('.banner');
    if (bannerElement) {
      observer.observe(bannerElement);
    }

    return () => {
      if (bannerElement) {
        observer.unobserve(bannerElement);
      }
    };
  }, []);

  return (
    <div className={`banner ${isVisible ? 'visible' : ''}`}>
      {/* Enhanced banner image with loading state */}
      <img 
        src="/img/BWC2_LOGO.png" 
        alt="Banner - Hướng Đạo Việt Nam" 
        className={`banner-image ${isLoaded ? 'loaded' : ''}`} 
        onLoad={handleImageLoad}
        loading="lazy"
      />
     
      {/* Enhanced moving text with better animation */}
      {/* <div className="moving-text-container">
        <span className="center-moving-text">𝓦𝓞𝓓𝓞</span>
        <span className="center-moving-text">𝓦𝓞𝓓𝓞</span>
        <span className="center-moving-text">𝓦𝓞𝓓𝓞</span>
        <span className="center-moving-text">𝓦𝓞𝓓𝓞</span>
        <span className="center-moving-text">𝓦𝓞𝓓𝓞</span>
      </div> */}

      {/* Enhanced left logo group with accessibility */}
      <div className="left-logo-group" role="banner" aria-label="Hướng Đạo Việt Nam Information">
        <img 
          src="/img/hdvn_info.jpg" 
          alt="Hướng Đạo Việt Nam Logo" 
          className="logo"
          loading="lazy"
        />
        <div className="left-logo-text-group">
          <span className="left-logo-text1">HƯỚNG ĐẠO VIỆT NAM</span>
          <span className="left-logo-text1">Pathfinder Scouts Vietnam</span>
          <span className="left-logo-text2">Thành viên thứ 170 của WOSM</span>
        </div>
      </div>

      {/* Enhanced overlay logos with accessibility */}
      <div className="overlay-logos" role="complementary" aria-label="Partner Organizations">
        <img 
          src="/img/dien-hai.png" 
          alt="Điện Hải Logo" 
          className="logo"
          loading="lazy"
          title="Điện Hải"
        />
        <img 
          src="/img/gialong.png" 
          alt="Gia Long Logo" 
          className="logo"
          loading="lazy"
          title="Gia Long"
        />
        <img 
          src="/img/vungtau.png" 
          alt="Vũng Tàu Logo" 
          className="logo"
          loading="lazy"
          title="Vũng Tàu"
        />
        <img 
          src="/img/rakhoi.png" 
          alt="Ra Khơi Logo" 
          className="logo"
          loading="lazy"
          title="Ra Khơi"
        />
        <img 
          src="/img/taophung.png" 
          alt="Tạo Phong Logo" 
          className="logo"
          loading="lazy"
          title="Tạo Phong"
        />
      </div>
    </div>
  );
};

export default Banner;