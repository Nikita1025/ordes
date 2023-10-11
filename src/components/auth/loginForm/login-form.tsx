import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { PATH } from 'src/app/routes';
import { ErrorSnackbar } from 'src/common/errorSnackbar';
import { loginSchema } from 'src/common/schemas';
import { Button } from 'src/components/ui/button';
import { ControlledTextField } from 'src/components/ui/controlled';
import { appIsAuthSelector, loginTC, useAppDispatch, useAppSelector } from 'src/store';
import { LoginFormType } from 'src/utils';

import s from './login-form.module.scss';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(appIsAuthSelector);
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

  if (isAuth) {
    return <Navigate to={PATH.MAIN} />;
  }

  return (
    <div className={s.card}>
      <ErrorSnackbar />
      <span className={s.title}>Авторизуйтесь</span>
      <div className={s.content}>
        <form onSubmit={handleSubmit(submitData)} className={s.form}>
          <ControlledTextField
            control={control}
            name="username"
            label="Логин"
            className={`${s.field} ${errors.username && s.fieldWithError}`}
            fullWidth
          />

          <ControlledTextField
            control={control}
            name="password"
            label="Пароль"
            type="password"
            className={s.passField}
            fullWidth
          />
          <Button type="submit" variant="primary" fullWidth className={s.singIn}>
            Войти
          </Button>
        </form>
      </div>
    </div>
  );
};
