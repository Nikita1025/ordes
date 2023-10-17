import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { AddPurchaseOrderForm } from 'src/components/add-purchase-order-form';
import { Button } from 'src/components/ui/button';
import { CheckBox } from 'src/components/ui/checkbox';
import { DatePick } from 'src/components/ui/date-picker';
import { TexField } from 'src/components/ui/text-field';
import {
  useAppDispatch,
  useAppSelector,
  purchaseOrdersTC,
  appPurchaseOrdersSelector,
  nomenclaturesTC,
} from 'src/store';
import { useDebounce } from 'usehooks-ts';

import { PurchaseOrder } from './purchase-order';
import s from './purchase-orders.module.scss';

export const PurchaseOrders = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const purchaseOrders = useAppSelector(appPurchaseOrdersSelector);
  const [search, setSearch] = useState('');
  const [startData, setStartData] = useState(searchParams.get('start_date') || '');
  const [addOrder, setAddOrder] = useState(false);
  const [checked, setChecked] = useState(false);
  const debouncedSearch = useDebounce<string>(search, 500);
  const debouncedDate = useDebounce<string>(startData, 500);

  useEffect(() => {
    dispatch(nomenclaturesTC());
  }, []);
  const onClickAddOrder = () => {
    setAddOrder(!addOrder);
  };

  const handleInputChange = (value: string) => {
    setSearch(value);
  };
  const onChangeStartData = (data: string) => {
    setStartData(data);
  };
  const onChangeChecked = (value: boolean) => {
    setChecked(value);
    searchParams.set('is_finished', value.toString());
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (debouncedSearch === '') return;
    searchParams.set('search', debouncedSearch);
    setSearchParams(searchParams);
  }, [debouncedSearch]);
  useEffect(() => {
    if (debouncedDate === '') return;
    searchParams.set('start_date', debouncedDate);
    setSearchParams(searchParams);
  }, [debouncedDate]);
  const resetFilters = () => {
    setSearch('');
    setStartData('');
    searchParams.delete('search');
    searchParams.delete('start_date');
    searchParams.delete('is_finished');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const params = Object.fromEntries(searchParams);

    dispatch(
      purchaseOrdersTC({
        search: params.search,
        start_date: params.start_date,
        is_finished: params.is_finished,
      }),
    );
  }, [searchParams]);
  const searchFilter = purchaseOrders.filter(
    el => el.product?.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={s.container}>
      <ErrorSnackbar />

      <Button variant="primary" className={s.button} onClick={onClickAddOrder}>
        Создать заказ-наряд
      </Button>
      {addOrder && <AddPurchaseOrderForm setAddOrder={setAddOrder} />}

      <div className={s.container_filter}>
        <DatePick label="Сортировка по дате" onChange={onChangeStartData} />
        <TexField
          placeholder="Поиск по имени продукта"
          type="search"
          className={s.input}
          onChangeText={handleInputChange}
          value={search}
        />
        <div className={s.filters}>
          <CheckBox
            checked={checked}
            label="Готовые заказ-наряды"
            onChange={onChangeChecked}
          />
          <Button variant="outlined" onClick={resetFilters}>
            Сбросить
          </Button>
        </div>
      </div>

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
