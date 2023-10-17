import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { editOderSchema } from 'src/common/schemas';
import { Button } from 'src/components/ui/button';
import {
  ControlledCheckbox,
  ControlledTextField,
  ControlledSelect,
} from 'src/components/ui/controlled';
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
  material: NomenclaturesType;
  product: NomenclaturesType;
  is_finished: boolean;
  setEditMode: (editMode: boolean) => void;
};

export const EditPurchaseOrderForm = ({
  number,
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
    resolver: zodResolver(editOderSchema()),
    defaultValues: {
      number: number,
      material: String(material.id),
      product: String(product.id),
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
        <ControlledTextField control={control} name="number" label="Номер заказ-наряда" />
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
        <ControlledCheckbox
          name="is_finished"
          defaultValue={is_finished}
          control={control}
          label="Статус готовности"
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
