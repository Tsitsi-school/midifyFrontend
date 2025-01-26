import React, {useState, useContext} from 'react';
import {signUpUser} from '../../api/auth';
import {Link, useNavigate} from 'react-router-dom';
import AuthContext from '../../api/authContext';
import '../pageStyles.css';

const SignUpPage = () => {
    const {signUp} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await signUpUser(firstName, lastName, email, username, password);
            signUp(data.token);
            localStorage.setItem('authToken', data.token);
            navigate('/login');
        } catch (err) {
            setError('Sign up failed.');
            console.log(err);
        }
    };

    return (
        <div className="logged-purple-overlay">
            <div className="login-page-container">
                <div className="login-container">
                    <h1 className="login-title">Create your account</h1>
                    <form className="login-form" onSubmit={handleSubmit}>
                        Enter you details:
                        <input
                            className="login-input"
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            style={{marginTop: "15px"}}
                        />
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{marginBottom: "30px"}}
                        />
                        Enter your sign in credentials:
                        <input
                            className="login-input"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{marginTop: "15px"}}
                        />
                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="login-button" type="submit">Sign up</button>
                    </form>
                    {error && <p className="login-error-message">{error}</p>}
                    <p className="login-footer">
                        Have an account?{' '}
                        <Link to="/login" className="register-link" style={{color: "#3795BDFF", fontWeight: "bold"}}>
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
