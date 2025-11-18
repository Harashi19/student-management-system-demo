import { CircularProgress, Typography, Backdrop } from '@mui/material';

interface PageLoadingOverlayProps {
  message?: string;
  open?: boolean;
}

/**
 * PageLoadingOverlay Component
 * Full-page loading overlay with optional message
 */
export const PageLoadingOverlay = ({
  message = 'Loading...',
  open = true,
}: PageLoadingOverlayProps) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.modal + 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        flexDirection: 'column',
        gap: 2,
      }}
      open={open}
    >
      <CircularProgress color="inherit" size={60} />
      {message && (
        <Typography variant="h6" component="div">
          {message}
        </Typography>
      )}
    </Backdrop>
  );
};
