import { forwardRef } from 'react';
import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

export interface TextFieldProps extends Omit<MuiTextFieldProps, 'name'> {
  name: string;
  label: string;
  validation?: object;
}

/**
 * TextField Component
 * Wrapper around MUI TextField with react-hook-form integration
 * Automatically displays validation errors from form context
 */
export const TextField = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ name, label, validation, ...props }, ref) => {
    const formContext = useFormContext();

    // If no form context, render plain MUI TextField
    if (!formContext) {
      return <MuiTextField ref={ref} name={name} label={label} {...props} />;
    }

    const {
      control,
      formState: { errors },
    } = formContext;

    const error = errors[name];
    const errorMessage = error?.message as string | undefined;

    return (
      <Controller
        name={name}
        control={control}
        rules={validation}
        render={({ field }) => (
          <MuiTextField
            {...field}
            {...props}
            ref={ref}
            label={label}
            error={!!error}
            helperText={errorMessage || props.helperText}
            fullWidth={props.fullWidth !== false}
          />
        )}
      />
    );
  }
);

TextField.displayName = 'TextField';
