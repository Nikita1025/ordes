import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { DatePick, DatePickType } from '../date-picker';

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'rules' | 'defaultValues'
> &
  Omit<DatePickType, 'onChange' | 'value'>;

export const ControlledDataPick = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  const {
    field: { ref, ...fieldProps },
  } = useController({
    name,
    control,
  });

  return <DatePick {...fieldProps} {...rest} />;
};
