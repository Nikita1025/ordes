import React, { useEffect, useState } from 'react';

import {
  useAppDispatch,
  useAppSelector,
  purchaseOrdersTC,
  appPurchaseOrdersSelector,
} from 'src/store';

import { ErrorSnackbar } from '../../common/errorSnackbar/error-snackbar';
import { AddPurchaseOrderForm } from '../add-purchase-order-form';
import { Button } from '../ui/button';
import { TexField } from '../ui/text-field';

import s from './purchase-orders.module.scss';
import { PurchaseOrder } from './purchaseOrder/purchase-order';

export const PurchaseOrders = () => {
  const dispatch = useAppDispatch();
  const purchaseOrders = useAppSelector(appPurchaseOrdersSelector);
  const [value, setValue] = useState('');
  const [addOrder, setAddOrder] = useState(false);

  useEffect(() => {
    dispatch(purchaseOrdersTC());
  }, []);
  const onClickAddOrder = () => {
    setAddOrder(!addOrder);
  };

  return (
    <div className={s.container}>
      <ErrorSnackbar />

      <Button variant="primary" className={s.button} onClick={onClickAddOrder}>
        Создать заказ-наряд
      </Button>
      {addOrder && <AddPurchaseOrderForm setAddOrder={setAddOrder} />}

      <TexField type="search" className={s.input} onChangeText={setValue} value={value} />
      {purchaseOrders
        ?.filter(el => {
          if (value === '') {
            return el;
          } else if (el.product.name!.toLowerCase().includes(value.toLowerCase())) {
            return el;
          }
        })
        .map(el => (
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
