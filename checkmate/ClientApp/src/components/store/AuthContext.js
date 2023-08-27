import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    // Listen for changes in the token state and update the local storage accordingly
    useEffect(() => {
        localStorage.setItem('token', token)
        setIsAuthenticated(!!token);            ;
    }, [token]);

    const login = (newToken) => {
        setUser(true);
        setIsAuthenticated(true);  // Set isAuthenticated to true on successful login
        setToken(newToken);
    };

    const logout = () => {
        setUser(false);
        setIsAuthenticated(false);  // Set isAuthenticated to false on logout
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
