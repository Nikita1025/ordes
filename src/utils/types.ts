import { AppDispatch, AppRootStateType } from 'src/store';

export type LoginFormType = {
  username: string;
  password: string;
};
export type LoginResponseType = {
  token: string;
};
export type AsyncThunkConfig = {
  state?: AppRootStateType;
  dispatch?: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export type PurchaseOrdersResponseType = {
  results: PurchaseOrderType[];
};
export type NomenclaturesResponseType = {
  results: NomenclaturesType[];
};
export type NomenclaturesType = {
  id: number;
  code: string;
  name: string;
};
export type PurchaseOrderType = {
  id: number;
  number: string;
  start_date: null | string;
  material: NomenclaturesType;
  product: NomenclaturesType;
  is_finished: boolean;
};
export type EditPurchaseOrderType = {
  id?: number;
  number?: string;
  start_date?: null | string;
  material: number;
  product: number;
  is_finished?: boolean;
};
export type CreatePurchaseOrderType = {
  id?: number;
  number?: string;
  start_date?: null | string;
  material: number;
  product: number;
  is_finished?: boolean;
};
export type EditRequestPurchaseOrderType = {
  id: string;
  data: EditPurchaseOrderType;
};

export type ProductsResponseType = {
  id: number;
  serial: string;
  weight: string;
  date: string;
};
export type createProductRequestType = {
  id: string;
  data: createProductDataType;
};
export type createProductDataType = {
  weight: string;
};
export type getProductRequestType = {
  id: string;
  id_product: string;
};
export type StatusType = 'idle' | 'loading' | 'success' | 'failed';
