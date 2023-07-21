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
});

const UserModel = model("User", userModel);

module.exports = UserModel;
