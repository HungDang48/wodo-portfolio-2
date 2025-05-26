import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
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
  const [members, setMembers] = useState<Member[]>([]);
  const navigate = useNavigate();
  const animatedRefs = useRef<HTMLDivElement[]>([]);

  // Lấy dữ liệu từ API
  useEffect(() => {
    fetch("https://wodo-portfolio-backend-production.up.railway.app/User")
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  // Tạo animation khi scroll tới card
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // chỉ chạy 1 lần
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "0px 0px -25% 0px",
      }
    );

    animatedRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect(); // Cleanup
  }, [members]);

  return (
    <div className="about-container">
      <div className="box">
        <h1 className="about-title">THÀNH VIÊN TEAM WODO</h1>
        <div className="cards-container">
          {members.map((member, index) => (
            <div
              key={member.id}
              className="member-card"
              style={{ animationDelay: `${index * 0.2}s` }}
              ref={(el) => {
                if (el) animatedRefs.current[index] = el;
              }}
            >
              <img src={member.avatar} alt={member.name} className="member-image" />
              <h2 className="member-name">
                {member.name} <span className="unit">({member.unit})</span>
              </h2>
              <p className="member-role">{member.role}</p>
              <p className="member-personality">"{member.personality}"</p>

              {/* Overlay */}
              <div className="card-overlay">
                <p className="overlay-personality">"{member.personality}"</p>
                <button
                  className="overlay-button"
                  // onClick={() => navigate(`/MoreAbout/${member.id}`)}
                >
                  Tìm hiểu thêm
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
