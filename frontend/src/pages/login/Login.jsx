import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
       
        if (data) {
          localStorage.setItem("username", username);
          localStorage.setItem("userdata", JSON.stringify(data));
          navigate("/dashboard");
        } else {
          alert("Wrong username or password.");
        }
      })
      .catch((error) => {
        console.log("Error logging in user:", error);
        alert("Failed to log in user.");
      });
  };

  return (
    <div>
      <header>
        <Link to="/">
          <div className="header-title">Launchpad</div>
        </Link>
        <div className="auth-buttons">
          <Link to="/signup">
            <button className="signup">Sign Up</button>
          </Link>
        </div>
      </header>
      <div className="login-container">
        <h2>Login</h2>
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="options">
          <button className="forgot-password" onClick={() => navigate("/forgot-password")}>
            Forgot Password?
          </button>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
