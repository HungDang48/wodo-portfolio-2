import React, { useState, useEffect } from 'react';
import './ProductPage.css';

interface Product {
  id: string;
  icon: string;
  title: string;
  price: string;
  description: string;
  badge?: string;
  features: string[];
  image: string[];
  formLink?: string;
  comingSoon?: boolean;
}

const ProductPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const productDescription = `🎉 [THÔNG BÁO BUÔN BÁN VÒNG TAY NHÂN ÁI] 🎉
  📌Dự án Vòng tay nhân ái là một hoạt động gây quỹ bởi toán WODO  thuộc khuôn khổ Trại Thế Giới Tốt Đẹp Hơn Lần 2 - Better World Camp 2, Pathfinder Scouts Vietnam.
  ✨Vòng tay nhân ái không chỉ là một món phụ kiện, mà còn là biểu tượng của tình người, sự sẻ chia và cam kết không để bất kỳ ai bị bỏ lại phía sau. Mỗi chiếc vòng tay bạn sở hữu sẽ đóng góp trực tiếp vào QUỸ WODO (Quỹ Hỗ trợ xây dựng sân chơi cho trẻ em mồ côi), góp phần mang lại niềm vui và hy vọng cho các em nhỏ có hoàn cảnh khó khăn.
Đây không chỉ là một sản phẩm, mà còn là cơ hội để lan tỏa yêu thương và hành động tử tế đến cộng đồng.
🌟 NGOÀI RA CHÚNG MÌNH SẮP RA MẮT SẢN PHẨM KHÁC HÃY ĐÓN CHỜ NHÉ 
🎁 ƯU ĐÃI DÀNH RIÊNG:
✔️ Đơn từ 10 sản phẩm: Freeship nội thành HCM & Biên Hòa
✔️ Ship theo đợt cho khu vực Huế – Đà Nẵng 
✔️ Được hỗ trợ hình ảnh cùng các hot idea của toán WODO /-rose 
📦 HÌNH THỨC NHẬN HÀNG:
Nội thành HCM, Biên Hòa: Giao nhanh, nhận trong ngày hoặc 6 – 7 ngày
Huế, Đà Nẵng: Ship tập trung theo đợt, nhận hàng tận tay hoặc tại điểm tập trung (sẽ báo cụ thể khi hàng về)
Ngoài ra chúng mình còn hỗ trợ nhận hàng trong trại 95 năm và các đợt trại khác nhau nữa, tiết kiệm chi phí nhất có thể
💡 Đặc biệt, bạn có thể rủ rê các đội nhóm trong khu vực gom đơn chung để vừa tiết kiệm, vừa thắt chặt tình đoàn kết nữa đó!
📞 Mọi thắc mắc liên hệ ngay:
Nguyễn Đình Khánh Ngân (Trưởng Dự Án) - SĐT : 0399201545, Email : khanhngan1491@gmail.com
Nguyễn Phạm Tường Vy (Thành viên dự án) – SĐT: 0868176774, Email:nguyenphantuongvy2104@gmail.com
🌈 Cùng nhau lan tỏa yêu thương – Kết nối ngàn trái tim!
#Vongtaynhanai #BWC2 #Wodo #pathfinderscoutsvietnam #SDGs`;

  const products: Product[] = [
    {
      id: 'product1',
      icon: '🧿',
      title: 'Vòng tay',
      price: '25.000₫',
      description: productDescription,
      badge: 'Hot',
      features: ['Quà tặng ý nghĩa', 'Lan tỏa yêu thương', 'Giao hàng tận nơi'],
      image: ['/products/vòngtay/1.jpg', '/products/vòngtay/2.jpg', '/products/vòngtay/3.jpg', '/products/vòngtay/4.jpg', '/products/vòngtay/5.jpg', '/products/vòngtay/6.jpg', '/products/vòngtay/7.jpg', '/products/vòngtay/8.jpg', '/products/vòngtay/9.jpg', '/products/vòngtay/10.jpg', '/products/vòngtay/11.jpg', '/products/vòngtay/12.jpg', '/products/vòngtay/13.jpg', '/products/vòngtay/14.jpg', '/products/vòngtay/15.jpg', '/products/vòngtay/16.jpg', '/products/vòngtay/17.jpg', '/products/vòngtay/18.jpg', '/products/vòngtay/19.jpg', '/products/vòngtay/20.jpg'].map((img) => img),
      formLink: 'https://forms.gle/u7vH4B98GfcyJtdeA'
    },
    {
      id: 'product2',
      icon: '🔮',
      title: 'Anno',
      price: '25.000₫',
      description: '',
      badge: 'Coming',
      features: ['Sắp ra mắt!', 'Thiết kế độc quyền', 'Sản phẩm giới hạn'],
      image: ['/products/anno/1.jpg'].map((img) => img),
      comingSoon: true
    }
  ];

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const buyProduct = () => {
    alert('Chức năng mua hàng sẽ được kết nối với backend sau!');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar') as HTMLElement;
      if (navbar) {
        navbar.style.background =
          window.scrollY > 50 ? 'rgba(255, 255, 255, 0.98)' : 'rgba(255, 255, 255, 0.95)';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.product-card').forEach((card) => {
      const element = card as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'all 0.6s ease';
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-container">
      {/* Navigation */}
      

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-container">
          <h1>Khám Phá Sản Phẩm Đặc Biệt</h1>
          <p>Những sản phẩm ý nghĩa – giúp bạn lan tỏa yêu thương!</p>
          <button className="cta-button" onClick={() => scrollToSection('products')}>
            Xem Ngay
          </button>
        </div>
      </section>

      {/* Products Section */}
      <section className="products" id="products">
        <div className="products-container">
          <h2 className="section-title">Sản Phẩm Nổi Bật</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card" onClick={() => openModal(product)}>
                {product.badge && <div className="product-badge">{product.badge}</div>}
                <div className="product-image">{product.icon}</div>
                <div className="product-info">
                  <h3 className="product-title">{product.title}</h3>
                  <div className="product-price">{product.price}</div>
                  <p className="product-description">
                    {product.description.length > 150
                      ? product.description.substring(0, 150) + '...'
                      : product.description}
                  </p>
                  <button className="product-button">Xem Chi Tiết</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedProduct && (
        <div className="modal active" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="close-button" onClick={closeModal}>&times;</button>
              <div className="modal-icon">{selectedProduct.icon}</div>
            </div>
            <div className="modal-body">
              <h3 className="modal-title">{selectedProduct.title}</h3>
              <div className="modal-price">{selectedProduct.price}</div>
              <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', margin: '1rem 0' }}>
                {selectedProduct.image.map((imgUrl, idx) => (
                  <img
                    key={idx}
                    src={imgUrl}
                    alt={`${selectedProduct.title} ${idx + 1}`}
                    style={{ height: '300px', borderRadius: '10px', flex: '0 0 auto', width: '300px', objectFit: 'cover' }}
                  />
                ))}
              </div>
              <p className="modal-description" style={{ whiteSpace: 'pre-line' }}>
                {selectedProduct.description}
              </p>
              <div className="product-features">
                <h4 className="features-title">Thông Tin:</h4>
                <ul className="features-list">
                  {selectedProduct.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div style={{ marginTop: '1rem' }}>
                {selectedProduct.comingSoon ? (
                  <p><strong>Form đặt hàng:</strong> Coming soon!</p>
                ) : (
                  <a
                    href={selectedProduct.formLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="buy-button"
                  >
                    Đặt Hàng Ngay
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
