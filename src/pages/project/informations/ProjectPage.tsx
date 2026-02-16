import React from 'react';
import './ProjectPage.css';

const ProjectPage: React.FC = () => {
  return (
    <div className="project-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="project-badge">WODO - Be Good Do Good</div>
          <h1 className="project-title">Sân Chơi Cầu Vồng</h1>
          <div className="project-meta">
            <div className="meta-item">
              <span className="meta-label">Đơn vị thực hiện:</span>
              <span className="meta-value">Toán Wodo</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Toán trưởng:</span>
              <span className="meta-value">Nguyễn Đình Khánh Ngân</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Trưởng hướng dẫn:</span>
              <span className="meta-value">Trưởng Lê Nguyễn Thanh Trúc</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Thời gian:</span>
              <span className="meta-value">25/03/2025 – 08/02/2026</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Số lượng thành viên Toán:</span>
              <span className="meta-value">7 người</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Số giờ thực hiện dự án:</span>
              <span className="meta-value">1204.5 giờ</span>
            </div>
          </div>
        </div>
      </section>

      {/* Background & Community Issues */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Bối Cảnh & Vấn Đề Cộng Đồng</h2>
        </div>
        <div className="section-content">
          <p className="intro-text">
            Trẻ em tại các mái ấm thiếu môi trường sinh hoạt lành mạnh và ổn định vào cuối tuần. 
            Hoạt động vui chơi – giáo dục chủ yếu mang tính thời điểm, chưa được duy trì thường xuyên.
          </p>
          <div className="info-grid">
            <div className="info-card">
              <h3 className="card-title">Đối tượng bị ảnh hưởng</h3>
              <p>Trẻ em độ tuổi Nhi – Ấu – Thiếu (4–8 tuổi)</p>
              <div className="locations">
                <div className="location-item">📍 Mái Ấm Cha Tịch (Biên Hòa – Đồng Nai)</div>
                <div className="location-item">📍 Mái Ấm Cô Mai (Thuận An – Bình Dương)</div>
              </div>
            </div>
            <div className="info-card highlight">
              <h3 className="card-title">Tính cấp thiết</h3>
              <p>Giai đoạn 4–8 tuổi là thời điểm quan trọng để:</p>
              <ul>
                <li>Hình thành kỹ năng giao tiếp</li>
                <li>Phát triển nhân cách và sự tự tin</li>
                <li>Thiếu sân chơi phù hợp ảnh hưởng trực tiếp đến sự phát triển toàn diện của trẻ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Project Formation Motivation */}
      <section className="content-section alt-bg">
        <div className="section-header">
          <h2 className="section-title">Động Lực Hình Thành Dự Án</h2>
        </div>
        <div className="section-content">
          <p className="intro-text">
            Chúng mình là WODO – những người trẻ từ Trại Thế Giới Tốt Đẹp Hơn lần 2 (Better World Camp 2), 
            đến đây với mong muốn xây dựng một sân chơi tinh thần cho các em nhỏ nơi mái ấm này.
          </p>
          <div className="vision-box">
            <p>
              Không chỉ là nơi vui chơi và sáng tạo, đó sẽ là một không gian an toàn nơi các em có thể 
              vui chơi thông qua các hoạt động thủ công, trò chơi sinh hoạt và nghe về câu chuyện rừng xanh mỗi cuối tuần.
            </p>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <h3 className="card-title">Lý do lựa chọn vấn đề</h3>
              <ul>
                <li>Sân chơi giáo dục lành mạnh cho trẻ em mái ấm</li>
                <li>Hoạt động mang tính đồng hành lâu dài, không chỉ hỗ trợ ngắn hạn</li>
              </ul>
            </div>
            <div className="info-card">
              <h3 className="card-title">Quan sát thực tế</h3>
              <ul>
                <li>Trẻ em ít có cơ hội tham gia sinh hoạt tập thể có định hướng</li>
                <li>Các em thể hiện sự hào hứng rõ rệt khi được tham gia trò chơi và sinh hoạt nhóm</li>
              </ul>
            </div>
            <div className="info-card">
              <h3 className="card-title">Liên hệ giá trị Hướng Đạo</h3>
              <ul>
                <li>Phục vụ cộng đồng</li>
                <li>Giáo dục thông qua trải nghiệm</li>
              </ul>
            </div>
          </div>
          <div className="regions">
            <h3 className="card-title">Khu vực triển khai:</h3>
            <div className="region-tags">
              <span className="region-tag">Biên Hòa</span>
              <span className="region-tag">Bình Dương</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Objectives */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Mục Tiêu Dự Án</h2>
        </div>
        <div className="section-content">
          <div className="objectives-grid">
            <div className="objective-card">
              <div className="objective-icon">📅</div>
              <h3 className="card-title">Duy trì sinh hoạt định kỳ</h3>
              <p>Tổ chức tối thiểu 10 buổi sinh hoạt, mỗi buổi tối thiểu 1 tiếng cuối tuần trong thời gian dự án (6 tháng)</p>
              <p>Mỗi buổi sinh hoạt có nội dung rõ ràng: trò chơi, thủ công, sinh hoạt Hướng Đạo</p>
            </div>
            <div className="objective-card">
              <div className="objective-icon">🌍</div>
              <h3 className="card-title">Mở rộng phạm vi tiếp cận</h3>
              <p>Huy động sự tham gia của Hướng đạo sinh và tình nguyện viên</p>
            </div>
            <div className="objective-card">
              <div className="objective-icon">💰</div>
              <h3 className="card-title">Hoạt động gây quỹ</h3>
              <p>Kêu gọi được nguồn vốn, vật dụng sinh hoạt từ các trưởng</p>
              <p>Gây quỹ từ buôn bán vật phẩm đủ để tổ chức 1 sự kiện</p>
            </div>
            <div className="objective-card">
              <div className="objective-icon">👥</div>
              <h3 className="card-title">Quy mô dự kiến</h3>
              <p>Tiếp cận được 1 mái ấm</p>
              <p>Sinh hoạt được với ít nhất 10 em</p>
            </div>
            <div className="objective-card">
              <div className="objective-icon">🌱</div>
              <h3 className="card-title">Tính bền vững</h3>
              <p>Ít nhất 1 tráng sinh tiếp quản tiếp tục dự án</p>
            </div>
            <div className="objective-card">
              <div className="objective-icon">🎯</div>
              <h3 className="card-title">Phát triển kỹ năng</h3>
              <p>50% trẻ tham gia được tiếp cận các hoạt động: Thủ công – mỹ thuật, Trò chơi nhóm, giao tiếp, hợp tác</p>
              <p>Hướng đến cải thiện sự tự tin và khả năng tương tác của trẻ</p>
            </div>
          </div>
          <div className="sdgs-section">
            <h3 className="card-title">Mục tiêu phát triển bền vững (SDGs)</h3>
            <div className="sdgs-grid">
              <div className="sdg-card">
                <img src="/project-infor/sdg-3.png" alt="SDGs 3" />
                <div className="sdg-text">Sức khỏe tốt và cuộc sống hạnh phúc</div>
              </div>
              <div className="sdg-card">
                <img src="/project-infor/sdg-4.png" alt="SDGs 4" />
                <div className="sdg-text">Giáo dục chất lượng</div>
              </div>
              <div className="sdg-card">
                <img src="/project-infor/sdg-10.png" alt="SDGs 10" />
                <div className="sdg-text">Giảm bất bình đẳng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* General Project Information */}
      <section className="content-section alt-bg">
        <div className="section-header">
          <h2 className="section-title">Thông Tin Chung Dự Án</h2>
        </div>
        <div className="section-content">
          <div className="info-grid">
            <div className="info-card">
              <h3 className="card-title">Mục đích</h3>
              <ul>
                <li>Không gian vui chơi sáng tạo và an toàn cho trẻ tại mái ấm</li>
                <li>Giáo dục đạo đức căn bản và các kỹ năng mềm cơ bản thông qua trò chơi các câu chuyện và trò chơi</li>
                <li>Giảm cảm giác cô lập và tăng kết nối xã hội</li>
              </ul>
            </div>
            <div className="info-card">
              <h3 className="card-title">Hình thức</h3>
              <ul>
                <li>Sinh hoạt định kỳ cuối tuần</li>
                <li>Sự kiện theo quý</li>
              </ul>
            </div>
            <div className="info-card">
              <h3 className="card-title">Đối tượng</h3>
              <p>Trẻ em ở và sinh hoạt trong trại trẻ độ tuổi trong khoảng 4–16 tuổi (Nhi – Ấu – Thiếu)</p>
            </div>
            <div className="info-card">
              <h3 className="card-title">Thời gian</h3>
              <p>Số ngày thực hiện dự án: <strong>270 ngày</strong></p>
            </div>
            <div className="info-card">
              <h3 className="card-title">Địa điểm</h3>
              <ul>
                <li>Mái Ấm Cha Tịch – Biên Hòa, Đồng Nai</li>
                <li>Mái Ấm Cô Mai – Thuận An, Bình Dương</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Methods */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Cách Thức Triển Khai</h2>
        </div>
        <div className="section-content">
          <div className="implementation-grid">
            <div className="implementation-card">
              <h3 className="card-title">Sinh hoạt định kỳ</h3>
              <ul>
                <li>Trò chơi sinh hoạt</li>
                <li>Hoạt động thủ công – mỹ thuật</li>
                <li>Bài hát sinh hoạt ngành Sói-Hải Ly</li>
                <li>Kể chuyện 'Rừng xanh'</li>
              </ul>
              <p className="note">Sinh hoạt 6 tháng theo khung cảnh của câu chuyện "Những người bạn của rừng"</p>
            </div>
            <div className="implementation-card">
              <h3 className="card-title">Sự kiện theo quý</h3>
              <div className="events-list">
                <div className="event-item">
                  <div className="event-date">05-10-2025</div>
                  <div className="event-name">Hội Vui Trăng</div>
                </div>
                <div className="event-item">
                  <div className="event-date">24-01-2026</div>
                  <div className="event-name">Dọn Nhà Đón Tết</div>
                </div>
                <div className="event-item">
                  <div className="event-date">07-02-2026</div>
                  <div className="event-name">Mang Tết Về Nhà</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personnel */}
      <section className="content-section alt-bg">
        <div className="section-header">
          <h2 className="section-title">Nhân Sự Tham Gia</h2>
        </div>
        <div className="section-content">
          <div className="personnel-grid">
            <div className="personnel-card">
              <h3 className="card-title">Nhân lực cho sinh hoạt</h3>
              <ul>
                <li><strong>Hướng đạo sinh:</strong> Kha đoàn Tao Phùng, Tráng đoàn Sánh Bước, Tráng đoàn Thăng Long</li>
                <li><strong>Tình nguyện viên:</strong> 2 người (CTV trường Sư Phạm)</li>
                <li><strong>Thành viên toán:</strong> 7 người</li>
              </ul>
            </div>
            <div className="personnel-card">
              <h3 className="card-title">Nhân lực cho sự kiện</h3>
              <ul>
                <li><strong>Hướng đạo sinh:</strong> 64 HDS (Tráng đoàn Thăng Long, Tráng đoàn Sánh Bước, ...)</li>
                <li><strong>Tình nguyện viên:</strong> 5 người (CTV trường Sư Phạm, phụ huynh, TNV ở Mái Ấm)</li>
                <li><strong>Thành viên toán:</strong> 7 người</li>
              </ul>
            </div>
          </div>
          <p className="note">Nhân sự chia thành làm 2 nhóm chính</p>
        </div>
      </section>

      {/* Fundraising Activities */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Hoạt Động Gây Quỹ</h2>
        </div>
        <div className="section-content">
          <div className="fundraising-methods">
            <h3 className="card-title">Hình thức gây quỹ</h3>
            <ul>
              <li>Đóng góp nội bộ toán</li>
              <li>Gây quỹ thông qua các hoạt động buôn bán (ano len, vòng tay)</li>
              <li>Huy động vật phẩm và hỗ trợ hiện vật (bánh kẹo, dụng cụ sinh hoạt)</li>
              <li>Kêu gọi thông qua truyền thông (facebook, website dự án, trại 95 năm)</li>
            </ul>
          </div>
          <div className="fundraising-summary">
            <div className="summary-card">
              <div className="summary-label">Tổng thu (chuyển khoản - momo)</div>
              <div className="summary-value">11.744.375₫</div>
            </div>
            <div className="summary-card">
              <div className="summary-label">Tổng thu (tiền mặt)</div>
              <div className="summary-value">740.527₫</div>
            </div>
            <div className="summary-card highlight">
              <div className="summary-label">Tổng thu</div>
              <div className="summary-value">12.484.902₫</div>
            </div>
          </div>
        </div>
      </section>

      {/* Expense Statistics */}
      <section className="content-section alt-bg">
        <div className="section-header">
          <h2 className="section-title">Thống Kê Chi Tiêu</h2>
        </div>
        <div className="section-content">
          <div className="expense-purposes">
            <h3 className="card-title">Mục đích sử dụng nguồn quỹ</h3>
            <ul>
              <li>Mua dụng cụ sinh hoạt, thủ công cho các em nhỏ</li>
              <li>Tổ chức các sự kiện: Hội Vui Trăng, Dọn Nhà Đón Tết</li>
              <li>Hoạt động Nấu bánh chưng</li>
              <li>Hỗ trợ trực tiếp cho sinh hoạt tại các mái ấm</li>
            </ul>
          </div>
          <div className="expense-summary">
            <div className="summary-card">
              <div className="summary-label">Tổng chi</div>
              <div className="summary-value expense">11.001.000₫</div>
            </div>
            <div className="summary-card highlight">
              <div className="summary-label">Dư</div>
              <div className="summary-value">2.847.000₫</div>
            </div>
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      <section className="content-section">
        <div className="section-header">
          <h2 className="section-title">Kết Quả & Tác Động</h2>
        </div>
        <div className="section-content">
          <div className="results-grid">
            <div className="result-card">
              <div className="result-icon">✅</div>
              <h3 className="card-title">Duy trì sinh hoạt định kỳ</h3>
              <p>Tổ chức <strong>24 buổi sinh hoạt</strong>, mỗi buổi sinh hoạt tối thiểu 1 tiếng cuối tuần trong thời gian dự án</p>
              <p>Mỗi buổi sinh hoạt có nội dung rõ ràng: trò chơi tập thể, thủ công, bài hát Hướng Đạo, truyền tải được câu chuyện rừng xanh</p>
            </div>
            <div className="result-card">
              <div className="result-icon">💰</div>
              <h3 className="card-title">Hoạt động gây quỹ</h3>
              <p>Kêu gọi được đủ nguồn vốn, vật dụng sinh hoạt từ các trưởng</p>
              <p>Gây quỹ từ buôn bán vật phẩm tổ chức <strong>3 sự kiện</strong></p>
            </div>
            <div className="result-card">
              <div className="result-icon">🌍</div>
              <h3 className="card-title">Quy mô dự án</h3>
              <p>Huy động sự tham gia của các tráng sinh trẻ từ các đơn vị và tình nguyện viên bên ngoài</p>
              <p>Sinh hoạt được với <strong>hơn 56 em</strong></p>
            </div>
            <div className="result-card">
              <div className="result-icon">📱</div>
              <h3 className="card-title">Truyền thông</h3>
              <p>Truyền thông thông qua facebook và website dự án</p>
            </div>
            <div className="result-card">
              <div className="result-icon">🌱</div>
              <h3 className="card-title">Tính bền vững</h3>
              <p>Thành lập được toán tráng độc lập tiếp tục dự án</p>
            </div>
            <div className="result-card highlight">
              <div className="result-icon">🎯</div>
              <h3 className="card-title">Phát triển kỹ năng</h3>
              <p><strong>70%</strong> trẻ em tham gia được tiếp cận các hoạt động: Thủ công – mỹ thuật, Trò chơi</p>
              <p><strong>50%</strong> các em hình thành được các thói quen (vứt rác đúng nơi quy định, xếp hàng, cảm ơn khi được phát bánh kẹo...) và các đạo đức căn bản tốt cho trẻ em (kiên nhẫn, chia sẻ, ...)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Experience */}
      <section className="content-section alt-bg">
        <div className="section-header">
          <h2 className="section-title">Thách Thức & Kinh Nghiệm</h2>
        </div>
        <div className="section-content">
          <div className="challenges-grid">
            <div className="challenge-card">
              <h3 className="card-title">Sinh hoạt</h3>
              <ul>
                <li>Thiếu kinh nghiệm sinh hoạt với các em trong độ tuổi ngành Nhi</li>
                <li>Các em ban đầu không quen với phong cách sinh hoạt Hướng Đạo nên rất khó để lôi kéo sự tập trung từ các em</li>
                <li>Thiếu kinh nghiệm trong việc xử lý các tình huống nhạy cảm</li>
              </ul>
            </div>
            <div className="challenge-card">
              <h3 className="card-title">Nguồn vốn & Kinh nghiệm</h3>
              <ul>
                <li>Thiếu nguồn vốn lúc bắt đầu dự án</li>
                <li>Thiếu sự hướng dẫn từ các trưởng có kinh nghiệm trong ngành Nhi</li>
                <li>Không có ý tưởng để triển khai chương trình sinh hoạt cho các em</li>
              </ul>
            </div>
            <div className="challenge-card">
              <h3 className="card-title">Tổ chức sự kiện</h3>
              <ul>
                <li>Thiếu nhân sự để mở rộng quy mô sự kiện</li>
                <li>Không có chuyên môn trong truyền thông & hành chánh</li>
                <li>Hiểu sai quy trình hành chánh khiến cho trì trệ việc mời các đơn vị Tráng đoàn bên ngoài tham dự giúp ích dự án</li>
              </ul>
            </div>
            <div className="challenge-card">
              <h3 className="card-title">Vấn đề nội bộ Toán</h3>
              <ul>
                <li>Thiếu sự hợp tác từ các thành viên ở gần</li>
                <li>Các thành viên chủ chốt không sắp xếp được thời gian tham dự hỗ trợ dự án</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="content-section conclusion-section">
        <div className="section-header">
          <h2 className="section-title">Kết Luận</h2>
        </div>
        <div className="section-content">
          <div className="conclusion-box">
            <p>
              Dự án WODO - Be Good Do Good là một dự án thông qua các sự kiện và các buổi sinh hoạt cho các em ở mái ấm 
              được trải nghiệm cuộc chơi Hướng Đạo. Mục tiêu chính là tạo môi trường sinh hoạt mỗi cuối tuần và các sự kiện 
              mỗi quý (Trung Thu, Tết) cho sự phát triển lành mạnh cho các em ở mái ấm, cụ thể các em ở độ tuổi Nhi - Ấu - Thiếu 
              (4-8 tuổi) ở hai mái ấm Biên Hòa và Bình Dương. Dự án nhằm phát triển các kỹ năng cơ bản, phát triển khả năng thủ công 
              và giáo dục đạo đức thông qua các hoạt động thủ công và trò chơi, bài hát sinh hoạt trong Hướng đạo. Điều này giúp tăng 
              cường sự tự tin, khả năng giao tiếp và hòa nhập, góp phần vào các Mục tiêu Phát triển Bền vững (SDG 3, 4, 10) về Sức khỏe, 
              Giáo dục và Bình đẳng.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectPage;