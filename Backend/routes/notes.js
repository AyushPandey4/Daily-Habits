const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authUser");
const notesModel = require("../models/notesModel");

//route 1: get all notes from user only (login required)
router.get("/notes", authenticateToken, async (req, res) => {
  try {
    const notes = await notesModel
      .find({ user: req.user.id })
      .populate("user", "email username"); // Populates user details
    res.json(notes); // Sends user-specific notes to the frontend
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route 2: add a new note (login required)
router.post("/addnote", authenticateToken, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Check if req.user.id is correctly populated
    // console.log("User ID from Token:", req.user.id); // This should log the user id //debug
    const saveNote = await new notesModel({
      title,
      description,
      tag,
      user: req.user.id,
    }).save();
    res.json(saveNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route 3: update an exixting node (login required)
router.put("/updatenote/:id", authenticateToken, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    const note = await notesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // this is to check if user is updateing only his notes and not other's
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const updatedNote = await notesModel.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true } // Return the updated note
    );
    res.json(updatedNote);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//route 4: deleting an note (login required)
router.delete("/deletenote/:id", authenticateToken, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await notesModel.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // this is to check if user is deleteing only his notes and not other's
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    const deletedNote = await notesModel.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", deletedNote: deletedNote });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
