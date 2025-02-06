import { useNavigate,Link } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userData = JSON.parse(localStorage.getItem("userData"))
  // const token = userData.token;
  console.log(userData);
   
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects from the API
    fetch("http://localhost:8080/api/project/getProjects/1",{
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
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

    const handleDeleteProject = async (projectId) => {
      try {
        const response = await fetch(`http://localhost:8080/projects/${projectId}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          // Remove from UI if deletion is successful
          setProjects((prevProjects) => prevProjects.filter((project) => project.id !== projectId));
        } else {
          console.error("Failed to delete project");
        }
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    };
    

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
  className="project-tile relative p-5 border rounded-lg shadow-lg bg-white w-100 md:w-96"
  onClick={() => handleProjectClick(project.id)}
>
  <button
    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 text-xs font-bold flex items-center justify-center hover:bg-red-700"
    onClick={(e) => {
      e.stopPropagation();
      handleDeleteProject(project.id);
    }}
  >
    ✖
  </button>

  <h3 className="text-lg font-semibold">{project.projectName}</h3>
</div>


          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
      <Link to="/create-project"> <button className="text-white top-2">Create Project</button> </Link>
    </div>
  );
};

export default Dashboard;
