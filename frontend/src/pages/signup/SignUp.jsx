import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        username: "",
        email: "", // Added email field
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
        } else {
            // Prepare the data to be sent to the backend
            const userData = {
                username: formData.username,
                name: formData.name,
                email: formData.email, // Include email in the payload
                password: formData.password
            };

            fetch("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            })
                .then((response) => response.json())
                .then((data) => {
                    // console.log("User registered successfully:", data);
                    // Send OTP request to the server after registration
                    const otpData = data.email ;
                   
                    
                    fetch(`http://localhost:8080/api/users/send?email=${otpData}`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        
                    })
                    .then((otpResponse) => otpResponse.text())
                    .then((resData) => {
                        console.log("OTP sent successfully:", resData);
                        // Redirect to OTP verification page
                        navigate("/otp-verification", { state: { data } });
                    })
                    .catch((otpError) => {
                        console.error("Error sending OTP:", otpError);
                        alert("Failed to send OTP.");
                    });
                })
                .catch((error) => {
                    console.error("Error registering user:", error);
                    alert("Failed to register user.");
                });
            
        }
    };

    return (
        <div>
            <header>
            <Link to="/">
        <div className="header-title">Launchpad</div>
        </Link>
                <div className="auth-buttons">
                    <Link to="/login">
                        <button className="login">Login</button>
                    </Link>
                </div>
            </header>
            <div className="signup-container">
                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label> {/* Added email field */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;