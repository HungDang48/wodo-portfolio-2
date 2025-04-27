import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProjectAdmin.css';

interface Project {
  ProjectId: number;
  ProjectState: string;
  ProjectRange: string;
  ProjectTarget: string;
  ProjectDeliverables: string;
}

const ProjectAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, 'ProjectId'>>({
    ProjectState: '',
    ProjectRange: '',
    ProjectTarget: '',
    ProjectDeliverables: '',
  });
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get<Project[]>('https://wodo-portfolio-backend-production.up.railway.app/Projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Lỗi khi fetch project:', error);
    }
  };

  const handleEditClick = (project: Project) => {
    setEditProject(project);
  };

  const handleUpdate = async () => {
    if (editProject) {
      try {
        await axios.put(
          `https://wodo-portfolio-backend-production.up.railway.app/Projects/${editProject.ProjectId}`,
          editProject
        );
        fetchProjects();
        setEditProject(null);
        alert('Dự án đã được cập nhật!');
      } catch (error) {
        console.error('Lỗi khi cập nhật project:', error);
      }
    }
  };

  const handleDelete = async (projectId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa project này?')) {
      try {
        await axios.delete(`https://wodo-portfolio-backend-production.up.railway.app/Projects/${projectId}`);
        fetchProjects();
      } catch (error) {
        console.error('Lỗi khi xóa project:', error);
      }
    }
  };

  const handleAddNew = async () => {
    if (!newProject.ProjectState || !newProject.ProjectRange || !newProject.ProjectTarget || !newProject.ProjectDeliverables) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
  
    try {
      // Gửi yêu cầu POST với dữ liệu dạng JSON
      await axios.post(
        'https://wodo-portfolio-backend-production.up.railway.app/Projects',
        {
          id: Date.now(), // Thêm trường id với giá trị timestamp
          ProjectId: Date.now(), // Giữ nguyên ProjectId
          ProjectState: newProject.ProjectState,
          ProjectRange: newProject.ProjectRange,
          ProjectTarget: newProject.ProjectTarget,
          ProjectDeliverables: newProject.ProjectDeliverables,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Dự án mới đã được thêm');
      fetchProjects();
      setIsAddingNew(false);
      setNewProject({
        ProjectState: '',
        ProjectRange: '',
        ProjectTarget: '',
        ProjectDeliverables: '',
      });
  
      alert('Dự án đã được thêm mới!');
    } catch (error: any) {
      console.error('Lỗi khi thêm project mới:', error.response?.data || error.message);
      alert('Đã có lỗi xảy ra khi thêm dự án!');
    }
  };
  
  
  

  return (
    <div className="project-admin-container">
      <div className="project-admin-header">
        <h2>Danh sách dự án</h2>
        <button className="add-new-button" onClick={() => setIsAddingNew(true)}>
          Thêm dự án mới
        </button>
      </div>

      <div className="project-list-header">
        <div>STT</div>
        <div>Trạng thái</div>
        <div>Phạm vi</div>
        <div>Mục tiêu</div>
        <div>Sản phẩm bàn giao</div>
        <div>Hành động</div>
      </div>

      <div className="project-list">
        {projects.map((project, index) => (
          <div className="project-card" key={project.ProjectId}>
            <div>{index + 1}</div>
            <div>{project.ProjectState}</div>
            <div>{project.ProjectRange}</div>
            <div>{project.ProjectTarget}</div>
            <div>{project.ProjectDeliverables}</div>
            <div className="project-actions">
              <button onClick={() => handleEditClick(project)}>Sửa</button>
              <button className="delete" onClick={() => handleDelete(project.ProjectId)}>Xóa</button>
            </div>
          </div>
        ))}
      </div>

      {editProject && (
  <div className="modal-overlay" onClick={() => setEditProject(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title">✏️ Sửa thông tin dự án</h2>
      <div className="modal-inputs">
        <input
          type="text"
          value={editProject.ProjectState}
          onChange={(e) => setEditProject({ ...editProject, ProjectState: e.target.value })}
          placeholder="Trạng thái"
        />
        <input
          type="text"
          value={editProject.ProjectRange}
          onChange={(e) => setEditProject({ ...editProject, ProjectRange: e.target.value })}
          placeholder="Phạm vi"
        />
        <input
          type="text"
          value={editProject.ProjectTarget}
          onChange={(e) => setEditProject({ ...editProject, ProjectTarget: e.target.value })}
          placeholder="Mục tiêu"
        />
        <input
          type="text"
          value={editProject.ProjectDeliverables}
          onChange={(e) => setEditProject({ ...editProject, ProjectDeliverables: e.target.value })}
          placeholder="Sản phẩm bàn giao"
        />
      </div>
      <div className="modal-actions">
        <button className="btn primary" onClick={handleUpdate}>💾 Cập nhật</button>
        <button className="btn cancel" onClick={() => setEditProject(null)}>❌ Hủy</button>
      </div>
    </div>
  </div>
)}


{isAddingNew && (
  <div className="modal-overlay" onClick={() => setIsAddingNew(false)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h2 className="modal-title">📁 Thêm dự án mới</h2>
      <div className="modal-inputs">
        <input
          type="text"
          value={newProject.ProjectState}
          onChange={(e) => setNewProject({ ...newProject, ProjectState: e.target.value })}
          placeholder="Trạng thái"
        />
        <input
          type="text"
          value={newProject.ProjectRange}
          onChange={(e) => setNewProject({ ...newProject, ProjectRange: e.target.value })}
          placeholder="Phạm vi"
        />
        <input
          type="text"
          value={newProject.ProjectTarget}
          onChange={(e) => setNewProject({ ...newProject, ProjectTarget: e.target.value })}
          placeholder="Mục tiêu"
        />
        <input
          type="text"
          value={newProject.ProjectDeliverables}
          onChange={(e) => setNewProject({ ...newProject, ProjectDeliverables: e.target.value })}
          placeholder="Sản phẩm bàn giao"
        />
      </div>
      <div className="modal-actions">
        <button className="btn primary" onClick={handleAddNew}>➕ Thêm</button>
        <button className="btn cancel" onClick={() => setIsAddingNew(false)}>❌ Hủy</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ProjectAdmin;
