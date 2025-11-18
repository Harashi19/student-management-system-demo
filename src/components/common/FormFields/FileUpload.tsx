import { useState, useRef, type DragEvent } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Paper,
  FormHelperText,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useFormContext, Controller } from 'react-hook-form';

export interface FileUploadProps {
  name: string;
  label: string;
  accept?: string;
  maxSize?: number; // in bytes
  multiple?: boolean;
  validation?: object;
  helperText?: string;
  disabled?: boolean;
}

/**
 * FileUpload Component
 * File upload component with drag-and-drop support
 * Integrates with react-hook-form for validation
 */
export const FileUpload = ({
  name,
  label,
  accept,
  maxSize = 5 * 1024 * 1024, // 5MB default
  multiple = false,
  validation,
  helperText,
  disabled = false,
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formContext = useFormContext();

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size exceeds ${(maxSize / (1024 * 1024)).toFixed(2)}MB`;
    }
    if (accept) {
      const acceptedTypes = accept.split(',').map((type) => type.trim());
      const fileExtension = `.${file.name.split('.').pop()}`;
      const isAccepted = acceptedTypes.some(
        (type) =>
          type === fileExtension ||
          (type.includes('*') && file.type.startsWith(type.split('/')[0]))
      );
      if (!isAccepted) {
        return `File type not accepted. Accepted types: ${accept}`;
      }
    }
    return null;
  };

  const handleFiles = (files: FileList | null, onChange: (files: File | File[]) => void) => {
    if (!files || files.length === 0) return;

    setUploadError(null);
    const fileArray = Array.from(files);

    // Validate files
    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        setUploadError(error);
        return;
      }
    }

    if (multiple) {
      onChange(fileArray);
    } else {
      onChange(fileArray[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, onChange: (files: File | File[]) => void) => {
    e.preventDefault();
    setIsDragging(false);
    if (!disabled) {
      handleFiles(e.dataTransfer.files, onChange);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleRemoveFile = (index: number, value: File | File[], onChange: (files: File | File[] | null) => void) => {
    if (Array.isArray(value)) {
      const newFiles = value.filter((_, i) => i !== index);
      onChange(newFiles.length > 0 ? newFiles : null);
    } else {
      onChange(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  // If no form context, render without form integration
  if (!formContext) {
    return (
      <Box>
        <Typography variant="body2" gutterBottom>
          {label}
        </Typography>
        <Paper
          variant="outlined"
          sx={{
            p: 3,
            textAlign: 'center',
            cursor: disabled ? 'not-allowed' : 'pointer',
            bgcolor: isDragging ? 'action.hover' : 'background.paper',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: isDragging ? 'primary.main' : 'divider',
            opacity: disabled ? 0.5 : 1,
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
          <Typography variant="body1" gutterBottom>
            Drag and drop files here, or click to select
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {accept && `Accepted formats: ${accept}`}
            {maxSize && ` • Max size: ${(maxSize / (1024 * 1024)).toFixed(2)}MB`}
          </Typography>
        </Paper>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          style={{ display: 'none' }}
          disabled={disabled}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </Box>
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
      render={({ field: { onChange, value } }) => (
        <Box>
          <Typography variant="body2" gutterBottom>
            {label}
          </Typography>
          <Paper
            variant="outlined"
            sx={{
              p: 3,
              textAlign: 'center',
              cursor: disabled ? 'not-allowed' : 'pointer',
              bgcolor: isDragging ? 'action.hover' : 'background.paper',
              borderStyle: 'dashed',
              borderWidth: 2,
              borderColor: error ? 'error.main' : isDragging ? 'primary.main' : 'divider',
              opacity: disabled ? 0.5 : 1,
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, onChange)}
            onClick={handleClick}
          >
            <UploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
            <Typography variant="body1" gutterBottom>
              Drag and drop files here, or click to select
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {accept && `Accepted formats: ${accept}`}
              {maxSize && ` • Max size: ${(maxSize / (1024 * 1024)).toFixed(2)}MB`}
            </Typography>
          </Paper>

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            style={{ display: 'none' }}
            onChange={(e) => handleFiles(e.target.files, onChange)}
            disabled={disabled}
          />

          {/* Display uploaded files */}
          {value && (
            <List sx={{ mt: 2 }}>
              {(Array.isArray(value) ? value : [value]).map((file: File, index: number) => (
                <ListItem
                  key={index}
                  sx={{
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    mb: 1,
                  }}
                >
                  <FileIcon sx={{ mr: 2, color: 'text.secondary' }} />
                  <ListItemText
                    primary={file.name}
                    secondary={formatFileSize(file.size)}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveFile(index, value, onChange)}
                      disabled={disabled}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}

          {/* Error messages */}
          {(errorMessage || uploadError || helperText) && (
            <FormHelperText error={!!(errorMessage || uploadError)}>
              {errorMessage || uploadError || helperText}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};
