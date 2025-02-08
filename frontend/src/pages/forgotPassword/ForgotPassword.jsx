import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const data = {"email":email,
    "source":"forgot-password"
  }

  const handleOtpRequest = () => {
    fetch(`http://localhost:8080/api/users/send?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.text())
      .then((resData) => {
        console.log("OTP sent successfully:", resData);
        // Redirect to OTP verification page
        navigate("/otp-verification", { state: { data } });
    })
    .catch((otpError) => {
        console.error("Error sending OTP:", otpError);
        alert("Failed to send OTP.");
    });
  };

  return (
    <div>
      <header>
        <Link to="/">
          <div className="header-title">Launchpad</div>
        </Link>
      </header>
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive an OTP.</p>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <button className="reset-btn" onClick={handleOtpRequest}>
          Send OTP
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
