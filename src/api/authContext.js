import React, {createContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Check if a token exists in localStorage
        if (token) {
            setAuthToken(token);
            setIsAuthenticated(true); // Set the user as authenticated
        }
    }, []);

    const login = (token) => {
        setAuthToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token); // Save the token to localStorage
    };

    const signUp = (token) => {
        setAuthToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token); // Save the token to localStorage
    };

    const logout = () => {
        setAuthToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('authToken'); // Remove the token from localStorage
    };

    return (
        <AuthContext.Provider value={{authToken, isAuthenticated, login, signUp, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
