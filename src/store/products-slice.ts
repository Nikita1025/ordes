import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { productsApi } from 'src/api';
import { AppRootStateType, setSubmittingAC } from 'src/store';
import {
  AsyncThunkConfig,
  createProductRequestType,
  errorMessage,
  getProductRequestType,
  ProductsResponseType,
} from 'src/utils';

type AuthState = {
  products: ProductsResponseType[];
  product: ProductsResponseType;
};

const initialState: AuthState = {
  products: [],
  product: {} as ProductsResponseType,
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
    builder.addCase(productTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.product = action.payload;
      }
    });
    builder.addCase(createProductTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.products = [action.payload, ...state.products];
      }
    });
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
export const productTC = createAsyncThunk<any, getProductRequestType, AsyncThunkConfig>(
  'products/getProduct',
  async (data, { dispatch, rejectWithValue }) => {
    dispatch(setSubmittingAC('loading'));
    try {
      const res = await productsApi.getProduct(data.id, data.id_product);

      dispatch(setSubmittingAC('success'));

      return res;
    } catch (e) {
      const error = e as Error | AxiosError;

      return rejectWithValue(errorMessage(dispatch, error));
    }
  },
);
export const createProductTC = createAsyncThunk<
  ProductsResponseType,
  createProductRequestType,
  AsyncThunkConfig
>('products/createProduct', async (data, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await productsApi.createProduct(data);

    dispatch(setSubmittingAC('success'));

    return res;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});

export const appProductsSelector = (state: AppRootStateType) => state.products.products;
export const appProductSelector = (state: AppRootStateType) => state.products.product;
