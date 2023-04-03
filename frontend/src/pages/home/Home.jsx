import "./home.css";
import PostList from "../../components/posts/PostList";
import { categories } from "../../dummyData";
import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/apiCalls/postApiCall";

const Home = () => {

    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch(fetchPosts(1));
    }, []);

    return ( 
        <section className="home">
            <div className="home-hero-header">
                <div className="home-hero-header-layout">
                    <h1 className="home-title"> Welcome to Blog</h1>
                </div>
            </div>
            <div className="home-latest-post">Latest Posts</div>
            <div className="home-container">
                <PostList posts={posts}/>
                <Sidebar categories={categories}/>
            </div>
            <div className="home-see-posts-link">
                <Link to="/posts" className="home-link">
                    See All Posts
                </Link>
            </div>
        </section>    
    );
}
 
export default Home;
