import React, { useState } from "react";
import "./styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Login Attempted:", { email, password });

    try {
      const response = await fetch("http://localhost:3015/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login Successful:", data);
        localStorage.setItem("token", data.token); // Store the token
        // Redirect to profile page
        window.location.href = "/profile";
      } else {
        const errorData = await response.json();
        console.error("Login Failed:", errorData);
        alert(`Login failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login to Account</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <p className="signup-redirect">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
