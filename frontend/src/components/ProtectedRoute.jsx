import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('auth-token');

  if (!token) {
    // If no token, redirect to the home page
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
