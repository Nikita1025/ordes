import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { productsApi } from 'src/api';
import {
  AsyncThunkConfig,
  createProductRequestType,
  errorMessage,
  ProductsResponseType,
} from 'src/utils';

import { setSubmittingAC } from './app-slice';
import { AppRootStateType } from './store';

type AuthState = {
  products: ProductsResponseType[];
};

const initialState: AuthState = {
  products: [],
};

const slice = createSlice({
  initialState,
  name: 'products',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(productsTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = action.payload;
      }
    });
    // builder.addCase(purchaseOrderTC.fulfilled, (state, action) => {
    //   if (action.payload) {
    //     state.purchaseOrder = action.payload;
    //   }
    // });
  },
});

export const productsReducer = slice.reducer;

export const productsTC = createAsyncThunk<
  ProductsResponseType[],
  string,
  AsyncThunkConfig
>('products/getProducts', async (id, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await productsApi.getProducts(id);

    dispatch(setSubmittingAC('success'));

    return res;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
export const createProductTC = createAsyncThunk<
  ProductsResponseType,
  createProductRequestType,
  AsyncThunkConfig
>('products/createProduct', async (data, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await productsApi.createProduct(data);

    dispatch(productsTC(data.id));
    dispatch(setSubmittingAC('success'));

    return res;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
// export const editPurchaseOrderTC = createAsyncThunk<
//   PurchaseOrderType,
//   EditRequestPurchaseOrderType,
//   AsyncThunkConfig
// >(
//   'purchaseOrders/editPurchaseOrder',
//   async ({ data, id }, { dispatch, rejectWithValue }) => {
//     dispatch(setSubmittingAC('loading'));
//     try {
//       const res = await purchaseOrdersApi.editPurchaseOrder(data, id);
//
//       dispatch(setSubmittingAC('success'));
//
//       return res;
//     } catch (e) {
//       const error = e as Error | AxiosError;
//
//       return rejectWithValue(errorMessage(dispatch, error));
//     }
//   },
// );
// export const createPurchaseOrderTC = createAsyncThunk<
//   PurchaseOrderType,
//   EditRequestPurchaseOrderType,
//   AsyncThunkConfig
// >(
//   'purchaseOrders/createPurchaseOrder',
//   async ({ data, id }, { dispatch, rejectWithValue }) => {
//     dispatch(setSubmittingAC('loading'));
//     try {
//       const res = await purchaseOrdersApi.addPurchaseOrder(data);
//
//       dispatch(setSubmittingAC('success'));
//
//       return res;
//     } catch (e) {
//       const error = e as Error | AxiosError;
//
//       return rejectWithValue(errorMessage(dispatch, error));
//     }
//   },
// );
// export const appPurchaseOrdersSelector = (state: AppRootStateType) =>
//   state.purchaseOrders.purchaseOrders;
export const appProductsSelector = (state: AppRootStateType) => state.products.products;
