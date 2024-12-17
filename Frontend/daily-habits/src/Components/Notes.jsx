import { useContext, useEffect, useState } from "react";
import React from "react";
import noteContext from "../Context/NotesContext";

const Notes = () => {
  const { notes, getnotes, deletenote, updatenote, addnote } =
    useContext(noteContext);

  useEffect(() => {
    getnotes(); // Get notes when component mounts
  }, []);

  const handleDelete = (id) => {
    deletenote(id); // Call deletenote with the note's id
  };

  const [editableNote, setEditableNote] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleEdit = (note) => {
    setEditableNote(note); // Set the note to be edited
    setTitle(note.title);
    setDescription(note.description);
    setTag(note.tag.join(" ")); // Convert array to string for editing
  };

  const handleUpdate = () => {
    const tagsArray = tag.split(" ").map((tag) => tag.trim());
    updatenote(editableNote._id, title, description, tagsArray);
    setEditableNote(null);
    setTitle("");
    setDescription("");
    setTag("");
  };

  const [addNoteModal, setAddNoteModal] = useState(false);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (tag.length === 0) {
      setTag("general");
    }
    const tagsArray = tag.split(" ").map((tag) => tag.trim());
    addnote(title, description, tagsArray);
    setAddNoteModal(false);
    setTitle("");
    setDescription("");
    setTag("");
  };

  return (
    <div className="relative">
      {/* Add Note Button */}
      <div className="fixed bottom-10 right-10">
        <button
          onClick={() => setAddNoteModal(true)}
          className="w-16 h-16 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl shadow-lg hover:bg-teal-700 transition-all duration-300"
        >
          +
        </button>
      </div>

      {notes.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <h2 className="text-3xl font-semibold">No Notes Available</h2>
          <p>Please add a note to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4">
          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="text-gray-600">{note.description}</p>
              <p className="mt-2 text-sm text-gray-500 flex flex-wrap gap-2">
                <b>Tags:</b>
                {Array.isArray(note.tag) ? (
                  note.tag.map((t, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 font-semibold bg-gray-200 text-gray-800 rounded-full text-xs"
                    >
                      {t}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 font-semibold bg-gray-200 text-gray-800 rounded-full text-xs">
                    {note.tag}
                  </span>
                )}
              </p>

              <p className="text-xs text-gray-400 mt-2">
                <b>Created At:</b> {new Date(note.createdAt).toLocaleString()}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleEdit(note)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editableNote && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Edit Note
            </h3>
            <form>
              <div className="mb-4">
                <label className="block font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Tag</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditableNote(null)}
                  className="ml-4 px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addNoteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-2xl font-semibold text-center mb-4">
              Add a Note
            </h3>
            <form onSubmit={handleAddNote}>
              <div className="mb-4">
                <label className="block font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-2">Tag</label>
                <input
                  type="text"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-teal-500"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200"
                >
                  Add Note
                </button>
                <button
                  type="button"
                  onClick={() => setAddNoteModal(false)}
                  className="ml-4 px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notes;
