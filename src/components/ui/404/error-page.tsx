import React from 'react';

import s from './error-page.module.scss';
export const ErrorPage = () => {
  return (
    <div>
      <span className={s.message}>404 Страница не существует</span>
    </div>
  );
};
