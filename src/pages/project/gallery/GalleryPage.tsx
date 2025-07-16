import React, { useEffect, useRef, useState } from 'react';
import ViewImageComponents from './ImageViewComponent';
import './GalleryPage.css';

interface ImageItem {
  src: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

const imageData: ImageItem[] = [
  {
    src: process.env.PUBLIC_URL + "/img/scout1.png",
    title: "Thủ công tô màu",
    description: "Các bạn nhỏ tham gia hoạt động thủ công, khám phá sự sáng tạo của bản thân",
    date: "2025-05-25",
    category: "thu-cong",
    tags: ["thủ công", "hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout2.png",
    title: "Thủ công gấp giấy",
    description: "Các em cùng nhau tham gia hoạt động thủ công gấp giấy, rèn luyện sự khéo léo và sáng tạo",
    date: "2025-05-25",
    category: "thu-cong",
    tags: ["thủ công", "hoạt động", "gấp giấy"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout3.png",
    title: "Thủ công gấp giấy",
    description: "Hướng dẫn các em nhỏ cách gấp giấy thành những hình thú đáng yêu sau khi tô màu",
    date: "2025-05-25",
    category: "thu-cong",
    tags: ["thủ công", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout4.png",
    title: "Thủ công gấp giấy",
    description: "Hướng dẫn các em nhỏ cách gấp giấy thành những hình thú đáng yêu sau khi tô màu",
    date: "2025-05-25",
    category: "thu-cong",
    tags: ["thủ công", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout5.png",
    title: "Thu lại giấy tô màu",
    description: "Hướng dẫn các em nhỏ cách thu lại giấy tô màu sau khi sử dụng",
    date: "2025-05-25",
    category: "thu-cong",
    tags: ["tái chế", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout6.png",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    date: "2025-05-25",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout7.jpg",
    title: "Giới thiệu về hướng đạo",
    description: "Các em nhỏ được giới thiệu về tổ chức hướng đạo và các hoạt động của hải ly",
    date: "2025-05-218",
    category: "sinh-hoat",
    tags: ["hướng đạo", "giới thiệu", "tổ chức"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout9.png",
    title: "Giới thiệu về hướng đạo",
    description: "Các em nhỏ được giới thiệu về tổ chức hướng đạo và các hoạt động của hải ly",
    date: "2025-05-18",
    category: "huong-dao",
    tags: ["hướng đạo", "giới thiệu", "tổ chức"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout10.png",
    title: "Thủ công tô màu",
    description: "Hải ly sau khi tô màu các nhân vật trong câu chuyện rừng xanh",
    date: "2025-05-18",
    category: "huong-dao",
    tags: ["thủ công", "hoạt động", "tô màu"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout11.png",
    title: "Thủ công tô màu",
    description: "Giới thiệu về các nhân vật trong câu chuyện rừng xanh và hướng dẫn các em tô màu",
    date: "2025-05-18",
    category: "huong-dao",
    tags: ["thủ công", "hoạt động", "tô màu", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout12.png",
    title: "Thủ công tô màu",
    description: "Giới thiệu về các nhân vật trong câu chuyện rừng xanh và hướng dẫn các em tô màu",
    date: "2025-05-18",
    category: "huong-dao",
    tags: ["thủ công", "hoạt động", "tô màu", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout13.png",
    title: "Cộng đồng và chia sẻ",
    description: "Phát bánh kẹo cho các em hải ly hoạt động tốt và sinh hoạt tích cực",
    date: "2024-05-18",
    category: "chia-se",
    tags: ["cộng đồng", "chia sẻ", "phát thưởng"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout14.png",
    title: "Hướng dẫn làm kính mặt trời",
    description: "Hướng dẫn các em nhỏ cách làm kính mặt trời",
    date: "2025-06-08",
    category: "thu-cong",
    tags: ["thủ công", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout15.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    date: "2025-06-15",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout16.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    date: "2025-06-15",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout17.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    date: "2025-06-15",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout18.jpg",
    title: "Thủ công tô màu",
    description: "Các bạn nhỏ tham gia hoạt động thủ công, khám phá sự sáng tạo của bản thân",
    date: "2025-05-18",
    category: "thu-cong",
    tags: ["thủ công", "hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/img/scout19.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    date: "2025-06-15",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  }
];

const categories = [
  { id: 'all', name: 'Tất cả', icon: '🌟' },
  { id: 'thu-cong', name: 'Thủ công', icon: '✂️' },
  { id: 'sinh-hoat', name: 'Sinh hoạt', icon: '🎮' },
  { id: 'huong-dao', name: 'Hướng đạo', icon: '🧭' },
  { id: 'chia-se', name: 'Chia sẻ', icon: '🤝' }
];

const GalleryPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [startAnimation, setStartAnimation] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'timeline' | 'masonry'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [isLiked, setIsLiked] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Lọc ảnh theo category
  const filteredImages = imageData.filter(image => {
    return selectedCategory === 'all' || image.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return a.title.localeCompare(b.title);
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStartAnimation(true);
          }
        });
      },
      { threshold: 0.1 }
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

  // Reset visibleCount khi thay đổi category
  useEffect(() => {
    setVisibleCount(8);
    setStartAnimation(false);
    setTimeout(() => setStartAnimation(true), 100);
  }, [selectedCategory, sortBy]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimelineYear = (dateString: string) => {
    return new Date(dateString).getFullYear();
  };

  const groupByYear = (images: ImageItem[]) => {
    return images.reduce((acc, image) => {
      const year = getTimelineYear(image.date);
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(image);
      return acc;
    }, {} as Record<number, ImageItem[]>);
  };

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + 8, filteredImages.length));
  };

  const renderGridView = () => (
    <div className={`gallery-container ${viewMode}`}>
      {filteredImages.slice(0, visibleCount).map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className={`gallery-item ${startAnimation ? 'visible' : ''}`}
          onClick={() => openLightbox(index)}
        >
          <div className="image-wrapper">
            <img
              src={image.src}
              alt={image.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const wrapper = target.parentElement;
                if (wrapper) {
                  wrapper.innerHTML = `<div class="image-error">❌ Không thể tải ảnh</div>`;
                }
              }}
            />
            <div className="image-overlay">
              <div className="image-info">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
                <div className="image-meta">
                  <span className="date">{formatDate(image.date)}</span>
                  <div className="tags">
                    {image.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">#{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              className={`like-btn ${isLiked.has(index) ? 'liked' : ''}`}
              onClick={(e) => toggleLike(index, e)}
            >
              ❤️
            </button>
            <div className="image-counter">
              {index + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      ))}
      {visibleCount < filteredImages.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMoreImages}>
            📸 Xem ({filteredImages.length - visibleCount} ảnh)
          </button>
        </div>
      )}
    </div>
  );

  const renderTimelineView = () => {
    const visibleImages = filteredImages.slice(0, visibleCount);
    const groupedImages = groupByYear(visibleImages);
    const years = Object.keys(groupedImages).sort((a, b) => parseInt(b) - parseInt(a));

    return (
      <div className="timeline-container">
        {years.map((year) => (
          <div key={year} className="timeline-year-group">
            <h2 className="timeline-year">{year}</h2>
            <div className="timeline-items">
              {groupedImages[parseInt(year)].map((image, index) => {
                const globalIndex = filteredImages.findIndex((img) => img.src === image.src);
                return (
                  <div
                    key={`${image.src}-${globalIndex}`}
                    className={`timeline-item ${startAnimation ? 'visible' : ''}`}
                    onClick={() => openLightbox(globalIndex)}
                  >
                    <div className="image-wrapper">
                      <img 
                        src={image.src} 
                        alt={image.title} 
                        loading="lazy" 
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const wrapper = target.parentElement;
                          if (wrapper) {
                            wrapper.innerHTML = `<div class="image-error">❌ Không thể tải ảnh</div>`;
                          }
                        }}
                      />
                      <div className="image-info">
                        <h3>{image.title}</h3>
                        <p>{image.description}</p>
                        <div className="image-meta">
                          <span className="date">{formatDate(image.date)}</span>
                          <div className="tags">
                            {image.tags.map((tag, tagIndex) => (
                              <span key={tagIndex} className="tag">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        className={`like-btn ${isLiked.has(globalIndex) ? 'liked' : ''}`}
                        onClick={(e) => toggleLike(globalIndex, e)}
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {visibleCount < filteredImages.length && (
          <div className="load-more-container">
            <button className="load-more-btn" onClick={loadMoreImages}>
              Xem thêm ({filteredImages.length - visibleCount} ảnh)
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderMasonryView = () => (
    <div className="masonry-container">
      {filteredImages.slice(0, visibleCount).map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className={`masonry-item ${startAnimation ? 'visible' : ''}`}
          onClick={() => openLightbox(index)}
        >
          <img
            src={image.src}
            alt={image.title}
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const wrapper = target.parentElement;
              if (wrapper) {
                wrapper.innerHTML = `<div class="image-error">❌ Không thể tải ảnh</div>`;
              }
            }}
          />
          <div className="masonry-overlay">
            <h4>{image.title}</h4>
            <p>{formatDate(image.date)}</p>
          </div>
          <button
            className={`like-btn ${isLiked.has(index) ? 'liked' : ''}`}
            onClick={(e) => toggleLike(index, e)}
          >
            ❤️
          </button>
        </div>
      ))}
      {visibleCount < filteredImages.length && (
        <div className="load-more-container">
          <button className="load-more-btn" onClick={loadMoreImages}>
            Xem thêm ({filteredImages.length - visibleCount} ảnh)
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="gallery-page" ref={containerRef}>
      <div className="gallery-header">
        <h1 className="gallery-title">Thư viện hình ảnh mái ấm</h1>
        <p className="gallery-subtitle">Những khoảnh khắc đẹp và ý nghĩa trong hành trình chung</p>
      </div>

      <div className="gallery-controls">
        <div className="filter-controls">
          <div className="view-mode-buttons">
            <button
              className={viewMode === 'grid' ? 'active' : ''}
              onClick={() => setViewMode('grid')}
              title="Lưới"
            >
              📱
            </button>
            <button
              className={viewMode === 'timeline' ? 'active' : ''}
              onClick={() => setViewMode('timeline')}
              title="Thời gian"
            >
              📅
            </button>
            <button
              className={viewMode === 'masonry' ? 'active' : ''}
              onClick={() => setViewMode('masonry')}
              title="Gạch"
            >
              📐
            </button>
          </div>
        </div>
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => setSelectedCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="gallery-stats">
        <div className="stat-item">
          <span className="stat-number">{filteredImages.length}</span>
          <span className="stat-label">Hình ảnh</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{categories.length - 1}</span>
          <span className="stat-label">Danh mục</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{visibleCount}</span>
          <span className="stat-label">Đang hiển thị</span>
        </div>
      </div>

      {viewMode === 'grid' && renderGridView()}
      {viewMode === 'timeline' && renderTimelineView()}
      {viewMode === 'masonry' && renderMasonryView()}

      <ViewImageComponents
        isOpen={lightboxOpen}
        currentIndex={currentIndex}
        images={filteredImages}
        onClose={closeLightbox}
        onPrevious={prevImage}
        onNext={nextImage}
      />
    </div>
  );
};

export default GalleryPage;