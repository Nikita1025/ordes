import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { MaterialTypeAndProductType } from 'src/utils';

import { PATH } from '../../../app/routes/routes';

import s from './purchase-order.module.scss';

type PurchaseOrderType = {
  product: MaterialTypeAndProductType;
  number: string;
  is_finished: boolean;
  id: number;
};
export const PurchaseOrder = ({
  product,
  number,
  id,
  is_finished,
}: PurchaseOrderType) => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  // const onClickEditMode = () => {
  //   setEditMode(!editMode);
  // };
  // const onClickDelete = () => {
  //   mutate();
  // };

  const onClickOrderHandler = (id_order: number) => {
    navigate(PATH.MAIN + `${id_order}`);
  };

  return (
    <>
      <div className={s.container}>
        {/*{editMode ? (*/}
        {/*  <EditProductForm*/}
        {/*    id={id}*/}
        {/*    title={title}*/}
        {/*    description={description}*/}
        {/*    image={image}*/}
        {/*    price={price}*/}
        {/*    category={category}*/}
        {/*    setEditMode={setEditMode}*/}
        {/*  />*/}
        {/*) : (*/}
        <>
          <div className={s.block_info}>
            <div className={s.container_info}>
              <div className={s.info}>
                <span onClick={() => onClickOrderHandler(id)} className={s.title}>
                  {product.name}
                </span>
                <span className={s.number_order}>{number}</span>
                <span className={s.code}>{product.code}</span>
              </div>
            </div>
          </div>
        </>
        {/*)}*/}
      </div>
    </>
  );
};
