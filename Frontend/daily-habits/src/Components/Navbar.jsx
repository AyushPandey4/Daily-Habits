import { useContext } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../Context/UserContext";

const Navbar = () => {
  const { isAuthenticated, logoutUser } = useContext(userContext); // Access user authentication state and logout function
  const navigate = useNavigate(); // To redirect after logging out

  // Handle logout
  const handleLogout = () => {
    logoutUser(); // Call the logout function from UserState
    navigate("/login"); // Redirect to the login page after logging out
  };

  return (
    <div>
      <nav className="bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 py-6 shadow-xl sticky top-0 z-10 w-full">
        <div className="container mx-auto flex justify-between items-center px-6">
          {/* Logo */}
          <div className="logo text-3xl font-extrabold text-white hover:text-teal-300 transition-all duration-300">
            <Link to="/">Daily Habits</Link>
          </div>

          {/* Navigation Links */}
          <div className="nav-links space-x-6 flex items-center">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-teal-200 transition-all duration-300 px-4 py-2 rounded-md text-lg font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/registration"
                  className="bg-teal-400 hover:bg-teal-500 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
