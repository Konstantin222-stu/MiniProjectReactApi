import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthorizationContext'

const PrivateRoute = () => {
  const { admin } = useAuth();

  return admin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;