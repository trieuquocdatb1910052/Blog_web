import { useEffect, useState } from "react";
import "./update-post.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/apiCalls/postApiCall";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const UpdetePostModal = ({ setUpdatePost, post }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [category, setCategory] = useState(post.category);

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Tiêu đề bài viết là bắt buộc");
    if (category.trim() === "") return toast.error("Danh mục bài viết là bắt buộc");
    if (description.trim() === "")
      return toast.error("Mô tả bài viết là bắt buộc");

    dispatch(updatePost({ title, category, description }, post?._id));
    setUpdatePost(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div className="update-post">
      <form onSubmit={formSubmitHandler} className="update-post-form">
        <abbr title="close">
          <i
            onClick={() => setUpdatePost(false)}
            className="bi bi-x-circle-fill update-post-form-close"
          ></i>
        </abbr>
        <h1 className="update-post-title">Cập nhật bài viết</h1>
        <input
          type="text"
          className="update-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="update-post-input"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value="">
          Chọn danh mục bài viết
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <textarea
          className="update-post-textarea"
          rows="5"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="update-post-btn">
          CẬP NHẬT
        </button>
      </form>
    </div>
  );
};

export default UpdetePostModal;
