import "./admin-table.css";
import AdminSidebar from "./AdminSidebar";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteCategory, fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  //Delete Category Handler
  const deleteCategoryHandler = (categoryId) => {
    swal({
      title: "Bạn có chắc không?",
      text: "Sau khi xóa, bạn sẽ không thể khôi phục danh mục này!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteCategory(categoryId));
      }
    });
  };

  return (
    <section className="table-container">
      <AdminSidebar />
      <div className="table-wrapper">
        <h1 className="table-title">Danh mục</h1>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tiêu đề danh mục</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <b>{item.title}</b>
                </td>
                <td>
                  <div className="table-button-group">
                    <button onClick={() => deleteCategoryHandler(item._id)}>
                      Xoá
                    </button>
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

export default CategoriesTable;
