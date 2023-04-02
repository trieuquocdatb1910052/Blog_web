import { useState } from "react";
import "./form.css"
import { toast } from "react-toastify";

const ResetPassword = () => {

    const [password, setPassword] = useState("");

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(password.trim() === "") return toast.error("Password is required");

        console.log({ password });
    }

    return ( 
        <section className="form-container">
            <h1 className="form-title">Reset Password</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="password" className="form-label">New Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="text" className="form-input" id="password" placeholder="Enter your new password" />
                </div>
                <button className="form-btn" type="submit">Submit</button>
            </form>
        </section>
     );
}
 
export default ResetPassword;