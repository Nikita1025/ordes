import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StatusType } from 'src/utils';

import { AppRootStateType } from './store';

export type InitialStateType = {
  error: null | string;
  status: StatusType;
};

const initialState: InitialStateType = {
  error: null as string | null,
  status: 'idle',
};

const slice = createSlice({
  name: 'appReducer',
  initialState,
  reducers: {
    setErrorAC(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSubmittingAC(state, action: PayloadAction<StatusType>) {
      state.status = action.payload;
    },
  },
});

export const appReducer = slice.reducer;
export const { setErrorAC, setSubmittingAC } = slice.actions;
export const appErrorSelector = (state: AppRootStateType) => state.app.error;
export const appStatusSelector = (state: AppRootStateType) => state.app.status;
