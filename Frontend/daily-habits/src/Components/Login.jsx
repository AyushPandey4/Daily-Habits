import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import userContext from "../Context/UserContext";

const Login = () => {
  const { loginUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(""); // To display backend-specific errors
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!email) errors.email = "Email is required!";
    if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email address is invalid!";
    if (!password) errors.password = "Password is required!";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      setBackendError(""); // Clear previous backend errors
      try {
        await loginUser(email, password); // Call login function
        navigate("/"); // Navigate to homepage on success
      } catch (error) {
        // Set backend error message
        setBackendError(error.message || "An unexpected error occurred.");
      }
    } else {
      setErrors(formErrors); // Set validation errors
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-teal-600 mb-8">
          Login
        </h2>
        {backendError && (
          <p className="text-red-500 text-center text-sm mb-4">
            {backendError}
          </p>
        )}
        <form onSubmit={handleSubmit}>
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
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="/registration"
              className="text-teal-600 hover:text-teal-700 font-semibold"
            >
              Sign up here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
