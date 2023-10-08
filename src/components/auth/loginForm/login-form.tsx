import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema } from 'src/common/schemas';
import { Button } from 'src/components/ui/button';
import { ControlledTextField } from 'src/components/ui/controlled';
import { loginTC, useAppDispatch } from 'src/store';
import { LoginFormType } from 'src/utils';

import { ErrorSnackbar } from '../../../common/errorSnackbar/error-snackbar';

import s from './login-form.module.scss';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema()),
    mode: 'onTouched',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submitData = (data: LoginFormType) => {
    dispatch(loginTC(data));
  };

  return (
    <div className={s.card}>
      <ErrorSnackbar />
      <div className={s.content}>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="username"
            label="Username"
            className={`${s.field} ${errors.username && s.fieldWithError}`}
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="password"
            label="password"
            type="password"
            className={s.passField}
            fullWidth
          />
          <Button type="submit" variant="primary" fullWidth className={s.singIn}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
