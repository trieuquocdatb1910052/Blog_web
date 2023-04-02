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
        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");

        console.log({ email, password });
        dispatch(loginUser({ email, password }));
    }

    return ( 
        <section className="form-container">
            <h1 className="form-title">Login account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-input" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-input" id="password" placeholder="Enter your password" />
                </div>
                <button className="form-btn" type="submit">Login</button>
            </form>
            <div className="form-footer">
                Did you forgot your password? <Link to="/forgot-password">Forgot Password</Link>
            </div>
        </section>
     );
}
 
export default Login;