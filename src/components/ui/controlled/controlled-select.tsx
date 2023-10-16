import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { SelectBox, SelectProps } from '../select-box';

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'rules' | 'defaultValues'
> &
  Omit<SelectProps, 'onChange' | 'value'>;

export const ControlledSelect = <T extends FieldValues>({
  control,
  name,
  options,
  ...rest
}: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, ...fieldProps },
  } = useController({
    name,
    control,
  });

  return (
    <SelectBox
      {...fieldProps}
      errorMessage={error?.message}
      options={options}
      {...rest}
    />
  );
};
