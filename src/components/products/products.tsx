import React, { ChangeEvent, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from 'src/app/routes';
import VectorIcon from 'src/assets/icon/vector-icon';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { Product } from 'src/components/products/product';
import { Button } from 'src/components/ui/button';
import { TexField } from 'src/components/ui/text-field';
import {
  useAppDispatch,
  useAppSelector,
  appProductsSelector,
  createProductTC,
  productsTC,
  productErrorSelector,
} from 'src/store';

import s from './products.module.scss';

export const Products = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(productErrorSelector);
  const products = useAppSelector(appProductsSelector);
  const [weight, setWeight] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(productsTC(id!));
  }, [id]);

  const onClickBack = () => {
    navigate(PATH.MAIN + id);
  };
  const onChangeHandler = (value: string) => {
    setWeight(value);
  };
  const onClickHandler = () => {
    dispatch(createProductTC({ id: id!, data: { weight } }));
  };

  return (
    <div>
      <ErrorSnackbar />
      <div className={s.back_container} onClick={onClickBack}>
        <VectorIcon />
        <span className={s.back}>Назад</span>
      </div>
      <div className={s.add_weight}>
        <TexField
          onChangeText={onChangeHandler}
          className={s.input}
          value={weight}
          label="Введите массу"
          errorMessage={error!}
        />
        <div className={s.button_cont}>
          <Button variant="primary" className={s.button} onClick={onClickHandler}>
            Сохранить
          </Button>
        </div>
      </div>
      <div className={s.container}>
        {products?.map(el => <Product key={el.id} {...el} />)}
      </div>
    </div>
  );
};
