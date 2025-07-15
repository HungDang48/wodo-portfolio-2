import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/layout';
import Home from './pages/Home';
import AboutUs from './pages/about us/AboutUs';
import ProtectedRoute from './admin/component/ProtectedRoute/ProtectedRoute';
import LoginAdmin from './admin/page/loginAdmin/LoginAdmin';
import HomepageAdmin from './admin/page/HomepageAdmin';
import AdminLayout from './admin/component/AdminLayout/AdminLayout';
import ProfileAdmin from './admin/page/InfoAdmin/ProfileAdmin';
import ProjectAdmin from './admin/page/projectAdmin/ProjectAdmin';
import MoreAbout from './pages/more about/MoreAbout';
import BlogAdmin from './admin/page/BlogAdmin/BlogAdmin';
import DonatePage from './pages/Donate/DonatePage';
import ProjectPage from './pages/project/informations/ProjectPage';
import ProductPage from './pages/Products/ProductPage';
import GalleryPage from './pages/project/gallery/GalleryPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/AboutUs" element={<Layout><AboutUs /></Layout>} />
        <Route path="/DonatePage" element={<Layout><DonatePage /></Layout>} />
        <Route path="/ProjectPage" element={<Layout><ProjectPage /></Layout>} />
        <Route path="/Products" element={<Layout><ProductPage /></Layout>} />
        <Route path="/Gallery" element={<Layout><GalleryPage /></Layout>} />
        <Route path="/MoreAbout/:id" element={<Layout><MoreAbout /></Layout>} />

        <Route path="/ProfileAdmin" element={<AdminLayout><ProfileAdmin /></AdminLayout>} />
        <Route path="/ProjectAdmin" element={<AdminLayout><ProjectAdmin /></AdminLayout>} />
        <Route path="/BlogAdmin" element={<AdminLayout><BlogAdmin /></AdminLayout>} />

        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route
          path="/HomepageAdmin"
          element={
            <ProtectedRoute>
              <AdminLayout><HomepageAdmin /></AdminLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
