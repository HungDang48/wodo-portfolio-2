import React, { useEffect, useRef, useState } from 'react';
import ViewImageComponents from './ImageViewComponent';
import './GalleryPage.css';

interface ImageItem {
  src: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
}

const imageData: ImageItem[] = [
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout1.png",
    title: "Thủ công tô màu",
    description: "Các bạn nhỏ tham gia hoạt động thủ công, khám phá sự sáng tạo của bản thân",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout2.png",
    title: "Thủ công gấp giấy",
    description: "Các em cùng nhau tham gia hoạt động thủ công gấp giấy, rèn luyện sự khéo léo và sáng tạo",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "gấp giấy"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout3.png",
    title: "Thủ công gấp giấy",
    description: "Hướng dẫn các em nhỏ cách gấp giấy thành những hình thú đáng yêu sau khi tô màu",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout4.png",
    title: "Thủ công gấp giấy",
    description: "Hướng dẫn các em nhỏ cách gấp giấy thành những hình thú đáng yêu sau khi tô màu",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout5.png",
    title: "Thu lại giấy tô màu",
    description: "Hướng dẫn các em nhỏ cách thu lại giấy tô màu sau khi sử dụng",
    category: "sinh-hoat",
    tags: ["tái chế", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout6.png",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout7.jpg",
    title: "Giới thiệu về hướng đạo",
    description: "Các em nhỏ được giới thiệu về tổ chức hướng đạo và các hoạt động của hải ly",
    category: "sinh-hoat",
    tags: ["hướng đạo", "giới thiệu", "tổ chức"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout9.png",
    title: "Giới thiệu về hướng đạo",
    description: "Các em nhỏ được giới thiệu về tổ chức hướng đạo và các hoạt động của hải ly",
    category: "sinh-hoat",
    tags: ["hướng đạo", "giới thiệu", "tổ chức"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout10.png",
    title: "Thủ công tô màu",
    description: "Hải ly sau khi tô màu các nhân vật trong câu chuyện rừng xanh",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tô màu"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout11.png",
    title: "Thủ công tô màu",
    description: "Giới thiệu về các nhân vật trong câu chuyện rừng xanh và hướng dẫn các em tô màu",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tô màu", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout12.png",
    title: "Thủ công tô màu",
    description: "Giới thiệu về các nhân vật trong câu chuyện rừng xanh và hướng dẫn các em tô màu",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tô màu", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout13.png",
    title: "Cộng đồng và chia sẻ",
    description: "Phát bánh kẹo cho các em hải ly hoạt động tốt và sinh hoạt tích cực",
    category: "sinh-hoat",
    tags: ["cộng đồng", "chia sẻ", "phát thưởng"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout14.png",
    title: "Hướng dẫn làm kính mặt trời",
    description: "Hướng dẫn các em nhỏ cách làm kính mặt trời",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout15.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout16.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout17.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout18.jpg",
    title: "Thủ công tô màu",
    description: "Các bạn nhỏ tham gia hoạt động thủ công, khám phá sự sáng tạo của bản thân",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout19.jpg",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",  
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout20.jpg",
    title: "Thủ công làm máy bay tái chế",
    description: "Hướng dẫn các em nhỏ cách làm máy bay tái chế từ các vật dụng tái chế",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tái chế", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout21.jpg",
    title: "Thủ công tô màu",
    description: "Giới thiệu về các nhân vật trong câu chuyện rừng xanh và hướng dẫn các em tô màu",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tô màu", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout22.jpg",
    title: "Thủ công tô màu",
    description: "Giới thiệu về các nhân vật trong câu chuyện rừng xanh và hướng dẫn các em tô màu",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tô màu", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout31.jpg",
    title: "Thủ công tô màu",
    description: "Các bạn nhỏ tham gia hoạt động thủ công, khám phá sự sáng tạo của bản thân",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout32.jpg",
    title: "Thủ công tô màu",
    description: "Các bạn nhỏ tham gia hoạt động thủ công, khám phá sự sáng tạo của bản thân",
    category: "sinh-hoat",
    tags: ["thủ công", "hoạt động", "tô màu", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout33.png",
    title: "Chơi đùa cùng nhau",
    description: "Các em nhỏ cách chơi đùa và tương tác với các cộng tác viên để tạo ra những khoảnh khắc vui vẻ",  
    category: "sinh-hoat",
    tags: ["vui chơi", "hoạt động", "tập thể"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout23.jpg",
    title: "Gian hàng trò chơi",
    description: "Gian hàng trò chơi trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout34.jpg",
    title: "Văn nghệ trung thu",
    description: "Mở đầu chương trình văn nghệ trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["văn nghệ"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout24.jpg",
    title: "Văn nghệ trung thu",
    description: "Mở đầu chương trình văn nghệ trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["văn nghệ"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout25.jpg",
    title: "Gian hàng trò chơi",
    description: "Gian hàng trò chơi trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout26.jpg",
    title: "Gian hàng trò chơi",
    description: "Gian hàng trò chơi trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout27.jpg",
    title: "Gian hàng trò chơi",
    description: "Gian hàng trò chơi trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout28.jpg",
    title: "Gian hàng ẩm thực",
    description: "Gian hàng ẩm thực trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["ẩm thực"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout29.jpg",
    title: "Gian hàng ẩm thực",
    description: "Gian hàng ẩm thực trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["ẩm thực"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout30.jpg",
    title: "Văn nghệ trung thu",
    description: "Kịch trung thu chị hằng chú cuội trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["văn nghệ"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout35.jpg",
    title: "Gian hàng ẩm thực",
    description: "Gian hàng ẩm thực trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["ẩm thực"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout36.jpg",
    title: "Gian hàng trò chơi",
    description: "Gian hàng trò chơi trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout37.jpg",
    title: "Gian hàng trò chơi",
    description: "Gian hàng trò chơi trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout38.jpg",
    title: "Gian hàng trò chơi",
    description: "Gian hàng trò chơi trong sự kiện Hội Vui Trăng",
    category: "hoi-vui-trang",
    tags: ["hoạt động"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout39.jpg",
    title: "Hoạt động vẽ tường",
    description: "Hoạt động sơn và trang trí lại tường ở mái ấm của các tráng sinh",
    category: "don-dep",
    tags: ["trang trí"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout40.jpg",
    title: "Sinh hoạt chung",
    description: "Sinh hoạt chung giữa các bạn trong mái ấm và các bạn tráng sinh",
    category: "don-dep",
    tags: ["sinh hoạt"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout40.jpg",
    title: "Chuyên đề",
    description: "Chuyên đề bạo lực của các bạn tráng sinh",
    category: "don-dep",
    tags: ["chuyên đề"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout41.jpg",
    title: "Hoạt động vẽ tường",
    description: "Hoạt động sơn và trang trí lại tường ở mái ấm của các tráng sinh",
    category: "don-dep",
    tags: ["trang trí"]
  },
  {
    src: process.env.PUBLIC_URL + "/wodo-img/scout43.jpg",
    title: "Vớt bánh chưng",
    description: "Các em vớt bánh chưng sau khi đã nấu",
    category: "nau-banh-chung",
    tags: ["nấu bánh chưng"]
  },
];


const categories = [
  { id: 'all', name: 'Tất cả', icon: '🌟', color: '#667eea' },
  { id: 'sinh-hoat', name: 'Sinh hoạt', icon: '👥', color: '#f093fb' },
  { id: 'hoi-vui-trang', name: 'Hội Vui Trăng', icon: '🌙', color: '#4facfe' },
  { id: 'nau-banh-chung', name: 'Nấu Bánh Chưng', icon: '🔥', color: '#43e97b' },
  { id: 'don-dep', name: 'Dọn Nhà Đón Tết', icon: '🧹', color: '#fa709a' }
];

const GalleryPage: React.FC = () => {
  const [visibleCount, setVisibleCount] = useState(12);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const [isLiked, setIsLiked] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Lọc ảnh theo category và search
  const filteredImages = imageData.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Reset visibleCount khi thay đổi filters
  useEffect(() => {
    setVisibleCount(12);
  }, [selectedCategory, searchQuery]);

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

  const loadMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + 12, filteredImages.length));
  };

  const renderGridView = () => (
    <div className="gallery-grid">
      {filteredImages.slice(0, visibleCount).map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="gallery-card"
          onClick={() => openLightbox(index)}
        >
          <div className="card-image-wrapper">
            <img
              src={image.src}
              alt={image.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const wrapper = target.closest('.card-image-wrapper');
                if (wrapper) {
                  wrapper.innerHTML = `<div class="image-error"><span>📷</span><p>Không thể tải ảnh</p></div>`;
                }
              }}
            />
            <button
              className={`like-button ${isLiked.has(index) ? 'liked' : ''}`}
              onClick={(e) => toggleLike(index, e)}
              aria-label="Yêu thích"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <div className="card-overlay">
              <div className="overlay-content">
                <h3 className="card-title">{image.title}</h3>
                <p className="card-description">{image.description}</p>
                <div className="card-tags">
                  {image.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="tag">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMasonryView = () => (
    <div className="gallery-masonry">
      {filteredImages.slice(0, visibleCount).map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className="masonry-card"
          onClick={() => openLightbox(index)}
        >
          <div className="masonry-image-wrapper">
            <img
              src={image.src}
              alt={image.title}
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const wrapper = target.closest('.masonry-image-wrapper');
                if (wrapper) {
                  wrapper.innerHTML = `<div class="image-error"><span>📷</span><p>Không thể tải ảnh</p></div>`;
                }
              }}
            />
            <button
              className={`like-button ${isLiked.has(index) ? 'liked' : ''}`}
              onClick={(e) => toggleLike(index, e)}
              aria-label="Yêu thích"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </button>
            <div className="masonry-info">
              <h4>{image.title}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="gallery-page" ref={containerRef}>
      {/* Hero Section */}
      <div className="gallery-hero">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-icon">📸</span>
            Thư viện hình ảnh mái ấm
          </h1>
          <p className="hero-subtitle">
            Những khoảnh khắc đẹp và ý nghĩa trong hành trình chung
          </p>
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="gallery-toolbar">
        <div className="search-wrapper">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tên, mô tả hoặc tag..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="category-section">
        <div className="category-chips">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-chip btn-default ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="chip-icon">{category.icon}</span>
              <span className="chip-label">{category.name}</span>
              {category.id !== 'all' && (
                <span className="chip-count">
                  {imageData.filter(img => img.category === category.id).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Results Info */}
      <div className="results-info">
        <div className="info-left">
          <span className="results-count">
            {filteredImages.length > 0 ? (
              <>
                Hiển thị <strong>{Math.min(visibleCount, filteredImages.length)}</strong> trong tổng số <strong>{filteredImages.length}</strong> hình ảnh
              </>
            ) : (
              <>Không tìm thấy hình ảnh nào</>
            )}
          </span>
        </div>
        {isLiked.size > 0 && (
          <div className="info-right">
            <span className="liked-count">
              ❤️ {isLiked.size} yêu thích
            </span>
          </div>
        )}
      </div>

      {/* Gallery Content */}
      {filteredImages.length > 0 ? (
        <>
          {viewMode === 'grid' && renderGridView()}
          {viewMode === 'masonry' && renderMasonryView()}

          {/* Load More Button */}
          {visibleCount < filteredImages.length && (
            <div className="load-more-section">
              <button className="load-more-button" onClick={loadMoreImages}>
                <span>Xem thêm</span>
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3>Không tìm thấy kết quả</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác</p>
          <button 
            className="reset-button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* Lightbox */}
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