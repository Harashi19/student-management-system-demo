import { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
  TextField,
  Box,
} from '@mui/material';
import { useFormContext, Controller } from 'react-hook-form';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps, 'name'> {
  name: string;
  label: string;
  options: SelectOption[];
  validation?: object;
  searchable?: boolean;
  helperText?: string;
}

/**
 * Select Component
 * Wrapper around MUI Select with react-hook-form integration
 * Supports searchable dropdown with filtering
 */
export const Select = ({
  name,
  label,
  options,
  validation,
  searchable = false,
  helperText,
  ...props
}: SelectProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const formContext = useFormContext();

  // Filter options based on search term
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  // If no form context, render plain MUI Select
  if (!formContext) {
    return (
      <FormControl fullWidth={props.fullWidth !== false} error={false}>
        <InputLabel>{label}</InputLabel>
        <MuiSelect name={name} label={label} {...props}>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
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
        <FormControl fullWidth={props.fullWidth !== false} error={!!error}>
          <InputLabel>{label}</InputLabel>
          <MuiSelect
            {...field}
            {...props}
            label={label}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                },
              },
            }}
          >
            {searchable && (
              <Box sx={{ px: 2, py: 1, position: 'sticky', top: 0, bgcolor: 'background.paper', zIndex: 1 }}>
                <TextField
                  size="small"
                  placeholder="Search..."
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </Box>
            )}
            {filteredOptions.length === 0 ? (
              <MenuItem disabled>No options found</MenuItem>
            ) : (
              filteredOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))
            )}
          </MuiSelect>
          {(errorMessage || helperText) && (
            <FormHelperText>{errorMessage || helperText}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
