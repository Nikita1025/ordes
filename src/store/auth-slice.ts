import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { authApi } from 'src/api';
import { AsyncThunkConfig, errorMessage, LoginFormType } from 'src/utils';

import { setSubmittingAC } from './app-slice';

type AuthState = {
  token: string;
  isAuth: boolean;
};

const initialState: AuthState = {
  token: '',
  isAuth: false,
};

const slice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setIsAuthAC(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
});

export const authReducer = slice.reducer;

export const { setIsAuthAC } = slice.actions;

export const loginTC = createAsyncThunk<string, LoginFormType, AsyncThunkConfig>(
  'auth/login',
  async (params, { dispatch, rejectWithValue }) => {
    dispatch(setSubmittingAC('loading'));
    try {
      const res = await authApi.login(params);

      dispatch(setSubmittingAC('success'));
      dispatch(setIsAuthAC(true));

      return res.token;
    } catch (e) {
      const error = e as Error | AxiosError;

      return rejectWithValue(errorMessage(dispatch, error));
    }
  },
);
