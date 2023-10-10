import React from 'react';

import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { PATH } from 'src/app/routes/routes';

export const PrivateRoutes = () => {
  const token = Cookies.get('Token');

  return token ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
