import React, { useEffect, useRef, useState } from 'react';
import './ScoutPicture.css';

 

const images = [
  process.env.PUBLIC_URL + "/wodo-img/scout1.png",
  process.env.PUBLIC_URL + "/wodo-img/scout2.png",
  process.env.PUBLIC_URL + "/wodo-img/scout3.png",
  process.env.PUBLIC_URL + "/wodo-img/scout4.png",
  process.env.PUBLIC_URL + "/wodo-img/scout5.png",
  process.env.PUBLIC_URL + "/wodo-img/scout6.png",
  process.env.PUBLIC_URL + "/wodo-img/scout7.jpg",
  process.env.PUBLIC_URL + "/wodo-img/scout9.png",
  process.env.PUBLIC_URL + "/wodo-img/scout10.png",
  process.env.PUBLIC_URL + "/wodo-img/scout11.png",
  process.env.PUBLIC_URL + "/wodo-img/scout12.png",
  process.env.PUBLIC_URL + "/wodo-img/scout13.png",
  process.env.PUBLIC_URL + "/wodo-img/scout14.png",
  process.env.PUBLIC_URL + "/wodo-img/scout15.jpg",
  process.env.PUBLIC_URL + "/wodo-img/scout16.jpg",
  process.env.PUBLIC_URL + "/wodo-img/scout17.jpg",
  process.env.PUBLIC_URL + "/wodo-img/scout18.jpg",
  process.env.PUBLIC_URL + "/wodo-img/scout19.jpg",
];


const ScoutPicture: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Check images exist and log errors if not loaded
  useEffect(() => {
    images.forEach((img, idx) => {
      const imgTest = new window.Image();
      imgTest.src = img;
      imgTest.onerror = () => {
        // eslint-disable-next-line no-console
        console.error(`ScoutPicture: Không tải được ảnh ${img} (index ${idx})`);
      };
    });
  }, []);

  useEffect(() => {
    // Nếu không chạy trên môi trường có window, bỏ qua
    if (typeof window === "undefined") return;

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

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  useEffect(() => {
    // Nếu animation bắt đầu và visibleCount nhỏ hơn số ảnh, tăng dần số lượng hiện
    if (startAnimation && visibleCount < images.length) {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, 200);
      return () => clearTimeout(timer);
    } else if (!startAnimation && visibleCount !== 0) {
      setVisibleCount(0);
    }
  }, [startAnimation, visibleCount]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

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
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen]);

  // Sửa lỗi có thể do PUBLIC_URL chưa đúng hoặc thư mục ảnh  
  // Thông báo khi không có ảnh hoặc đường dẫn sai
  if (!Array.isArray(images) || images.length === 0) {
    return (
      <div className="scout-picture-wrapper">
        <h2 className="gallery-title">HÌNH ẢNH SINH HOẠT TẠI MÁI ẤM</h2>
        <div style={{ color: "red", padding: 20 }}>Không có ảnh để hiển thị (Vui lòng kiểm tra đường dẫn ảnh và biến PUBLIC_URL).</div>
      </div>
    );
  }

  return (
    <div className="scout-picture-wrapper" ref={containerRef}>
      <h2 className="gallery-title">HÌNH ẢNH SINH HOẠT TẠI MÁI ẤM</h2>
      <div className="gallery-container">
        {images.map((img, index) => {
          // Hiện ảnh nếu đã đủ visibleCount
          if (index >= visibleCount) {
            // Có thể thêm skeleton loading nếu muốn
            return <div className="gallery-item" style={{ visibility: "hidden" }} key={index}></div>;
          }
          return (
            <div
              key={index}
              className={`gallery-item visible`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={img}
                alt={`scout-${index}`}
                style={{ cursor: 'pointer' }}
                onError={e => {
                  const el = e.currentTarget;
                  el.style.display = 'none';
                }}
              />
              <div className="image-counter">
                {index + 1} / {images.length}
              </div>
            </div>
          );
        })}
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
