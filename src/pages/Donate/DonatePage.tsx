import React, { useState } from "react";
import { Heart, Mail, User, DollarSign, CheckCircle, AlertCircle } from "lucide-react";
import "./DonatePage.css";

const DonatePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{type: 'success' | 'error' | null, message: string}>({
    type: null,
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: null, message: "" }), 5000);
  };

  const handleDonate = async () => {
    if (!formData.name || !formData.email || !formData.amount) {
      showNotification('error', 'Vui lòng điền đầy đủ thông tin');
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const res = await fetch("https://huwgdang.app.n8n.cloud/webhook/692ab9e2-1d44-400b-aaee-6a08e5c83853", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        });
      if (res.ok) {
        showNotification('success', "Cảm ơn bạn đã ủng hộ! Vui lòng check mail để xác nhận");
        setFormData({ name: "", email: "", amount: "" });
      } else {
        showNotification('error', "Gửi thư thất bại. Vui lòng thử lại.");
      }
    } catch (err) {
      showNotification('error', "Lỗi kết nối đến server.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const quickAmounts = [50000, 100000, 200000, 500000];

  const handleQuickAmountClick = (amount: number) => {
    setFormData({...formData, amount: amount.toString()});
  };

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
          {/* Notification */}
          {notification.type && (
            <div className={`donate-notification ${notification.type}`}>
              <div className="donate-notification-content">
                {notification.type === 'success' ? (
                  <CheckCircle className={`donate-notification-icon ${notification.type}`} />
                ) : (
                  <AlertCircle className={`donate-notification-icon ${notification.type}`} />
                )}
                <span className="donate-notification-text">{notification.message}</span>
              </div>
            </div>
          )}

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

            <div className="donate-form">
              {/* Name input */}
              <div className="donate-form-group">
                <label className="donate-label">
                  Tên của bạn
                </label>
                <div className="donate-input-container">
                  <User className="donate-input-icon" />
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Nhập tên của bạn"
                    className="donate-input"
                    required
                  />
                </div>
              </div>

              {/* Email input */}
              <div className="donate-form-group">
                <label className="donate-label">
                  Email
                </label>
                <div className="donate-input-container">
                  <Mail className="donate-input-icon" />
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Nhập email của bạn"
                    className="donate-input"
                    required
                  />
                </div>
              </div>

              {/* Quick amount selection */}
              <div>
                <label className="donate-label">
                  Chọn nhanh số tiền
                </label>
                <div className="donate-quick-amounts">
                  {quickAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleQuickAmountClick(amount)}
                      className={`donate-quick-amount ${
                        formData.amount === amount.toString() ? 'active' : 'inactive'
                      }`}
                    >
                      {amount.toLocaleString('vi-VN')} ₫
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount input */}
              <div className="donate-form-group">
                <label className="donate-label">
                  Hoặc nhập số tiền tùy chỉnh (VNĐ)
                </label>
                <div className="donate-input-container">
                  <DollarSign className="donate-input-icon" />
                  <input
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    type="number"
                    placeholder="Ví dụ: 50000"
                    className="donate-input"
                    required
                  />
                </div>
              </div>

              {/* Submit button */}
              <button
                onClick={handleDonate}
                disabled={isSubmitting}
                className="donate-submit"
              >
                {isSubmitting ? (
                  <>
                    <div className="donate-spinner" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Heart className="donate-submit-icon" />
                    Gửi donate
                  </>
                )}
              </button>
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
    </div>
  );
};

export default DonatePage;
