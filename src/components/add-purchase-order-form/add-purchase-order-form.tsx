import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { addOderSchema } from 'src/common/schemas';
import { Button } from 'src/components/ui/button';
import {
  ControlledTextField,
  ControlledCheckbox,
  ControlledDataPick,
  ControlledSelect,
} from 'src/components/ui/controlled';
import {
  createPurchaseOrderTC,
  useAppDispatch,
  useAppSelector,
  appNomenclaturesSelector,
} from 'src/store';
import { CreatePurchaseOrderType } from 'src/utils';

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
      material: '',
      product: '',
      is_finished: false,
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
        <ControlledTextField control={control} name="number" label="Номер заказ-наряда" />
        <ControlledSelect
          options={nomenclatures}
          name="material"
          control={control}
          label="Материал"
        />
        <ControlledSelect
          options={nomenclatures}
          name="product"
          control={control}
          label="Продукт"
        />
        <ControlledDataPick
          control={control}
          name="start_date"
          label="Планируемая дата производства"
        />
        <ControlledCheckbox
          name="is_finished"
          control={control}
          label="Статус готовности"
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
