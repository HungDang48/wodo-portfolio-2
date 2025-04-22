import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './pages/Home';
import AboutUs from './pages/about us/AboutUs';
import ProtectedRoute from './admin/component/ProtectedRoute/ProtectedRoute';
import AdminHome from './admin/page/AdminHome';
import LoginAdmin from './admin/page/loginAdmin/LoginAdmin';
 
 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/AboutUs" element={<Layout><AboutUs /></Layout>} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route
          path="/AdminHome"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
