import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import userContext from "../Context/UserContext";

const Register = () => {
  const { registerUser } = useContext(userContext); 
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(""); // For backend-specific errors
  const navigate = useNavigate(); // To navigate to login page after successful registration

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Username is required!";
    if (!email) errors.email = "Email is required!";
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email address is invalid!";
    if (!password) errors.password = "Password is required!";
    if (password.length < 6)
      errors.password = "Password must be at least 6 characters!";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors); // Set frontend validation errors
    setBackendError(""); // Clear previous backend error

    if (Object.keys(formErrors).length === 0) {
      try {
        // Call the registerUser function from the context
        const success = await registerUser(username, email, password);

        if (success) {
          // Navigate to Home page on success
          navigate("/");
        }
      } catch (error) {
        // Catch backend-specific errors
        setBackendError(error.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-teal-600 mb-8">
          Sign Up
        </h2>
        {backendError && (
          <p className="text-red-500 text-center text-sm mb-4">
            {backendError}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:border-teal-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-600 text-white rounded-lg font-semibold text-lg hover:bg-teal-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
