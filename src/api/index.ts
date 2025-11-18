/**
 * API exports
 * Central export point for all API endpoints
 */

// Base API
export { baseApi } from './base.api';

// Authentication API
export {
  authApi,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
} from './auth.api';

// Dashboard API
export {
  dashboardApi,
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
  useGetUpcomingEventsQuery,
  useLazyGetDashboardStatsQuery,
  useLazyGetRecentActivityQuery,
  useLazyGetUpcomingEventsQuery,
} from './dashboard.api';
