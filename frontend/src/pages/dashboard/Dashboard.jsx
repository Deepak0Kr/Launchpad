import { useState } from "react";
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

  // State for build logs
  const [buildLogs, setBuildLogs] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page after logging out
  };

  // Function to fetch build logs once after getting the build ID
  const fetchBuildLogs = async (buildId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/project/getBuildLogs/${buildId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch build logs.");
      }
      const data = await response.text(); // Assuming logs are returned as plain text
      setBuildLogs(data);
    } catch (err) {
      setError(err.message || "An error occurred while fetching logs.");
    }
  };

  const handleImportRepo = async () => {
    if (!projectType || !repoLink || !projectName) {
      alert("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    setError("");
    setBuildLogs("");

    try {
      const response = await fetch("http://localhost:8080/api/project/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectType,
          repoLink,
          projectName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to start build process.");
      }

      const data = await response.json();
      setBuildLogs("Build process started...");

      // Fetch logs once the build ID is received
      fetchBuildLogs(data.id);

    } catch (err) {
      setError(err.message || "An error occurred while processing your request.");
    } finally {
      setIsLoading(false);
    }
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
              <option value="react">React Application</option>
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
            <button
              className="git-import-btn"
              onClick={handleImportRepo}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Start"}
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>

      {/* Build Logs Container */}
      {buildLogs && (
        <div className="build-logs-container">
          <h3>Build Logs</h3>
          <pre className="build-logs">{buildLogs}</pre>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
