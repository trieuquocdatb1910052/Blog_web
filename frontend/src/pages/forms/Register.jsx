import { useState } from "react";
import "./form.css"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/apiCalls/authApiCall";
import swal from "sweetalert";

const Register = () => {
    const dispatch = useDispatch();
    const { registerMessage } = useSelector(state => state.auth);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(username.trim() === "") return toast.error("Username is required");
        if(email.trim() === "") return toast.error("Email is required");
        if(password.trim() === "") return toast.error("Password is required");

        dispatch(registerUser({ username, email, password }));
    }

    const navigate = useNavigate();

    if(registerMessage) {
        swal({
            title: registerMessage,
            icon: "success"
        }).then(isOk => {
            if(isOk) {
                //go to login page
                navigate("/login");
            }
        })
    }

    return ( 
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" className="form-input" id="username" placeholder="Enter your username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-input" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="form-input" id="password" placeholder="Enter your password" />
                </div>
                <button className="form-btn" type="submit">Register</button>
            </form>
            <div className="form-footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </section>
     );
}
 
export default Register;