import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/store/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { isAuthenticated, token } = useContext(AuthContext);
    const location = useLocation();
    const [isValidatingToken, setIsValidatingToken] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);

    useEffect(() => {
        validateToken(token).then(isValid => {
            setIsTokenValid(isValid);
            console.log("Token validation result: ", isValid);
            setIsValidatingToken(false);
        });
    }, [token]);

    if (isValidatingToken) {
        return null;
    }

    if (!isTokenValid) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return element;
}

async function validateToken(token) {
    // Update this method to validate your token correctly
    // depending on your backend implementation
    return token != null && token !== "";
}

export default ProtectedRoute;
