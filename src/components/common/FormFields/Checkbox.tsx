import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox as MuiCheckbox,
  type CheckboxProps as MuiCheckboxProps,
  FormGroup,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

export interface CheckboxProps extends Omit<MuiCheckboxProps, 'name'> {
  name: string;
  label: string;
  validation?: object;
  helperText?: string;
}

export interface CheckboxGroupOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  name: string;
  options: CheckboxGroupOption[];
  validation?: object;
  helperText?: string;
  disabled?: boolean;
}

/**
 * Checkbox Component
 * Wrapper around MUI Checkbox with react-hook-form integration
 * Automatically displays validation errors from form context
 */
export const Checkbox = ({
  name,
  label,
  validation,
  helperText,
  ...props
}: CheckboxProps) => {
  const formContext = useFormContext();

  // If no form context, render plain MUI Checkbox
  if (!formContext) {
    return (
      <FormControl>
        <FormControlLabel
          control={<MuiCheckbox name={name} {...props} />}
          label={label}
        />
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
      render={({ field: { value, onChange, ...field } }) => (
        <FormControl error={!!error}>
          <FormControlLabel
            control={
              <MuiCheckbox
                {...field}
                {...props}
                checked={!!value}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={label}
          />
          {(errorMessage || helperText) && (
            <FormHelperText>{errorMessage || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};

/**
 * CheckboxGroup Component
 * Multiple checkboxes grouped together with react-hook-form integration
 */
export const CheckboxGroup = ({
  name,
  options,
  validation,
  helperText,
  disabled = false,
}: CheckboxGroupProps) => {
  const formContext = useFormContext();

  // If no form context, render plain MUI Checkboxes
  if (!formContext) {
    return (
      <FormControl>
        <FormGroup>
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              control={
                <MuiCheckbox
                  disabled={disabled || option.disabled}
                  value={option.value}
                />
              }
              label={option.label}
            />
          ))}
        </FormGroup>
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
      render={({ field: { value = [], onChange } }) => (
        <FormControl error={!!error}>
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option.value}
                control={
                  <MuiCheckbox
                    checked={value.includes(option.value)}
                    onChange={(e) => {
                      const newValue = e.target.checked
                        ? [...value, option.value]
                        : value.filter((v: string | number) => v !== option.value);
                      onChange(newValue);
                    }}
                    disabled={disabled || option.disabled}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
          {(errorMessage || helperText) && (
            <FormHelperText>{errorMessage || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
