import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page after logging out
  };

  const handleImportRepo = () => {
    // Logic to handle Git repository import
    alert("Importing repository...");
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
            <input
              type="text"
              placeholder="https://git-provider.com/scope/repo"
              className="git-import-input"
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