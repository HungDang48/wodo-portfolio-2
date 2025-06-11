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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartAnimation(true);
          }
        });
      },
      { threshold: 0.2 }
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

  useEffect(() => {
    if (startAnimation && visibleCount < images.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [startAnimation, visibleCount]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
          break;
        case 'ArrowRight':
          setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
          break;
        case 'Escape':
          closeLightbox();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  return (
    <div className="scout-picture-wrapper" ref={containerRef}>
      <h2 className="gallery-title">HÌNH ẢNH SINH HOẠT TẠI MÁI ẤM</h2>
      <div className="gallery-container">
        {images.map((img, index) => (
          <div
            key={index}
            className={`gallery-item ${index < visibleCount ? 'visible' : ''}`}
            onClick={() => openLightbox(index)}
          >
            <img
              src={img}
              alt={`scout-${index}`}
              style={{ cursor: 'pointer' }}
            />
            <div className="image-counter">
              {index + 1} / {images.length}
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeLightbox}>×</button>
            <button className="nav-btn left" onClick={prevImage}>‹</button>
            <img src={images[currentIndex]} alt={`scout-${currentIndex}`} />
            <button className="nav-btn right" onClick={nextImage}>›</button>
            <div className="counter">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoutPicture;
