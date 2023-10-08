import axios, { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import { setErrorAC, setSubmittingAC } from 'src/store/app-slice';

export const errorMessage = (dispatch: Dispatch, err: AxiosError | Error) => {
  if (axios.isAxiosError(err)) {
    const error = err as AxiosError<{ non_field_errors: string }>;

    const finalError = error.response
      ? error.response.data.non_field_errors
      : err.message;

    dispatch(setSubmittingAC('failed'));
    dispatch(setErrorAC(finalError));
  } else {
    dispatch(setSubmittingAC('failed'));
    dispatch(setErrorAC(err.message));
  }
};
