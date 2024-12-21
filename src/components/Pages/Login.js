// import React, { useState, useContext } from 'react';
// import { loginUser, testApi } from '../../api/auth';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../../api/authContext';

// const Login = ({ setIsLoggedIn }) => {
//   const { login } = useContext(AuthContext);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const data =await loginUser(username, password);
//         // await testApi();
//       setIsLoggedIn(true); // Update login status
//       login(data.token);
//       alert('Login successful!');
//       navigate('/'); // Redirect to DefaultLanding after login
//     } catch (err) {
//       setError('Login failed. Please check your username and password.');
//     }
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import styled from "styled-components";
import { loginUser } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../api/authContext";

const PageContainer = styled.div`
  background-image: url("/background.png");
  color: var(--text-color);
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const LoginContainer = styled.div`
  background-color: var(--login-container-bg);
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--title-color);
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid var(--list-item-border-color);
  border-radius: 5px;
  background-color: var(--upload-container-bg);
  color: var(--text-color);

  &:focus {
    outline: 2px solid var(--upload-button-bg);
  }
`;

const LoginButton = styled.button`
  padding: 10px;
  font-size: 1rem;
  font-weight: bold;
  background-color: var(--upload-button-bg);
  color: var(--upload-button-text);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1a5cad;
  }
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  font-size: 0.9rem;
  margin-top: 10px;
`;

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
      setIsLoggedIn(true); // Update login status
      login(data.token);
      alert("Login successful!");
      navigate("/"); // Redirect to DefaultLanding after login
    } catch (err) {
      setError("Login failed. Please check your username and password.");
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <LoginButton type="submit">Login</LoginButton>
        </Form>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginContainer>
    </PageContainer>
  );
};

export default Login;
