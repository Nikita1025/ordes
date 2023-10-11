import React from 'react';

import { useForm } from 'react-hook-form';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { Button } from 'src/components/ui/button';
import { ControlledTextField } from 'src/components/ui/controlled';
import { ControlledSelect } from 'src/components/ui/controlled/controlled-select';
import {
  appNomenclaturesSelector,
  editPurchaseOrderTC,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import { EditPurchaseOrderType, NomenclaturesType } from 'src/utils';

import s from './edit-purchase-order-form.module.scss';
type EditProductFormType = {
  id: string;
  number: string;
  start_date: null | string;
  material: NomenclaturesType;
  product: NomenclaturesType;
  is_finished: boolean;
  setEditMode: (editMode: boolean) => void;
};

export const EditPurchaseOrderForm = ({
  number,
  start_date,
  material,
  product,
  is_finished,
  setEditMode,
  id,
}: EditProductFormType) => {
  const dispatch = useAppDispatch();
  const nomenclatures = useAppSelector(appNomenclaturesSelector);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditPurchaseOrderType>({
    mode: 'onTouched',
    defaultValues: {
      number: number,
      start_date: start_date,
      material: material.id,
      product: product.id,
      is_finished: is_finished,
    },
  });

  const onSubmit = handleSubmit((requestData: EditPurchaseOrderType) => {
    dispatch(editPurchaseOrderTC({ data: requestData, id: id }));
    reset();
    setEditMode(false);
  });
  const onClick = () => {
    setEditMode(false);
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
          defaultValue={material.name}
          name="material"
          control={control}
          label="Материал"
        />
        <ControlledSelect
          options={nomenclatures}
          defaultValue={product.name}
          name="product"
          control={control}
          label="Продукт"
        />
        <ControlledTextField
          control={control}
          name="is_finished"
          label="Статус"
          className={`${s.field} ${errors.is_finished && s.fieldWithError}`}
          fullWidth
        />
        <div className={s.buttons}>
          <Button type="submit" variant="primary">
            Сохранить
          </Button>
          <Button variant="link" onClick={onClick}>
            Зкарыть
          </Button>
        </div>
      </form>
    </>
  );
};
