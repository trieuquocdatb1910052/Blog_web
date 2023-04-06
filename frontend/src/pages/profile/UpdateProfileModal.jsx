import { useState } from "react";
import "./update-profile.css";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/apiCalls/profileApiCall";


const UpdeteProfileModal = ({ setUpdateProfile, profile }) => {
    const dispatch = useDispatch();

    const [username, setUsername] = useState(profile.username);
    const [bio, setBio] = useState(profile.bio);
    const [password, setPassword] = useState("");

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        const updatedUser = { username, bio};

        if(password.trim() !== "") {
            updatedUser.password = password;
        }

        dispatch(updateProfile(profile?._id, updatedUser));
        setUpdateProfile(false);
    }

    return ( 
        <div className="update-profile">
            <form onSubmit={formSubmitHandler} className="update-profile-form">
                <abbr title="close">
                    <i onClick={() => setUpdateProfile(false)} className="bi bi-x-circle-fill update-profile-form-close"></i>
                </abbr>
                <h1 className="update-profile-title">Cập nhật hồ sơ của bạn</h1>
                <input type="text" className="update-profile-input" placeholder="Tên người dùng" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" className="update-profile-input" placeholder="Giới thiệu" value={bio} onChange={(e) => setBio(e.target.value)} />
                <input type="text" className="update-profile-input" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="update-profile-btn">CẬP NHẬT</button>
            </form>
        </div>
    );
}
 
export default UpdeteProfileModal;