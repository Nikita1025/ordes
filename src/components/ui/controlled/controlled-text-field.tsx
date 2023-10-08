import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { TexField, TextFieldPropsType } from 'src/components/ui-kit/text-field';

type Props<T extends FieldValues> = Omit<
  UseControllerProps<T>,
  'rules' | 'defaultValues'
> &
  Omit<TextFieldPropsType, 'onChange' | 'value'>;

export const ControlledTextField = <T extends FieldValues>({
  control,
  name,
  ...rest
}: Props<T>) => {
  const {
    fieldState: { error },
    field: { ref, ...fieldProps },
  } = useController({
    name,
    control,
  });

  return <TexField {...fieldProps} errorMessage={error?.message} {...rest} />;
};
