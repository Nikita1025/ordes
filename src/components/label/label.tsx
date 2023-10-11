import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { Button } from 'src/components/ui/button';
import {
  appProductSelector,
  appPurchaseOrderSelector,
  productTC,
  useAppDispatch,
  useAppSelector,
} from 'src/store';

import s from './label.module.scss';

export const Label = () => {
  const { id: id, id_order } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(appProductSelector);
  const order = useAppSelector(appPurchaseOrderSelector);

  useEffect(() => {
    dispatch(productTC({ id: id!, id_product: id_order! }));
  }, []);

  return (
    <>
      <ErrorSnackbar />

      <div className={s.container}>
        <div className={s.block_info}>
          <span className={s.title}>{order.product.name}</span>
          <span className={s.serial}>{product.serial}</span>
          <span className={s.date}>{product.date}</span>
        </div>
        <Button className={s.button} variant="primary">
          Печатать
        </Button>
      </div>
    </>
  );
};
