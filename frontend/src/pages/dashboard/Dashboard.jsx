import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  // State for form inputs
  const [projectType, setProjectType] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [projectName, setProjectName] = useState("");

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page after logging out
  };

  const handleImportRepo = () => {
    // Basic validation
    if (!projectType || !repoLink || !projectName) {
      alert("Please fill out all fields.");
      return;
    }

    // Logic to handle Git repository import
    alert(`Importing repository...\nProject Type: ${projectType}\nRepo Link: ${repoLink}\nProject Name: ${projectName}`);
    // Here you can add API calls or further processing
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome to Your Dashboard, {username}!</h2>
        <button className="logout-btn-header" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        {/* Git Repository Import Container */}
        <div className="git-import-container">
          <h3>Import a Third-Party Git Repository</h3>
          <div className="git-import-form">
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="git-import-input"
              required
            >
              <option value="">Select Project Type</option>
              <option value="web">Web Application</option>
              <option value="mobile">Mobile Application</option>
              <option value="desktop">Desktop Application</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="https://git-provider.com/scope/repo"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              className="git-import-input"
              required
            />
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="git-import-input"
              required
            />
            <button className="git-import-btn" onClick={handleImportRepo}>
              Import
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;