import React, { ChangeEvent, ComponentProps, useState } from 'react';

import EyeIcon from 'src/assets/icon/eye-icon';
import EyeOffIcon from 'src/assets/icon/eye-off-icon';

import s from './input-main.module.scss';

type UIInputPropsType = {
  value?: string;
  label?: string;
  errorMessage?: string;
  onChangeText?: (value: string) => void;
} & ComponentProps<'input'>;

export const InputMain: React.FC<UIInputPropsType> = props => {
  const {
    type = 'text',
    disabled,
    onChangeText,
    errorMessage,
    label,
    placeholder,
    value,
    ...rest
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onClickShowValue = () => {
    if (!disabled) {
      setShowPassword(!showPassword);
    }
  };

  const onchangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText && onChangeText(e.currentTarget.value);
  };

  const showErrorMess = errorMessage && errorMessage.length > 0;

  return (
    <div className={s.textFieldWrap}>
      <div className={`${s.label} ${disabled && s.disabledLabel}`}>{label}</div>
      <input
        type={showPassword ? 'text' : type}
        value={value}
        onChange={onchangeHandler}
        placeholder={placeholder && placeholder}
        disabled={disabled}
        {...rest}
        className={`${s.textField} ${errorMessage && s.errorInput} ${
          disabled && s.disabledInput
        }`}
      />

      {type === 'password' && !showPassword && (
        <EyeIcon
          className={`${s.iconEye} ${disabled && s.disabledIconEye}`}
          onClick={onClickShowValue}
        />
      )}
      {type === 'password' && showPassword && (
        <EyeOffIcon
          className={`${s.iconEye} ${disabled && s.disabledIconEye}`}
          onClick={onClickShowValue}
        />
      )}
      {showErrorMess && <span className={s.errorWrap}>{errorMessage}</span>}
    </div>
  );
};
