import React, { useState, useContext } from "react";
import { loginUser } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../api/authContext";
import "../pageStyles.css";

const Login = ({ setIsLoggedIn }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await loginUser(username, password);
      // Update the logged in status and save auth token
      setIsLoggedIn(true);
      login(data.token);
      localStorage.setItem("authToken", data.token);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <div className="logged-purple-overlay">
      <div className="login-page-container">
        <div className="login-container">
          <h1 className="login-title">Welcome to Midify!</h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              className="login-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
          {error && <p className="login-error-message">{error}</p>}
          <p className="login-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
