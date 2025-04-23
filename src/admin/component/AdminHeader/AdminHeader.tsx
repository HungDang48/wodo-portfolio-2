import { Link, useNavigate } from 'react-router-dom';
import './AdminHeader.css';
import 'font-awesome/css/font-awesome.min.css'; // Nhớ import Font Awesome

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    localStorage.removeItem('AdminID');
    navigate('/LoginAdmin'); // Điều hướng đúng về trang đăng nhập admin
  };
  

  return (
    <header className="header-admin">
      <div className="header-admin-container">
        <div className="logo-admin">
          <Link to="/HomepageAdmin">WODO</Link>
        </div>

        <nav className="nav-admin">
          <Link to="/ProfileAdmin">
            <i className="fa fa-info-circle"></i> profile
          </Link>
          <Link to="#">
            <i className="fa fa-project-diagram"></i> Dự án
          </Link>
          <Link to="#">
            <i className="fa fa-donate"></i> blog
          </Link>
        </nav>

        {/* Logout Button */}
        <button className="logout-button-admin" onClick={handleLogout}>
          <i className="fa fa-sign-out"></i> Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
