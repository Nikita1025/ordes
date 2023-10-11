import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from 'src/app/routes/routes';
import VectorIcon from 'src/assets/icon/vector-icon';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { addWeightSchema } from 'src/common/schemas/add-weight-schema';
import { Product } from 'src/components/products/product';
import { Button } from 'src/components/ui/button';
import { ControlledTextField } from 'src/components/ui/controlled';
import {
  useAppDispatch,
  useAppSelector,
  appProductsSelector,
  createProductTC,
  productsTC,
} from 'src/store';
import { createProductDataType } from 'src/utils';

import s from './products.module.scss';

export const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(appProductsSelector);
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createProductDataType>({
    resolver: zodResolver(addWeightSchema()),
    mode: 'onTouched',
    defaultValues: {
      weight: '',
    },
  });

  useEffect(() => {
    dispatch(productsTC(id!));
  }, [id]);

  const onClickBack = () => {
    navigate(PATH.MAIN + id);
  };
  const submitData = (data: createProductDataType) => {
    dispatch(createProductTC({ id: id!, data }));
    reset();
  };

  return (
    <div>
      <ErrorSnackbar />
      <div className={s.back_container} onClick={onClickBack}>
        <VectorIcon />
        <span className={s.back}>Назад</span>
      </div>
      <form onSubmit={handleSubmit(submitData)} className={s.add_weight}>
        <ControlledTextField
          control={control}
          name="weight"
          label="Введите массу"
          className={s.input}
        />
        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </form>
      <div className={s.container}>
        {products?.map(el => <Product key={el.id} {...el} />)}
      </div>
    </div>
  );
};
