import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileAdmin.css';

type User = {
  id: number;
  UserId: number;  // Thêm trường UserId
  name: string;
  unit: string;
  NickName: string;
  ScoutsAge: string;
  UnitRole: string;
  FavoriteQuote: string;
  role: string;
  personality: string;
  avatar: string;
};

interface UserCardProps {
  user: User;
}

const ProfileAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedUnit, setUpdatedUnit] = useState('');
  const [updatedRole, setUpdatedRole] = useState('');
  const [updatedPersonality, setUpdatedPersonality] = useState('');
  const [updatedNickName, setUpdatedNickName] = useState('');
  const [updatedScoutsAge, setUpdatedScoutsAge] = useState('');
  const [updatedUnitRole, setUpdatedUnitRole] = useState('');
  const [updatedFavoriteQuote, setUpdatedFavoriteQuote] = useState('');
  const [updatedAvatar, setUpdatedAvatar] = useState<File | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [newUser, setNewUser] = useState({
    name: '',
    unit: '',
    role: '',
    personality: '',
    NickName: '',
    ScoutsAge: '',
    UnitRole: '',
    FavoriteQuote: '',
    avatar: null as File | null,
  });

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('https://wodo-portfolio-backend.onrender.com/User');
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
    setUpdatedNickName(user.NickName);
    setUpdatedScoutsAge(user.ScoutsAge);
    setUpdatedUnitRole(user.UnitRole);
    setUpdatedFavoriteQuote(user.FavoriteQuote);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUpdatedAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
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

        if (updatedAvatar) {
          avatarUrl = await uploadImage(updatedAvatar);
        }

        const updatedUser = {
          ...editUser,
          name: updatedName,
          unit: updatedUnit,
          role: updatedRole,
          personality: updatedPersonality,
          NickName: updatedNickName,
          ScoutsAge: updatedScoutsAge,
          UnitRole: updatedUnitRole,
          FavoriteQuote: updatedFavoriteQuote,
          avatar: avatarUrl,
        };

        await axios.put(`https://wodo-portfolio-backend-production.up.railway.app/User/${editUser.id}`, updatedUser);
        fetchUsers();
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
        fetchUsers();
      } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error);
      }
    }
  };

  const handleAddNew = async () => {
    try {
      let avatarUrl = '';

      if (newUser.avatar) {
        avatarUrl = await uploadImage(newUser.avatar);
      }

      // Tìm UserId lớn nhất và cộng thêm 1
      const highestUserId = users.reduce((max, user) => (user.UserId > max ? user.UserId : max), 0);
      const newUserId = highestUserId + 1;

      const newUserData = {
        UserId: newUserId, // Gán UserId mới
        name: newUser.name,
        unit: newUser.unit,
        role: newUser.role,
        personality: newUser.personality,
        NickName: newUser.NickName,
        ScoutsAge: newUser.ScoutsAge,
        UnitRole: newUser.UnitRole,
        FavoriteQuote: newUser.FavoriteQuote,
        avatar: avatarUrl,
      };

      await axios.post('https://wodo-portfolio-backend-production.up.railway.app/User', newUserData);
      fetchUsers();
      setIsAddingNew(false);
      setNewUser({
        name: '',
        unit: '',
        role: '',
        personality: '',
        NickName: '',
        ScoutsAge: '',
        UnitRole: '',
        FavoriteQuote: '',
        avatar: null,
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
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="user-avatar"
              onError={(e) => {
                console.error('Không thể load ảnh:', user.avatar);
                (e.target as HTMLImageElement).src = '/fallback-avatar.png';
              }}
            />
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
            <div><label>Họ và tên</label><input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} /></div>
            <div><label>Nickname</label><input type="text" value={updatedNickName} onChange={(e) => setUpdatedNickName(e.target.value)} /></div>
            <div><label>Thuộc đơn vị</label><input type="text" value={updatedUnit} onChange={(e) => setUpdatedUnit(e.target.value)} /></div>
            <div><label>Vai trò ở đơn vị</label><input type="text" value={updatedUnitRole} onChange={(e) => setUpdatedUnitRole(e.target.value)} /></div>
            <div><label>Vai trò trong team</label><input type="text" value={updatedRole} onChange={(e) => setUpdatedRole(e.target.value)} /></div>
            <div><label>Số năm đã sinh hoạt</label><input type="text" value={updatedScoutsAge} onChange={(e) => setUpdatedScoutsAge(e.target.value)} /></div>
            <div><label>Câu nói yêu thích</label><input type="text" value={updatedFavoriteQuote} onChange={(e) => setUpdatedFavoriteQuote(e.target.value)} /></div>
            <div><label>mô tả bản thân</label><input type="text" value={updatedPersonality} onChange={(e) => setUpdatedPersonality(e.target.value)} /></div>
            <div><label>Chọn avatar mới</label><input type="file" onChange={handleAvatarChange} /></div>
            {isUploading && <p>Đang upload ảnh...</p>}
            {avatarPreview && <img src={avatarPreview} alt="Preview" className="avatar-preview-img" />}
            <div className="modal-actions">
              <button onClick={handleUpdate} disabled={isUploading}>Cập nhật</button>
              <button onClick={() => setEditUser(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {isAddingNew && (
        <div className="add-user-modal">
          <div className="add-form">
            <h3>Thêm người dùng mới</h3>
            <div><label>Họ và tên</label><input type="text" value={newUser.name} onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))} /></div>
            <div><label>Nickname</label><input type="text" value={newUser.NickName} onChange={(e) => setNewUser(prev => ({ ...prev, NickName: e.target.value }))} /></div>
            <div><label>Thuộc đơn vị</label><input type="text" value={newUser.unit} onChange={(e) => setNewUser(prev => ({ ...prev, unit: e.target.value }))} /></div>
            <div><label>Vai trò ở đơn vị</label><input type="text" value={newUser.UnitRole} onChange={(e) => setNewUser(prev => ({ ...prev, UnitRole: e.target.value }))} /></div>
            <div><label>Vai trò trong team</label><input type="text" value={newUser.role} onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))} /></div>
            <div><label>Số năm đã sinh hoạt</label><input type="text" value={newUser.ScoutsAge} onChange={(e) => setNewUser(prev => ({ ...prev, ScoutsAge: e.target.value }))} /></div>
            <div><label>Câu nói yêu thích</label><input type="text" value={newUser.FavoriteQuote} onChange={(e) => setNewUser(prev => ({ ...prev, FavoriteQuote: e.target.value }))} /></div>
            <div><label>mô tả bản thân</label><input type="text" value={newUser.personality} onChange={(e) => setNewUser(prev => ({ ...prev, personality: e.target.value }))} /></div>
            <div><label>Chọn avatar</label><input type="file" onChange={handleNewUserAvatarChange} /></div>
            <div className="modal-actions">
              <button onClick={handleAddNew} disabled={isUploading}>Thêm thành viên</button>
              <button onClick={() => setIsAddingNew(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAdmin;
