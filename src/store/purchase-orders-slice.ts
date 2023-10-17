import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { purchaseOrdersApi } from 'src/api';
import { setSubmittingAC, AppRootStateType } from 'src/store';
import {
  AsyncThunkConfig,
  CreatePurchaseOrderType,
  EditRequestPurchaseOrderType,
  errorMessage,
  PurchaseOrderType,
} from 'src/utils';

type AuthState = {
  purchaseOrders: PurchaseOrderType[];
  purchaseOrder: PurchaseOrderType;
};

const initialState: AuthState = {
  purchaseOrders: [],
  purchaseOrder: {} as PurchaseOrderType,
};

const slice = createSlice({
  initialState,
  name: 'purchaseOrders',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(purchaseOrdersTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.purchaseOrders = action.payload;
      }
    });
    builder.addCase(purchaseOrderTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.purchaseOrder = action.payload;
      }
    });
    builder.addCase(createPurchaseOrderTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.purchaseOrders = [action.payload, ...state.purchaseOrders];
      }
    });
  },
});

export const purchaseOrdersReducer = slice.reducer;

export const purchaseOrdersTC = createAsyncThunk<
  PurchaseOrderType[],
  any,
  AsyncThunkConfig
>('purchaseOrders/getPurchaseOrders', async (data, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await purchaseOrdersApi.getPurchaseOrders(data.search);

    dispatch(setSubmittingAC('success'));

    return res.results;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
export const purchaseOrderTC = createAsyncThunk<
  PurchaseOrderType,
  string,
  AsyncThunkConfig
>('purchaseOrders/getPurchaseOrder', async (id, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await purchaseOrdersApi.getPurchaseOrder(id);

    dispatch(setSubmittingAC('success'));

    return res;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
export const editPurchaseOrderTC = createAsyncThunk<
  PurchaseOrderType,
  EditRequestPurchaseOrderType,
  AsyncThunkConfig
>(
  'purchaseOrders/editPurchaseOrder',
  async ({ data, id }, { dispatch, rejectWithValue }) => {
    dispatch(setSubmittingAC('loading'));
    try {
      const res = await purchaseOrdersApi.editPurchaseOrder(data, id);

      dispatch(purchaseOrderTC(id));
      dispatch(setSubmittingAC('success'));

      return res;
    } catch (e) {
      const error = e as Error | AxiosError;

      return rejectWithValue(errorMessage(dispatch, error));
    }
  },
);
export const createPurchaseOrderTC = createAsyncThunk<
  PurchaseOrderType,
  CreatePurchaseOrderType,
  AsyncThunkConfig
>('purchaseOrders/createPurchaseOrder', async (data, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await purchaseOrdersApi.addPurchaseOrder(data);

    dispatch(setSubmittingAC('success'));

    return res;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
export const appPurchaseOrdersSelector = (state: AppRootStateType) =>
  state.purchaseOrders.purchaseOrders;
export const appPurchaseOrderSelector = (state: AppRootStateType) =>
  state.purchaseOrders.purchaseOrder;
