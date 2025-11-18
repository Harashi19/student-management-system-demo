import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { baseApi } from '@/api/base.api';
import authReducer from '@/features/auth/authSlice';
import { authMiddleware } from './middleware/authMiddleware';

/**
 * Configure the Redux store with RTK Query and custom middleware
 */
export const store = configureStore({
  reducer: {
    // Add the RTK Query API reducer
    [baseApi.reducerPath]: baseApi.reducer,
    // Add feature reducers
    auth: authReducer,
  },
  // Add RTK Query middleware and custom auth middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, authMiddleware),
});

// Enable refetchOnFocus and refetchOnReconnect behaviors
setupListeners(store.dispatch);

// Export types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
