import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { LoginForm } from 'src/components/auth/loginForm';

import { PurchaseOrderPage } from '../../components/purchaseOrderPage';
import { PurchaseOrders } from '../../components/purchaseOrders/purchase-orders';

import { PrivateRoutes } from './PrivateRoutes';
import { PATH } from './routes';

export const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={'/'} element={<PurchaseOrders />} />
          <Route path={PATH.MAIN + ':id'} element={<PurchaseOrderPage />} />
          {/*<Route path={PATH.PROFILE} element={<Profile />} />*/}
          {/*<Route path={PATH.CARDS_PACKS} element={<CardsPack />} />*/}
          {/*<Route path={PATH.LEARNING_CARDS + '/:cardsPack_id'} element={<LearningCards />} />*/}
        </Route>
        <Route path={PATH.LOGIN} element={<LoginForm />} />
        {/*<Route path={'*'} element={<Error404 />} />*/}
      </Routes>
    </>
  );
};
