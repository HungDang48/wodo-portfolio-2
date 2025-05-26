import React from "react";
import './Benefit.css'
const Benefit: React.FC = () => {
  return (
    <section className="gallery-section">
       
      <div className="content-wrapper">
        <div className="text-content">
          <span className="badge">LỢI ÍCH CỦA PHONG TRÀO HƯỚNG ĐẠO</span>
          <h2 className="heading">
            Phong Trào Đem Lại
            <br />
            Lợi Ích Gì?
          </h2>
          <p className="description">
            Chúng tôi tin rằng mỗi ngày là cuộc phiêu lưu để giúp ta rèn luyện,
            khám phá thêm một chút về bản thân. Rồi từ đó giúp xây dựng cho giới
            trẻ nền tảng của sự tự tin, khiêm tốn, lòng trắc ẩn, trở thành người
            giúp ích cho cuộc đời với lý tưởng cao đẹp.
          </p>
          <button className="join-button">HƯỚNG DẪN GIA NHẬP PHONG TRÀO</button>
        </div>

        <div className="card card-1">
          <img
            alt="Two boys walking in a field carrying rope and wearing scout uniforms"
            height={300}
            src="https://storage.googleapis.com/a1aa/image/1721c0db-4b9d-418a-226d-15952d39e2c1.jpg"
            width={400}
          />
          <div className="card-content card-content-1">
            <h3>THIÊN NHIÊN</h3>
            <p>
              Giúp các em hòa nhập thiên nhiên học dựng lều, nấu nướng, thoát
              hiểm...
            </p>
          </div>
        </div>

        <div className="card card-2">
          <img
            alt="Group of young people walking outdoors in scout uniforms"
            height={300}
            src="https://storage.googleapis.com/a1aa/image/e2d9815a-bd64-4cc0-40bb-167250ad5423.jpg"
            width={400}
          />
          <div className="card-content card-content-2">
            <h3>PHÁT TRIỂN</h3>
            <p>
              Giúp phát triển tư duy, thể chất và lý tưởng cao đẹp,... thành người
              có ích cho cộng đồng.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefit;
