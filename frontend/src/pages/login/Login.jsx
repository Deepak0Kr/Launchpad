import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Importing new CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {

    fetch("http://localhost:8080/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password}), // Convert the data to JSON
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if(data){
          navigate("/dashboard",  { state: { data,username } });
        }else{
          alert("wrong id pass.");
        }
      })
      .catch((error) => {
        console.log("Error login user:", error);
        alert("Failed to login user.");
      });

    // console.log("Logging in with:", { username, password, rememberMe });
  };

  return (
    <div>
      <header>
        <div className="header-title">Launchpad</div>
        <div className="auth-buttons">
          <button className="signup">Sign Up</button>
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
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            Remember Me
          </label>
          <button className="forgot-password">Forgot Password?</button>
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
