import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const token = useSelector((state) => state.auth.token || localStorage.getItem('token'));

    let isTokenValid = false;
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            isTokenValid = decodedToken.exp * 1000 > Date.now();  // Check if token is expired
        } catch (error) {
            console.error("Invalid token", error);
            isTokenValid = false;
        }
    }

    return isTokenValid ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
