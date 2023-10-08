import React from 'react';

import s from './header.module.scss';

export const Header = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <span className={s.text}>Admin application</span>
      </div>
    </div>
  );
};
