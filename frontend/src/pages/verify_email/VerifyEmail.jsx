import { Link } from "react-router-dom";
import "./verify-email.css";

const VerifyEmail = () => {
  const isEmailVerified = true;

  return (
    <section className="verify-email">
      {isEmailVerified ? <>
        <i className="bi bi-patch-check verify-email-icon"></i>
        <h1 className="verify-email-title">Your email address has been successfully verified</h1>
        <Link to="/login" className="verify-email-link">Go To Login Page</Link>
      </> : <>
        <h1 className="verify-email-not-found">Not Found</h1>
      </>}
    </section>
  );
};

export default VerifyEmail;
