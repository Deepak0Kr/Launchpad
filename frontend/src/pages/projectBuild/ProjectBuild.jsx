import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectBuild.css";

const ProjectBuild = () => {
  const [buildLogs, setBuildLogs] = useState("");
  const [projectLink, setProjectLink] = useState("Generating....");
  const navigate = useNavigate();

  const project = JSON.parse(localStorage.getItem("project"));
  let buildId = project.id;

  useEffect(() => {
    // Fetch build logs from the API
    fetch(`http://localhost:8080/api/project/getBuildLogs/${buildId}`)
      .then((response) => response.text()) // Assuming the response is plain text
      .then((data) => setBuildLogs(data))
      .catch((error) => {
        console.error("Error fetching build logs:", error);
        setBuildLogs("Failed to load build logs.");
      });
  }, [buildId]);

  const handleStartBuild = () => {
    // Logic to start the build (you can integrate this with your API)
    
    alert("Build Started!");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <header className="dashboard-header">
        <h2>Welcome to {project.projectName}</h2>
        <button className="logout-btn-header" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="project-build-container">
        <div className="top-section">
          <div className="project-link-box">
            <h3>Project Link</h3>
            <a href={projectLink} target="_blank" rel="noopener noreferrer">
              {projectLink}
            </a>
          </div>
          <button className="start-build-btn" onClick={handleStartBuild}>
            Start Build
          </button>
        </div>

        <div className="build-logs-container">
          <h3>Build Logs</h3>
          <pre className="build-logs">{buildLogs}</pre>
        </div>
      </div>
    </>
  );
};

export default ProjectBuild;