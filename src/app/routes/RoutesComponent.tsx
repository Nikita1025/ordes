import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { LoginForm } from 'src/components/auth/loginForm';
import { Products } from 'src/components/products/products';
import { PurchaseOrderPage } from 'src/components/purchaseOrderPage';
import { PurchaseOrders } from 'src/components/purchaseOrders/purchase-orders';

import { PrivateRoutes } from './PrivateRoutes';
import { PATH } from './routes';

export const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={PATH.MAIN} element={<PurchaseOrders />} />
          <Route path={PATH.MAIN + ':id'} element={<PurchaseOrderPage />} />
          <Route path={PATH.MAIN + ':id' + PATH.PRODUCTS} element={<Products />} />
        </Route>
        <Route path={PATH.LOGIN} element={<LoginForm />} />
        {/*<Route path={'*'} element={<Error404 />} />*/}
      </Routes>
    </>
  );
};
