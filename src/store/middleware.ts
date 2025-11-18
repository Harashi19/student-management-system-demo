import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';

/**
 * Error handling middleware for RTK Query
 * Handles common error scenarios like authentication failures and server errors
 */
export const errorHandlingMiddleware: Middleware =
  () => (next) => (action) => {
    // Check if this is a rejected action from RTK Query
    if (isRejectedWithValue(action)) {
      const error = action.payload as any;

      // Handle different error status codes
      if (error?.status === 401) {
        // Unauthorized - token expired or invalid
        console.error('Authentication error: Token expired or invalid');
        // The auth slice will handle the logout and redirect
      } else if (error?.status === 403) {
        // Forbidden - insufficient permissions
        console.error('Permission denied: You do not have access to this resource');
      } else if (error?.status === 404) {
        // Not found
        console.error('Resource not found');
      } else if (error?.status >= 500) {
        // Server error
        console.error('Server error: Please try again later');
      } else if (error?.status === 'FETCH_ERROR') {
        // Network error
        console.error('Network error: Please check your connection');
      } else {
        // Other errors
        console.error(
          'An error occurred:',
          error?.data?.message || error?.error || 'Unknown error'
        );
      }
    }

    return next(action);
  };
