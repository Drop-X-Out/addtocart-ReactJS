const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    contactnumber: {
      type: String,
      unique: true,
      required: true,
    },
    role: {
      type: String,
    },
    role: {
      type: String,
    },
    accessToken:{
        type: String,
        default: "",
        required: false,
    },
    refreshToken:{
        type: String,
        default: "",
        required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
