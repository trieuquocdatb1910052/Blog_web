import { Link, useParams, useNavigate } from "react-router-dom";
import "./post-details.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdetePostModal from "./UpdatePostModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  fetchSinglePost,
  toggleLikePost,
  updatePostImage,
} from "../../redux/apiCalls/postApiCall";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { post } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();

  const [file, setFile] = useState(null);
  const [updatePost, setUpdatePost] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchSinglePost(id));
  }, [id]);

  // Update Image Submit Handler
  const updateImageSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("No file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(updatePostImage(formData, post?._id));
  };

  const navigate = useNavigate();

  //Delete Post Handler
  const deletePostHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(post?._id));
        navigate(`/profile/${user?._id}`);
      }
    });
  };

  return (
    <section className="post-details">
      <div className="post-details-image-wrapper">
        <img
          src={file ? URL.createObjectURL(file) : post?.image.url}
          alt=""
          className="post-details-image"
        />
        {user?._id === post?.user?._id && (
          <form
            onSubmit={updateImageSubmitHandler}
            className="update-post-image-form"
          >
            <label htmlFor="file" className="update-post-label">
              <i className="bi bi-image-fill"></i>Select new image
            </label>
            <input
              style={{ display: "none" }}
              type="file"
              name="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button type="submit">Upload</button>
          </form>
        )}
      </div>
      <h1 className="post-details-title">{post?.title}</h1>
      <div className="post-details-user-info">
        <img
          className="post-details-user-image"
          src={post?.user.profilePhoto?.url}
          alt=""
        />
        <div className="post-details-user">
          <strong>
            <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
          </strong>
          <span>{new Date(post?.createdAt).toDateString()}</span>
        </div>
      </div>
      <p className="post-details-description">
        {post?.description}
        You tell me, what’s better—describing the simple car sitting in your
        all-pavement parking lot, or the one speeding down the interstate? Or
        perhaps the one slow creeping down a crowded downtown street on a Friday
        night, heads turning and eyes glued? Or perhaps the one slow creeping
        down a crowded downtown street on a Friday night, heads turning and eyes
        glued?
      </p>
      <div className="post-details-icon-wrapper">
        <div>
          {user && (
            <i
              onClick={() => dispatch(toggleLikePost(post?._id))}
              className={
                post?.likes.includes(user?._id)
                  ? "bi bi-hand-thumbs-up-fill"
                  : "bi bi-hand-thumbs-up"
              }
            ></i>
          )}
          <small>{post?.likes.length} likes</small>
        </div>
        <div>
          {user?._id === post?.user?._id && (
            <div>
              <i
                onClick={() => setUpdatePost(true)}
                className="bi bi-pencil-square"
              ></i>
              <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
            </div>
          )}
        </div>
      </div>
      {user ? (
        <AddComment postId={post?._id} />
      ) : (
        <p className="post-details-info-write">to write a comment you should login first</p>
      )}
      <CommentList comments={post?.comments} />
      {updatePost && (
        <UpdetePostModal post={post} setUpdatePost={setUpdatePost} />
      )}
    </section>
  );
};

export default PostDetails;
