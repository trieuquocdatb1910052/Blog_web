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
import Category from "./pages/category/Category";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="posts">
          <Route index element={<PostPage/>} />
          <Route path="create-post" element={<CreatePosts/>} />
          <Route path="details/:id" element={<PostDetails/>} />
          <Route path="categories/:category" element={<Category/>} />
        </Route>
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
