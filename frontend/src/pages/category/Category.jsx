import { useParams, Link } from "react-router-dom";
import "./category.css";
import PostList from "../../components/posts/PostList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";

const Category = () => {
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);

  const { category } = useParams();

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <section className="category">
      {postsCate.length === 0 ? (
        <>
          <h1 className="category-not-found">
            Không tìm thấy bài đăng có danh mục <span>{category}</span>
          </h1>
          <Link to="/posts" className="category-not-found-link">
            Tới trang bài viết
          </Link>
        </>
      ) : (
        <>
          <h1 className="category-title">Bài viết dựa trên {category}</h1>
          <PostList posts={postsCate} />
        </>
      )}
    </section>
  );
};

export default Category;
