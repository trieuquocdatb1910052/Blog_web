import { useState, useEffect } from "react";
import "./create-post.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/apiCalls/postApiCall";
import { RotatingLines } from "react-loader-spinner";
import { fetchCategories } from "../../redux/apiCalls/categoryApiCall";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title.trim() === "") return toast.error("Tiêu đề bài viết là bắt buộc");
    if (category.trim() === "") return toast.error("Danh mục bài viết là bắt buộc");
    if (description.trim() === "")
      return toast.error("Mô tả bài viết là bắt buộc");
    if (!file) return toast.error("Đăng hình ảnh là bắt buộc");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <section className="create-post">
      <h1 className="create-post-title"> Tạo bài viết mới</h1>
      <form onSubmit={formSubmitHandler} className="create-post-form">
        <input
          type="text"
          placeholder="Tiêu đề bài viết"
          className="create-post-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          className="create-post-input"
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
          className="create-post-textarea"
          rows="5"
          placeholder="Mô tả bài viết"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <input
          type="file"
          name="file"
          id="file"
          className="create-post-upload"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit" className="create-post-btn">
          {loading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="40"
              visible={true}
            />
          ) : (
            "TẠO"
          )}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
