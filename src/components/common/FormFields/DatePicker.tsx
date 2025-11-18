import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFormContext, Controller } from 'react-hook-form';
import type { TextFieldProps } from '@mui/material';

export interface DatePickerProps {
  name: string;
  label: string;
  validation?: object;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  helperText?: string;
  fullWidth?: boolean;
  disableFuture?: boolean;
  disablePast?: boolean;
}

/**
 * DatePicker Component
 * Wrapper around MUI X DatePicker with react-hook-form integration
 * Automatically displays validation errors from form context
 */
export const DatePicker = ({
  name,
  label,
  validation,
  disabled = false,
  minDate,
  maxDate,
  helperText,
  fullWidth = true,
  disableFuture = false,
  disablePast = false,
}: DatePickerProps) => {
  const formContext = useFormContext();

  // If no form context, render plain MUI DatePicker
  if (!formContext) {
    return (
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MuiDatePicker
          label={label}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
          disableFuture={disableFuture}
          disablePast={disablePast}
          slotProps={{
            textField: {
              fullWidth,
              helperText,
            } as TextFieldProps,
          }}
        />
      </LocalizationProvider>
    );
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <MuiDatePicker
            {...field}
            label={label}
            disabled={disabled}
            minDate={minDate}
            maxDate={maxDate}
            disableFuture={disableFuture}
            disablePast={disablePast}
            slotProps={{
              textField: {
                fullWidth,
                error: !!error,
                helperText: errorMessage || helperText,
              } as TextFieldProps,
            }}
          />
        </LocalizationProvider>
      )}
    />
  );
};
