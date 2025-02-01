import { useNavigate, useLocation } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const location = useLocation();
//   const data = location.state || {};
const { data, username } = location.state || {};

  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing user data, redirecting to login)
    navigate("/login"); // Redirect to login page after logging out
    // console.log(username);
    // console.log(name);
    // console.log(email);
    // console.log(email);
    
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2>Welcome to Your Dashboard! {username}</h2>
      </header>

      <div className="dashboard-content">
        <section className="profile-section">
          <h3>Profile Information</h3>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Username:</strong> johndoe123</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
        </section>

        <section className="actions-section">
          <h3>Actions</h3>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
