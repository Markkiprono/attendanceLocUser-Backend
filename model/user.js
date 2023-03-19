const mongoose = require("mongoose");
const validator = require("validator");

const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [validator.isEmail, "Please add a valid email"],
    unique: true,
  },
  salary: {
    type: Number,
    required: true,
    trim: true,
    default: 0,
  },
  role: {
    type: String,
    required: true,
    default: "employee",
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Password must be at least 6 characters long"],
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/dzcmadjl1/image/upload/v1614030000/avatars/avatar-1_gxqjxh.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
//static signup method
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = this.password;
});
//static login method
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
//compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
