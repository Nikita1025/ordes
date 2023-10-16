import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
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

import { addOderSchema } from '../../common/schemas/add-oder-schema';
import { editOderSchema } from '../../common/schemas/edit-oder-schema';

import s from './edit-purchase-order-form.module.scss';
type EditProductFormType = {
  id: string;
  number: string;
  material: NomenclaturesType;
  product: NomenclaturesType;
  setEditMode: (editMode: boolean) => void;
};

export const EditPurchaseOrderForm = ({
  number,
  material,
  product,
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
