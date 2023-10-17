import React, { ChangeEvent, FC, ReactNode } from 'react';

import clsx from 'clsx';

import s from './checkbox.module.scss';

export type CheckboxPropsType = {
  error?: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string | ReactNode;
};

export const CheckBox: FC<CheckboxPropsType> = ({
  error,
  checked,
  onChange,
  disabled,
  label,
}) => {
  const classNames = {
    container: s.container,
    buttonWrapper: clsx(s.buttonWrapper, disabled && s.disabled),
    checkbox: clsx(s.checkbox, checked && s.checked, disabled && s.disabled),
    indicator: clsx(s.indicator, disabled && s.disabled),
    label: clsx(s.label, disabled && s.disabled),
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange!(e.target.checked);
  };

  return (
    <div className={s.wrapper}>
      <div className={classNames.label}>
        <div className={classNames.buttonWrapper}>
          <input
            type="checkbox"
            className={classNames.checkbox}
            checked={checked!}
            onChange={onChangeHandler}
            disabled={disabled}
          />
        </div>
        {label}
      </div>
      {error && (
        <span className={s.error} color={'error'}>
          {error}
        </span>
      )}
    </div>
  );
};
