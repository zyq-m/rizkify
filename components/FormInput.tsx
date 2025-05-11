import { FormControl, Input, WarningOutlineIcon } from 'native-base';
import { InterfaceInputProps } from 'native-base/lib/typescript/components/primitives/Input/types';

export default function FormInput({
  label,
  error,
  helper,
  options,
}: {
  label: string;
  options: InterfaceInputProps;
  helper?: string;
  error?: string;
}) {
  return (
    <FormControl isInvalid={!error ? false : true}>
      <FormControl.Label>{label}</FormControl.Label>
      <Input {...options} />
      <FormControl.HelperText>{helper}</FormControl.HelperText>
      <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {error}
      </FormControl.ErrorMessage>
    </FormControl>
  );
}
