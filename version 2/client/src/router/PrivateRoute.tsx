import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { observer } from "mobx-react-lite";

const PrivateRoute: React.FC = observer(() => {
  const { authStore } = useStore();
  const { admin, loading } = authStore;

  if (loading) {
    return <div className="loading">Проверка доступа...</div>;
  }

  console.log("PrivateRoute admin:", admin);

  return admin ? <Outlet /> : <Navigate to="/" replace />;
});

export default PrivateRoute;
