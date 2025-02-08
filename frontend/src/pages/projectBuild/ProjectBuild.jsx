import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectBuild.css";

const ProjectBuild = () => {
  const [buildLogs, setBuildLogs] = useState("");
  const [projectLink, setProjectLink] = useState("Generating....");
  const navigate = useNavigate();

  // Get project details from localStorage
  const userData = JSON.parse(localStorage.getItem("userdata"));
  useEffect(() => {
    if (!userData || !userData.token) {
      alert("login please");
      navigate("/login");
    } 
  }, []);
  const project = JSON.parse(localStorage.getItem("project"));
  let buildId = project.id;

  // Function to fetch build logs
  const fetchBuildLogs = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/project/getBuildLogs/${project.projectName}`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch build logs.");
      }
      const logsData = await response.text();
      setBuildLogs(logsData);

      // Update project link only after logs are printed
      if (logsData.trim() !== "") {
        setProjectLink(`http://${project.projectName}.localhost:8000`);
      }
    } catch (error) {
      console.error("Error fetching build logs:", error);
      setBuildLogs("Failed to load build logs.");
    }
  };

  // Function to start the build
  const handleStartBuild = async () => {
    setBuildLogs("Build in progress...");

    try {
      // Trigger the build
      const startBuildResponse = await fetch(`http://localhost:8080/api/project/startBuild/${buildId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${userData.token}`
        },
      });

      if (!startBuildResponse.ok) {
        throw new Error("Failed to start build.");
      }

      // Fetch build logs only after successful build trigger
      await fetchBuildLogs();

    } catch (error) {
      console.error("Error:", error);
      setBuildLogs((prevLogs) => prevLogs + "\n" + error.message);
    }
  };

  // Logout and clear localStorage
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
            {projectLink === "Generating...." ? (
              <span id="linktext">{projectLink}</span> // Shows as text initially
            ) : (
              <a href={projectLink} target="_blank" rel="noopener noreferrer">
                {projectLink}
              </a>
            )}
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
