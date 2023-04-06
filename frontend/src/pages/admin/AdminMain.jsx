import AddCategoryForm from "./AddCategoriesForm";
import "./admin.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";
import { getUserCount } from "../../redux/apiCalls/profileApiCall";
import { getPostsCount } from "../../redux/apiCalls/postApiCall";
import { fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const AdminMain = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { usersCount } = useSelector((state) => state.profile);
  const { postsCount } = useSelector((state) => state.post);
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getUserCount());
    dispatch(getPostsCount());
    dispatch(fetchAllComments());
  }, []);

  return (
    <div className="admin-main">
      <div className="admin-main-header">
        <div className="admin-main-card">
          <h5 className="admin-card-title">Người dùng</h5>
          <div className="admin-card-count">{usersCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/users-table" className="admin-card-link">
            Xem tất cả người dùng
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-person"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Bài viết</h5>
          <div className="admin-card-count">{postsCount}</div>
          <div className="admin-card-link-wrapper">
            <Link to="/admin-dashboard/posts-table" className="admin-card-link">
              Xem tất cả bài viết
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-file-post"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Danh mục</h5>
          <div className="admin-card-count">{categories.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              to="/admin-dashboard/categories-table"
              className="admin-card-link"
            >
              Xem tất cả danh mục
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-tag-fill"></i>
            </div>
          </div>
        </div>
        <div className="admin-main-card">
          <h5 className="admin-card-title">Bình luận</h5>
          <div className="admin-card-count">{comments.length}</div>
          <div className="admin-card-link-wrapper">
            <Link
              to="/admin-dashboard/comments-table"
              className="admin-card-link"
            >
              Xem tất cả bình luận
            </Link>
            <div className="admin-card-icon">
              <i className="bi bi-chat-left-text"></i>
            </div>
          </div>
        </div>
      </div>
      <AddCategoryForm />
    </div>
  );
};

export default AdminMain;
