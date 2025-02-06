import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateProject.css";

const CreateProject = () => {
  const navigate = useNavigate();
  // State for form inputs
  const [projectType, setProjectType] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [projectName, setProjectName] = useState("");

  // State for handling submission status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // const userData = JSON.parse(localStorage.getItem("userdata"));
  const token = localStorage.getItem("userData");

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page after logging out
  };

  const handleCreateProject = async () => {
    if (!projectType || !repoLink || !projectName) {
      alert("Please fill out all fields.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");  

    console.log();
    

    try {
      const response = await fetch("http://localhost:8080/api/project/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          projectType,
          repoLink,
          projectName,
          userId: userData.id
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project.");
      }

      setSuccessMessage("Project created successfully!");
      navigate("/dashboard")
    } catch (err) {
      setError(err.message || "An error occurred while creating the project.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Create Project</h2>
        <button className="logout-btn-header" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <div className="dashboard-content">
        {/* Project Creation Form */}
        <div className="project-create-container">
          <h3>Create a New Project</h3>
          <div className="project-create-form">
            <select
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              className="project-create-input"
              required
            >
              <option value="">Select Project Type</option>
              <option value="react">React Application</option>
            </select>
            <input
              type="text"
              placeholder="Git Repository URL"
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              className="project-create-input"
              required
            />
            <input
              type="text"
              placeholder="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="project-create-input"
              required
            />
            <button
              className="project-create-btn"
              onClick={handleCreateProject}
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </div>

        {/* Success & Error Messages */}
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateProject;
