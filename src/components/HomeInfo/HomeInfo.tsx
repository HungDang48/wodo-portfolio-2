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
        threshold: 0.3,
        rootMargin: '0px 0px -30% 0px',
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

  const statsData = [
    {
      image: "/img/vietnam.png",
      value: "8.000+",
      label: "Hướng Đạo Sinh và Tình nguyện viên – Sức mạnh từ cộng đồng",
      color: "violet"
    },
    {
      image: "/img/earth.png",
      value: "170",
      label: "Quốc gia thành viên của WOSM – Cùng vươn ra thế giới",
      color: "blue"
    },
    {
      image: "/img/95th.png",
      value: "95 năm",
      label: "Một hành trình – Muôn bước chân",
      color: "amber"
    },
    {
      image: "/img/WOSM.png",
      value: "57 triệu+",
      label: "Hướng đạo sinh toàn cầu – Kết nối và học hỏi",
      color: "emerald"
    }
  ];

  const storiesData = [
    {
      image: "/img/teamWODO.png",
      title: "Các thành viên toán WODO tại trại Better World Camp 2025",
      theme: "ocean"
    },
    {
      image: "/img/freetime.png",
      title: "Khi ý tưởng đã bung nở, là lúc cơ thể cũng cần được thả lỏng",
      theme: "sunset"
    },
    {
      image: "/img/giotinhthan.png",
      title: "Bắt đầu ngày mới bằng một lời cảm ơn giờ tinh thần",
      theme: "forest"
    }
  ];

  return (
    <div className="home-info">
      <div className="bg-pattern"></div>

      <div className="container">
        <div className="stats-section">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className={`stat-card animate-fade-up stat-${stat.color}`}
              ref={setRef}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="stat-content">
                <div className="stat-image-container">
                  <img src={stat.image} alt={`Stat ${index + 1}`} className="stat-image" />
                  <div className="stat-glow"></div>
                </div>
                <div className="stat-text">
                  <h3 className="stat-value">{stat.value}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </div>
              <div className="stat-accent"></div>
            </div>
          ))}
        </div>

        <div className="stories-section">
          <h2 className="section-title animate-fade-up" ref={setRef}>
            <span className="title-text">Khoảnh khắc đáng nhớ</span>
            <div className="title-decoration"></div>
          </h2>

          <div className="stories-grid">
            {storiesData.map((story, index) => (
              <article
                key={index}
                className={`story-card animate-zoom-in story-${story.theme}`}
                ref={setRef}
                style={{ animationDelay: `${(index + 4) * 0.2}s` }}
              >
                <div className="story-image-container">
                  <img 
                    src={story.image} 
                    alt={`Story ${index + 1}`} 
                    className="story-image"
                  />
                  <div className="story-overlay"></div>
                  <div className="story-shine"></div>
                </div>
                <div className="story-content">
                  <h3 className="story-title">{story.title}</h3>
                  <div className="story-border"></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
