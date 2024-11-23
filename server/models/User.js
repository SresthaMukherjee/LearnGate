const mongoose = require("mongoose");


// Define the User schema
const UserSchema = new mongoose.Schema({
  userName: String,
  userEmail: String,
  password: String,
  role: String,
});

module.exports = mongoose.model("User", UserSchema);
