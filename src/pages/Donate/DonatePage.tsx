import React, { useState } from "react";
import { Heart } from "lucide-react";
import "./DonatePage.css";

const DonatePage: React.FC = () => {

  return (
    <div className="donate-container">
      {/* Animated background particles */}
      <div className="donate-background-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="donate-particle"
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
        className="donate-background-overlay"
        style={{
          backgroundImage: "url('/img/VNScouts.png')",
        }}
      />

      <div className="donate-main-wrapper">
        <div className="donate-content-wrapper">

          {/* Main donation card */}
          <div className="donate-card">
            {/* Header with animated heart */}
            <div className="donate-header">
              <div className="donate-heart-container">
                <Heart className="donate-heart-icon" />
              </div>
              <h1 className="donate-title">
                Ủng hộ toán tụi mình
              </h1>
              <p className="donate-subtitle">
                Mỗi sự đóng góp của bạn đều có ý nghĩa đặc biệt với chúng mình
              </p>

            </div>
            <img src="/img/donate.jpg" alt="Donate" className="donate-image" />
            <p className="donate-subtitle">
              Khi chuyển khoản hãy ghi rõ nội dung và tên của bạn ("Ủng hộ toán - Nguyễn Văn A") để tụi mình biết nhé!
            </p>
          </div>
          {/* Footer message */}
          <div className="donate-footer">
            <p className="donate-footer-text">
              Cảm ơn bạn đã tin tưởng và ủng hộ chúng mình! 🙏
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
