const {model,Schema } = require("mongoose")

const otp = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    otp:{type:String},
    expiresAt: {type:Number, default: Date.now()+(process.env.OTP_EXPIRE_AT*3600000)}
})

const OtpModel = model("Otp",otp);
module.exports = OtpModel;