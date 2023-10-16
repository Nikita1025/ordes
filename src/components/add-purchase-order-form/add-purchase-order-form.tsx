import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { validateDate } from '@mui/x-date-pickers/internals';
import { useForm } from 'react-hook-form';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { Button } from 'src/components/ui/button';
import { ControlledTextField } from 'src/components/ui/controlled';
import { ControlledDataPick } from 'src/components/ui/controlled/controlled-data-pick';
import { ControlledSelect } from 'src/components/ui/controlled/controlled-select';
import { createPurchaseOrderTC, useAppDispatch, useAppSelector } from 'src/store';
import { appNomenclaturesSelector } from 'src/store/nomenclatures-slice';
import { CreatePurchaseOrderType } from 'src/utils';

import { loginSchema } from '../../common/schemas';
import { addOderSchema } from '../../common/schemas/add-oder-schema';

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
  } = useForm<CreatePurchaseOrderType>({
    mode: 'onTouched',
    resolver: zodResolver(addOderSchema()),
    defaultValues: {
      number: '',
      start_date: '',
      material: 'Выберите материал',
      product: 'Выберите продукт',
    },
  });

  const onSubmit = handleSubmit((requestData: CreatePurchaseOrderType) => {
    dispatch(createPurchaseOrderTC(requestData));
    reset();
    setAddOrder(false);
  });
  const onClick = () => {
    setAddOrder(false);
  };

  return (
    <>
      <ErrorSnackbar />
      <form onSubmit={onSubmit} className={s.container}>
        <ControlledTextField
          control={control}
          name="number"
          label="Номер заказ-наряда"
          className={`${s.field} ${errors.number && s.fieldWithError}`}
        />
        <ControlledSelect
          options={nomenclatures}
          name="material"
          control={control}
          label="Материал"
          className={`${s.field} ${errors.number && s.fieldWithError}`}
        />
        <ControlledSelect
          options={nomenclatures}
          name="product"
          control={control}
          label="Продукт"
          className={`${s.field} ${errors.number && s.fieldWithError}`}
        />
        <ControlledDataPick
          control={control}
          name="start_date"
          label="Планируемая дата производства"
          className={`${s.field} ${errors.number && s.fieldWithError}`}
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
