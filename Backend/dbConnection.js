const mongoose = require("mongoose");
require("dotenv").config();
// Connection URL
const dbURL = process.env.DB_URL;
// Connect to MongoDB
const connection = () => {
  mongoose
    .connect(dbURL)
    .then(() => console.log("Connected to MongoDB with Mongoose"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = connection