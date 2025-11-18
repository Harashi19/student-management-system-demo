import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from '@/types';
import type { RootState } from '@/store';

/**
 * Load user from localStorage
 */
const loadUserFromStorage = (): User | null => {
  try {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Failed to load user from localStorage:', error);
    return null;
  }
};

/**
 * Initial authentication state
 */
const initialState: AuthState = {
  user: loadUserFromStorage(),
  token: localStorage.getItem('access_token'),
  refreshToken: localStorage.getItem('refresh_token'),
  isAuthenticated: !!localStorage.getItem('access_token'),
  loading: false,
  error: null,
  requires2FA: false,
};

/**
 * Authentication slice
 * Manages authentication state including tokens, user data, and login status
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Login action - sets user and tokens after successful authentication
     */
    login: (
      state,
      action: PayloadAction<{ user: User; token: string; refreshToken: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      state.requires2FA = false;

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('access_token', action.payload.token);
      localStorage.setItem('refresh_token', action.payload.refreshToken);
    },

    /**
     * Set credentials - updates tokens (used during token refresh)
     */
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;

      // Persist tokens to localStorage
      localStorage.setItem('access_token', action.payload.token);
      localStorage.setItem('refresh_token', action.payload.refreshToken);
    },

    /**
     * Set user - updates user information
     */
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      // Persist user to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
    },

    /**
     * Set token - updates access token only (used during token refresh)
     */
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('access_token', action.payload);
    },

    /**
     * Refresh token action - updates access token after refresh
     */
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('access_token', action.payload);
    },

    /**
     * Logout action - clears all authentication state
     */
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.requires2FA = false;

      // Clear from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    },

    /**
     * Set loading state
     */
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    /**
     * Set error state
     */
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },

    /**
     * Set 2FA requirement
     */
    setRequires2FA: (
      state,
      action: PayloadAction<{ requires2FA: boolean; userId?: string }>
    ) => {
      state.requires2FA = action.payload.requires2FA;
      state.pendingUserId = action.payload.userId;
    },
  },
});

// Export actions
export const {
  login,
  setCredentials,
  setUser,
  setToken,
  refreshToken,
  logout,
  setLoading,
  setError,
  setRequires2FA,
} = authSlice.actions;

// Selectors

/**
 * Select the current user
 */
export const selectUser = (state: RootState): User | null => state.auth.user;

/**
 * Select authentication status
 */
export const selectIsAuthenticated = (state: RootState): boolean =>
  state.auth.isAuthenticated;

/**
 * Select user roles
 */
export const selectUserRoles = (state: RootState): string[] => {
  if (!state.auth.user) return [];
  return state.auth.user.roles.map((role) => role.name);
};

/**
 * Select access token
 */
export const selectToken = (state: RootState): string | null => state.auth.token;

/**
 * Select refresh token
 */
export const selectRefreshToken = (state: RootState): string | null =>
  state.auth.refreshToken;

/**
 * Select loading state
 */
export const selectAuthLoading = (state: RootState): boolean => state.auth.loading;

/**
 * Select error state
 */
export const selectAuthError = (state: RootState): string | null => state.auth.error;

/**
 * Select 2FA requirement status
 */
export const selectRequires2FA = (state: RootState): boolean => state.auth.requires2FA;

/**
 * Select pending user ID (for 2FA)
 */
export const selectPendingUserId = (state: RootState): string | undefined =>
  state.auth.pendingUserId;

/**
 * Check if user has a specific role
 */
export const selectHasRole = (roleName: string) => (state: RootState): boolean => {
  if (!state.auth.user) return false;
  return state.auth.user.roles.some((role) => role.name === roleName);
};

/**
 * Check if user has a specific permission
 */
export const selectHasPermission =
  (permissionCode: string) =>
  (state: RootState): boolean => {
    if (!state.auth.user) return false;
    return state.auth.user.roles.some((role) =>
      role.permissions.some((permission) => permission.code === permissionCode)
    );
  };

// Export reducer
export default authSlice.reducer;
