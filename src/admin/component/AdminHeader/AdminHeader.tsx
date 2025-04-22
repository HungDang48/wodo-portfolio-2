import { Link } from 'react-router-dom';
import './AdminHeader.css';
import 'font-awesome/css/font-awesome.min.css'; // Nhớ import Font Awesome

const AdminHeader = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/AdminHome">WODO</Link>
        </div>

        <nav className="nav">
          <Link to="/AboutUs">
            <i className="fa fa-info-circle"></i> profile
          </Link>
          <Link to=" ">
            <i className="fa fa-project-diagram"></i> Dự án
          </Link>
          <Link to=" ">
            <i className="fa fa-donate"></i> blog
          </Link>
           
        </nav>

        {/* Button */}
        <button className="world-button">ex</button>
      </div>
    </header>
  );
};

export default AdminHeader;
