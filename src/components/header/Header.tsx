import { Link } from 'react-router-dom';
import './header.css';
import 'font-awesome/css/font-awesome.min.css'; // Nhớ import Font Awesome

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">WODO</Link>
        </div>

        <nav className="nav">
          <Link to="/AboutUs">
            <i className="fa fa-info-circle"></i> Về chúng tôi
          </Link>
          <Link to=" ">
            <i className="fa fa-project-diagram"></i> Dự án
          </Link>
          <Link to=" ">
            <i className="fa fa-donate"></i> Donate
          </Link>
          <Link to=" ">
            <i className="fa fa-phone"></i> Liên hệ
          </Link>
        </nav>

        {/* Button */}
        <button className="world-button">Vì một thế giới tốt đẹp hơn</button>
      </div>
    </header>
  );
};

export default Header;
