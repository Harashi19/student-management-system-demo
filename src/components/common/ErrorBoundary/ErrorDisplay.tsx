import { Alert, AlertTitle, Box, Button, Collapse } from '@mui/material';
import { Refresh } from '@mui/icons-material';
import { useState } from 'react';

interface ErrorDisplayProps {
  error?: Error | string | null;
  title?: string;
  severity?: 'error' | 'warning' | 'info';
  onRetry?: () => void;
  showDetails?: boolean;
}

/**
 * ErrorDisplay Component
 * Displays inline error messages with optional retry functionality
 */
export const ErrorDisplay = ({
  error,
  title = 'Error',
  severity = 'error',
  onRetry,
  showDetails = false,
}: ErrorDisplayProps) => {
  const [showStack, setShowStack] = useState(false);

  if (!error) {
    return null;
  }

  const errorMessage = typeof error === 'string' ? error : error.message;
  const errorStack = typeof error === 'string' ? null : error.stack;

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Alert
        severity={severity}
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              startIcon={<Refresh />}
              onClick={onRetry}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {errorMessage}

        {showDetails && errorStack && import.meta.env.DEV && (
          <>
            <Button
              size="small"
              onClick={() => setShowStack(!showStack)}
              sx={{ mt: 1, p: 0, minWidth: 'auto' }}
            >
              {showStack ? 'Hide' : 'Show'} Details
            </Button>
            <Collapse in={showStack}>
              <Box
                sx={{
                  mt: 1,
                  p: 1,
                  bgcolor: 'grey.100',
                  borderRadius: 1,
                  overflow: 'auto',
                  maxHeight: 200,
                }}
              >
                <pre
                  style={{
                    margin: 0,
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {errorStack}
                </pre>
              </Box>
            </Collapse>
          </>
        )}
      </Alert>
    </Box>
  );
};
