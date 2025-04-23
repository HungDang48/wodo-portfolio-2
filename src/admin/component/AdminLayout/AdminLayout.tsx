import React from 'react';
import AdminHeader from '../AdminHeader/AdminHeader';
import './AdminLayout.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout; 