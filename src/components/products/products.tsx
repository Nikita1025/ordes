import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import VectorIcon from 'src//assets/icon/vector-icon';
import { PATH } from 'src/app/routes/routes';
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
} from 'src/store';

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
