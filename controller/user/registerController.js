const OtpModel = require("../../models/user/otp");
const UserModel = require("../../models/user/user");
const { otpTemplate } = require("../../utils/email/OtpEmplate");
const { sendMail } = require("../../utils/email/sendMail");
const { fail, success } = require("../../utils/responseFormatter");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await UserModel.create(req.body);
    // save otp
    const otpObj = await OtpModel.create({
      user: user._id,
      otp: uuidv4(),
      expiresAt: Date.now() + process.env.OTP_EXPIRE_AT * 3600000,
    });

    // send mail
    const content = otpTemplate({
      user: otpObj?.user?.toString(),
      otp: otpObj.otp,
    });
    sendMail(email, content, "Email Verification");
    return res
      .status(200)
      .json(
        success(
          "You should have received an email to verify your account",
          content
        )
      );
  } catch (e) {
    console.log(e);
    res.status(500).json(fail(e.message));
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    delete decoded.iat;
    const otpDetail = await OtpModel.findOne(decoded).populate("user");
    if (otpDetail) {
      if (otpDetail?.expiresAt > Date.now()) {
        // checking expiry date
        const user = await UserModel.findByIdAndUpdate(
          decoded.user,
          { emailVerified: true },
          { new: true }
        );
        const token = jwt.sign(
          {
            user: user._id.toString,
            emailVerified: user.emailVerified,
            email: user.email,
          },
          process.env.JWT_SECRET
        );

        return res.status(200).json(success("Email verified", { user, token }));
      } else {
        return res
          .status(400)
          .json(fail("Your link is expired. please try to verify again", 400));
      }
    } else {
      return res.status(400).json(fail("Invalid link", 400));
    }
  } catch (e) {
    res.status(500).json(fail(e.message));
  }
};

exports.resendEmail = async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.body.user);
    const otpObj = await OtpModel.create({
      user: req.body.user,
      otp: uuidv4(),
      expiresAt: Date.now() + process.env.OTP_EXPIRE_AT * 3600000,
    });

    // send mail
    const content = otpTemplate({
      user: otpObj?.user?.toString(),
      otp: otpObj.otp,
    });
    sendMail(currentUser.email, content, "Email Verification");
    return res
      .status(200)
      .json(
        success(
          "You should have received an email to verify your account",
          content
        )
      );
  } catch (e) {
    res.status(500).json(fail(e.message));
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign(
          { email, _id: user._id, emailVerified: user.emailVerified },
          process.env.JWT_SECRET
        );
        return res
          .status(200)
          .json(success("Login successful", { token, user }));
      }else{
        res.status(400).json(fail("Invalid credential")); 
      }
    } else {
      res.status(400).json(fail("You do not have an account. Please Signup"));
    }
  } catch (e) {
    res.status(500).json(fail(e.message));
  }
};
