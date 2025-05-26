import React, { useState } from "react";
import "./DonatePage.css";

const DonatePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/momo-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.payUrl) {
        window.location.href = data.payUrl; // Chuyển hướng sang trang thanh toán Momo
      }
    } catch (err) {
      alert("Lỗi kết nối server.");
    }
  };

  return (
    <div className="donate-container" style={{
      backgroundImage: "url('/img/VNScouts.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
    }}>
      <div className="donate-overlay">
        <h1 className="donate-title">Ủng hộ tác giả 💖</h1>

        <form className="donate-form" onSubmit={handleSubmit}>
          <label className="donate-label">
            Tên của bạn:
            <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Nhập tên của bạn" className="donate-input" />
          </label>

          <label className="donate-label">
            Gmail:
            <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Nhập email của bạn" className="donate-input" />
          </label>

          <label className="donate-label">
            Số tiền donate (VNĐ):
            <input name="amount" value={formData.amount} onChange={handleChange} type="number" placeholder="Ví dụ: 50000" className="donate-input" />
          </label>

          <button type="submit" className="donate-button">Gửi donate</button>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;
