import { useState } from "react";
import "./form.css"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email là bắt buộc");
        if(password.trim() === "") return toast.error("Mật khẩu là bắt buộc");

        console.log({ email, password });
        dispatch(loginUser({ email, password }));
    }

    return ( 
        <section className="form-container">
            <h1 className="form-title">Đăng nhập tài khoản</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-input" id="email" placeholder="Nhập email của bạn" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-input" id="password" placeholder="Nhập mật khẩu của bạn" />
                </div>
                <button className="form-btn" type="submit">ĐĂNG NHẬP</button>
            </form>
            <div className="form-footer">
            Bạn đã quên mật khẩu của bạn? <Link to="/forgot-password">Quên mật khẩu</Link>
            </div>
        </section>
     );
}
 
export default Login;