import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
const ResetPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const email = location.state?.email || "";
    
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleReset = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        
        fetch("http://localhost:8080/api/users/reset-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, newPassword }),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                alert("Password reset successful!");
                navigate("/login");
            } else {
                setError("Failed to reset password. Please try again.");
            }
        })
        .catch((error) => {
            console.error("Error resetting password:", error);
            setError("Something went wrong. Please try again later.");
        });
    };

    return (
        <div className="reset-password-container">
            <h2>Reset Password</h2>
            <p>Enter your new password for <strong>{email}</strong></p>
            <form onSubmit={handleReset}>
                <div className="input-group">
                    <label>New Password</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="Enter new password" 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Confirm New Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="Confirm new password" 
                        required 
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="reset-btn">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;
