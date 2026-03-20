import React from "react";
import "./AboutUs.css";

interface Member {
  id: number;
  name: string;
  role: string;
  personality: string;
  avatar: string;
}

const members: Member[] = [
  {
    id: 1,
    name: "Khánh Ngân",
    role: "Toán trưởng",
    personality: "Nhiệt huyết, sáng tạo, trách nhiệm",
    avatar: "/img/khanhngan.png",
  },
  {
    id: 2,
    name: "Tường Vy",
    role: "Thành viên",
    personality: "Vui vẻ, hòa đồng, nhiệt tình",
    avatar: "/img/tuongvy.png",
  },
  {
    id: 3,
    name: "Việt Hưng",
    role: "Thành viên",
    personality: "Sáng tạo, linh hoạt, giao tiếp tốt",
    avatar: "/img/viethung.png",
  },
  {
    id: 4,
    name: "Quang Khánh",
    role: "Thành viên",
    personality: "Tỉ mỉ, tinh tế, thân thiện",
    avatar: "/img/quangkhanh.png",
  },
  {
    id: 5,
    name: "Hoàng Nguyên",
    role: "Thành viên",
    personality: "Năng động, trách nhiệm, sáng tạo",
    avatar: "/img/hoangnguyen.png",
  },
  {
    id: 6,
    name: "Bảo Ngọc",
    role: "Thành viên",
    personality: "Chăm chỉ, logic, hỗ trợ tốt",
    avatar: "/img/baongoc.png",
  },
];

const AboutUs = () => {
  return (
    <section className="about-page">
      <div className="about-shell">
        <div className="about-hero">
          <span className="about-label">WODO TEAM</span>
          <h1 className="about-title">Thành viên Toán WODO</h1>
          <p className="about-subtitle">
            Một tập thể trẻ trung, sáng tạo và luôn sẵn sàng đồng hành cùng nhau
            trong học tập, hoạt động và phát triển kỹ năng.
          </p>
        </div>

        <div className="team-grid">
          {members.map((member) => (
            <article className="team-card" key={member.id}>
              <div className="team-card-glow" />

              <div className="team-card-image-wrap">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="team-card-image"
                />
              </div>

              <div className="team-card-content">
                <span className="team-badge">{member.role}</span>
                <h2 className="team-card-name">{member.name}</h2>
                <p className="team-card-role">Toán WODO</p>
                <p className="team-card-personality">
                  “{member.personality}”
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUs;