import React from 'react';
import { Route } from 'react-router-dom';

import { RouteItemConfig } from '@app/types/route';

const generateRoute = (routes: RouteItemConfig[]): React.ReactNode => {
  return routes.map((route, index) => (
    <Route path={route.path} element={route.element} key={route.path + index}>
      {route.child && generateRoute(route.child)}
    </Route>
  ));
};

export default generateRoute;
