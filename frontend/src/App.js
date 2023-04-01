import { BrowserRouter, Routes, Route} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/Home.jsx";
import Login from "./pages/forms/Login.jsx";
import Register from "./pages/forms/Register.jsx";
import PostPage from "./pages/posts-page/PostsPage.jsx";
import CreatePosts from "./pages/create-post/CreatePost.jsx"
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Footer from "./components/footer/Footer";
import PostDetails from "./pages/post-details/PostDetails";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/posts" element={<PostPage/>} />
        <Route path="/posts/create-post" element={<CreatePosts/>} />
        <Route path="/posts/details/:id" element={<PostDetails/>} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
