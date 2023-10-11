import React, { ChangeEvent, useState } from 'react';

import s from './date-picker.module.scss';

export type DatePickType = {
  label: string;
  onChange?: (e: any) => void;
};
export const DatePick = ({ label, onChange }: DatePickType) => {
  const [date, setDate] = useState('');

  const onDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
    onChange?.(event.target.value);
  };

  return (
    <div className={s.container}>
      <span className={s.label}>{label}</span>
      <input type="date" onChange={onDateChange} className={s.input} />
    </div>
  );
};
