import React, { ChangeEvent, useEffect, useState } from 'react';

import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { AddPurchaseOrderForm } from 'src/components/add-purchase-order-form';
import { Button } from 'src/components/ui/button';
import { TexField } from 'src/components/ui/text-field';
import {
  useAppDispatch,
  useAppSelector,
  purchaseOrdersTC,
  appPurchaseOrdersSelector,
  nomenclaturesTC,
} from 'src/store';

import { PurchaseOrder } from './purchase-order';
import s from './purchase-orders.module.scss';

export const PurchaseOrders = () => {
  const dispatch = useAppDispatch();
  const purchaseOrders = useAppSelector(appPurchaseOrdersSelector);
  const [value, setValue] = useState('');
  const [addOrder, setAddOrder] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(purchaseOrdersTC());
    dispatch(nomenclaturesTC());
  }, [dispatch]);
  const onClickAddOrder = () => {
    setAddOrder(!addOrder);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(event.target.value);
  };

  return (
    <div className={s.container}>
      <ErrorSnackbar />

      <Button variant="primary" className={s.button} onClick={onClickAddOrder}>
        Создать заказ-наряд
      </Button>
      {addOrder && <AddPurchaseOrderForm setAddOrder={setAddOrder} />}
      <select value={sortMethod} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="date">Date</option>
      </select>
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
            start_date={el.start_date}
          />
        ))}
    </div>
  );
};
