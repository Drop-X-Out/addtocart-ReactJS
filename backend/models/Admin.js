const mongoose = require("mongoose");



const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    contactnumber: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
    },
    password: {
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

module.exports = mongoose.model("Admin", AdminSchema);
