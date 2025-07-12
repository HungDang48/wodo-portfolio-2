import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { to: '/AboutUs', label: 'Về chúng tôi', icon: 'fa-info-circle' },
    { to: '/ProjectPage', label: 'Dự án', icon: 'fa-newspaper-o' },
    { to: '/DonatePage', label: 'Donate', icon: 'fa-credit-card-alt' },
    { to: '/Products', label: 'Sản phẩm', icon: 'fa-product-hunt' },
  ];

  const socialLinks = [
    {
      href: 'https://www.facebook.com/profile.php?id=61576275466534&sk=about',
      label: 'Facebook',
      icon: 'fa fa-facebook',
      color: '#1877F2',
      isBrand: true,
    },
    {
      href: 'mailto:wodobwc2@gmail.com',
      label: 'Email',
      icon: 'fa fa-envelope',
      color: '#EA4335',
      isBrand: false,
    },
  ];


  const organizationInfo = {
    name: 'WODO Portfolio',
    fullName: 'Hướng Đạo Việt Nam - Pathfinder Scouts Vietnam',
    memberInfo: 'Thành viên thứ 170 của WOSM',
    developer: 'Hưng Đặng, Ngân Nguyễn',
  };

  return (
    <footer className={`footer ${className}`} role="contentinfo">
      <div className="footer-container">
        <div className="footer-main">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo" aria-label="Trang chủ WODO">
              <h2>{organizationInfo.name}</h2>
            </Link>
            <div className="footer-description">
              <p className="organization-name">{organizationInfo.fullName}</p>
              <p className="organization-info">{organizationInfo.memberInfo}</p>
              <p className="footer-mission">
                Xây dựng thế hệ trẻ có trách nhiệm với cộng đồng và môi trường
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Liên kết nhanh</h3>
            <nav className="footer-nav" role="navigation" aria-label="Menu footer">
              {quickLinks.map((link) => (
                <Link key={link.to} to={link.to} className="footer-link">
                  <i className={`fa ${link.icon}`} aria-hidden="true"></i>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="footer-section">
            <h3>Kết nối với chúng tôi</h3>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fa fa-map-marker-alt" aria-hidden="true"></i>
                <span>Việt Nam</span>
              </div>
              <div className="contact-item">
                <i className="fa fa-globe" aria-hidden="true"></i>
                <span>www.wodo.org.vn</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: social.color }}
                >
                  <i className={`${social.isBrand ? 'fab' : 'fas'} ${social.icon}`} aria-hidden="true"></i>
                </a>
              ))}
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>© {currentYear} {organizationInfo.name}</p>
              <span className="separator">•</span>
              <p>Developed with ❤️ by <strong>{organizationInfo.developer}</strong></p>
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">
                Chính sách bảo mật
              </Link>
              <Link to="/terms" className="footer-bottom-link">
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative */}
        <div className="footer-decoration" aria-hidden="true">
          <div className="decoration-circle decoration-circle-1"></div>
          <div className="decoration-circle decoration-circle-2"></div>
          <div className="decoration-circle decoration-circle-3"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
