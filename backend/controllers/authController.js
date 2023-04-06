const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegisterUser,
  validateLoginUser,
} = require("../models/User");
const crypto = require("crypto");
const VerificationToken = require("../models/VerificationToken");
const sendEmail = require("../utils/sendEmail");

/**-----------------------------------------------------
 * @desc Register New User  
 * @route /api/auth/register
 * @method POST 
 * @access public
 -------------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  //validation
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //is user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "Người dùng đã tồn tại" });
  }
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //new user and save it to Db
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  //Creating new VerificationToken & save it toDB
  const verificationToken = new VerificationToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  //Making the link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  //Putting  the link into an html templete
  const htmlTemplate = `
    <div>
      <p>Nhấp vào liên kết bên dưới để xác minh email của bạn</p>
      <a href="${link}">Xác minh</a>
    </div>`;

  //Sending email to the user
  await sendEmail(user.email, "Xác nhận email của bạn", htmlTemplate);

  //Response to the client
  res
    .status(201)
    .json({
      message: "Chúng tôi gửi cho bạn một email, vui lòng xác minh địa chỉ email của bạn",
    });
  //send a response to clinet
});

/**-----------------------------------------------------
 * @desc Login User  
 * @route /api/auth/login
 * @method POST 
 * @access public
 -------------------------------------------------------*/

module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  //validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  //is user exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "Email hoặc mật khẩu không hợp lệ" });
  }
  //check the password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Email hoặc mật khẩu không hợp lệ" });
  }

  //@TODO
  if (!user.isAccountVerified) {
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

    //Making the link
    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

    //Putting  the link into an html templete
    const htmlTemplate = `
    <div>
      <p>Nhấp vào liên kết bên dưới để xác minh email của bạn</p>
      <a href="${link}">Xác minh</a>
    </div>`;

    //Sending email to the user
    await sendEmail(user.email, "Xác nhận email của bạn", htmlTemplate);

    return res
      .status(400)
      .json({
        message: "Chúng tôi gửi cho bạn một email, vui lòng xác minh địa chỉ email của bạn",
      });
  }

  //generate token(jwt)
  const token = user.generateAuthToken();
  //response to client
  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
  });
});

/**-----------------------------------------------------
 * @desc Verify User Account 
 * @route /api/auth/:userId/verify/:token
 * @method GET
 * @access public
 -------------------------------------------------------*/
module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
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

  user.isAccountVerified = true;
  await user.save();

  // await verificationToken.remove();

  res.status(200).json({ message: "Tài khoản của bạn đã được xác minh" });
});
