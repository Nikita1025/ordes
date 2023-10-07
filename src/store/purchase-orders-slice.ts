import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import {
  AsyncThunkConfig,
  errorMessage,
  PurchaseOrdersResponseType,
  PurchaseOrderType,
} from 'src/utils';

import { purchaseOrdersApi } from '../api/purchase-orders-api';

import { setSubmittingAC } from './app-slice';
import { AppRootStateType } from './store';

type AuthState = {
  purchaseOrders: PurchaseOrderType[];
};

const initialState: AuthState = {
  purchaseOrders: [],
};

const slice = createSlice({
  initialState,
  name: 'nomenclatures',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(purchaseOrdersTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.purchaseOrders = action.payload;
      }
    });
  },
});

export const purchaseOrdersReducer = slice.reducer;

export const purchaseOrdersTC = createAsyncThunk<
  PurchaseOrderType[],
  void,
  AsyncThunkConfig
>('purchaseOrders/getPurchaseOrders', async (_, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await purchaseOrdersApi.getPurchaseOrders();

    dispatch(setSubmittingAC('success'));

    return res.results;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
export const appNomenclaturesSelector = (state: AppRootStateType) =>
  state.purchaseOrders.purchaseOrders;
