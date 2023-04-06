import { useState } from "react";
import "./update-comment.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { updateComment } from "../../redux/apiCalls/commentApiCall";

const UpdeteCommentModel = ({ setUpdateComment, commentForUpdate }) => {
    const dispatch = useDispatch();

    const [text, setText] = useState(commentForUpdate?.text);

    //Form Submit Handler
    const formSubmitHandler = (e) => {
        e.preventDefault();
        if(text.trim() === "") return toast.error("Hãy viết một cái gì đó");

        dispatch(updateComment(commentForUpdate?._id, {text}));
        setUpdateComment(false);
    }

    return ( 
        <div className="update-comment">
            <form onSubmit={formSubmitHandler} className="update-comment-form">
                <abbr title="close">
                    <i onClick={() => setUpdateComment(false)} className="bi bi-x-circle-fill update-comment-form-close"></i>
                </abbr>
                <h1 className="update-comment-title">Sửa Bình Luận</h1>
                <input type="text" className="update-comment-input" value={text} onChange={(e) => setText(e.target.value)} />
                <button type="submit" className="update-comment-btn">Sửa</button>
            </form>
        </div>
    );
}
 
export default UpdeteCommentModel;