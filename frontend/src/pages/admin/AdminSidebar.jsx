import "./admin.css";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
    return ( 
        <div className="admin-sidebar">
            <Link to="/admin-dashboard" className="admin-sidebar-title">
                <i className="bi bi-columns">Thống kê</i>
            </Link>
            <ul className="admin-dashboard-list">
                <Link className="admin-sidebar-link" to="/admin-dashboard/users-table">
                    <i className="bi bi-person">Người dùng</i>
                </Link>
                <Link className="admin-sidebar-link" to="/admin-dashboard/posts-table">
                    <i className="bi bi-file-post">Bài viết</i>
                </Link>
                <Link className="admin-sidebar-link" to="/admin-dashboard/categories-table">
                    <i className="bi bi-tag-fill">Danh mục</i>
                </Link>
                <Link className="admin-sidebar-link" to="/admin-dashboard/comments-table">
                    <i className="bi bi-chat-left-text">Bình luận</i>
                </Link>
            </ul>
        </div>
    );
}
 
export default AdminSidebar;