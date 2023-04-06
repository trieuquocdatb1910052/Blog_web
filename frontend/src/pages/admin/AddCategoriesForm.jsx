import "./admin.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");

    // Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(title.trim() === "") return toast.error("Tiêu đề danh mục là bắt buộc");

        dispatch(createCategory({title}));
        setTitle("");
    }

    return ( 
        <div className="add-category">
            <h6 className="add-category-title">Thêm danh mục mới</h6>
            <form onSubmit={formSubmitHandler}>
                <div className="add-category-form-group">
                    <label htmlFor="title">Tiêu đề danh mục</label>
                    <input type="text" id="title" placeholder="Nhập tiêu đề danh mục " value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <button className="add-category-btn" type="submit">
                    Thêm
                </button>
            </form>
        </div>
    );
}
 
export default AddCategoryForm;