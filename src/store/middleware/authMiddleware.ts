import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import { logout, setToken } from '@/features/auth/authSlice';

/**
 * Flag to prevent multiple simultaneous refresh attempts
 */
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Refresh the access token using the refresh token
 */
const refreshAccessToken = async (
  refreshToken: string,
  apiUrl: string
): Promise<string | null> => {
  try {
    const response = await fetch(`${apiUrl}/auth/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    return data.access;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};

/**
 * Authentication middleware
 * Handles automatic token refresh on 401 errors
 */
export const authMiddleware: Middleware = (storeApi) => (next) => async (action) => {
    // Check if this is a rejected action with a 401 status
    if (isRejectedWithValue(action) && (action.payload as any)?.status === 401) {
      const state = storeApi.getState();
      const refreshToken = state.auth.refreshToken;
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

      // If we have a refresh token and we're not already refreshing
      if (refreshToken && !isRefreshing) {
        isRefreshing = true;

        // Create a single refresh promise that can be shared
        refreshPromise = refreshAccessToken(refreshToken, apiUrl);

        try {
          const newAccessToken = await refreshPromise;

          if (newAccessToken) {
            // Update the token in the store
            storeApi.dispatch(setToken(newAccessToken));

            // Return the action to allow RTK Query to retry
            // The retry will use the new token from prepareHeaders
            return next(action);
          } else {
            // Refresh failed, logout the user
            storeApi.dispatch(logout());
          }
        } catch (error) {
          console.error('Token refresh error:', error);
          storeApi.dispatch(logout());
        } finally {
          isRefreshing = false;
          refreshPromise = null;
        }
      } else if (refreshToken && isRefreshing && refreshPromise) {
        // If a refresh is already in progress, wait for it
        try {
          const newAccessToken = await refreshPromise;

          if (newAccessToken) {
            // Token was refreshed, retry the original request
            return next(action);
          } else {
            // Refresh failed
            storeApi.dispatch(logout());
          }
        } catch (error) {
          console.error('Token refresh wait error:', error);
          storeApi.dispatch(logout());
        }
      } else {
        // No refresh token available, logout
        storeApi.dispatch(logout());
      }
    }

    return next(action);
  };
