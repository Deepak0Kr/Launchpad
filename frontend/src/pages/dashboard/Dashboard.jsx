import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = location.state || {};

  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing user data, redirecting to login)
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome to Your Dashboard! {username}</h2>
        <button className="logout-btn-header" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dashboard-content">
        <section className="actions-section">
          <h3>Actions</h3>
          {/* Additional content */}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
