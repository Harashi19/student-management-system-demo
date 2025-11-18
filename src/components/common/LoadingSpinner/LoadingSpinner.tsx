import { Box, CircularProgress, Backdrop } from '@mui/material';

export type LoadingSpinnerSize = 'small' | 'medium' | 'large';

interface LoadingSpinnerProps {
  size?: LoadingSpinnerSize;
  fullScreen?: boolean;
  color?: 'primary' | 'secondary' | 'inherit';
}

const sizeMap = {
  small: 24,
  medium: 40,
  large: 60,
};

/**
 * LoadingSpinner Component
 * Displays a loading spinner with different sizes and optional full-screen overlay
 */
export const LoadingSpinner = ({
  size = 'medium',
  fullScreen = false,
  color = 'primary',
}: LoadingSpinnerProps) => {
  const spinnerSize = sizeMap[size];

  if (fullScreen) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
        open={true}
      >
        <CircularProgress color={color} size={spinnerSize} />
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100px',
      }}
    >
      <CircularProgress color={color} size={spinnerSize} />
    </Box>
  );
};
