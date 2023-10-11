import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { LoginForm } from 'src/components/auth/loginForm';
import { Label } from 'src/components/label';
import { Products } from 'src/components/products';
import { PurchaseOrders } from 'src/components/purchase-orders';
import { PurchaseOrderPage } from 'src/components/purchase-orders-page';
import { ErrorPage } from 'src/components/ui/404';

import { PrivateRoutes } from './private-routes';
import { PATH } from './routes';

export const RoutesComponent = () => {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={PATH.MAIN} element={<PurchaseOrders />} />
          <Route path={PATH.MAIN + ':id'} element={<PurchaseOrderPage />} />
          <Route path={PATH.MAIN + ':id' + PATH.PRODUCTS} element={<Products />} />
          <Route
            path={PATH.MAIN + ':id' + PATH.PRODUCTS + ':id_order'}
            element={<Label />}
          />
        </Route>
        <Route path={PATH.LOGIN} element={<LoginForm />} />
        <Route path={'*'} element={<ErrorPage />} />
      </Routes>
    </>
  );
};
