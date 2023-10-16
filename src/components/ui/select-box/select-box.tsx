import React, { ChangeEvent, useState } from 'react';

import { NomenclaturesType } from 'src/utils';

import s from './selectbox.module.scss';
export type SelectProps = {
  label?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  defaultValue?: string | number;
  options: NomenclaturesType[];
  errorMessage?: string;
  className?: string;
};

export const SelectBox = ({
  defaultValue,
  options,
  onChange,
  label,
  errorMessage,
}: SelectProps) => {
  const [value, setValue] = useState(defaultValue ? defaultValue.toString() : '');
  const [_, setIdSelect] = useState('');

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    setIdSelect(event.target.options[event.target.selectedIndex].id);
    onChange?.(event.target.options[event.target.selectedIndex].id);
  };
  const showErrorMess = errorMessage && errorMessage.length > 0;

  return (
    <div>
      {label ? <span className={s.label}>{label}</span> : ''}
      <select
        onChange={onChangeHandler}
        tabIndex={1}
        value={value}
        className={`${s.selectBox} ${errorMessage && s.selectBoxError}`}
      >
        <option className={s.line}>{defaultValue}</option>
        {options?.map(el => (
          <option className={s.line} key={el.id} id={String(el.id)}>
            Название: {el.name} Код: {el.code}
          </option>
        ))}
      </select>
      {showErrorMess && <span className={s.errorWrap}>{errorMessage}</span>}
    </div>
  );
};
