import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';

// Component Header chính
const Header: React.FC = () => {
  // Trạng thái cho menu di động (đang mở hay đóng)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Trạng thái cho hiệu ứng scrolled (có scroll xuống hay không)
  const [isScrolled, setIsScrolled] = useState(false);
  // Trạng thái kiểm soát ẩn/hiện header khi scroll
  const [isVisible, setIsVisible] = useState(true);
  // Lưu vị trí scroll trước đó
  const [lastScrollY, setLastScrollY] = useState(0);

  // Ref để tham chiếu đến menu di động
  const menuRef = useRef<HTMLDivElement>(null);
  // Ref để tham chiếu đến phần header
  const headerRef = useRef<HTMLElement>(null);

  // Hook để lấy thông tin route hiện tại
  const location = useLocation();

  // Toggle mở/đóng menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Đóng menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Hàm throttle để giới hạn tần suất thực hiện scroll handler
  const throttle = (func: Function, limit: number) => {
    let inThrottle: boolean = false;
    return function (this: any, ...args: any[]) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  // Theo dõi scroll để thay đổi isScrolled, isVisible
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 10); // Thêm class `scrolled` nếu scroll > 10px

      // Nếu người dùng cuộn xuống và vượt qua 100px thì ẩn header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Cập nhật vị trí scroll hiện tại
      setLastScrollY(currentScrollY);
    };

    // Gắn hàm xử lý với throttle
    const throttledScroll = throttle(handleScroll, 10);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Dọn dẹp khi unmount
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [lastScrollY]);

  // Tự động đóng menu khi route thay đổi
  useEffect(() => {
    if (isMenuOpen) {
      const timer = setTimeout(() => {
        setIsMenuOpen(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location, isMenuOpen]);

  // Đóng menu nếu người dùng click bên ngoài menu hoặc header
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !headerRef.current?.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Ngăn cuộn khi menu mở
      document.body.style.filter = 'blur(1px)'; // Hiệu ứng mờ nền
    } else {
      document.body.style.overflow = '';
      document.body.style.filter = '' ;
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
      document.body.style.filter = '';
    };
  }, [isMenuOpen]);

  // Hỗ trợ điều hướng bằng phím Escape và Tab (accessibility)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }

      // Xử lý vòng lặp focus trong menu
      if (event.key === 'Tab' && isMenuOpen) {
        const focusableElements = menuRef.current?.querySelectorAll(
          'a, button, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>;

        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Khi mở menu, tự động focus phần tử đầu tiên
  useEffect(() => {
    if (isMenuOpen) {
      const firstFocusableElement = menuRef.current?.querySelector('a, button') as HTMLElement;
      firstFocusableElement?.focus();
    }
  }, [isMenuOpen]);

  // Danh sách điều hướng
  const navItems = [
    { to: '/AboutUs', icon: 'fa-info-circle', label: 'Về chúng tôi', description: 'Tìm hiểu về WODO' },
    { to: '/Projects', icon: 'fa-project-diagram', label: 'Dự án', description: 'Các dự án của chúng tôi' },
    { to: '/DonatePage', icon: 'fa-donate', label: 'Donate', description: 'Ủng hộ chúng tôi' },
    { to: '/Contact', icon: 'fa-phone', label: 'Liên hệ', description: 'Kết nối với chúng tôi' },
  ];

  // Nút “Vì một thế giới tốt đẹp hơn” scroll đến phần tử #hero-section
  const handleWorldButtonClick = () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50); // Rung nhẹ trên thiết bị hỗ trợ
    }
    const targetSection = document.getElementById('hero-section');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      ref={headerRef}
      className={`header-user ${isScrolled ? 'scrolled' : ''} ${isVisible ? '' : 'hidden'}`}
      role="banner"
    >
      <div className="header-user-container">
        {/* Logo và nút menu */}
        <div className="left-group">
          <Link 
            to="/" 
            className="logo1" 
            aria-label="Trang chủ WODO - Vì một thế giới tốt đẹp hơn"
            onClick={() => {
              if (location.pathname !== '/') {
                document.body.style.opacity = '0.8';
                setTimeout(() => {
                  document.body.style.opacity = '1';
                }, 200);
              }
            }}
          >
            <span>WODO</span>
          </Link>

          <button 
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Đóng menu di động' : 'Mở menu di động'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-haspopup="true"
          >
            <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Navigation trên desktop */}
        <nav className="nav" role="navigation" aria-label="Menu chính">
          {navItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? 'active' : ''}
              aria-current={location.pathname === item.to ? 'page' : undefined}
              title={item.description}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <i className={`fa ${item.icon}`} aria-hidden="true"></i>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Nút chính kêu gọi hành động */}
        <button 
          className="world-button" 
          type="button"
          onClick={handleWorldButtonClick}
          aria-label="Vì một thế giới tốt đẹp hơn - Tìm hiểu thêm về sứ mệnh của chúng tôi"
          title="Khám phá sứ mệnh của WODO"
        >
          <span>Vì một thế giới tốt đẹp hơn</span>
        </button>
      </div>

      {/* Lớp phủ mờ khi mở menu trên mobile */}
      <div 
        className={`mobile-nav-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
        role="presentation"
      />

      {/* Menu di động */}
      <nav
        ref={menuRef}
        id="mobile-nav"
        className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}
        role="navigation"
        aria-label="Menu di động"
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-nav-header">
          <span className="mobile-nav-title">Menu</span>
          <button
            className="mobile-nav-close"
            onClick={closeMenu}
            aria-label="Đóng menu di động"
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <i className="fa fa-times" aria-hidden="true"></i>
          </button>
        </div>

        <div className="mobile-nav-content">
          {navItems.map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className={location.pathname === item.to ? 'active' : ''}
              aria-current={location.pathname === item.to ? 'page' : undefined}
              tabIndex={isMenuOpen ? 0 : -1}
              style={{ animationDelay: `${(index + 1) * 0.05}s` }}
            >
              <i className={`fa ${item.icon}`} aria-hidden="true"></i>
              <div>
                <span className="nav-label">{item.label}</span>
                <small className="nav-description">{item.description}</small>
              </div>
            </Link>
          ))}

          {/* Footer của mobile menu */}
          <div className="mobile-nav-footer">
            <button 
              className="mobile-world-button"
              onClick={() => {
                closeMenu();
                handleWorldButtonClick();
              }}
              tabIndex={isMenuOpen ? 0 : -1}
            >
              <i className="fa fa-globe" aria-hidden="true"></i>
              <span>Vì một thế giới tốt đẹp hơn</span>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
