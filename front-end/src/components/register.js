import React, { useState } from "react";
import "./styles/Login.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Add state for password visibility

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Register Attempted:", { name, email, password });

    try {
      const response = await fetch("http://localhost:3015/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration Successful:", data);
        // Handle successful registration (e.g., redirect to login page)
      } else {
        const errorData = await response.json();
        console.error("Registration Failed:", errorData);
        alert(`Registration failed: ${errorData.message || "Unknown error"}`);
        // Handle registration failure (e.g., show error message)
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
      // Handle network or other errors
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
        <p className="login-redirect">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
