import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from 'src/app/routes';
import { ProductsResponseType } from 'src/utils';

import s from './product.module.scss';

export const Product = ({ serial, date, id, weight }: ProductsResponseType) => {
  const navigate = useNavigate();
  const { id: id_product } = useParams();

  const onClickOrderHandler = () => {
    navigate(PATH.MAIN + id_product + PATH.PRODUCTS + id);
  };

  return (
    <div className={s.container}>
      <div className={s.block_info}>
        <div className={s.container_info}>
          <div className={s.info}>
            <span onClick={onClickOrderHandler} className={s.title}>
              {serial}
            </span>
            <span className={s.number_order}>{weight}</span>
            <span className={s.code}>{date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
