import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteComment, fetchAllComments } from "../../redux/apiCalls/commentApiCall";

const CommentsTable = () => {
    const dispatch = useDispatch();
    const { comments } = useSelector((state) => state.comment);

    useEffect(() => {
        dispatch(fetchAllComments());
    }, []);

    //Delete Comment Handler
    const deleteCommentHandler = (commentId) => {
        swal({
            title: "Bạn có chắc không?",
            text: "Sau khi xóa, bạn sẽ không thể khôi phục bình luận này!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
        .then((willDelete) => {
            if (willDelete) {
                dispatch(deleteComment(commentId));
            }
        });
    }

    return ( 
        <section className="table-container">
            <AdminSidebar/>
            <div className="table-wrapper">
                <h1 className="table-title">Bình luận</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Người dùng</th>
                            <th>Bình luận</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img src={item.user.profilePhoto?.url} alt="" className="table-user-image" />
                                        <span className="table-username">{item.user.username}</span>
                                    </div>
                                </td>
                                <td>{item.text}</td>
                                <td>
                                    <div className="table-button-group">
                                        <button onClick={() => deleteCommentHandler(item._id)}>Xoá</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
 
export default CommentsTable;