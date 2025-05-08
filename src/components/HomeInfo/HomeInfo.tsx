import React from 'react';
import './HomeInfo.css';

const HomeInfo = () => {
  return (
    <div className="home-info">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <div className="container">
        {/* Stats Section */}
        <div className="stats-grid">
          <div>
            
            <img src="/img/vietnam.png" alt="Logo 1" className="logo-info" />
            <h3 className="value">8.000+</h3>
            <p className="label">Hướng Đạo Sinh và Tình nguyện viên</p>
          </div>
          <div>
            
            <img src="/img/earth.png" alt="Logo 2" className="logo-info" />
            <h3 className="value">170 </h3>
            <p className="label">thành viên của WSOM</p>
          </div>
          <div>
          <img src="/img/earth.png" alt="Logo 2" className="logo-info" />
            <h3 className="value">2.7 billion+</h3>
            <p className="label">Hours of community service</p>
          </div>
          <div>
          <img src="/img/earth.png" alt="Logo 2" className="logo-info" />
            <h3 className="value">16 million+</h3>
            <p className="label">Service projects and actions</p>
          </div>
        </div>

        {/* Featured Stories */}
        <h2 className="section-title">Featured Stories</h2>
        <div className="stories-grid">
          {/* Story 1 */}
          <div className="story relative">
            <img src="https://storage.googleapis.com/a1aa/image/2cb279f3-51a4-4509-d4d7-13f0f98094e3.jpg" alt="Story 1" />
            <div className="story-desc teal"> $50 million in renewed Messengers of Peace funding to increase impact of Scouting worldwide </div>
          </div>
          {/* Story 2 */}
          <div className="story relative">
            <img src="https://storage.googleapis.com/a1aa/image/2cb279f3-51a4-4509-d4d7-13f0f98094e3.jpg" alt="Story 1" />
            <div className="story-desc teal"> $50 million in renewed Messengers of Peace funding to increase impact of Scouting worldwide </div>
          </div>
          {/* Story 3 */}
          <div className="story relative">
            <img src="https://storage.googleapis.com/a1aa/image/2cb279f3-51a4-4509-d4d7-13f0f98094e3.jpg" alt="Story 1" />
            <div className="story-desc teal"> $50 million in renewed Messengers of Peace funding to increase impact of Scouting worldwide </div>
          </div>
          
        </div>
      </div>
      </div>
    </div>
  )
}   
   
export default HomeInfo;
