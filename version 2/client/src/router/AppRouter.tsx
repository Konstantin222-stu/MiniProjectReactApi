import {Routes, Route, Navigate} from "react-router-dom"
import {MAIN_ROUTE} from './path'
import {privateRoutes, publicRoutes} from './router'
import { useAuth } from '../context/AuthorizationContext'
import PrivateRoute from './PrivateRoute'
import type { RouteConfig } from "../types/router.type"

function AppRouter():React.JSX.Element {
  const { admin, loading } = useAuth(); 

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }
  
  console.log('AppRouter admin:', admin);
  
  return (
    <Routes>
      {publicRoutes.map(({path, Component}: RouteConfig) =>
        <Route key={path} path={path} element={<Component />} />
      )}
      
      <Route element={<PrivateRoute />}>
        {privateRoutes.map(({path, Component}: RouteConfig) =>
          <Route key={path} path={path} element={<Component />} />
        )}
      </Route>
      
      <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />}/>
    </Routes>
  )
}

export default AppRouter