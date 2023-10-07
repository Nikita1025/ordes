import React, { useEffect } from 'react';

import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import {
  useAppSelector,
  appIsAuthSelector,
  useAppDispatch,
  setIsAuthAC,
} from 'src/store';

import { PATH } from './routes';

export const PrivateRoutes = () => {
  const isAuth = useAppSelector(appIsAuthSelector);
  const dispatch = useAppDispatch();
  const token = Cookies.get('Token');

  return token ? <Outlet /> : <Navigate to={PATH.LOGIN} />;
};
