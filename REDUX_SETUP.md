# Redux Store and RTK Query Configuration

This document describes the Redux store and RTK Query setup for the School Management System frontend.

## Overview

The application uses Redux Toolkit for state management and RTK Query for API data fetching and caching. This provides:

- Centralized state management
- Automatic API caching and invalidation
- Type-safe API calls with TypeScript
- Automatic authentication header injection
- Error handling middleware

## Files Created

### Store Configuration

1. **`src/store/store.ts`** - Main Redux store configuration
   - Configures Redux Toolkit store
   - Integrates RTK Query API reducer
   - Sets up auth slice
   - Exports TypeScript types

2. **`src/store/hooks.ts`** - Typed Redux hooks
   - `useAppDispatch` - Typed dispatch hook
   - `useAppSelector` - Typed selector hook

3. **`src/store/middleware.ts`** - Custom middleware
   - Error handling for API requests
   - Logs errors based on status codes
   - Can be extended for toast notifications

4. **`src/store/index.ts`** - Public exports
   - Exports store, types, and hooks

### API Configuration

5. **`src/api/base.api.ts`** - RTK Query base API
   - Configures base URL from environment variables
   - Automatic authentication header injection
   - Defines cache invalidation tags
   - Base for all feature-specific APIs

### Authentication

6. **`src/features/auth/authSlice.ts`** - Auth state management
   - Manages JWT tokens
   - Handles login/logout
   - Persists tokens to localStorage
   - Provides auth selectors

7. **`src/features/auth/index.ts`** - Auth exports

### Type Definitions

8. **`src/vite-env.d.ts`** - Environment variable types
   - TypeScript definitions for all VITE_ env vars

### Integration

9. **`src/main.tsx`** - Updated to wrap app with Redux Provider

10. **`src/App.tsx`** - Updated to demonstrate Redux connection

## Usage Examples

### Using the Store in Components

```typescript
import { useAppSelector, useAppDispatch } from '@/store';
import { logout } from '@/features/auth';

function MyComponent() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const token = useAppSelector((state) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
```

### Creating API Endpoints

```typescript
// src/api/students.api.ts
import { baseApi } from './base.api';

export const studentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (params) => ({
        url: '/students/',
        params,
      }),
      providesTags: ['Student'],
    }),
    createStudent: builder.mutation({
      query: (data) => ({
        url: '/students/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Student'],
    }),
  }),
});

export const { useGetStudentsQuery, useCreateStudentMutation } = studentsApi;
```

### Using API Hooks in Components

```typescript
import { useGetStudentsQuery } from '@/api/students.api';

function StudentList() {
  const { data, isLoading, error } = useGetStudentsQuery({ page: 1 });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading students</div>;

  return (
    <ul>
      {data?.results.map((student) => (
        <li key={student.id}>{student.name}</li>
      ))}
    </ul>
  );
}
```

## Cache Invalidation Tags

The following tags are configured for cache management:

- `User` - User accounts and profiles
- `Student` - Student records
- `Teacher` - Teacher records
- `Assessment` - Assessments and exams
- `Mark` - Student marks/grades
- `Attendance` - Attendance records
- `Fee` - Fee structures
- `Payment` - Payment records
- `Timetable` - Timetable schedules
- `Announcement` - Announcements
- `Message` - Internal messages
- `Notification` - User notifications
- `Hostel` - Hostel information
- `Room` - Room allocations
- `Subject` - Academic subjects
- `Class` - Class information
- `Department` - Departments
- `CalendarEvent` - Calendar events

## Authentication Flow

1. User logs in via auth API
2. Auth slice stores tokens in state and localStorage
3. Base API automatically includes token in Authorization header
4. On 401 error, middleware logs error (can trigger logout)
5. Token refresh can be implemented in auth API

## Environment Variables

Required environment variables (see `.env.example`):

- `VITE_API_URL` - Backend API base URL
- `VITE_API_TIMEOUT` - Request timeout in milliseconds
- `VITE_TOKEN_REFRESH_INTERVAL` - Token refresh interval

## Dependencies Installed

- `@reduxjs/toolkit` - Redux Toolkit for state management
- `react-redux` - React bindings for Redux

## Next Steps

Future tasks will implement:

1. Feature-specific API endpoints (students, teachers, etc.)
2. Additional Redux slices for UI state
3. Token refresh logic
4. Toast notification integration with error middleware
5. Optimistic updates for mutations
6. Prefetching strategies
