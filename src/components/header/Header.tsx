import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Đóng menu nếu click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="header-user">
      <div className="header-user-container">
        <div className="left-group">
          <div className="logo">
            <Link to="/">WODO</Link>
          </div>
          <button className="menu-toggle" onClick={toggleMenu}>
            <i className="fa fa-bars"></i>
          </button>
        </div>
        <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/AboutUs">
            <i className="fa fa-info-circle"></i> Về chúng tôi
          </Link>
          <Link to="/">
            <i className="fa fa-project-diagram"></i> Dự án
          </Link>
          <Link to="/DonatePage">
            <i className="fa fa-donate"></i> Donate
          </Link>
          <Link to="/">
            <i className="fa fa-phone"></i> Liên hệ
          </Link>
        </nav>
        <button className="world-button">Vì một thế giới tốt đẹp hơn</button>
      </div>

      {/* Mobile nav */}
      {isMobile && (
        <div
          ref={menuRef}
          className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}
        >
          <Link to="/AboutUs" onClick={() => setIsMenuOpen(false)}>
            <i className="fa fa-info-circle"></i> Về chúng tôi
          </Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <i className="fa fa-project-diagram"></i> Dự án
          </Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <i className="fa fa-donate"></i> Donate
          </Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <i className="fa fa-phone"></i> Liên hệ
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
