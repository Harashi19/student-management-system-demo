import { useState } from 'react';
import { Box, Button, Stack, Typography, Paper } from '@mui/material';
import { LoadingSpinner, PageLoadingOverlay } from './index';

/**
 * Examples demonstrating LoadingSpinner and PageLoadingOverlay usage
 * This file is for documentation purposes and can be removed in production
 */
export const LoadingSpinnerExamples = () => {
  const [showPageOverlay, setShowPageOverlay] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Loading Spinner Examples
      </Typography>

      <Stack spacing={4}>
        {/* Small Spinner */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Small Spinner
          </Typography>
          <LoadingSpinner size="small" />
        </Paper>

        {/* Medium Spinner */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Medium Spinner (Default)
          </Typography>
          <LoadingSpinner size="medium" />
        </Paper>

        {/* Large Spinner */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Large Spinner
          </Typography>
          <LoadingSpinner size="large" />
        </Paper>

        {/* Different Colors */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Different Colors
          </Typography>
          <Stack direction="row" spacing={4}>
            <Box>
              <Typography variant="body2" gutterBottom>
                Primary
              </Typography>
              <LoadingSpinner color="primary" />
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                Secondary
              </Typography>
              <LoadingSpinner color="secondary" />
            </Box>
          </Stack>
        </Paper>

        {/* Page Loading Overlay */}
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Page Loading Overlay
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              setShowPageOverlay(true);
              setTimeout(() => setShowPageOverlay(false), 3000);
            }}
          >
            Show Page Overlay (3 seconds)
          </Button>
          <PageLoadingOverlay
            message="Loading data..."
            open={showPageOverlay}
          />
        </Paper>
      </Stack>
    </Box>
  );
};
