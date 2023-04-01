import { Link } from "react-router-dom";

const PostItem = ({ post }) => {
    return ( 
        <div className="post-item">
            <div className="post-item-image-wrapper">
                <img src={post.image} alt="" className="post-item-image" />
            </div>
            <div className="post-item-info-wrapper">
                <div className="post-item-info">
                    <div className="post-item-author">
                        <strong>Author:</strong>
                        <Link className="post-item-username" to="/profile/1">{post.user.username}</Link>
                    </div>
                    <div className="post-item-date">
                        {new Date(post.createdAt).toDateString()}
                    </div>
                </div>
                <div className="post-item--details">
                    <h4 className="post-item-title">{post.title}</h4>
                    <Link className="post-item-category" to={`/posts/categories/${post.category}`}>
                        {post.category}
                    </Link>
                </div>
                <p className="post-item-description">
                    {post.description} 
                    You tell me, what’s better—describing the simple car sitting in your all-pavement parking lot, or the one speeding down the interstate? 
                    Or perhaps the one slow creeping down a crowded downtown street on a Friday night, heads turning and eyes glued?
                    Or perhaps the one slow creeping down a crowded downtown street on a Friday night, heads turning and eyes glued?
                </p>
                <Link className="post-item-link" to={`/posts/details/${post._id}`}>
                    Read More...
                </Link>
            </div>
        </div>
    );
}
 
export default PostItem;