import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
  purchaseOrdersTC,
  appPurchaseOrdersSelector,
} from 'src/store';

import { PATH } from '../../app/routes/routes';
import VectorIcon from '../../assets/icon/vector-icon';
import { ErrorSnackbar } from '../../common/errorSnackbar/error-snackbar';
import {
  appProductsSelector,
  createProductTC,
  productsTC,
} from '../../store/products-slice';
import { Button } from '../ui/button';
import { TexField } from '../ui/text-field';

import { Product } from './product/product';
import s from './products.module.scss';

export const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(appProductsSelector);
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const data = {
    weight: value,
  };

  useEffect(() => {
    dispatch(productsTC(id!));
  }, [id]);

  const onClickBack = () => {
    navigate(PATH.MAIN + id);
  };
  const onClickCreateProduct = () => {
    dispatch(createProductTC({ id: id!, data }));
  };

  return (
    <div>
      <ErrorSnackbar />
      <div className={s.back_container} onClick={onClickBack}>
        <VectorIcon />
        <span className={s.back}>Назад</span>
      </div>
      <div>
        <TexField label="Введите массу" value={value} onChangeText={setValue} />
        <Button variant="primary" onClick={onClickCreateProduct}>
          Сохранить
        </Button>
      </div>
      <div className={s.container}>
        {products?.map(el => <Product key={el.id} {...el} />)}
      </div>
    </div>
  );
};
