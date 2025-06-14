import React, { useState } from 'react';
import './ProjectPage.css';

const bmcData = {
  keyPartners: [
    'Mái ấm cha Tịnh',
    'Các bạn hướng đạo sinh đơn vị',
    'Liên đoàn Tao Phùng'
  ],
  keyActivities: [
    'Thiết kế các trò chơi thiên nhiên',
    'Tổ chức sinh hoạt phù hợp cho trẻ độ tuổi Sói – Hài Ly',
    'Gây quỹ & quản lý tài trợ duy trì sinh hoạt',
    'Đánh giá tác động và rủi ro tài chính',
    'Xây dựng tài liệu hoạt động & quản lý'
  ],
  valuePropositions: [
    'Không gian vui chơi sáng tạo và an toàn cho trẻ mồ côi',
    'Giáo dục kỹ năng sống và tinh thần tập thể',
    'Giảm cảm giác cô lập và tăng kết nối xã hội',
    'Góp phần vào SDGs: Giáo dục, Bình đẳng, Hạnh phúc',
    'Giảm nguy cơ mắc bệnh tâm lý ở trẻ mồ côi'
  ],
  customerRelationships: [
    'Gắn kết qua hoạt động tình nguyện thường xuyên',
    'Cập nhật tiến độ & tác động xã hội đến đơn vị hỗ trợ, nhà tài trợ, tổ chức đồng hành'
  ],
  customerSegments: [
    'Trẻ mầm non tại trại trẻ mồ côi – đối tượng thụ hưởng chính',
    'Trại mồ côi, trung tâm bảo trợ – đối tác triển khai',
    'Nhà tài trợ, tổ chức phi lợi nhuận – đối tượng thuyết phục để tài trợ'
  ],
  keyResources: [
    'Thành viên toán WODO',
    'Tráng sinh liên đoàn Tao Phùng'
  ],
  channels: [
    'Hợp tác với trại trẻ mồ côi & tổ chức xã hội bên ngoài',
    'Truyền thông mạng xã hội (Facebook, TikTok, YouTube)',
    'Landing page giới thiệu dự án của toán WODO'
  ],
  costStructure: [
    'Chi phí vật dụng thiết kế & xây dựng trò chơi',
    'Chi phí đồng phục, đạo cụ sinh hoạt (optional)',
    'Chi phí truyền thông & gây quỹ',
    'Chi phí quản lý, vận hành dự án',
    'Chi phí bánh, kẹo sinh hoạt (optional)'
  ],
  revenueStreams: [
    'Tài trợ từ cá nhân, trường hướng đạo, phụ huynh',
    'Hợp tác CSVC với cha Tịnh',
    'Gây quỹ từ cộng đồng HĐS (crowdfunding)',
    'Tổ chức workshop/buôn bán gây quỹ sinh hoạt'
  ]
};

const blockConfig = {
  keyPartners: { color: 'purple-pink', icon: '🤝', bgColor: 'bg-purple' },
  keyActivities: { color: 'blue-cyan', icon: '⚡', bgColor: 'bg-blue' },
  keyResources: { color: 'green-emerald', icon: '🎯', bgColor: 'bg-green' },
  valuePropositions: { color: 'orange-red', icon: '💎', bgColor: 'bg-orange' },
  customerRelationships: { color: 'pink-rose', icon: '❤️', bgColor: 'bg-pink' },
  channels: { color: 'indigo-purple', icon: '📡', bgColor: 'bg-indigo' },
  customerSegments: { color: 'teal-green', icon: '👥', bgColor: 'bg-teal' },
  costStructure: { color: 'red-pink', icon: '💰', bgColor: 'bg-red' },
  revenueStreams: { color: 'emerald-teal', icon: '💵', bgColor: 'bg-emerald' }
};

interface BlockComponentProps {
  title: string;
  items: string[];
  config: {
    color: string;
    icon: string;
    bgColor: string;
  };
  isLarge?: boolean;
}

const BlockComponent: React.FC<BlockComponentProps> = ({ title, items, config, isLarge = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`
        bmc-block ${config.bgColor} ${config.color}
        ${isHovered ? 'hovered' : ''}
        ${isLarge ? 'large' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay */}
      <div className="gradient-overlay"></div>
      
      {/* Content */}
      <div className="block-content">
        <div className="block-header">
          <div className="icon-container">
            {config.icon}
          </div>
          <h2 className="block-title">
            {title}
          </h2>
        </div>
        
        <div className={`items-grid ${isLarge ? 'large-grid' : ''}`}>
          {items.map((item, index) => (
            <div 
              key={item} 
              className="item-card"
              style={{ 
                animationDelay: `${index * 100}ms`
              }}
            >
              <div className="item-content">
                <div className="item-dot"></div>
                <span className="item-text">{item}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProjectPage: React.FC = () => {
  return (
    <div className="page-container">
      {/* Background decorative elements */}
      <div className="background-decorations">
        <div className="decoration-orb orb-1"></div>
        <div className="decoration-orb orb-2"></div>
        <div className="decoration-orb orb-3"></div>
      </div>
      
      <div className="main-content">
        {/* Header */}
        <div className="page-header">
          <div className="header-icon-title">
            <div className="header-icon">
              📊
            </div>
            <h1 className="page-title">
              Business Model Canvas
            </h1>
          </div>
          <p className="page-description">
            Thông tin về dự án 
          </p>
          <div className="title-underline"></div>
        </div>

        {/* BMC Grid */}
        <div className="bmc-grid">
          {/* Row 1 */}
          <BlockComponent 
            title="Key Partners" 
            items={bmcData.keyPartners} 
            config={blockConfig.keyPartners}
          />
          <BlockComponent 
            title="Key Activities" 
            items={bmcData.keyActivities} 
            config={blockConfig.keyActivities}
          />
          <BlockComponent 
            title="Value Propositions" 
            items={bmcData.valuePropositions} 
            config={blockConfig.valuePropositions}
          />
          <BlockComponent 
            title="Customer Relationships" 
            items={bmcData.customerRelationships} 
            config={blockConfig.customerRelationships}
          />
          <BlockComponent 
            title="Customer Segments" 
            items={bmcData.customerSegments} 
            config={blockConfig.customerSegments}
          />
          
          {/* Row 2 */}
          <BlockComponent 
            title="Key Resources" 
            items={bmcData.keyResources} 
            config={blockConfig.keyResources}
          />
          <div className="empty-space">
            {/* Empty space for traditional BMC layout */}
          </div>
          <BlockComponent 
            title="Channels" 
            items={bmcData.channels} 
            config={blockConfig.channels}
          />
          
          {/* Row 3 */}
          <div className="cost-section">
            <BlockComponent 
              title="Cost Structure" 
              items={bmcData.costStructure} 
              config={blockConfig.costStructure}
              isLarge={true}
            />
          </div>
          <div className="revenue-section">
            <BlockComponent 
              title="Revenue Streams" 
              items={bmcData.revenueStreams} 
              config={blockConfig.revenueStreams}
              isLarge={true}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="page-footer">
          <div className="footer-badge">
            <div className="status-dot"></div>
            <span className="footer-text">Project Framework</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;