import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { appReducer } from './app-slice';
import { authReducer } from './auth-slice';
import { nomenclaturesReducer } from './nomenclatures-slice';
import { productsReducer } from './products-slice';
import { purchaseOrdersReducer } from './purchase-orders-slice';

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  purchaseOrders: purchaseOrdersReducer,
  products: productsReducer,
  nomenclatures: nomenclaturesReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppRootStateType = ReturnType<typeof rootReducer>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
