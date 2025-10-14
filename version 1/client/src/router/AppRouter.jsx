import {Routes, Route, Navigate} from "react-router-dom"
import {MAIN_ROUTE} from '../router/path'
import {privateRoutes, publicRoutes} from './router'
import { useAuth } from '../context/AuthorizationContext'
import PrivateRoute from './PrivateRoute'

function AppRouter() {
  const { admin, loading } = useAuth(); 

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }
  
  console.log('AppRouter admin:', admin);
  
  return (
    <Routes>
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} Component={Component} exact/>
      )}
      
      <Route element={<PrivateRoute />}>
        {privateRoutes.map(({path, Component}) =>
          <Route key={path} path={path} Component={Component} exact/>
        )}
      </Route>
      
      <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />}/>
    </Routes>
  )
}

export default AppRouter