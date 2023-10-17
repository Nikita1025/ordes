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

import { CheckBox } from '../ui/checkbox';

import { PurchaseOrder } from './purchase-order';
import s from './purchase-orders.module.scss';

export const PurchaseOrders = () => {
  const dispatch = useAppDispatch();
  const purchaseOrders = useAppSelector(appPurchaseOrdersSelector);
  const [value, setValue] = useState('');
  const [addOrder, setAddOrder] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState('');
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState([]);
  const [queryParams, setQueryParams] = useState({
    search: ' ',
    page: 1,
    pageCount: 6,
    min: 0,
    max: 100,
    sortPacks: '',
    user_id: '',
  });

  useEffect(() => {
    dispatch(purchaseOrdersTC({ value }));
    dispatch(nomenclaturesTC());
  }, [value]);
  const onClickAddOrder = () => {
    setAddOrder(!addOrder);
  };

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(event.target.value);
  };
  const searchFilter = purchaseOrders.filter(el =>
    el.number.toLowerCase().includes(value.toLowerCase()),
  );

  return (
    <div className={s.container}>
      <ErrorSnackbar />

      <Button variant="primary" className={s.button} onClick={onClickAddOrder}>
        Создать заказ-наряд
      </Button>
      {addOrder && <AddPurchaseOrderForm setAddOrder={setAddOrder} />}
      <CheckBox checked={checked} label="asdjkasd" onChange={setChecked} />
      <TexField type="search" className={s.input} onChangeText={setValue} value={value} />
      {searchFilter.map(el => (
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
