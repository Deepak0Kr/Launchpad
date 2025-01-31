import { useState } from 'react'

import './App.css';
import React from "react";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Header */}
      <header className="w-full flex justify-between items-center p-4 bg-white shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="text-2xl font-bold text-blue-600">MyLogo</div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Login</button>
          <button className="px-4 py-2 border border-blue-500 text-blue-500 rounded">
            Sign Up
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mt-24 p-6 flex flex-col items-center text-center">
        <img
          src="https://via.placeholder.com/400"
          alt="Placeholder"
          className="rounded-lg shadow-lg mb-4"
        />
        <h1 className="text-3xl font-semibold text-gray-800">Welcome to Our Platform</h1>
        <p className="text-gray-600 mt-2 max-w-md">
          Join us and experience the best service with seamless login and signup options.
        </p>
      </main>
    </div>
  );
};

export default App;
