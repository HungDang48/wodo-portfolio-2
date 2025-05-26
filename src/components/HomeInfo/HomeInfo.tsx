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
            observer.unobserve(entry.target); // chỉ chạy 1 lần
          }
        });
      },
      {
        threshold: 0.3,  // Điều chỉnh để phần tử phải vào ít nhất 50% viewport mới chạy animation
        rootMargin: '0px 0px -30% 0px', // Phần tử phải vào chính giữa mới chạy
      }
    );

    animatedRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
  }, []);

  const setRef = (el: HTMLElement | null) => {
    if (el && !animatedRefs.current.includes(el)) {
      animatedRefs.current.push(el);
    }
  };

  return (
    <div className="home-info">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="container">
          {/* Stats Section */}
          <div className="stats-grid">
            <div className="animate-fade-up" ref={setRef}>
              <img src="/img/vietnam.png" alt="Logo 1" className="logo-info" />
              <h3 className="value">8.000+</h3>
              <p className="label">Hướng Đạo Sinh và Tình nguyện viên</p>
            </div>
            <div className="animate-fade-up" ref={setRef}>
              <img src="/img/earth.png" alt="Logo 2" className="logo-info" />
              <h3 className="value">170</h3>
              <p className="label">thành viên của WSOM</p>
            </div>
            <div className="animate-fade-up" ref={setRef}>
              <img src="/img/95th.png" alt="Logo 3" className="logo-info" />
              <h3 className="value">95 năm</h3>
              <p className="label">Hình thành và phát triển</p>
            </div>
            <div className="animate-fade-up" ref={setRef}>
              <img src="/img/WOSM.png" alt="Logo 4" className="logo-info" />
              <h3 className="value">57 triệu+</h3>
              <p className="label">Hướng đạo sinh trên thế giới</p>
            </div>
          </div>

          {/* Featured Stories */}
          <h2 className="section-title animate-fade-up" ref={setRef}>Khoảnh khắc</h2>

          <div className="stories-grid">
            <div className="story relative animate-zoom-in" ref={setRef}>
              <img src="/img/teamWODO.png" alt="Story 1" />
              <div className="story-desc teal">Toán WODO tại Better World Camp 2025</div>
            </div>
            <div className="story relative animate-zoom-in" ref={setRef}>
              <img src="/img/freetime.png" alt="Story 2" />
              <div className="story-desc teal">Khi ý tưởng đã bung nở, là lúc cơ thể cũng cần được thả lỏng</div>
            </div>
            <div className="story relative animate-zoom-in" ref={setRef}>
              <img src="/img/giotinhthan.png" alt="Story 3" />
              <div className="story-desc teal">Bắt đầu ngày mới bằng một lời cảm ơn giờ tinh thần</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
