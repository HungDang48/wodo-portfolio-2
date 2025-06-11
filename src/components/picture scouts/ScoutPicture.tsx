import React, { useEffect, useRef, useState } from 'react';
import './ScoutPicture.css';

const images = [
  "/img/scout1.png",
  "/img/scout2.png",
  "/img/scout3.png",
  "/img/scout4.png",
  "/img/scout5.png",
  "/img/scout6.png",
  "/img/scout7.png",
  "/img/scout9.png",
  "/img/scout10.png",
  "/img/scout11.png",
  "/img/scout12.png",
  "/img/scout13.png",
];

const ScoutPicture: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Quan sát khi cuộn tới gần container thì bắt đầu animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartAnimation(true);
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Tăng ảnh hiển thị tuần tự khi animation bắt đầu
  useEffect(() => {
    if (startAnimation && visibleCount < images.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [startAnimation, visibleCount]);

  return (
    <div className="scout-picture-wrapper" ref={containerRef}>
      <h2 className="gallery-title">HÌNH ẢNH SINH HOẠT TẠI MÁI ẤM</h2>
      <div className="gallery-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`gallery-item ${index < visibleCount ? 'visible' : ''}`}
          >
            <img src={img} alt={`scout-${index}`} />
            <div className="image-counter">
              {index + 1} / {images.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoutPicture;
