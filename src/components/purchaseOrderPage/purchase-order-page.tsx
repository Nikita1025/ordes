import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import VectorIcon from 'src/assets/icon/vector-icon';
import {
  purchaseOrderTC,
  appPurchaseOrderSelector,
  useAppSelector,
  useAppDispatch,
} from 'src/store';

import { EditPurchaseOrderForm } from '../edit-purchase-order-form';
import { Button } from '../ui/button';

import s from './purchase-order-page.module.scss';
export const PurchaseOrderPage = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(appPurchaseOrderSelector);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(purchaseOrderTC(id!));
  }, [id]);

  const onClickBack = () => {
    navigate('/');
  };
  const onClickEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      <div className={s.back_container} onClick={onClickBack}>
        <VectorIcon />
        <span className={s.back}>Back</span>
      </div>
      <div className={s.container}>
        {editMode && (
          <EditPurchaseOrderForm
            setEditMode={setEditMode}
            number={order.number}
            id={id!}
            is_finished={order.is_finished}
            material={order.material}
            product={order.product}
            start_date={order.start_date}
          />
        )}
        {!editMode && (
          <div className={s.container_info}>
            <span className={s.title}>
              Номер заказ-наряда: <span className={s.description}>{order?.number}</span>
            </span>
            <span className={s.title}>
              Название продукта:{' '}
              <span className={s.description}>{order?.product?.name}</span>
            </span>
            <span className={s.title}>
              Код продукта: <span className={s.description}>{order?.product?.code}</span>
            </span>
            {order.start_date !== null && (
              <span className={s.title}>
                Начало производства:{' '}
                <span className={s.description}>${order?.start_date}</span>
              </span>
            )}
            <span className={s.title}>
              Материал: <span className={s.description}> {order?.material?.name}</span>
            </span>
            <span className={s.title}>
              Код материала:{' '}
              <span className={s.description}>{order?.material?.code}</span>
            </span>
            <span className={s.title}>
              Статус:{' '}
              <span className={s.description}>{`${
                order?.is_finished ? 'Готов' : 'Не готов'
              }`}</span>
            </span>
          </div>
        )}

        <Button type="button" onClick={onClickEditMode} className={s.button}>
          <span>Редактировать</span>
        </Button>
      </div>
    </div>
  );
};
