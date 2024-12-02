import React, { useState, useContext } from 'react';
import { loginUser, testApi } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../api/authContext';

const Login = ({ setIsLoggedIn }) => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data =await loginUser(username, password);
        // await testApi();
      setIsLoggedIn(true); // Update login status
      login(data.token); 
      alert('Login successful!');
      navigate('/'); // Redirect to DefaultLanding after login
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;


