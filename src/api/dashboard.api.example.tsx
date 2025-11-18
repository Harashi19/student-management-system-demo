/**
 * Dashboard API Usage Examples
 * 
 * This file demonstrates how to use the dashboard API endpoints in components.
 * These examples show the integration with RTK Query hooks.
 */

import {
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
  useGetUpcomingEventsQuery,
  useLazyGetDashboardStatsQuery,
} from './dashboard.api';

/**
 * Example 1: Basic usage in a component
 * Fetches dashboard statistics for the current user
 */
export const ExampleDashboardComponent = () => {
  // Fetch dashboard stats - automatically handles loading, error, and data states
  const { data: stats, isLoading, error } = useGetDashboardStatsQuery();

  if (isLoading) return <div>Loading statistics...</div>;
  if (error) return <div>Error loading statistics</div>;

  return (
    <div>
      <h2>Dashboard Statistics</h2>
      <p>Total Students: {stats?.total_students}</p>
      <p>Total Teachers: {stats?.total_teachers}</p>
      <p>Pending Approvals: {stats?.pending_approvals}</p>
    </div>
  );
};

/**
 * Example 2: Using query parameters
 * Fetches recent activity with a limit parameter
 */
export const ExampleRecentActivityComponent = () => {
  // Fetch only the 5 most recent activities
  const { data: activities } = useGetRecentActivityQuery({ limit: 5 });

  return (
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {activities?.map((activity) => (
          <li key={activity.id}>
            <strong>{activity.title}</strong>
            <p>{activity.description}</p>
            <small>{new Date(activity.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * Example 3: Fetching upcoming events
 * Shows events for the next 7 days
 */
export const ExampleUpcomingEventsComponent = () => {
  // Fetch events for the next 7 days, limit to 10 events
  const { data: events } = useGetUpcomingEventsQuery({
    days_ahead: 7,
    limit: 10,
  });

  return (
    <div>
      <h2>Upcoming Events</h2>
      {events?.map((event) => (
        <div key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>Type: {event.type}</p>
          <p>Date: {new Date(event.start_date).toLocaleDateString()}</p>
          {event.location && <p>Location: {event.location}</p>}
        </div>
      ))}
    </div>
  );
};

/**
 * Example 4: Combined dashboard data
 * Fetches all dashboard data in a single component
 */
export const ExampleFullDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: activities, isLoading: activitiesLoading } = useGetRecentActivityQuery({ limit: 5 });
  const { data: events, isLoading: eventsLoading } = useGetUpcomingEventsQuery({ days_ahead: 7 });

  const isLoading = statsLoading || activitiesLoading || eventsLoading;

  if (isLoading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      
      {/* Statistics Section */}
      <section>
        <h2>Statistics</h2>
        <div>Students: {stats?.total_students}</div>
        <div>Teachers: {stats?.total_teachers}</div>
        <div>Classes: {stats?.total_classes}</div>
      </section>

      {/* Recent Activity Section */}
      <section>
        <h2>Recent Activity</h2>
        {activities?.map((activity) => (
          <div key={activity.id}>{activity.title}</div>
        ))}
      </section>

      {/* Upcoming Events Section */}
      <section>
        <h2>Upcoming Events</h2>
        {events?.map((event) => (
          <div key={event.id}>{event.title}</div>
        ))}
      </section>
    </div>
  );
};

/**
 * Example 5: Manual refetch
 * Shows how to manually trigger a refetch of dashboard data
 */
export const ExampleManualRefetch = () => {
  const { data: stats, refetch } = useGetDashboardStatsQuery();

  const handleRefresh = () => {
    // Manually refetch the data
    refetch();
  };

  return (
    <div>
      <button onClick={handleRefresh}>Refresh Statistics</button>
      <div>Total Students: {stats?.total_students}</div>
    </div>
  );
};

/**
 * Example 6: Conditional fetching with lazy query
 * Only fetches data when explicitly triggered
 */
export const ExampleLazyQuery = () => {
  const [trigger, { data, isLoading }] = useLazyGetDashboardStatsQuery();

  const handleLoadStats = () => {
    // Trigger the query manually
    trigger();
  };

  return (
    <div>
      <button onClick={handleLoadStats}>Load Statistics</button>
      {isLoading && <div>Loading...</div>}
      {data && <div>Total Students: {data.total_students}</div>}
    </div>
  );
};
