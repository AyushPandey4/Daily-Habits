const mongoose = require("mongoose");
// Define a schema
const noteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: [String],
  },
  createdAt: { type: Date, default: Date.now },
});
// Create a model
const notesModel = mongoose.model("notes", noteSchema);

module.exports = notesModel;
