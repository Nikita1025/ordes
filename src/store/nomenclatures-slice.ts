import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { nomenclaturesApi } from 'src/api';
import { AppRootStateType, setSubmittingAC } from 'src/store';
import { AsyncThunkConfig, errorMessage, NomenclaturesType } from 'src/utils';

type initialStateType = {
  nomenclatures: NomenclaturesType[];
};

const initialState: initialStateType = {
  nomenclatures: [],
};

const slice = createSlice({
  initialState,
  name: 'nomenclatures',
  reducers: {},
  extraReducers: builder => {
    builder.addCase(nomenclaturesTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.nomenclatures = action.payload;
      }
    });
  },
});

export const nomenclaturesReducer = slice.reducer;

export const nomenclaturesTC = createAsyncThunk<
  NomenclaturesType[],
  void,
  AsyncThunkConfig
>('nomenclatures/getNomenclatures', async (_, { dispatch, rejectWithValue }) => {
  dispatch(setSubmittingAC('loading'));
  try {
    const res = await nomenclaturesApi.getNomenclatures();

    dispatch(setSubmittingAC('success'));

    return res.results;
  } catch (e) {
    const error = e as Error | AxiosError;

    return rejectWithValue(errorMessage(dispatch, error));
  }
});
export const appNomenclaturesSelector = (state: AppRootStateType) =>
  state.nomenclatures.nomenclatures;
