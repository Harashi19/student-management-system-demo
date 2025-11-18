import { useState } from 'react';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import { ErrorBoundary, ErrorDisplay } from './index';

/**
 * Component that throws an error for testing ErrorBoundary
 */
const BuggyComponent = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('This is a test error from BuggyComponent!');
  }
  return <Typography>Component is working fine!</Typography>;
};

/**
 * Examples demonstrating ErrorBoundary and ErrorDisplay usage
 * This file is for documentation purposes and can be removed in production
 */
export const ErrorBoundaryExamples = () => {
  const [throwError, setThrowError] = useState(false);
  const [apiError, setApiError] = useState<Error | null>(null);

  const simulateApiError = () => {
    setApiError(new Error('Failed to fetch data from the server. Please try again.'));
  };

  const handleRetry = () => {
    setApiError(null);
    // Simulate retry logic
    setTimeout(() => {
      setApiError(new Error('Still failing... Check your connection.'));
    }, 1000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Error Boundary Examples
      </Typography>

      <Stack spacing={4}>
        {/* ErrorBoundary Example */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ErrorBoundary with Fallback UI
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Click the button to trigger an error. The ErrorBoundary will catch it and display
            a fallback UI.
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => setThrowError(true)}
            sx={{ mb: 2 }}
          >
            Trigger Error
          </Button>
          <ErrorBoundary>
            <BuggyComponent shouldThrow={throwError} />
          </ErrorBoundary>
        </Paper>

        {/* ErrorDisplay - Error Severity */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ErrorDisplay - Error Severity
          </Typography>
          <ErrorDisplay
            error="This is an error message"
            title="Error"
            severity="error"
          />
        </Paper>

        {/* ErrorDisplay - Warning Severity */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ErrorDisplay - Warning Severity
          </Typography>
          <ErrorDisplay
            error="This is a warning message"
            title="Warning"
            severity="warning"
          />
        </Paper>

        {/* ErrorDisplay - Info Severity */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ErrorDisplay - Info Severity
          </Typography>
          <ErrorDisplay
            error="This is an informational message"
            title="Information"
            severity="info"
          />
        </Paper>

        {/* ErrorDisplay with Retry */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ErrorDisplay with Retry Button
          </Typography>
          <Button
            variant="contained"
            onClick={simulateApiError}
            sx={{ mb: 2 }}
          >
            Simulate API Error
          </Button>
          <ErrorDisplay
            error={apiError}
            title="API Error"
            onRetry={handleRetry}
            showDetails
          />
        </Paper>

        {/* ErrorDisplay with Error Object */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            ErrorDisplay with Error Object (Development Mode)
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            In development mode, you can see the error stack trace.
          </Typography>
          <ErrorDisplay
            error={new Error('Detailed error with stack trace')}
            title="Development Error"
            showDetails
          />
        </Paper>
      </Stack>
    </Box>
  );
};
