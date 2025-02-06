import "./App.css";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("userdata"))

  const handleLoginClick = () => {
    if (!userData || !userData.token) {
      navigate("/login");
    }else{
      navigate("/dashboard");
    }
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className="header-title">Launchpad</div>
        <div className="auth-buttons">
          <button className="login" onClick={handleLoginClick}>Login</button>
          <button className="signup" onClick={() => navigate("/signup")}>Sign Up</button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <h1>Welcome to Our Platform</h1>
        <p>
          Join us and experience the best service with seamless login and signup options.
        </p>
      </main>
    </div>
  );
};

export default App;
