import React, { ChangeEvent, useEffect, useState } from 'react';

import s from './date-picker.module.scss';

export type DatePickType = {
  label: string;
  onChange?: (e: any) => void;
  errorMessage?: string;
  className?: string;
};
export const DatePick = ({ label, onChange, errorMessage }: DatePickType) => {
  const [date, setDate] = useState('');

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    onChange?.(event.target.value);
  };
  const showErrorMess = errorMessage && errorMessage.length > 0;

  return (
    <div className={s.container}>
      <span className={s.label}>{label}</span>
      <input
        type="date"
        min="1000-01-01"
        max="2023-10-17"
        className={`${s.input} ${errorMessage && s.errorInput}`}
        onChange={onDateChange}
      />
      {showErrorMess && <span className={s.errorWrap}>{errorMessage}</span>}
    </div>
  );
};
