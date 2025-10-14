import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthorizationContext'

const PrivateRoute = () => {
  const { admin, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Проверка доступа...</div>;
  }
  
  console.log('PrivateRoute admin:', admin);
  
  return admin ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;