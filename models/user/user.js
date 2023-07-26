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
});

const UserModel = model("User", userModel);

module.exports = UserModel;
