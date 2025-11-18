import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio as MuiRadio,
  RadioGroup as MuiRadioGroup,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

export interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  label?: string;
  options: RadioOption[];
  validation?: object;
  helperText?: string;
  disabled?: boolean;
  row?: boolean;
}

/**
 * RadioGroup Component
 * Wrapper around MUI RadioGroup with react-hook-form integration
 * Automatically displays validation errors from form context
 */
export const RadioGroup = ({
  name,
  label,
  options,
  validation,
  helperText,
  disabled = false,
  row = false,
}: RadioGroupProps) => {
  const formContext = useFormContext();

  // If no form context, render plain MUI RadioGroup
  if (!formContext) {
    return (
      <FormControl>
        {label && <FormLabel>{label}</FormLabel>}
        <MuiRadioGroup name={name} row={row}>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<MuiRadio disabled={disabled || option.disabled} />}
              label={option.label}
            />
          ))}
        </MuiRadioGroup>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
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
        <FormControl error={!!error}>
          {label && <FormLabel>{label}</FormLabel>}
          <MuiRadioGroup {...field} row={row}>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<MuiRadio disabled={disabled || option.disabled} />}
                label={option.label}
              />
            ))}
          </MuiRadioGroup>
          {(errorMessage || helperText) && (
            <FormHelperText>{errorMessage || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
