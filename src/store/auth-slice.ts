import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { authApi } from 'src/api';
import {
  AsyncThunkConfig,
  errorMessage,
  LoginFormType,
  LoginResponseType,
} from 'src/utils';

import { setSubmittingAC } from './app-slice';
import { AppRootStateType } from './store';

type AuthState = {
  isAuth: boolean;
};

const initialState: AuthState = {
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

export const loginTC = createAsyncThunk<
  LoginResponseType,
  LoginFormType,
  AsyncThunkConfig
>('auth/login', async (params, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await authApi.login(params);

    dispatch(setSubmittingAC('success'));
    dispatch(setIsAuthAC(true));
    Cookies.set('Token', res.token, { expires: 7 });

    return res;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
export const appIsAuthSelector = (state: AppRootStateType) => state.auth.isAuth;
