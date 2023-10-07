import React, { useEffect } from 'react';

import {
  useAppDispatch,
  appNomenclaturesSelector,
  useAppSelector,
  purchaseOrdersTC,
} from 'src/store';

import { PurchaseOrder } from './purchaseOrder/purchase-order';

export const PurchaseOrders = () => {
  const dispatch = useAppDispatch();
  const purchaseOrders = useAppSelector(appNomenclaturesSelector);

  useEffect(() => {
    dispatch(purchaseOrdersTC());
  }, []);

  return (
    <div>
      {purchaseOrders?.map(el => (
        <PurchaseOrder
          key={el.id}
          product={el.product}
          number={el.number}
          is_finished={el.is_finished}
        />
      ))}
    </div>
  );
};
