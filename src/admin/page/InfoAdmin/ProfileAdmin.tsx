import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileAdmin.css';

interface User {
  id: number;
  UserId: number;
  name: string;
  unit: string;
  role: string;
  personality: string;
  avatar: string;
}

const ProfileAdmin = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [editUser, setEditUser] = useState<User | null>(null);
    const [updatedName, setUpdatedName] = useState('');
    const [updatedUnit, setUpdatedUnit] = useState('');
    const [updatedRole, setUpdatedRole] = useState('');
    const [updatedPersonality, setUpdatedPersonality] = useState('');
    const [updatedAvatar, setUpdatedAvatar] = useState<File | null>(null);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const [newUser, setNewUser] = useState({
      name: '',
      unit: '',
      role: '',
      personality: '',
      avatar: null as File | null
    });
    const [isUploading, setIsUploading] = useState(false);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('https://wodo-portfolio-backend-production.up.railway.app/User');
        setUsers(response.data);
      } catch (error) {
        console.error('Lỗi khi fetch user:', error);
      }
    };

    const uploadImage = async (file: File): Promise<string> => {
      try {
        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        
        // Sử dụng ImgBB API để upload ảnh
        const response = await axios.post('https://api.imgbb.com/1/upload?key=355c4cd37458a005d8cbebd98eceaa7a', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        return response.data.data.url;
      } catch (error) {
        console.error('Lỗi khi upload ảnh:', error);
        throw error;
      } finally {
        setIsUploading(false);
      }
    };
  
    const handleEditClick = (user: User) => {
      setEditUser(user);
      setUpdatedName(user.name);
      setUpdatedUnit(user.unit);
      setUpdatedRole(user.role);
      setUpdatedPersonality(user.personality);
    };
  
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setUpdatedAvatar(file);
      }
    };

    const handleNewUserAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setNewUser(prev => ({ ...prev, avatar: file }));
      }
    };
  
    const handleUpdate = async () => {
      if (editUser) {
        try {
          let avatarUrl = editUser.avatar;
  
          // Nếu có ảnh mới, upload lên ImgBB
          if (updatedAvatar) {
            avatarUrl = await uploadImage(updatedAvatar);
          }
  
          const updatedUser = {
            ...editUser,
            name: updatedName,
            unit: updatedUnit,
            role: updatedRole,
            personality: updatedPersonality,
            avatar: avatarUrl,
          };
  
          await axios.put(`https://wodo-portfolio-backend-production.up.railway.app/User/${editUser.id}`, updatedUser);
          fetchUsers(); // Refresh danh sách
          setEditUser(null);
        } catch (error) {
          console.error('Lỗi khi cập nhật người dùng:', error);
        }
      }
    };

    const handleDelete = async (userId: number) => {
      if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
        try {
          await axios.delete(`https://wodo-portfolio-backend-production.up.railway.app/User/${userId}`);
          fetchUsers(); // Refresh danh sách
        } catch (error) {
          console.error('Lỗi khi xóa người dùng:', error);
        }
      }
    };

    const handleAddNew = async () => {
      try {
        let avatarUrl = '';
        
        // Nếu có ảnh, upload lên ImgBB
        if (newUser.avatar) {
          avatarUrl = await uploadImage(newUser.avatar);
        }

        const newUserData = {
          name: newUser.name,
          unit: newUser.unit,
          role: newUser.role,
          personality: newUser.personality,
          avatar: avatarUrl
        };

        await axios.post('https://wodo-portfolio-backend-production.up.railway.app/User', newUserData);
        fetchUsers(); // Refresh danh sách
        setIsAddingNew(false);
        setNewUser({
          name: '',
          unit: '',
          role: '',
          personality: '',
          avatar: null
        });
      } catch (error) {
        console.error('Lỗi khi thêm người dùng mới:', error);
      }
    };
  
    return (
      <div className="profile-admin-container">
        <div className="profile-admin-header">
          <h2>Danh sách người dùng</h2>
          <button className="add-new-button" onClick={() => setIsAddingNew(true)}>Thêm người dùng mới</button>
        </div>

        <div className="user-list-header">
          <div>STT</div>
          <div>Avatar</div>
          <div>Họ tên</div>
          <div>Đơn vị</div>
          <div>Vai trò</div>
          <div>Tính cách</div>
          <div>Hành động</div>
        </div>
  
        <div className="user-list">
          {users.map((user, index) => (
            <div className="user-card" key={user.id}>
              <div className="user-stt">{index + 1}</div>
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <div className="user-info-item">{user.name}</div>
              <div className="user-info-item">{user.unit}</div>
              <div className="user-info-item">{user.role}</div>
              <div className="user-info-item">{user.personality}</div>
              <div className="user-actions">
                <button onClick={() => handleEditClick(user)}>Sửa</button>
                <button className="delete" onClick={() => handleDelete(user.id)}>Xoá</button>
              </div>
            </div>
          ))}
        </div>
  
        {editUser && (
          <div className="edit-user-modal">
          <div className="edit-form">
            <h3>Sửa thông tin người dùng</h3>
            <div>
              <label>Họ tên</label>
              <input 
                type="text" 
                value={updatedName} 
                onChange={(e) => setUpdatedName(e.target.value)} 
              />
            </div>
            <div>
              <label>Đơn vị</label>
              <input 
                type="text" 
                value={updatedUnit} 
                onChange={(e) => setUpdatedUnit(e.target.value)} 
              />
            </div>
            <div>
              <label>Vai trò</label>
              <input 
                type="text" 
                value={updatedRole} 
                onChange={(e) => setUpdatedRole(e.target.value)} 
              />
            </div>
            <div>
              <label>Tính cách</label>
              <input 
                type="text" 
                value={updatedPersonality} 
                onChange={(e) => setUpdatedPersonality(e.target.value)} 
              />
            </div>
            <div>
              <label>Chọn avatar mới</label>
              <input type="file" onChange={handleAvatarChange} />
              {isUploading && <p>Đang upload ảnh...</p>}
            </div>
            <div className="modal-actions">
              <button className="btn-add-new-profile" onClick={handleUpdate} disabled={isUploading}>Cập nhật</button>
              <button onClick={() => setEditUser(null)}>Hủy</button>
            </div>
          </div>
        </div>
        
        )}

        {isAddingNew && (
        <div className="add-user-modal">
        <div className="add-form">
          <h3>Thêm người dùng mới</h3>
          <div>
            <label>Họ tên</label>
            <input 
              type="text" 
              value={newUser.name} 
              onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))} 
            />
          </div>
          <div>
            <label>Đơn vị</label>
            <input 
              type="text" 
              value={newUser.unit} 
              onChange={(e) => setNewUser(prev => ({ ...prev, unit: e.target.value }))} 
            />
          </div>
          <div>
            <label>Vai trò</label>
            <input 
              type="text" 
              value={newUser.role} 
              onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))} 
            />
          </div>
          <div>
            <label>Tính cách</label>
            <input 
              type="text" 
              value={newUser.personality} 
              onChange={(e) => setNewUser(prev => ({ ...prev, personality: e.target.value }))} 
            />
          </div>
          <div>
            <label>Chọn avatar</label>
            <input type="file" onChange={handleNewUserAvatarChange} />
            {isUploading && <p>Đang upload ảnh...</p>}
          </div>
          <div className="modal-actions">
            <button className="btn-add-new-profile" onClick={handleAddNew} disabled={isUploading}>Thêm</button>
            <button onClick={() => setIsAddingNew(false)}>Hủy</button>
          </div>
        </div>
      </div>
      
        )}
      </div>
    );
  };
  
  export default ProfileAdmin;
  
