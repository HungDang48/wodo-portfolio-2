import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import MobileHamburgerButton from './MobileHamburgerButton';

// Component Header chính
const Header: React.FC = () => {
  // Trạng thái cho menu di động (đang mở hay đóng)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Trạng thái cho hiệu ứng scrolled (có scroll xuống hay không)
  const [isScrolled, setIsScrolled] = useState(false);
  // Trạng thái kiểm soát ẩn/hiện header khi scroll
  const [isVisible, setIsVisible] = useState(true);
  // Trạng thái loading cho transitions
  const [isLoading, setIsLoading] = useState(false);

  // Ref để tham chiếu đến menu di động
  const menuRef = useRef<HTMLElement | null>(null);
  // Ref để tham chiếu đến phần header
  const headerRef = useRef<HTMLElement | null>(null);
  // Ref cho overlay
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Refs giúp scroll handler không bị re-create và tránh re-render không cần thiết
  const isMenuOpenRef = useRef(isMenuOpen);
  const isScrolledRef = useRef(isScrolled);
  const isVisibleRef = useRef(isVisible);
  const lastScrollYRef = useRef(0);

  // Hook để lấy thông tin route hiện tại
  const location = useLocation();

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    isScrolledRef.current = isScrolled;
  }, [isScrolled]);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  // Toggle mở/đóng menu với hiệu ứng mượt mà
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => {
      const newState = !prev;

      // Thêm hiệu ứng rung nhẹ nếu hỗ trợ
      if ('vibrate' in navigator) {
        navigator.vibrate(30);
      }

      // Xử lý body scroll và focus management
      if (newState) {
        setOpenDropdown(null);
        document.body.style.overflow = 'hidden';
        // Focus vào menu sau khi mở
        setTimeout(() => {
          const firstFocusableElement = menuRef.current?.querySelector('button, a') as HTMLElement;
          firstFocusableElement?.focus();
        }, 100);
      } else {
        setOpenDropdown(null);
        document.body.style.overflow = '';
        // Focus trở lại nút menu
        setTimeout(() => {
          const menuToggle = document.querySelector('.menu-toggle') as HTMLElement;
          menuToggle?.focus();
        }, 100);
      }

      return newState;
    });
  }, []);

  // Đóng menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    document.body.style.overflow = '';
    document.body.style.filter = '';

    // Focus trở lại nút menu khi đóng
    setTimeout(() => {
      const menuToggle = document.querySelector('.menu-toggle') as HTMLElement;
      menuToggle?.focus();
    }, 100);
  }, []);

  // Theo dõi scroll để thay đổi isScrolled, isVisible
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY || 0;

        const isScrolledNext = currentScrollY > 10;
        if (isScrolledNext !== isScrolledRef.current) {
          isScrolledRef.current = isScrolledNext;
          setIsScrolled(isScrolledNext);
        }

        // Nếu người dùng cuộn xuống và vượt qua 100px thì ẩn header (trừ khi menu đang mở)
        if (!isMenuOpenRef.current) {
          const shouldHide = currentScrollY > lastScrollYRef.current && currentScrollY > 100;
          const isVisibleNext = !shouldHide;
          if (isVisibleNext !== isVisibleRef.current) {
            isVisibleRef.current = isVisibleNext;
            setIsVisible(isVisibleNext);
          }
        }

        lastScrollYRef.current = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Dọn dẹp khi unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tự động đóng menu khi route thay đổi
  const lastPathnameRef = useRef(location.pathname);
  useEffect(() => {
    const pathnameChanged = lastPathnameRef.current !== location.pathname;
    const menuWasOpen = isMenuOpenRef.current;

    // Chỉ đóng menu khi route thay đổi (tránh việc bấm hamburger xong bị tự đóng ngay)
    if (pathnameChanged && menuWasOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        closeMenu();
        setIsLoading(false);
      }, 150);
      return () => clearTimeout(timer);
    }

    lastPathnameRef.current = location.pathname;
  }, [location.pathname, closeMenu]);

  // Xử lý click outside để đóng menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      // Kiểm tra nếu click vào overlay thì đóng menu
      if (overlayRef.current && overlayRef.current.contains(target)) {
        closeMenu();
        return;
      }

      // Kiểm tra nếu click bên ngoài menu và header
      if (
        isMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(target) &&
        headerRef.current &&
        !headerRef.current.contains(target)
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
      document.body.style.filter = ' ';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (!isMenuOpen) {
        document.body.style.overflow = '';
        document.body.style.filter = '';
      }
    };
  }, [isMenuOpen, closeMenu]);

  // Hỗ trợ điều hướng bằng phím (accessibility)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        event.preventDefault();
        closeMenu();
        return;
      }

      // Xử lý vòng lặp focus trong menu khi nhấn Tab
      if (event.key === 'Tab' && isMenuOpen && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
  }, [isMenuOpen, closeMenu]);

  // Danh sách điều hướng với enhanced descriptions
  const navItems = [
    {
      to: '/AboutUs',
      icon: 'fa-info-circle',
      label: 'Về chúng tôi',
      description: 'Câu chuyện và sứ mệnh của WODO'
    },
    {
      icon: 'fa-newspaper-o',
      label: 'Dự án',
      description: 'Những dự án tạo tác động tích cực',
      children: [
        { to: '/ProjectPage', label: 'Thông tin dự án' },
        { to: '/GalleryPage', label: 'Hình ảnh' },
        // { to: '/Activities', label: 'Các hoạt động' },
        { to: '/ContactPage', label: 'Thông tin liên hệ' },
      ]
    },
    {
      to: '/DonatePage',
      icon: 'fa-credit-card-alt',
      label: 'Donate',
      description: 'Đồng hành cùng chúng tôi',
    },
    {
      to: '/Products',
      icon: 'fa-product-hunt',
      label: 'Sản phẩm',
      description: 'Khám phá các sản phẩm của chúng tôi',
    },
  ];


  // Nút "Vì một thế giới tốt đẹp hơn" với enhanced UX
  const handleWorldButtonClick = () => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 30, 50]);
    }

    // Smooth scroll với enhanced behavior
    const targetSection = document.getElementById('hero-section');
    if (targetSection) {
      // Thêm hiệu ứng loading tạm thời
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 800);

      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  // Enhanced navigation click handler
  const handleNavClick = (to: string) => {
    // Haptic feedback
    if ('vibrate' in navigator) {
      navigator.vibrate(25);
    }

    // Visual feedback cho page transitions
    if (location.pathname !== to) {
      setIsLoading(true);
      document.body.style.opacity = '0.95';
      setTimeout(() => {
        document.body.style.opacity = '1';
        setIsLoading(false);
      }, 300);
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`header-user ${isMenuOpen ? 'menu-open' : ''} ${isScrolled ? 'scrolled' : ''} ${isVisible ? '' : 'hidden'} ${isLoading ? 'loading' : ''}`}
        role="banner"
      >
        <div className="header-user-container">
          {/* Logo và nút menu */}
          <div className="left-group">
            <Link
              to="/"
              className="logo1"
              aria-label="Trang chủ WODO - Vì một thế giới tốt đẹp hơn"
              onClick={() => handleNavClick('/')}
            >
              <span>WODO</span>
            </Link>

            <MobileHamburgerButton
              isMenuOpen={isMenuOpen}
              onToggle={toggleMenu}
              ariaControls="mobile-nav"
            />
          </div>

          {/* Navigation trên desktop */}
          <nav className="nav" role="navigation" aria-label="Menu chính">
            {navItems.map((item, index) => (
              item.children ? (
                <div className="nav-dropdown" key={item.label}>
                  <button className="dropdown-toggle" aria-haspopup="true" aria-expanded="false">
                    <i className={`fa ${item.icon}`} aria-hidden="true"></i>
                    <span>{item.label}</span>
                  </button>
                  <div className="dropdown-menu">
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className={location.pathname === child.to ? 'active' : ''}
                        onClick={() => handleNavClick(child.to)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className={location.pathname === item.to ? 'active' : ''}
                  aria-current={location.pathname === item.to ? 'page' : undefined}
                  title={item.description}
                  onClick={() => handleNavClick(item.to)}
                  style={{
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <i className={`fa ${item.icon}`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </Link>
              )
            ))}

          </nav>

          {/* Nút chính kêu gọi hành động */}
          <button
            className="world-button"
            type="button"
            onClick={handleWorldButtonClick}
            aria-label="Vì một thế giới tốt đẹp hơn - Tìm hiểu thêm về sứ mệnh của chúng tôi"
            title="Khám phá sứ mệnh của WODO"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                <span>Đang tải...</span>
              </>
            ) : (
              <span>Vì một thế giới tốt đẹp hơn</span>
            )}
          </button>
        </div>
      </header>

      {/* Lớp phủ mờ khi mở menu trên mobile */}
      <div
        ref={overlayRef}
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
        </div>

        <div className="mobile-nav-content">
          {navItems.map((item, index) => (
            item.children ? (
              <div key={item.label} className="mobile-dropdown">
                <button
                  className="mobile-dropdown-toggle"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={openDropdown === item.label}
                  onClick={() => {
                    // Use functional update to avoid stale `openDropdown` in rapid taps
                    setOpenDropdown((prev) => (prev === item.label ? null : item.label));
                  }}
                >
                  <i className={`fa ${item.icon}`} aria-hidden="true"></i>
                  <span>{item.label}</span>
                </button>

                <div
                  className={`mobile-dropdown-menu ${openDropdown === item.label ? 'active' : ''}`}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      onClick={() => {
                        handleNavClick(child.to);
                        closeMenu();
                      }}
                      className={location.pathname === child.to ? 'active' : ''}
                      tabIndex={isMenuOpen ? 0 : -1}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className={location.pathname === item.to ? 'active' : ''}
                aria-current={location.pathname === item.to ? 'page' : undefined}
                title={item.description}
                onClick={() => handleNavClick(item.to)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                }}
              >
                <i className={`fa ${item.icon}`} aria-hidden="true"></i>
                <span>{item.label}</span>
              </Link>
            )
          ))}

        </div>

        {/* Footer của mobile menu */}
        <div className="mobile-nav-footer">
          <button
            className="mobile-world-button"
            onClick={() => {
              closeMenu();
              handleWorldButtonClick();
            }}
            tabIndex={isMenuOpen ? 0 : -1}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                <span>Đang tải...</span>
              </>
            ) : (
              <>
                <i className="fa fa-globe" aria-hidden="true"></i>
                <span>Vì một thế giới tốt đẹp hơn</span>
              </>
            )}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Header;