import { useEffect, useState } from "react";
import "./form.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/apiCalls/passwordApiCall";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isError } = useSelector((state) => state.password);

  const [password, setPassword] = useState("");

  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  //Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Mật khẩu là bắt buộc");

    dispatch(resetPassword(password, { userId, token }));
  };

  return (
    <section className="form-container">
      {isError ? (
        <h1>Không tìm thấy</h1>
      ) : (
        <>
          <h1 className="form-title">Đặt lại mật khẩu</h1>
          <form onSubmit={formSubmitHandler} className="form">
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Mật khẩu mới
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-input"
                id="password"
                placeholder="Nhập mật khẩu mới của bạn"
              />
            </div>
            <button className="form-btn" type="submit">
              CẬP NHẬT
            </button>
          </form>
        </>
      )}
    </section>
  );
};

export default ResetPassword;
