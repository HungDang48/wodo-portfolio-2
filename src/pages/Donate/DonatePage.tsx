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

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("https://wodo-thanks-letter.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Cảm ơn bạn đã ủng hộ! vui lòng check mail để xác nhận");
        setFormData({ name: "", email: "", amount: "" }); // Reset form
      } else {
        alert("❌ Gửi thư thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      alert("❌ Lỗi kết nối đến server.");
      console.error(err);
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
        <h1 className="donate-title">Ủng hộ toán tụi mình 💖</h1>

        <form className="donate-form" onSubmit={handleDonate}>
          <label className="donate-label">
            Tên của bạn:
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Nhập tên của bạn"
              className="donate-input"
              required
            />
          </label>

          <label className="donate-label">
            Gmail:
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Nhập email của bạn"
              className="donate-input"
              required
            />
          </label>

          <label className="donate-label">
            Số tiền donate (VNĐ):
            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              type="number"
              placeholder="Ví dụ: 50000"
              className="donate-input"
              required
            />
          </label>

          <button type="submit" className="donate-button">
            Gửi donate
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonatePage;
