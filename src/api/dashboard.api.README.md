# Dashboard API

This module provides API endpoints for fetching dashboard-related data including statistics, recent activity, and upcoming events.

## Endpoints

### 1. Get Dashboard Statistics

Retrieves role-specific statistics for the authenticated user.

**Endpoint:** `GET /api/dashboard/stats/`

**Hook:** `useGetDashboardStatsQuery(params?)`

**Parameters:**
- `role` (optional): Filter statistics by specific role
- `limit` (optional): Limit the number of results

**Response Type:** `DashboardStats`

**Example:**
```typescript
const { data: stats, isLoading, error } = useGetDashboardStatsQuery();

// With parameters
const { data: stats } = useGetDashboardStatsQuery({ role: 'ADMIN' });
```

**Response Structure:**
```typescript
{
  total_students: 1247,
  total_teachers: 89,
  total_classes: 42,
  pending_approvals: 15,
  active_users: 156,
  // ... other role-specific statistics
}
```

### 2. Get Recent Activity

Retrieves recent activities relevant to the authenticated user.

**Endpoint:** `GET /api/dashboard/recent-activity/`

**Hook:** `useGetRecentActivityQuery(params?)`

**Parameters:**
- `limit` (optional): Number of activities to return (default: 10)

**Response Type:** `RecentActivity[]`

**Example:**
```typescript
const { data: activities } = useGetRecentActivityQuery({ limit: 5 });
```

**Response Structure:**
```typescript
[
  {
    id: "1",
    type: "student_enrollment",
    title: "New Student Enrolled",
    description: "John Doe enrolled in Grade 10-A",
    user: {
      id: "123",
      name: "Admin User",
      profile_picture: "https://..."
    },
    timestamp: "2024-01-15T10:30:00Z",
    metadata: { student_id: "12345" }
  },
  // ... more activities
]
```

### 3. Get Upcoming Events

Retrieves upcoming events relevant to the authenticated user.

**Endpoint:** `GET /api/dashboard/upcoming-events/`

**Hook:** `useGetUpcomingEventsQuery(params?)`

**Parameters:**
- `days_ahead` (optional): Number of days to look ahead (default: 7)
- `limit` (optional): Number of events to return (default: 10)

**Response Type:** `UpcomingEvent[]`

**Example:**
```typescript
const { data: events } = useGetUpcomingEventsQuery({
  days_ahead: 14,
  limit: 20
});
```

**Response Structure:**
```typescript
[
  {
    id: "1",
    title: "Mid-term Examinations",
    description: "Mid-term exams for all grades",
    type: "exam",
    start_date: "2024-02-01T09:00:00Z",
    end_date: "2024-02-10T17:00:00Z",
    location: "Main Campus",
    audience: ["STUDENT", "TEACHER"],
    is_all_day: false,
    created_by: {
      id: "456",
      name: "Principal"
    }
  },
  // ... more events
]
```

## Activity Types

The following activity types are supported:

- `student_enrollment` - New student enrollment
- `teacher_assignment` - Teacher assigned to subject/class
- `marks_entry` - Marks entered for assessment
- `attendance_marked` - Attendance marked for class
- `payment_received` - Fee payment received
- `announcement_published` - New announcement published
- `timetable_updated` - Timetable updated
- `leave_request` - Leave request submitted
- `transfer_request` - Transfer request submitted
- `user_login` - User logged in
- `user_logout` - User logged out

## Event Types

The following event types are supported:

- `exam` - Examination
- `holiday` - School holiday
- `meeting` - Meeting
- `sports` - Sports event
- `cultural` - Cultural event
- `parent_teacher_meeting` - Parent-teacher meeting
- `assessment` - Assessment/test
- `deadline` - Deadline (assignment, fee payment, etc.)
- `other` - Other events

## Role-Specific Statistics

Different user roles receive different statistics:

### Admin Statistics
- `total_students` - Total number of students
- `total_teachers` - Total number of teachers
- `total_classes` - Total number of classes
- `pending_approvals` - Number of pending approvals
- `active_users` - Number of active users
- `total_staff` - Total staff members
- `total_collections` - Total fee collections
- `outstanding_balance` - Outstanding fee balance
- `arrears` - Fee arrears

### Teacher Statistics
- `assigned_classes` - Number of assigned classes
- `assigned_subjects` - Number of assigned subjects
- `pending_marks` - Number of pending marks entries
- `total_students` - Total students in assigned classes

### Student Statistics
- `attendance_rate` - Student's attendance rate
- `average_grade` - Student's average grade
- `pending_assignments` - Number of pending assignments

### Parent Statistics
- `children_count` - Number of children
- `total_outstanding_fees` - Total outstanding fees for all children

### Hostel Warden Statistics
- `total_capacity` - Total hostel capacity
- `current_occupancy` - Current occupancy
- `available_rooms` - Number of available rooms

## Caching

All dashboard endpoints use RTK Query's automatic caching:

- **Dashboard Stats**: Cached for 5 minutes
- **Recent Activity**: Cached for 2 minutes
- **Upcoming Events**: Cached for 5 minutes

Data is automatically refetched when:
- The cache expires
- The component remounts after being unmounted
- Manual refetch is triggered

## Error Handling

All endpoints use the base API error handling:

```typescript
const { data, error, isLoading } = useGetDashboardStatsQuery();

if (error) {
  // Error is automatically handled by the error middleware
  // Display user-friendly error message
  console.error('Failed to load dashboard stats:', error);
}
```

## Usage in Components

### Basic Usage

```typescript
import { useGetDashboardStatsQuery } from '@/api';

export const DashboardComponent = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <StatCard title="Total Students" value={stats?.total_students} />
      <StatCard title="Total Teachers" value={stats?.total_teachers} />
    </div>
  );
};
```

### With Manual Refetch

```typescript
import { useGetRecentActivityQuery } from '@/api';

export const ActivityFeed = () => {
  const { data: activities, refetch } = useGetRecentActivityQuery({ limit: 10 });

  return (
    <div>
      <button onClick={() => refetch()}>Refresh</button>
      {activities?.map(activity => (
        <ActivityItem key={activity.id} {...activity} />
      ))}
    </div>
  );
};
```

### Lazy Query (Manual Trigger)

```typescript
import { useLazyGetUpcomingEventsQuery } from '@/api';

export const EventsSection = () => {
  const [loadEvents, { data: events, isLoading }] = useLazyGetUpcomingEventsQuery();

  return (
    <div>
      <button onClick={() => loadEvents({ days_ahead: 30 })}>
        Load Events
      </button>
      {isLoading && <LoadingSpinner />}
      {events?.map(event => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
};
```

## Backend Integration

These endpoints expect the Django backend to provide the following API routes:

- `GET /api/dashboard/stats/` - Returns role-specific statistics
- `GET /api/dashboard/recent-activity/` - Returns recent activity feed
- `GET /api/dashboard/upcoming-events/` - Returns upcoming events

The backend should:
1. Authenticate the user via JWT token
2. Determine the user's role(s)
3. Return role-appropriate data
4. Support optional query parameters (limit, days_ahead, etc.)

## Type Safety

All endpoints are fully typed with TypeScript:

```typescript
import type {
  DashboardStats,
  RecentActivity,
  UpcomingEvent,
  DashboardQueryParams,
} from '@/types';
```

This ensures type safety throughout the application and provides excellent IDE autocomplete support.
