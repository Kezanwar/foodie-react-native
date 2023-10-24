import React from "react";
import { TextInputProps } from "react-native";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import { CustomTextField } from "components/form/custom-text-field";

type Props = TextInputProps & {
  placeholder: string;
};

type RHFInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & Props;

const RHFTextField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  placeholder,
  ...rest
}: RHFInputProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <CustomTextField
      placeholder={placeholder}
      value={field.value}
      onChangeText={field.onChange}
      error={error?.message}
      {...rest}
    />
  );
};

export default RHFTextField;
