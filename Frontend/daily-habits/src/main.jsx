import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import UserState from './Context/UserState';  // Import UserState
import NotesState from './Context/NotesState';  // Import NotesState 

createRoot(document.getElementById("root")).render(
    <UserState>  {/* Provide the UserContext to the entire app */}
    <NotesState>  {/* You can also provide other context if needed */}
      <App />  {/* App will now have access to UserContext and NotesContext */}
    </NotesState>
  </UserState>

);
