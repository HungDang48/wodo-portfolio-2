import React, { useEffect, useRef } from "react";
import "./AboutUs.css";

interface Member {
  id: number;
  name: string;
  unit: string;
  role: string;
  personality: string;
  avatar: string;
}

// Dữ liệu tĩnh cho các thành viên, sắp xếp theo vai trò kim tự tháp
const leader: Member = {
  id: 1,
  name: "Khánh Ngân",
  unit: "Leader",
  role: "Leader",
  personality: "Nhiệt huyết, sáng tạo, trách nhiệm",
  avatar: "/img/khanhngan.png",
};

const deputies: Member[] = [
  {
    id: 2,
    name: "Quang Khánh",
    unit: "Deputy Leader",
    role: "Deputy Leader",
    personality: "Tỉ mỉ, tinh tế, thân thiện",
    avatar: "/img/quangkhanh.png",
  },
  {
    id: 3,
    name: "Hoàng Nguyên",
    unit: "Deputy Leader",
    role: "Deputy Leader",
    personality: "Năng động, trách nhiệm, sáng tạo",
    avatar: "/img/hoangnguyen.png",
  },
];

const members: Member[] = [
  {
    id: 4,
    name: "Việt Hưng",
    unit: "Thành viên",
    role: "Member",
    personality: "Sáng tạo, linh hoạt, giao tiếp tốt",
    avatar: "/img/viethung.png",
  },
  {
    id: 5,
    name: "Bảo Ngọc",
    unit: "Thành viên",
    role: "Member",
    personality: "Chăm chỉ, logic, hỗ trợ tốt",
    avatar: "/img/baongoc.png",
  },
  {
    id: 6,
    name: "Tường Vy",
    unit: "Thành viên",
    role: "Member",
    personality: "Vui vẻ, hòa đồng, nhiệt tình",
    avatar: "/img/tuongvy.png",
  },
];

const AboutUs = () => {
  // Animation không còn cần thiết vì không còn card riêng lẻ
  return (
    <div className="about-container pyramid-layout">
      <div className="box">
        <h1 className="about-title">THÀNH VIÊN TOÁN WODO</h1>
        <div className="pyramid">
          {/* Leader */}
          <div className="pyramid-row leader-row">
            <div className="pyramid-member leader">
              <img src={leader.avatar} alt={leader.name} className="member-image" />
              <h2 className="member-name">{leader.name}</h2>
              <p className="member-role">{leader.unit} - {leader.role}</p>
              <p className="member-personality">"{leader.personality}"</p>
            </div>
          </div>
          {/* Deputies */}
          <div className="pyramid-row deputies-row">
            {deputies.map((member) => (
              <div className="pyramid-member deputy" key={member.id}>
                <img src={member.avatar} alt={member.name} className="member-image" />
                <h2 className="member-name">{member.name}</h2>
                <p className="member-role">{member.unit} - {member.role}</p>
                <p className="member-personality">"{member.personality}"</p>
              </div>
            ))}
          </div>
          {/* Members */}
          <div className="pyramid-row members-row">
            {members.map((member) => (
              <div className="pyramid-member member" key={member.id}>
                <img src={member.avatar} alt={member.name} className="member-image" />
                <h2 className="member-name">{member.name}</h2>
                <p className="member-role">{member.unit} - {member.role}</p>
                <p className="member-personality">"{member.personality}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
