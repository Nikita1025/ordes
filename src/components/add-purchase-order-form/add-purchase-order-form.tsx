import React from 'react';

import { useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';
import { ControlledTextField } from 'src/components/ui/controlled';
import { createPurchaseOrderTC, useAppDispatch, useAppSelector } from 'src/store';

import { appNomenclaturesSelector } from '../../store/nomenclatures-slice';
import { ControlledSelect } from '../ui/controlled/controlled-select';

import s from './add-purchase-order-form.module.scss';
type AddPurchaseOrderFormType = {
  setAddOrder: (addOrder: boolean) => void;
};

export const AddPurchaseOrderForm = ({ setAddOrder }: AddPurchaseOrderFormType) => {
  const dispatch = useAppDispatch();
  const nomenclatures = useAppSelector(appNomenclaturesSelector);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: 'onTouched',
    defaultValues: {
      number: '',
      start_date: '',
      material: 0,
      product: 0,
      is_finished: false,
    },
  });
  const onSubmit = handleSubmit((requestData: any) => {
    dispatch(createPurchaseOrderTC(requestData));
    reset();
    setAddOrder(false);
  });
  const onClick = () => {
    setAddOrder(false);
  };

  return (
    <>
      <form onSubmit={onSubmit} className={s.container}>
        <ControlledTextField
          control={control}
          name="number"
          label="Номер заказ-наряда"
          className={`${s.field} ${errors.number && s.fieldWithError}`}
        />
        <ControlledSelect
          options={nomenclatures}
          name="product"
          control={control}
          label="Продукт"
        />
        <ControlledSelect
          options={nomenclatures}
          name="product"
          control={control}
          label="Продукт"
        />
        {/*<ControlledTextField*/}
        {/*  control={control}*/}
        {/*  name="product.name"*/}
        {/*  label="Название продукта"*/}
        {/*  className={`${s.field} ${errors.product && s.fieldWithError}`}*/}
        {/*/>*/}
        {/*<ControlledTextField*/}
        {/*  control={control}*/}
        {/*  name="product.code"*/}
        {/*  label="Код продукта"*/}
        {/*  className={`${s.field} ${errors.product && s.fieldWithError}`}*/}
        {/*  fullWidth*/}
        {/*/>*/}
        {/*<ControlledTextField*/}
        {/*  control={control}*/}
        {/*  name="material.name"*/}
        {/*  label="Материал"*/}
        {/*  className={`${s.field} ${errors.material && s.fieldWithError}`}*/}
        {/*  fullWidth*/}
        {/*/>*/}
        {/*<ControlledTextField*/}
        {/*  control={control}*/}
        {/*  name="material.code"*/}
        {/*  label="Код материала"*/}
        {/*  className={`${s.field} ${errors.material && s.fieldWithError}`}*/}
        {/*  fullWidth*/}
        {/*/>*/}
        <ControlledTextField
          control={control}
          name="is_finished"
          label="Статус"
          className={`${s.field} ${errors.is_finished && s.fieldWithError}`}
          fullWidth
        />
        <div className={s.buttons}>
          <Button type="submit" variant="primary">
            Создать
          </Button>
          <Button variant="link" onClick={onClick}>
            Зкарыть
          </Button>
        </div>
      </form>
    </>
  );
};
