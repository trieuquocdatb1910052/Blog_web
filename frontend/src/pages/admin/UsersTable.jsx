import { Link } from "react-router-dom";
import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProfile, getAllUserProfile } from "../../redux/apiCalls/profileApiCall";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { profiles, isProfileDeleted } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getAllUserProfile());
  }, [isProfileDeleted]);

  //Delete User Handler
  const deleteUserHandler = (userId) => {
    swal({
      title: "Bạn có chắc không?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục người dùng này!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(userId));
      } 
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Người dùng</h1>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Người dùng</th>
              <th>Email</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((item, index) => (
              <tr key={item._id}>
                <td>{index}</td>
                <td>
                  <div className="table-image">
                    <img
                      src={item.profilePhoto?.url}
                      alt=""
                      className="table-user-image"
                    />
                    <span className="table-username">{item.username}</span>
                  </div>
                </td>
                <td>{item.email}</td>
                <td>
                  <div className="table-button-group">
                    <button>
                      <Link to={`/profile/${item._id}`}>Xem hồ sơ</Link>
                    </button>
                    <button onClick={() => deleteUserHandler(item._id)}>Xoá</button>
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

export default UsersTable;
