import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import routes from './routes';
import * as RouteNames from './routeNames';

const Pages = () => {
   return (
      <Routes>
         {routes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
         ))}
         <Route path={RouteNames.BAD_URL} element={<Navigate to={RouteNames.HOME} />} />
      </Routes>
   )
}

export default Pages;