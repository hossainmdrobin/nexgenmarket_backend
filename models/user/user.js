const { Schema, model } = require("mongoose");

const userModel = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  vendorInfo: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
},{timestamps:true,timeseries:true});

const UserModel = model("User", userModel);

module.exports = UserModel;
