import React, { useEffect, useRef } from 'react';
import './HomeInfo.css';

const HomeInfo = () => {
  const animatedRefs = useRef<HTMLElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px',
      }
    );

    animatedRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      animatedRefs.current.forEach((el) => {
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const setRef = (el: HTMLElement | null) => {
    if (el && !animatedRefs.current.includes(el)) {
      animatedRefs.current.push(el);
    }
  };

  return (
    <div className="home-info">
      <div className="container">
        {/* Header Section with Main Logo and Organization Info */}
        <div className="header-section">
          <div className="main-logo-container">
            <img 
              src="/img/hdvn_info.jpg" 
              alt="Hướng Đạo Việt Nam Logo" 
              className="main-logo" 
            />
            <div className="main-title-group">
              <h1 className="main-title">HƯỚNG ĐẠO VIỆT NAM</h1>
              <p className="main-subtitle">Pathfinder Scouts Vietnam</p>
              <p className="main-description">Thành viên thứ 170 của WOSM</p>
            </div>
          </div>
          
          {/* Partner Organization Logos */}
          <div className="partner-logos-container">
            <img src="/img/dien-hai.png" alt="Đoàn Điện Hải" className="partner-logo" />
            <img src="/img/gialong.png" alt="Đoàn Gia Long" className="partner-logo" />
            <img src="/img/vungtau.png" alt="Đoàn Vũng Tàu" className="partner-logo" />
            <img src="/img/rakhoi.png" alt="Đoàn Ra Khơi" className="partner-logo" />
            <img src="/img/taophung.png" alt="Đoàn Tao Phùng" className="partner-logo" />
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-grid">
          <div className="stat-item animate-fade-up" ref={setRef}>
            <div className="icon">
              <img 
                src="/img/vietnam.png" 
                alt="Việt Nam" 
                className="logo-info" 
              />
            </div>
            <h3 className="value">8.000+</h3>
            <p className="label">Hướng Đạo Sinh và Tình nguyện viên</p>
          </div>
          
          <div className="stat-item animate-fade-up" ref={setRef}>
            <div className="icon">
              <img 
                src="/img/earth.png" 
                alt="Thế giới" 
                className="logo-info" 
              />
            </div>
            <h3 className="value">170</h3>
            <p className="label">Thành viên của WOSM</p>
          </div>
          
          <div className="stat-item animate-fade-up" ref={setRef}>
            <div className="icon">
              <img 
                src="/img/95th.png" 
                alt="95 năm" 
                className="logo-info" 
              />
            </div>
            <h3 className="value">95 năm</h3>
            <p className="label">Hình thành và phát triển</p>
          </div>
          
          <div className="stat-item animate-fade-up" ref={setRef}>
            <div className="icon">
              <img 
                src="/img/WOSM.png" 
                alt="WOSM" 
                className="logo-info" 
              />
            </div>
            <h3 className="value">57 triệu+</h3>
            <p className="label">Hướng đạo sinh trên thế giới</p>
          </div>
        </div>

        {/* Featured Stories Section */}
        <h2 className="section-title animate-fade-up" ref={setRef}>
          Khoảnh khắc đáng nhớ
        </h2>

        <div className="stories-grid">
          <div className="story animate-zoom-in" ref={setRef}>
            <img 
              src="/img/teamWODO.png" 
              alt="Toán WODO tại Better World Camp 2025" 
            />
            <div className="story-desc teal">
              Toán WODO tại Better World Camp 2025 - Nơi những ý tưởng sáng tạo được phát triển
            </div>
          </div>
          
          <div className="story animate-zoom-in" ref={setRef}>
            <img 
              src="/img/freetime.png" 
              alt="Thời gian thư giãn" 
            />
            <div className="story-desc teal">
              Khi ý tưởng đã bung nở, là lúc cơ thể cũng cần được thả lỏng và tái tạo năng lượng
            </div>
          </div>
          
          <div className="story animate-zoom-in" ref={setRef}>
            <img 
              src="/img/giotinhthan.png" 
              alt="Giờ tinh thần" 
            />
            <div className="story-desc teal">
              Bắt đầu ngày mới bằng một lời cảm ơn trong giờ tinh thần - Nâng cao tinh thần đoàn kết
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;