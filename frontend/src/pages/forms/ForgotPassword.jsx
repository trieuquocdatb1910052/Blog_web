import { useState } from "react";
import "./form.css"
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../redux/apiCalls/passwordApiCall";

const ForgotPassword = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email là bắt buộc");

        dispatch(forgotPassword(email));
    }

    return ( 
        <section className="form-container">
            <h1 className="form-title">Quên mật khẩu</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-input" id="email" placeholder="Nhập email của bạn" />
                </div>
                <button className="form-btn" type="submit">TIẾP THEO</button>
            </form>
        </section>
     );
}
 
export default ForgotPassword;