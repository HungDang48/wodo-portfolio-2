import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './BlogAdmin.css';

type Blog = {
  id: number;
  UserId: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  img: string | null;
};

interface BlogCardProps {
  blog: Blog;
}

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedContent, setUpdatedContent] = useState('');
  const [updatedAuthor, setUpdatedAuthor] = useState('');
  const [updatedImg, setUpdatedImg] = useState<File | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: '',
    img: null as File | null,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get<Blog[]>('https://wodo-portfolio-backend-production.up.railway.app/Blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Lỗi khi fetch blogs:', error);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post('https://api.imgbb.com/1/upload?key=355c4cd37458a005d8cbebd98eceaa7a', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.data.url;
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleEditClick = (blog: Blog) => {
    setEditBlog(blog);
    setUpdatedTitle(blog.title);
    setUpdatedContent(blog.content);
    setUpdatedAuthor(blog.author);
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setUpdatedImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleNewBlogImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewBlog((prev) => ({ ...prev, img: file }));
    }
  };

  const handleUpdate = async () => {
    if (editBlog) {
      try {
        let imgUrl = editBlog.img;

        if (updatedImg) {
          imgUrl = await uploadImage(updatedImg);
        }

        const updatedBlog = {
          ...editBlog,
          title: updatedTitle,
          content: updatedContent,
          author: updatedAuthor,
          img: imgUrl,
        };

        await axios.put(`https://wodo-portfolio-backend-production.up.railway.app/Blogs/${editBlog.id}`, updatedBlog);
        fetchBlogs();
        setEditBlog(null);
      } catch (error) {
        console.error('Lỗi khi cập nhật bài viết:', error);
      }
    }
  };

  const handleDelete = async (blogId: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        await axios.delete(`https://wodo-portfolio-backend-production.up.railway.app/Blogs/${blogId}`);
        fetchBlogs();
      } catch (error) {
        console.error('Lỗi khi xóa bài viết:', error);
      }
    }
  };

  const handleAddNew = async () => {
    try {
      let imgUrl = '';

      if (newBlog.img) {
        imgUrl = await uploadImage(newBlog.img);
      }

      const newBlogData = {
        ...newBlog,
        img: imgUrl,
      };

      await axios.post('https://wodo-portfolio-backend-production.up.railway.app/Blogs', newBlogData);
      fetchBlogs();
      setIsAddingNew(false);
      setNewBlog({
        title: '',
        content: '',
        author: '',
        img: null,
      });
    } catch (error) {
      console.error('Lỗi khi thêm bài viết mới:', error);
    }
  };

  return (
    <div className="profile-admin-container">
      <div className="profile-admin-header">
        <h2>Danh sách bài viết</h2>
        <button className="add-new-button" onClick={() => setIsAddingNew(true)}>Thêm bài viết mới</button>
      </div>

      <div className="user-list-header">
        <div>STT</div>
        <div>Tiêu đề</div>
        <div>Tác giả</div>
        <div>Ngày tạo</div>
        <div>Hành động</div>
      </div>

      <div className="user-list">
        {blogs.map((blog, index) => (
          <div className="user-card" key={blog.id}>
            <div className="user-stt">{index + 1}</div>
            <div className="user-info-item">{blog.title}</div>
            <div className="user-info-item">{blog.author}</div>
            <div className="user-info-item">{blog.createdAt}</div>
            <div className="user-actions">
              <button onClick={() => handleEditClick(blog)}>Sửa</button>
              <button className="delete" onClick={() => handleDelete(blog.id)}>Xoá</button>
            </div>
          </div>
        ))}
      </div>

      {editBlog && (
        <div className="edit-user-modal">
          <div className="edit-form">
            <h3>Sửa bài viết</h3>
            <div><label>Tiêu đề</label><input type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} /></div>
            <div><label>Nội dung</label><textarea value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} /></div>
            <div><label>Tác giả</label><input type="text" value={updatedAuthor} onChange={(e) => setUpdatedAuthor(e.target.value)} /></div>
            <div><label>Chọn ảnh</label><input type="file" onChange={handleImgChange} /></div>
            {isUploading && <p>Đang upload ảnh...</p>}
            {imgPreview && <img src={imgPreview} alt="Preview" className="avatar-preview-img" />}
            <div className="modal-actions">
              <button onClick={handleUpdate} disabled={isUploading}>Cập nhật</button>
              <button onClick={() => setEditBlog(null)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      {isAddingNew && (
        <div className="add-user-modal">
          <div className="add-form">
            <h3>Thêm bài viết mới</h3>
            <div><label>Tiêu đề</label><input type="text" value={newBlog.title} onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))} /></div>
            <div><label>Nội dung</label><textarea value={newBlog.content} onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))} /></div>
            <div><label>Tác giả</label><input type="text" value={newBlog.author} onChange={(e) => setNewBlog(prev => ({ ...prev, author: e.target.value }))} /></div>
            <div><label>Chọn ảnh</label><input type="file" onChange={handleNewBlogImgChange} /></div>
            <div className="modal-actions">
              <button onClick={handleAddNew} disabled={isUploading}>Thêm bài viết</button>
              <button onClick={() => setIsAddingNew(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
