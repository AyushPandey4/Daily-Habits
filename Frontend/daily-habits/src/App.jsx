import { useContext, useState } from "react";
import "./index.css";
import "animate.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Notes from "./Components/Notes";
import userContext from "./Context/UserContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Welcome from "./Components/Welcome";

function App() {
  const { isAuthenticated } = useContext(userContext);
  // console.log(isAuthenticated); // Add this to see if it's being populated correctly // debug

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <Notes /> : <Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/notes" element={<Notes />} />
      </Routes>
    </Router>
  );
}

export default App;
