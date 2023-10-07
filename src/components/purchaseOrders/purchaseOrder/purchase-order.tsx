import React, { useState } from 'react';

import DeleteIcon from 'src/assets/icon/delete-icon';
import EditIcon from 'src/assets/icon/edit-icon';
import { MaterialTypeAndProductType } from 'src/utils';

import s from './purchase-order.module.scss';

type PurchaseOrderType = {
  product: MaterialTypeAndProductType;
  number: string;
  is_finished: boolean;
};
export const PurchaseOrder = ({ product, number, is_finished }: PurchaseOrderType) => {
  const [editMode, setEditMode] = useState(false);
  // const onClickEditMode = () => {
  //   setEditMode(!editMode);
  // };
  // const onClickDelete = () => {
  //   mutate();
  // };

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
                <span className={s.title}>{product.name}</span>
                <span className={s.category}>{number}</span>
                <span className={s.price}>{product.code}</span>
              </div>
            </div>
          </div>
          <div className={s.icons}>
            <EditIcon className={s.icon} />
            <DeleteIcon className={s.icon} />
          </div>
        </>
        {/*)}*/}
      </div>
    </>
  );
};
