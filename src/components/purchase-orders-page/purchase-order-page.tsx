import React, { useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { PATH } from 'src/app/routes';
import VectorIcon from 'src/assets/icon/vector-icon';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { EditPurchaseOrderForm } from 'src/components/edit-purchase-order-form';
import { Button } from 'src/components/ui/button';
import {
  purchaseOrderTC,
  appPurchaseOrderSelector,
  useAppSelector,
  useAppDispatch,
  nomenclaturesTC,
} from 'src/store';

import s from './purchase-order-page.module.scss';
export const PurchaseOrderPage = () => {
  const dispatch = useAppDispatch();
  const order = useAppSelector(appPurchaseOrderSelector);
  const { id } = useParams();
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(purchaseOrderTC(id!));
    dispatch(nomenclaturesTC());
  }, [id]);

  const onClickBack = () => {
    navigate(PATH.MAIN);
  };
  const onClickEditMode = () => {
    setEditMode(!editMode);
  };
  const onClickProducts = () => {
    navigate(PATH.MAIN + id + PATH.PRODUCTS);
  };

  return (
    <div className={s.container_page}>
      <ErrorSnackbar />
      <div className={s.back_container} onClick={onClickBack}>
        <VectorIcon />
        <span className={s.back}>Назад</span>
      </div>
      <div className={s.container}>
        {editMode && (
          <EditPurchaseOrderForm
            setEditMode={setEditMode}
            number={order.number}
            id={id!}
            material={order.material}
            product={order.product}
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
        <div className={s.button_container}>
          <Button variant="primary" onClick={onClickEditMode} className={s.button}>
            <span>Редактировать</span>
          </Button>
          <Button variant="outlined" onClick={onClickProducts} className={s.button}>
            <span>Произведенная продукция</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
