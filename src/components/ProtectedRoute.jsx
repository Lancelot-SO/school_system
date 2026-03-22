import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // If no token exists, permanently replace navigation to the login screen
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the dashboard
  return children;
};

export default ProtectedRoute;
