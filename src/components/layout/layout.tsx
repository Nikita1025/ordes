import React, { ReactNode } from 'react';

import LinearProgress from '@mui/material/LinearProgress';
import { Header } from 'src/components/ui/header/header';
import { appStatusSelector, useAppSelector } from 'src/store';

import s from './layout.module.scss';

type LayoutType = {
  children: ReactNode;
};
export const Layout = ({ children }: LayoutType) => {
  const status = useAppSelector(appStatusSelector);

  return (
    <div>
      <Header />
      {status === 'loading' && <LinearProgress color={'primary'} />}

      <div className={s.container}>{children}</div>
    </div>
  );
};
