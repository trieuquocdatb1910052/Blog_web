import { useState } from "react";
import "./update-profile.css";

const user = {
    username: "Youssef",
    bio: "Hello my name is Youssef"
}

const UpdeteProfileModal = ({ setUpdateProfile }) => {

    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);
    const [password, setPassword] = useState("");

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();

        const updatedUser = { username, bio};

        if(password.trim() !== "") {
            updatedUser.password = password;
        }

        console.log(updatedUser);
    }

    return ( 
        <div className="update-profile">
            <form onSubmit={formSubmitHandler} className="update-profile-form">
                <abbr title="close">
                    <i onClick={() => setUpdateProfile(false)} className="bi bi-x-circle-fill update-profile-form-close"></i>
                </abbr>
                <h1 className="update-profile-title">Update Your Profile</h1>
                <input type="text" className="update-profile-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" className="update-profile-input" placeholder="Bio" value={bio} onChange={(e) => setBio(e.target.value)} />
                <input type="text" className="update-profile-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="update-profile-btn">Update Profile</button>
            </form>
        </div>
    );
}
 
export default UpdeteProfileModal;