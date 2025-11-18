import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { setToken, logout } from '@/features/auth/authSlice';

/**
 * Base query with automatic token refresh
 */
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  prepareHeaders: (headers, { getState }) => {
    // Get the authentication token from the Redux store
    const state = getState() as any;
    const token = state.auth?.token;
    
    // If we have a token, add it to the Authorization header
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    
    // Set content type for JSON requests
    if (!headers.has('content-type')) {
      headers.set('content-type', 'application/json');
    }
    
    return headers;
  },
});

/**
 * Base query with automatic token refresh on 401 errors
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Try the initial request
  let result = await baseQuery(args, api, extraOptions);

  // If we get a 401 error, try to refresh the token
  if (result.error && result.error.status === 401) {
    const state = api.getState() as any;
    const refreshToken = state.auth?.refreshToken;

    if (refreshToken) {
      // Try to refresh the token
      const refreshResult = await baseQuery(
        {
          url: '/auth/refresh/',
          method: 'POST',
          body: { refresh: refreshToken },
        },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store the new token
        const newToken = (refreshResult.data as any).access;
        api.dispatch(setToken(newToken));

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        // Refresh failed, logout the user
        api.dispatch(logout());
      }
    } else {
      // No refresh token, logout the user
      api.dispatch(logout());
    }
  }

  return result;
};

/**
 * Base API configuration for RTK Query
 * Handles authentication headers and common API setup
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  // Define tag types for cache invalidation
  tagTypes: [
    'User',
    'Student',
    'Teacher',
    'Assessment',
    'Mark',
    'Attendance',
    'Fee',
    'Payment',
    'Timetable',
    'Announcement',
    'Message',
    'Notification',
    'Hostel',
    'Room',
    'Subject',
    'Class',
    'Department',
    'CalendarEvent',
  ],
  // Endpoints will be injected by feature-specific API slices
  endpoints: () => ({}),
});
