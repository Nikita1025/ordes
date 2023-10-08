import { ReactNode } from 'react';

import { Header } from '../ui/header/header';

import s from './layout.module.scss';

type LayoutType = {
  children: ReactNode;
};
export const Layout = ({ children }: LayoutType) => {
  return (
    <div>
      <Header />
      <div className={s.container}>{children}</div>
    </div>
  );
};
