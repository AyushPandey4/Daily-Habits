import userContext from "./UserContext";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie
axios.defaults.withCredentials = true; // Ensures cookies are sent with every request

const UserState = (props) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authtoken"));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const host = import.meta.env.VITE_BACKEND_HOST;;

  const registerUser = async (username, email, password) => {
    try {
      const response = await axios.post(`${host}/api/user/registration`, {
        username,
        email,
        password,
      });

      const token = response.data.authtoken; // Correct token key
      if (token) {
        setAuthToken(token);
        localStorage.setItem("authtoken", token);
        setIsAuthenticated(true);
        await getUserData(token);

        // console.log("Registration successful:", response.data); // debug

        // Return success to the Register component
        return true;
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Throw the backend error message to the caller
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${host}/api/user/login`, {
        email,
        password,
      });

      const token = response.data.authtoken; // Correct token key
      if (token) {
        localStorage.setItem("authtoken", token);
        setAuthToken(token);
        setIsAuthenticated(true);
        await getUserData(token);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // Throw backend error message to the caller
        throw new Error(error.response.data.error);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  };

  const getUserData = async (token) => {
    try {
      const response = await axios.get(`${host}/api/user/me`, {
        headers: { authorization: `Bearer ${token}` }, // Use Bearer token format
        withCredentials: true, // Ensure cookies are sent (if applicable)
      });
      setUser(response.data); // Set user data
    } catch (error) {
      console.error("Error fetching user data", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        logoutUser(); // Log out on unauthorized error
      }
    }
  };

  const logoutUser = () => {
    setUser(null);
    setAuthToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("authtoken");
    Cookies.remove("authtoken");
  };

  useEffect(() => {
    const token = localStorage.getItem("authtoken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
      getUserData(token); // Fetch user data if token exists
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        authToken,
        isAuthenticated,
        loginUser,
        registerUser,
        logoutUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
