import React from "react";
import {
  FieldPath,
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";

import CustomCheckbox from "../custom-checkbox";

type Props = {
  label: string;
  containerStyle?: string;
};

type RHFInputProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = UseControllerProps<TFieldValues, TName> & Props;

const RHFCheckbox = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  control,
  name,
  label,
  containerStyle,
}: RHFInputProps<TFieldValues, TName>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  return (
    <CustomCheckbox
      value={field.value}
      handleChange={field.onChange}
      error={error?.message}
      label={label}
      containerStyle={containerStyle}
    />
  );
};

export default RHFCheckbox;
