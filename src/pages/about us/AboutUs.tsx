import React, { useState, useEffect } from "react";
import "./AboutUs.css";
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    fetch("https://wodo-portfolio-backend-production.up.railway.app/User")
      .then(response => response.json())
      .then(data => setMembers(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

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
            <p className="member-personality">"{member.personality}"</p>

            {/* Overlay */}
            <div className="card-overlay">
              <p className="overlay-personality">"{member.personality}"</p>
              <button
  className="overlay-button"
  onClick={() => navigate(`/MoreAbout/${member.id}`)}
>
  Tìm hiểu thêm
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
