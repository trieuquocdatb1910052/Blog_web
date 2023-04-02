import { useState } from "react";
import "./form.css"
import { toast } from "react-toastify";

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(email.trim() === "") return toast.error("Email is required");

        console.log({ email });
    }

    return ( 
        <section className="form-container">
            <h1 className="form-title">Forgot Password</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="form-input" id="email" placeholder="Enter your email" />
                </div>
                <button className="form-btn" type="submit">Submit</button>
            </form>
        </section>
     );
}
 
export default ForgotPassword;