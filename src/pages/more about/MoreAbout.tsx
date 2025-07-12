import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MoreAbout.css';

interface User {
  id: number;
  UserId: number;
  name: string;
  unit: string;
  role: string;
  personality: string;
  avatar: string;
  NickName: string;
  ScoutsAge: string;
  UnitRole: string;
  FavoriteQuote: string;
}

const MoreAbout: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'series' | 'saved'>('posts');

  useEffect(() => {
    if (id) {
      fetch(`https://wodo-portfolio-backend-production.up.railway.app/User/${id}`)
        .then(response => response.json())
        .then(data => setUser(data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [id]);

  if (!user) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="user-account-wrapper">
      <div className="user-account-container">
        <div className="profile-layout">
          {/* Left - Profile Info */}
          <div className="profile-left">
            <div className="profile-card">
              <div className="profile-img-wrapper">
                {user.avatar ? (
                  <img src={user.avatar} alt="avatar" className="profile-img" />
                ) : (
                  <div className="profile-img-placeholder">👤</div>
                )}
              </div>
              <h2 className="username">{user.name}</h2>
              <p className="user-handle">@{user.NickName}</p>

              <div className="profile-stats">
                <div className="stat-item">
                  <p className="stat-label">Đã sinh hoạt</p>
                  <p className="stat-value">{user.ScoutsAge}</p>
                </div>
                <div className="stat-item">
                <p className="stat-label">trách vụ</p>
                  <p className="stat-value">{user.UnitRole}</p>
                  
                </div>
              </div>
              <div className="user-bio">
                <p className="bio-text">{user.FavoriteQuote || 'Chưa có tiểu sử'}</p>
              </div>
            </div>
          </div>

          {/* Right - Tabs */}
          <div className="profile-right">
            <div className="tabs">
              <div className={`tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>Bài viết</div>
              {/* <div className={`tab ${activeTab === 'series' ? 'active' : ''}`} onClick={() => setActiveTab('series')}>Series</div> */}
              {/* <div className={`tab ${activeTab === 'saved' ? 'active' : ''}`} onClick={() => setActiveTab('saved')}>Đã lưu</div> */}
            </div>

            <div className="tab-content">
              {activeTab === 'posts' && (
                <div className="posts-section">
                  <h2>My Posts</h2>
                  <div className="posts-grid">
                    <p>Chưa có bài viết nào</p>
                  </div>
                </div>
              )}

              {activeTab === 'series' && (
                <div className="series-section">
                  <h2>My Series</h2>
                  <div className="series-grid">
                    <p>Chưa có series nào</p>
                  </div>
                </div>
              )}

              {activeTab === 'saved' && (
                <div><p>Chưa có bài viết nào được lưu</p></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreAbout;
