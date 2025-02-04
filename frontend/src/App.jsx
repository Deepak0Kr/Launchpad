import "./App.css";
import { Link } from "react-router-dom";


const App = () => {
  return (
    <div>
      {/* Header */}
      <header>
        <div className="header-title">Launchpad</div>
        <div className="auth-buttons">
          <Link to="/login">
            <button className="login">Login</button>
          </Link>
          <Link to="/signup">
              <button className="signup">Sign Up</button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* <img
          src="\freepik__the-style-is-candid-image-photography-with-natural__59550.png"
          alt="Placeholder"
        /> */}
        <h1>Welcome to Our Platform</h1>
        <p>
          Join us and experience the best service with seamless login and signup options.
        </p>
      </main>
    </div>
  );
};

export default App;
