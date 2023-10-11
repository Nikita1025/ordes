import React from 'react';

import { useNavigate } from 'react-router-dom';
import { PATH } from 'src/app/routes';
import { NomenclaturesType } from 'src/utils';

import s from './purchase-order.module.scss';

type PurchaseOrderType = {
  product: NomenclaturesType;
  number: string;
  is_finished: boolean;
  id: number;
  start_date: string | null;
};
export const PurchaseOrder = ({ product, number, id, start_date }: PurchaseOrderType) => {
  const navigate = useNavigate();

  const onClickOrderHandler = (id_order: number) => {
    navigate(PATH.MAIN + `${id_order}`);
  };

  return (
    <div className={s.container}>
      <div className={s.block_info}>
        <div className={s.container_info}>
          <div className={s.info}>
            <span onClick={() => onClickOrderHandler(id)} className={s.title}>
              {product.name}
            </span>
            <span className={s.number_order}>{number}</span>
            <span className={s.code}>{product.code}</span>
            <span className={s.code}>{start_date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
