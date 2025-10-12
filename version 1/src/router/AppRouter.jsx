import {Routes, Route, Navigate} from "react-router-dom"
import {MAIN_ROUTE} from '../router/path'
import { publicRoutes } from "./router"
// import {privateRoutes, publicRoutes} from './router'
// import { useAuth } from '../context/AuthorizationContext'
// import PrivateRoute from './PrivateRoute'

function AppRouter() {
//   const { admin } = useAuth();

  return (
    <Routes>
      {publicRoutes.map(({path, Component}) =>
        <Route key={path} path={path} Component={Component} exact/>
      )}
      {/* <Route element={<PrivateRoute />}>
        {admin ? privateRoutes.map(({path, Component}) =>
            <Route key={path} path={path} Component={Component} exact/>
        )
        :
        null}
      </Route> */}
      
        <Route path="*" element={< Navigate to={MAIN_ROUTE} replace />}/>
    </Routes>
  )
}

export default AppRouter