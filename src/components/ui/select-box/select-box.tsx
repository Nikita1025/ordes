import React, { ChangeEvent, useState } from 'react';

import { NomenclaturesType } from 'src/utils';

import s from './selectbox.module.scss';
export type SelectProps = {
  label?: string;
  value?: string | number;
  onChange?: (e: any) => void;
  defaultValue?: string | number;
  options: NomenclaturesType[];
};

export const SelectBox = ({ defaultValue, options, onChange, label }: SelectProps) => {
  const [value, setValue] = useState(defaultValue ? defaultValue.toString() : '');
  const [_, setIdSelect] = useState('');

  const onChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
    setIdSelect(event.target.options[event.target.selectedIndex].id);
    onChange?.(+event.target.options[event.target.selectedIndex].id);
  };

  return (
    <div>
      {label ? <span className={s.label}>{label}</span> : ''}
      <select
        onChange={onChangeHandler}
        className={s.selectBox}
        defaultValue={defaultValue}
        tabIndex={1}
        value={value}
      >
        {options?.map(el => (
          <option className={s.line} key={el.id} id={String(el.id)}>
            {el.name}
            {el.code}
          </option>
        ))}
      </select>
    </div>
  );
};
