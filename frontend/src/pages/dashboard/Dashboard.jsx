import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the API
    fetch("http://localhost:8080/api/project/getProjects/1")
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => {
        console.error("Error fetching projects", error);
      });
  }, []);

  const handleProjectClick = (index) => {
    localStorage.setItem("project", JSON.stringify(projects[index]  ))
    navigate(`/project-build`); // Navigate to a project detail page or perform another action
  };

  const handleLogout = () => {
    navigate("/login");};
  return (
    <div className="dashboard-container">
     <header className="dashboard-header">
        <h2>Welcome to , {username}!</h2>
        <button className="logout-btn-header" onClick={handleLogout}>
          Logout
        </button>
        </header>

      <div className="projects-list">
        {projects.length > 0 ? (
          projects.map((project,index) => (
            <div
              key={project.id}
              className="project-tile"
              onClick={() => handleProjectClick(index)} // Trigger the onClick action
            >
              <h3>{project.projectName}</h3>
            </div>
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      <Link to="/create-project"> <button>Create Project</button> </Link>
    </div>
  );
};

export default Dashboard;
