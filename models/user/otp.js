const {model,Schema } = require("mongoose")

const otp = new Schema({
    user:{type:Schema.Types.ObjectId,ref:"User"},
    otp:{type:String},
    expiresAt: {type:Number}
})

const OtpModel = model("Otp",otp);
module.exports = OtpModel;