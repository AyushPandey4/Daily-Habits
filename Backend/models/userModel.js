const mongoose = require("mongoose");
// Define a schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
});
// Create a model
const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
