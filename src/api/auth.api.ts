import { baseApi } from './base.api';
import type {
  LoginCredentials,
  AuthResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  User,
} from '@/types';
import { setCredentials, setToken, logout } from '@/features/auth/authSlice';

/**
 * Authentication API endpoints
 * Handles login, logout, token refresh, and user profile retrieval
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Login endpoint
     * Authenticates user with email and password
     */
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login/',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // Store tokens in Redux state and localStorage
          dispatch(
            setCredentials({
              token: data.access,
              refreshToken: data.refresh,
            })
          );
          
          // Store user data in cache
          dispatch(
            authApi.util.upsertQueryData('getCurrentUser', undefined, data.user)
          );
        } catch (error) {
          // Error handling is done by RTK Query
          console.error('Login failed:', error);
        }
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Logout endpoint
     * Clears authentication tokens and user session
     */
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout/',
        method: 'POST',
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          // Even if the API call fails, we should clear local state
          console.error('Logout API call failed:', error);
        } finally {
          // Clear authentication state
          dispatch(logout());
          
          // Clear all cached data
          dispatch(baseApi.util.resetApiState());
        }
      },
      invalidatesTags: ['User'],
    }),

    /**
     * Refresh token endpoint
     * Obtains a new access token using the refresh token
     */
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenRequest>({
      query: (body) => ({
        url: '/auth/refresh/',
        method: 'POST',
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          
          // Update access token in Redux state
          dispatch(setToken(data.access));
          
          // If a new refresh token is provided, update it as well
          if (data.refresh) {
            dispatch(
              setCredentials({
                token: data.access,
                refreshToken: data.refresh,
              })
            );
          }
        } catch (error) {
          // If refresh fails, logout the user
          console.error('Token refresh failed:', error);
          dispatch(logout());
        }
      },
    }),

    /**
     * Get current user endpoint
     * Retrieves the authenticated user's profile information
     */
    getCurrentUser: builder.query<User, void>({
      query: () => '/auth/me/',
      providesTags: ['User'],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} = authApi;
