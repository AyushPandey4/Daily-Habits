import noteContext from "./NotesContext";
import { useState, useEffect } from "react";
import axios from "axios";


const NotesState = (props) => {
  const host = import.meta.env.VITE_BACKEND_HOST;;
  const [notes, setNotes] = useState([]);
  const geturl = `${host}/api/notes/notes`;
  const posturl = `${host}/api/notes/addnote`;

  const authToken = localStorage.getItem("authtoken");

  // get all notes
  const getnotes = async () => {
    if (!authToken) {
      // console.error("No auth token found"); // debug
      return; // Skip if no token is available
    }

    const config = {
      headers: {
        "Content-Type": "application/json", // If needed for your API
        authorization: `Bearer ${authToken}`, // Set the auth token here
      },
    };

    try {
      const response = await axios.get(geturl, config);
      // console.log(response.data); // debug
      setNotes(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fetch notes once the component is mounted and the token is available
  useEffect(() => {
    if (authToken) {
      getnotes(); // Call getnotes when the token is available
    } else {
      // console.log("Waiting for token to be available..."); // debug
    }
  }, [authToken]); // This will re-run if authToken changes

  // addnote
  const addnote = async (title, description, tag) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    };
    const body = {
      title,
      description,
      tag,
    };
    try {
      const response = await axios.post(posturl, body, config);
      // console.log(response.data); // debug
      setNotes((prevNotes) => [...prevNotes, response.data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // delete note
  const deletenote = async (id) => {
    const deleteurl = `${host}/api/notes/deletenote/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await axios.delete(deleteurl, config);
      // console.log(response.data); // debug
      // Remove the deleted note from the state
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // update note
  const updatenote = async (id, title, description, tag) => {
    const updateurl = `${host}/api/notes/updatenote/${id}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${authToken}`,
      },
    };
    const body = {
      title,
      description,
      tag,
    };
    try {
      const response = await axios.put(updateurl, body, config);
      // console.log(response.data); // debug
      // Update the note in the state instead of removing it
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id
            ? { ...note, title, description, tag } // Update the note that matches the id
            : note
        )
      );
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    // return provider after fectching all data
    <noteContext.Provider
      value={{ notes, getnotes, addnote, deletenote, updatenote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NotesState;
