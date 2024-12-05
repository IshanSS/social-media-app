const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, "Email is required"],
    unique: true,
    index: true, // Add this line
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  profilePicture: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
