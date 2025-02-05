import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const handleCreateProject = () => {
    navigate("/create-project"); // Navigate to CreateProject page
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome to Your Dashboard, {username}!</h2>
      </header>

      <div className="dashboard-content">
        <button className="create-project-btn" onClick={handleCreateProject}>
          Create Project
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
