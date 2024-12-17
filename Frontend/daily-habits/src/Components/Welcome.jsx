import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-500 to-teal-500 h-screen">
      {/* Hero Section */}
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <h1 className="text-6xl font-extrabold leading-tight mb-4 animate__animated animate__fadeIn">
          Welcome to <span className="text-yellow-400">Daily Habits</span>
        </h1>
        <p className="text-2xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
          Your path to a better and more productive life starts here.
        </p>
        {/* Call to Action */}
        <div className="flex space-x-4">
          <Link to="/registration">
            <button className="bg-yellow-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-400 transition ease-in-out duration-300 transform hover:scale-105">
              Get Started
            </button>
          </Link>
          <button className="bg-transparent border-2 border-white px-8 py-3 rounded-full text-lg font-semibold text-white hover:bg-white hover:text-black transition ease-in-out duration-300 transform hover:scale-105">
            Learn More
          </button>
        </div>
      </div>
      <div className="w-full bg-gradient-to-r from-blue-500 to-teal-500 py-16">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-5xl text-white font-extrabold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 animate__animated animate__fadeIn">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:scale-105 transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:bg-blue-50">
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 4a4 4 0 11-8 0 4 4 0 018 0zM4 12c0 1.73.56 3.31 1.5 4.5L4 20v2h2.1l1.11-5.4c.74.22 1.55.4 2.39.6V22h2v-7.5c.86-.35 1.68-.76 2.47-1.21L20 17v-2h-1.5C16.44 15.31 16 13.73 16 12c0-3.31-2.69-6-6-6s-6 2.69-6 6z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-700 mb-4">
                Track Your Habits
              </h3>
              <p className="text-gray-600">
                Monitor and track your daily habits to ensure progress and build
                a better routine.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:scale-105 transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:bg-teal-50">
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-teal-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 4h18V2H3c-1.1 0-1.99.9-1.99 2L1 22h22V6H3V4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-teal-700 mb-4">
                Personalized Suggestions
              </h3>
              <p className="text-gray-600">
                Get personalized tips and recommendations based on your goals
                and preferences.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:scale-105 transition-all duration-500 ease-in-out transform hover:shadow-2xl hover:bg-yellow-50">
              <div className="flex justify-center mb-6">
                <svg
                  className="w-16 h-16 text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.2 5.4l-1.4-1.4-7 7-7-7-1.4 1.4 7 7-7 7 1.4 1.4 7-7 7 7 1.4-1.4-7-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-yellow-700 mb-4">
                Set Goals
              </h3>
              <p className="text-gray-600">
                Set daily, weekly, or monthly goals to stay motivated and track
                your progress effectively.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
