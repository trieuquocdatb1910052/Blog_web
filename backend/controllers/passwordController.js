const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail, validateNewPassword } = require("../models/User");
const crypto = require("crypto");
const VerificationToken = require("../models/VerificationToken");
const sendEmail = require("../utils/sendEmail");

/**-----------------------------------------------------
 * @desc Send Reset Password Link 
 * @route /api/password/reset-password-link
 * @method POST 
 * @access public
 -------------------------------------------------------*/
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //Get the user from DB by email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "Người dùng với email đã cho không tồn tại!" });
  }

  //Creating VerificationToken
  let verificationToken = await VerificationToken.findOne({
    userId: user._id,
  });

  if (!verificationToken) {
    verificationToken = new VerificationToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save();
  }

  //Creating link
  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;

  //Creating HTML template
  const htmlTemplate = `<a href="${link}">Nhấn vào đây để đặt lại mật khẩu của bạn</a>`;

  //Sending email
  await sendEmail(user.email, "Đặt lại mật khẩu", htmlTemplate);

  //Response to the client
  res.status(200).json({
    message: "Liên kết đặt lại mật khẩu đến email của bạn, Vui lòng kiểm tra hộp thư đến của bạn",
  });
});

/**-----------------------------------------------------
 * @desc Get Reset Password Link 
 * @route /api/password/reset-password/:userId/:token
 * @method GET 
 * @access public
 -------------------------------------------------------*/
module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Liên kết không hợp lệ" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Liên kết không hợp lệ" });
  }

  res.status(200).json({ message: "Url hợp lệ" });
});

/**-----------------------------------------------------
 * @desc Reset Password
 * @route /api/password/reset-password/:userId/:token
 * @method POST
 * @access public
 -------------------------------------------------------*/
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  //Get the user from DB by email
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({ message: "Liên kết không hợp lệ" });
  }

  const verificationToken = await VerificationToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Liên kết không hợp lệ" });
  }

  if(!user.isAccountVerified) {
    user.isAccountVerified = true;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user.password = hashedPassword;
  await user.save();
  // await verificationToken.remove();

  res.status(200).json({ message: "Đặt lại mật khẩu thành công, vui lòng đăng nhập"});
});
