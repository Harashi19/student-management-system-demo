import { Button, Box } from '@mui/material';
import { Modal } from './Modal';
import type { ReactNode } from 'react';

export interface FormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title: string;
  children: ReactNode;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
  disabled?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

/**
 * FormDialog Component
 * A dialog component optimized for quick forms with submit/cancel actions
 */
export const FormDialog = ({
  open,
  onClose,
  onSubmit,
  title,
  children,
  submitText = 'Submit',
  cancelText = 'Cancel',
  loading = false,
  disabled = false,
  maxWidth = 'sm',
}: FormDialogProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth={maxWidth}
      disableBackdropClick={loading}
      showCloseButton={!loading}
      actions={
        <>
          <Button onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={loading || disabled}
            type="submit"
          >
            {loading ? 'Submitting...' : submitText}
          </Button>
        </>
      }
    >
      <Box component="form" onSubmit={handleSubmit} noValidate>
        {children}
      </Box>
    </Modal>
  );
};
