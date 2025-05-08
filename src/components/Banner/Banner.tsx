import React, { useState } from 'react'; // Thêm import useState
import './Banner.css';

const Banner = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true); // Khi ảnh đã tải xong, thêm lớp "loaded"
  };

  return (
    <div className="banner">
      <img 
        src="/img/BWC2_LOGO.png" 
        alt="Banner" 
        className={`banner-image ${isLoaded ? 'loaded' : ''}`} 
        onLoad={handleImageLoad} // Khi ảnh được load xong, gọi hàm handleImageLoad
      />

      {/* Logo bên trái + text */}
      <div className="left-logo-group">
        <img src="/img/hdvn_info.jpg" alt="Left Logo" className="logo" />
        <div className="left-logo-text-group">
          <span className="left-logo-text1">HƯỚNG ĐẠO VIỆT NAM</span>
          <span className="left-logo-text1">Pathfinder Scouts Vietnam</span>
          <span className="left-logo-text2">Thành viên thứ 170 của WOSM</span>
        </div>
      </div>

      {/* Các logo bên phải */}
      <div className="overlay-logos">
        <img src="/img/dien-hai.png" alt="Logo 1" className="logo" />
        <img src="/img/gialong.png" alt="Logo 2" className="logo" />
        <img src="/img/vungtau.png" alt="Logo 3" className="logo" />
        <img src="/img/rakhoi.png" alt="Logo 4" className="logo" />
      </div>
    </div>
  );
};

export default Banner;
