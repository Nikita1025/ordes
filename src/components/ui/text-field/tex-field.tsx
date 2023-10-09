import React, { ComponentProps } from 'react';

import { InputMain } from './input-main';
import s from './text-field.module.scss';

export type TextFieldPropsType = {
  errorMessage?: string;
  label?: string;
  fullWidth?: boolean;
  className?: string;
  value?: string;
  onChangeText?: (value: string) => void;
} & ComponentProps<'input'>;

export const TexField: React.FC<TextFieldPropsType> = ({
  value,
  errorMessage,
  className,
  fullWidth,
  ...restProps
}) => {
  return (
    <div className={`${className} ${fullWidth ? s.fullWidth : ''}`}>
      <InputMain errorMessage={errorMessage} {...restProps} value={value ?? ''} />
    </div>
  );
};
