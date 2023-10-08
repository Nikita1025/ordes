import React from 'react';

import { useForm } from 'react-hook-form';
import { Button } from 'src/components/ui/button';
import { ControlledTextField } from 'src/components/ui/controlled';
import { EditPurchaseOrderType, MaterialTypeAndProductType } from 'src/utils';

import { editPurchaseOrderTC, useAppDispatch } from '../../store';

import s from './edit-purchase-order-form.module.scss';
type EditProductFormType = {
  id: string;
  number: string;
  start_date: null | string;
  material: MaterialTypeAndProductType;
  product: MaterialTypeAndProductType;
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
      material: {
        id: material.id,
        code: material.code,
        name: material.name,
      },
      product: {
        id: material.id,
        name: product.name,
        code: product.code,
      },
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
      <form onSubmit={onSubmit} className={s.container}>
        <ControlledTextField
          control={control}
          name="number"
          label="Номер заказ-наряда"
          className={`${s.field} ${errors.number && s.fieldWithError}`}
        />
        <ControlledTextField
          control={control}
          name="product.name"
          label="Название продукта"
          className={`${s.field} ${errors.product?.name && s.fieldWithError}`}
        />
        <ControlledTextField
          control={control}
          name="product.code"
          label="Код продукта"
          className={`${s.field} ${errors.product?.code && s.fieldWithError}`}
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="material.name"
          label="Материал"
          className={`${s.field} ${errors.material?.name && s.fieldWithError}`}
          fullWidth
        />
        <ControlledTextField
          control={control}
          name="material.code"
          label="Код материала"
          className={`${s.field} ${errors.material?.code && s.fieldWithError}`}
          fullWidth
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
            Save
          </Button>
          <Button variant="link" onClick={onClick}>
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
