import React, { useState, useEffect } from "react";
import "./AboutUs.css";

// Định nghĩa kiểu cho dữ liệu người dùng
interface Member {
  id: number;
  UserId: number;
  name: string;
  unit: string;
  role: string;
  personality: string;
  avatar: string;
}

const AboutUs = () => {
  const [members, setMembers] = useState<Member[]>([]); // Sử dụng kiểu Member cho state

  useEffect(() => {
    // Gọi API khi component được render
    fetch("https://wodo-portfolio-backend-production.up.railway.app/User")
      .then(response => response.json()) // Chuyển đổi dữ liệu nhận được thành JSON
      .then(data => setMembers(data)) // Lưu dữ liệu vào state
      .catch(error => console.error("Error fetching data:", error)); // Xử lý lỗi
  }, []); // Chạy một lần khi component được mount

  return (
    <div className="about-container">
      <h1 className="about-title">Ban điều hành</h1>
      <div className="cards-container">
        {members.map((member, index) => (
          <div key={index} className="member-card" style={{ animationDelay: `${index * 0.2}s` }}>
            <img src={member.avatar} alt={member.name} className="member-image" />
            <h2 className="member-name">
              {member.name} <span className="unit">({member.unit})</span>
            </h2>
            <p className="member-role">{member.role}</p>
            {/* Hiển thị personality trong card */}
            <p className="member-personality">"{member.personality}"</p>
        
            {/* Overlay */}
            <div className="card-overlay">
              <p className="overlay-personality">"{member.personality}"</p>
              <button className="overlay-button">Tìm hiểu thêm</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
