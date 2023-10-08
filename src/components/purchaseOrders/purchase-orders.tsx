import React, { useEffect } from 'react';

import {
  useAppDispatch,
  useAppSelector,
  purchaseOrdersTC,
  appPurchaseOrdersSelector,
} from 'src/store';

import s from './purchase-orders.module.scss';
import { PurchaseOrder } from './purchaseOrder/purchase-order';

export const PurchaseOrders = () => {
  const dispatch = useAppDispatch();
  const purchaseOrders = useAppSelector(appPurchaseOrdersSelector);

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
          id={el.id}
        />
      ))}
    </div>
  );
};
