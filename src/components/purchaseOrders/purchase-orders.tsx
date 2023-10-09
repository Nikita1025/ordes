import React, { useEffect, useState } from 'react';

import {
  useAppDispatch,
  useAppSelector,
  purchaseOrdersTC,
  appPurchaseOrdersSelector,
} from 'src/store';

import { AddPurchaseOrderForm } from '../add-purchase-order-form';
import { Button } from '../ui/button';
import { TexField } from '../ui/text-field';

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
    <div>
      <Button variant="primary" onClick={onClickAddOrder}>
        Создать заказ-наряд
      </Button>
      <TexField type="search" onChangeText={setValue} />
      {addOrder && <AddPurchaseOrderForm setAddOrder={setAddOrder} />}
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
