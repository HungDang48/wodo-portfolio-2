import React from "react";
import { Mail, MessageCircle, Globe, Facebook, Phone } from "lucide-react";
import "./ContactPage.css";

const ContactPage: React.FC = () => {
  return (
    <div className="contact-container">
      {/* Animated background particles */}
      <div className="contact-background-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="contact-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Background overlay */}
      <div
        className="contact-background-overlay"
        style={{
          backgroundImage: "url('/img/VNScouts.png')",
        }}
      />

      <div className="contact-main-wrapper">
        <div className="contact-content-wrapper">
          {/* Main contact card */}
          <div className="contact-card">
            {/* Header with animated icon */}
            <div className="contact-header">
              <div className="contact-icon-container">
                <MessageCircle className="contact-icon" />
              </div>
              <h1 className="contact-title">
                Liên hệ với chúng mình
              </h1>
              <p className="contact-subtitle">
                Quét QR code để kết nối với tụi mình trên các nền tảng khác nhau
              </p>
            </div>

            {/* QR Code Grid */}
            <div className="contact-qr-grid">
              {/* Facebook QR */}
              <div className="contact-qr-item">
                <div className="contact-platform-header">
                  <Facebook className="contact-platform-icon" />
                  <span className="contact-platform-name">Facebook</span>
                </div>
                <img src="/img/wodo_facebook.png" alt="Facebook QR Code" className="contact-qr-image" />
                <p className="contact-qr-description">
                  Theo dõi fanpage để cập nhật tin tức mới nhất và tham gia cộng đồng
                </p>
              </div>

              {/* Website QR */}
              <div className="contact-qr-item">
                <div className="contact-platform-header">
                  <Globe className="contact-platform-icon" />
                  <span className="contact-platform-name">Website</span>
                </div>
                <img src="/img/wodo_website.png" alt="Website QR Code" className="contact-qr-image" />
                <p className="contact-qr-description">
                  Truy cập website chính thức để xem thông tin chi tiết và các hoạt động
                </p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="contact-methods">
              <h3 className="contact-methods-title">
                Thông tin liên lạc khác
              </h3>
              
              <div className="contact-method-item">
                <Mail className="contact-method-icon" />
                <span className="contact-method-text">
                  Email: wodobwc2@gmail.com
                </span>
              </div>
              
              <div className="contact-method-item">
                <Phone className="contact-method-icon" />
                <span className="contact-method-text">
                  Hotline: +84 399 201 545
                </span>
              </div>
              
              <div className="contact-method-item">
                <Globe className="contact-method-icon" />
                <span className="contact-method-text">
                  Website: https://wodo-portfolio.vercel.app/
                </span>
              </div>
            </div>
          </div>

          {/* Footer message */}
          <div className="contact-footer">
            <p className="contact-footer-text">
              Chúng mình luôn sẵn sàng lắng nghe và hỗ trợ bạn! 📱
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;