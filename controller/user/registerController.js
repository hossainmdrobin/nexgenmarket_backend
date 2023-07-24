const OtpModel = require("../../models/user/otp");
const UserModel = require("../../models/user/user");
const { otpTemplate } = require("../../utils/email/OtpEmplate");
const { sendMail } = require("../../utils/email/sendMail");
const { fail } = require("../../utils/responseFormatter");
const { v4: uuidv4 } = require('uuid');

exports.signup = async (req, res, next) => {
    const {email} = req.body;
    try{
        const user = await UserModel.create(req.body);
        // save otp
        const otpObj = await OtpModel.create({user:user._id, otp:uuidv4()})

        // send mail                
        sendMail(email,otpTemplate(otpObj),"Email Verification");                
    }catch(e){
        res.status(500).json(fail(e.message));
    }
};
