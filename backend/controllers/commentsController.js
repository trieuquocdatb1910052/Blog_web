const asyncHandler = require("express-async-handler");
const { Comment, validateCreateComment, validateUpdateComment } = require("../models/Comment");
const { User } = require("../models/User");

/**-----------------------------------------------------
 * @desc Create New Comment
 * @route /api/comments 
 * @method POST 
 * @access private (only logged in user)
 -------------------------------------------------------*/
 module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
    const { error } = validateCreateComment(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const profile = await User.findById(req.user.id);

    const comment = await Comment.create({
        postId: req.body.postId,
        text: req.body.text,
        user: req.user.id,
        username: profile.username,
    });
    res.status(201).json(comment);
 });

 /**-----------------------------------------------------
 * @desc Get All Comment
 * @route /api/comments 
 * @method GET 
 * @access private (only admin)
 -------------------------------------------------------*/
 module.exports.getAllCommentsCtrl = asyncHandler(async (req, res) => {
    const comments = await Comment.find().populate("user");
    res.status(200).json(comments);
 });

/**-----------------------------------------------------
 * @desc Delete Comment
 * @route /api/comments/:id 
 * @method DELETE 
 * @access private (only admin or owner of the comment)
 -------------------------------------------------------*/
 module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if(!comment) {
        return res.status(404).json({ message: "Bình luận không tìm thấy" });
    }

    if(req.user.isAdmin || req.user.id === comment.user.toString()) {
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Bình luận đã bị xóa" });
    } else {
        res.status(403).json({ message: "Truy cập bị từ chối, không được phép" });
    }

 });

 /**-----------------------------------------------------
 * @desc Update Comment
 * @route /api/comments/:id 
 * @method PUT 
 * @access private (only owner of the comment)
 -------------------------------------------------------*/
 module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
    const { error } = validateUpdateComment(req.body);
    if(error) {
        return res.status(400).json({ message: error.details[0].message });
    }

     const comment = await Comment.findById(req.params.id);

     if(!comment) {
        return res.status(404).json({ message: "Bình luận không tìm thấy" });
     }

     if(req.user.id !== comment.user.toString()) {
        return res.status(403).json({ message: "Quyền truy cập bị từ chối, chỉ người dùng mới có thể chỉnh sửa nhận xét của mình" });
     }

     const updateComment = await Comment.findByIdAndUpdate(req.params.id, {
        $set: {
            text: req.body.text,
        }
     }, { new: true });

     res.status(200).json(updateComment);
 });