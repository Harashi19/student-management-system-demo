import { baseApi } from './base.api';
import type {
  DashboardStats,
  RecentActivity,
  UpcomingEvent,
  DashboardQueryParams,
} from '@/types';

/**
 * Dashboard API endpoints
 * Handles dashboard statistics, recent activity, and upcoming events
 */
export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * Get dashboard statistics endpoint
     * Retrieves role-specific statistics for the authenticated user
     * 
     * @param params - Optional query parameters (role, limit)
     * @returns Dashboard statistics based on user role
     */
    getDashboardStats: builder.query<DashboardStats, DashboardQueryParams | void>({
      query: (params) => ({
        url: '/dashboard/stats/',
        params: params || {},
      }),
      providesTags: ['User'],
      // Keep data fresh for 5 minutes
      keepUnusedDataFor: 300,
    }),

    /**
     * Get recent activity endpoint
     * Retrieves recent activities relevant to the authenticated user
     * 
     * @param params - Optional query parameters (limit)
     * @returns Array of recent activity items
     */
    getRecentActivity: builder.query<RecentActivity[], DashboardQueryParams | void>({
      query: (params) => ({
        url: '/dashboard/recent-activity/',
        params: params || {},
      }),
      providesTags: ['User'],
      // Keep data fresh for 2 minutes
      keepUnusedDataFor: 120,
    }),

    /**
     * Get upcoming events endpoint
     * Retrieves upcoming events relevant to the authenticated user
     * 
     * @param params - Optional query parameters (days_ahead, limit)
     * @returns Array of upcoming event items
     */
    getUpcomingEvents: builder.query<UpcomingEvent[], DashboardQueryParams | void>({
      query: (params) => ({
        url: '/dashboard/upcoming-events/',
        params: params || {},
      }),
      providesTags: ['CalendarEvent'],
      // Keep data fresh for 5 minutes
      keepUnusedDataFor: 300,
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
  useGetUpcomingEventsQuery,
  useLazyGetDashboardStatsQuery,
  useLazyGetRecentActivityQuery,
  useLazyGetUpcomingEventsQuery,
} = dashboardApi;
