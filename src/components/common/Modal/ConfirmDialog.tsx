import { Button, Typography, Box } from '@mui/material';
import { Warning as WarningIcon } from '@mui/icons-material';
import { Modal } from './Modal';

export interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  loading?: boolean;
  severity?: 'warning' | 'error' | 'info';
}

/**
 * ConfirmDialog Component
 * A confirmation dialog for destructive or important actions
 */
export const ConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  confirmColor = 'error',
  loading = false,
  severity = 'warning',
}: ConfirmDialogProps) => {
  const handleConfirm = () => {
    onConfirm();
  };

  const getSeverityColor = () => {
    switch (severity) {
      case 'error':
        return 'error.main';
      case 'warning':
        return 'warning.main';
      case 'info':
        return 'info.main';
      default:
        return 'warning.main';
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      maxWidth="xs"
      disableBackdropClick={loading}
      showCloseButton={!loading}
      actions={
        <>
          <Button onClick={onClose} disabled={loading}>
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            color={confirmColor}
            variant="contained"
            disabled={loading}
            autoFocus
          >
            {loading ? 'Processing...' : confirmText}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <WarningIcon
          sx={{
            color: getSeverityColor(),
            fontSize: 40,
            mt: 0.5,
          }}
        />
        <Box>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {message}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};
