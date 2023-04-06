import { Link } from "react-router-dom";
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  //Delete Post Handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Bạn có chắc không?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục bài viết này!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Bài viết</h1>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Người dùng</th>
              <th>Tiêu đề bài viết</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.user.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.user.username}</span>
                  </div>
                </td>
                <td>{item.title}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/posts/details/${item._id}`}>Xem</Link>
                    </button>
                    <button onClick={() => deletePostHandler(item._id)}>Xoá</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PostsTable;
