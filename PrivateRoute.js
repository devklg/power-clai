import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/AuthContext';

const PrivateRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, loading, user } = useContext(AuthContext);

  // If not logged in, redirect to login
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  // If requireAdmin is true, check if user is admin
  if (requireAdmin && user && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  // If still loading, show loading spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // If authenticated and passes role check, render the children
  return children;
};

export default PrivateRoute;
