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
export type StatusType = 'idle' | 'loading' | 'success' | 'failed';
