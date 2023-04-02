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
import UsersTable from "./pages/admin/UsersTable";
import PostsTable from "./pages/admin/PostsTable";
import CategoriesTable from "./pages/admin/CategoriesTable";
import CommentsTable from "./pages/admin/CommentsTable";
import ForgotPassword from "./pages/forms/ForgotPassword";
import ResetPassword from "./pages/forms/ResetPassword";
import NotFound from "./pages/not-found/NotFound";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/reset-password" element={<ResetPassword/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="posts">
          <Route index element={<PostPage/>} />
          <Route path="create-post" element={<CreatePosts/>} />
          <Route path="details/:id" element={<PostDetails/>} />
          <Route path="categories/:category" element={<Category/>} />
        </Route>
        <Route path="admin-dashboard">
          <Route index element={<AdminDashboard/>} />
          <Route path="users-table" element={<UsersTable/>} />
          <Route path="posts-table" element={<PostsTable/>} />
          <Route path="categories-table" element={<CategoriesTable/>} />
          <Route path="comments-table" element={<CommentsTable/>} />
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
