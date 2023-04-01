import { Link, useParams } from "react-router-dom";
import { posts } from "../../dummyData";
import "./post-details.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddComment from "../../components/comments/AddComment";
import CommentList from "../../components/comments/CommentList";
import swal from "sweetalert";
import UpdetePostModel from "./UpdatePostModel";

const PostDetails = () => {

    const { id } = useParams();
    const post = posts.find(p => p._id === parseInt(id));

    const [file, setFile] = useState(null);
    const [updatePost, setUpdatePost] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update Image Submit Handler
    const updateImageSubmitHandler = (e) => {
        e.preventDefault();
        if(!file) return toast.warning("No file!");

        console.log("Image uploaded successfully");
    }

    //Delete Post Handler
    const deletePostHandler = () => {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
        .then((willDelete) => {
            if (willDelete) {
                swal("Post has been deleted!", {
                    icon: "success",
                });
            } else {
                swal("Something went wrong!");
            }
        });
    }

    return ( 
        <section className="post-details">
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file) : post.image} alt="" className="post-details-image" />
                <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
                    <label htmlFor="file" className="update-post-label">
                        <i className="bi bi-image-fill"></i>Select new image
                    </label>
                    <input style={{display: 'none'}} type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])}/>
                    <button type="submit">Upload</button>
                </form>
            </div>
            <h1 className="post-details-title">{post.title}</h1>
            <div className="post-details-user-info">
                <img className="post-details-user-image" src={post.user.image} alt="" />
                <div className="post-details-user">
                    <strong>
                        <Link to="/profile/1">{post.user.username}</Link>
                    </strong>
                    <span>{post.createdAt}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post.description}
                You tell me, what’s better—describing the simple car sitting in your all-pavement parking lot, or the one speeding down the interstate? 
                Or perhaps the one slow creeping down a crowded downtown street on a Friday night, heads turning and eyes glued?
                Or perhaps the one slow creeping down a crowded downtown street on a Friday night, heads turning and eyes glued?
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    <i className="bi bi-bi-hand-thumbs-up"></i>
                    <small>{post.likes.length} likes</small>
                </div>
                <div>
                    <i onClick={() => setUpdatePost(true)} className="bi bi-pencil-square"></i>
                    <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
                </div>
            </div>
            <AddComment />
            <CommentList />
            {updatePost && <UpdetePostModel post={post} setUpdatePost={setUpdatePost} />}
        </section>
    );
}
 
export default PostDetails;